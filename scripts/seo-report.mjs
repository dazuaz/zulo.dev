#!/usr/bin/env bun
/**
 * SEO/AIO report for www.zulo.dev.
 *
 *   bun run seo:report                 full report (index check, search, traffic)
 *   bun run seo:report -- --days 7     shorter window
 *   bun run seo:report -- --no-inspect skip the slow per-URL index check
 *
 * Sources:
 *   - Google Search Console API (search performance + URL Inspection), via
 *     gcloud Application Default Credentials with the webmasters.readonly scope:
 *       gcloud auth application-default login \
 *         --scopes=https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform
 *     The quota project comes from the ADC file (or GSC_QUOTA_PROJECT).
 *   - Vercel Web Analytics, via `vercel metrics` on the linked project.
 *
 * Each run saves a snapshot to .seo-reports/ (gitignored) and compares
 * index status and totals against the previous snapshot.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const ORIGIN = 'https://www.zulo.dev';
const GSC_SITE = 'sc-domain:zulo.dev';
const SNAPSHOT_DIR = join(ROOT, '.seo-reports');
const GSC_LAG_DAYS = 3; // Search Console data is usually 2–3 days behind.
const VERCEL_MAX_DAYS = 30; // Hobby plan limit.

const args = process.argv.slice(2);
const days = Number(args[args.indexOf('--days') + 1]) || 28;
const inspect = !args.includes('--no-inspect');

const AI_HOSTS = [
	'chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'claude.ai', 'gemini.google.com',
	'copilot.microsoft.com', 'you.com', 'phind.com', 'meta.ai', 'grok.com', 'chat.mistral.ai', 'kagi.com',
];
const SEARCH_HOSTS = ['google.', 'bing.com', 'duckduckgo.com', 'search.brave.com', 'yahoo.', 'ecosia.org', 'yandex.', 'baidu.com'];
const EMAIL_HOSTS = ['mail.google.com', 'outlook.live.com', 'outlook.office.com', 'mail.yahoo.com', 'mail.proton.me', 'fastmail.com'];
// utm_source values AI tools put on outbound links.
const AI_UTM = ['chatgpt', 'openai', 'perplexity', 'claude', 'gemini', 'copilot'];
const SOCIAL_HOSTS = ['linkedin.com', 'lnkd.in', 't.co', 'x.com', 'twitter.com', 'news.ycombinator.com', 'reddit.com', 'facebook.com', 'bsky.app', 'threads.net', 'mastodon'];

const out = [];
const log = (line = '') => out.push(line);
const warn = (msg) => process.stderr.write(`! ${msg}\n`);

// ---------- dates ----------
const isoDay = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 864e5);
const gscEnd = daysAgo(GSC_LAG_DAYS);
const gscStart = daysAgo(GSC_LAG_DAYS + days - 1);
const prevEnd = daysAgo(GSC_LAG_DAYS + days);
const prevStart = daysAgo(GSC_LAG_DAYS + 2 * days - 1);

// ---------- Google auth ----------
function googleAuth() {
	const token = execFileSync('gcloud', ['auth', 'application-default', 'print-access-token'], {
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe'],
	}).trim();
	let quota = process.env.GSC_QUOTA_PROJECT;
	if (!quota) {
		try {
			const adc = JSON.parse(readFileSync(join(homedir(), '.config/gcloud/application_default_credentials.json'), 'utf8'));
			quota = adc.quota_project_id;
		} catch {}
	}
	const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
	if (quota) headers['x-goog-user-project'] = quota;
	return headers;
}

async function gsc(headers, path, body) {
	const res = await fetch(`https://searchconsole.googleapis.com${path}`, {
		method: body ? 'POST' : 'GET',
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});
	const data = await res.json();
	if (data.error) throw new Error(`Search Console: ${data.error.message}`);
	return data;
}

const siteBase = `/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}`;
const searchQuery = (headers, start, end, dimensions = [], rowLimit = 25) =>
	gsc(headers, `${siteBase}/searchAnalytics/query`, {
		startDate: isoDay(start),
		endDate: isoDay(end),
		dimensions,
		rowLimit,
	}).then((d) => d.rows ?? []);

// ---------- Vercel ----------
function vercel(metric, flags) {
	try {
		const raw = execFileSync('vercel', ['metrics', metric, '--prod', '--json', ...flags], {
			cwd: ROOT,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe'],
		});
		const data = JSON.parse(raw);
		if (data.error) throw new Error(data.error.message);
		return data.summary ?? [];
	} catch (err) {
		const msg = err.stdout ? (JSON.parse(err.stdout).error?.message ?? err.message) : err.message;
		warn(`vercel metrics ${metric}: ${msg}`);
		return null;
	}
}
const countOf = (row) => Object.entries(row).find(([k]) => k.endsWith('_count'))?.[1] ?? 0;

// ---------- helpers ----------
const pathOf = (url) => url.replace(ORIGIN, '').replace(/^https:\/\/zulo\.dev/, '') || '/';
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const num = (n) => n.toLocaleString('en-US');
const delta = (now, before) => {
	if (before === undefined || before === null) return '';
	const d = now - before;
	return d === 0 ? ' (±0)' : ` (${d > 0 ? '+' : ''}${num(d)})`;
};
const table = (head, rows) => {
	if (!rows.length) return log('_No data._');
	log(`| ${head.join(' | ')} |`);
	const numeric = head.map((_, i) => i > 0 && rows.every((r) => /^[\d.,%+±() —-]*$/.test(String(r[i]))));
	log(`|${numeric.map((n) => (n ? '---:' : '---')).join('|')}|`);
	for (const r of rows) log(`| ${r.join(' | ')} |`);
};
const classify = (host) => {
	if (!host) return 'Direct / none';
	const h = host.replace(/^www\./, '');
	if (AI_HOSTS.some((a) => h === a || h.endsWith(`.${a}`))) return 'AI assistants';
	if (EMAIL_HOSTS.includes(h)) return 'Email';
	if (SEARCH_HOSTS.some((s) => h.includes(s))) return 'Search';
	if (SOCIAL_HOSTS.some((s) => h === s || h.endsWith(`.${s}`) || h.includes(s))) return 'Social';
	return 'Other sites';
};

async function pool(items, size, fn) {
	const results = new Array(items.length);
	let next = 0;
	await Promise.all(
		Array.from({ length: Math.min(size, items.length) }, async () => {
			while (next < items.length) {
				const i = next++;
				results[i] = await fn(items[i]);
			}
		}),
	);
	return results;
}

function previousSnapshot(today) {
	if (!existsSync(SNAPSHOT_DIR)) return null;
	const files = readdirSync(SNAPSHOT_DIR)
		.filter((f) => f.endsWith('.json') && f.slice(0, 10) !== today)
		.sort();
	if (!files.length) return null;
	return JSON.parse(readFileSync(join(SNAPSHOT_DIR, files.at(-1)), 'utf8'));
}

// ---------- report ----------
const today = isoDay(new Date());
const prev = previousSnapshot(today);
const snap = { date: today, days, index: {}, gsc: null, vercel: null };
// With --no-inspect, keep today's index results from an earlier full run.
const todayFile = join(SNAPSHOT_DIR, `${today}.json`);
if (!inspect && existsSync(todayFile)) snap.index = JSON.parse(readFileSync(todayFile, 'utf8')).index ?? {};

log(`# SEO / AIO report — ${today}`);
log();
log(`Search Console: ${isoDay(gscStart)} → ${isoDay(gscEnd)} (${days} days, vs the ${days} days before).`);
log(`Vercel Web Analytics: last ${Math.min(days, VERCEL_MAX_DAYS)} days, production.`);
if (prev) log(`Compared with the snapshot from ${prev.date}.`);
log();

let headers = null;
try {
	headers = googleAuth();
} catch (err) {
	warn(`Google auth failed — run the gcloud login in this script's header. (${err.message.split('\n')[0]})`);
}

// 1. Index coverage
if (headers && inspect) {
	log('## Google index coverage');
	log();
	const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
	const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
	const results = await pool(urls, 4, async (url) => {
		try {
			const d = await gsc(headers, '/v1/urlInspection/index:inspect', { inspectionUrl: url, siteUrl: GSC_SITE });
			const r = d.inspectionResult.indexStatusResult;
			return {
				url,
				verdict: r.verdict,
				coverage: r.coverageState ?? '',
				lastCrawl: r.lastCrawlTime?.slice(0, 10) ?? '—',
				canonical: r.googleCanonical && r.googleCanonical !== url ? r.googleCanonical : '',
			};
		} catch (err) {
			return { url, verdict: 'ERROR', coverage: err.message, lastCrawl: '—', canonical: '' };
		}
	});
	const indexed = results.filter((r) => r.verdict === 'PASS');
	for (const r of results) snap.index[pathOf(r.url)] = r.coverage;
	const prevIndexed = prev ? Object.values(prev.index).filter((c) => /indexed/i.test(c) && !/not indexed/i.test(c)).length : undefined;
	log(`**${indexed.length} of ${urls.length}** sitemap URLs indexed${delta(indexed.length, prevIndexed)}.`);
	log();
	if (prev && Object.keys(prev.index).length) {
		const changes = results.filter((r) => prev.index[pathOf(r.url)] !== undefined && prev.index[pathOf(r.url)] !== r.coverage);
		const added = results.filter((r) => prev.index[pathOf(r.url)] === undefined);
		if (changes.length || added.length) {
			log('Changes since last snapshot:');
			for (const r of changes) log(`- \`${pathOf(r.url)}\`: ${prev.index[pathOf(r.url)]} → **${r.coverage}**`);
			for (const r of added) log(`- \`${pathOf(r.url)}\` (new in sitemap): **${r.coverage}**`);
			log();
		}
	}
	const notIndexed = results.filter((r) => r.verdict !== 'PASS');
	if (notIndexed.length) {
		log('Not indexed — request indexing in Search Console → URL Inspection:');
		log();
		table(['Page', 'Status', 'Last crawl'], notIndexed.map((r) => [`\`${pathOf(r.url)}\``, r.coverage, r.lastCrawl]));
		log();
	}
	const canonMismatch = results.filter((r) => r.canonical);
	if (canonMismatch.length) {
		log('Google chose a different canonical:');
		for (const r of canonMismatch) log(`- \`${pathOf(r.url)}\` → ${r.canonical}`);
		log();
	}
	try {
		const sm = await gsc(headers, `${siteBase}/sitemaps`);
		const list = sm.sitemap ?? [];
		if (!list.length) log('⚠️ No sitemap submitted to the domain property. Search Console → Sitemaps → `sitemap.xml`.');
		for (const s of list) {
			log(`Sitemap \`${s.path}\`: last read ${s.lastDownloaded?.slice(0, 10) ?? 'never'}, ${s.errors ?? 0} errors, ${s.warnings ?? 0} warnings.`);
		}
		log();
	} catch (err) {
		warn(err.message);
	}
}

// 2. Search performance
if (headers) {
	log('## Google search performance');
	log();
	try {
		const [[cur], [before], queries, pages] = await Promise.all([
			searchQuery(headers, gscStart, gscEnd),
			searchQuery(headers, prevStart, prevEnd),
			searchQuery(headers, gscStart, gscEnd, ['query'], 25),
			searchQuery(headers, gscStart, gscEnd, ['page'], 25),
		]);
		const t = cur ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
		const p = before ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
		snap.gsc = { clicks: t.clicks, impressions: t.impressions, ctr: t.ctr, position: t.position };
		table(
			['Metric', 'This period', 'Previous'],
			[
				['Clicks', num(t.clicks), num(p.clicks)],
				['Impressions', num(t.impressions), num(p.impressions)],
				['CTR', pct(t.ctr), pct(p.ctr)],
				['Avg. position', t.position ? t.position.toFixed(1) : '—', p.position ? p.position.toFixed(1) : '—'],
			],
		);
		log();
		log('### Top queries');
		log();
		table(
			['Query', 'Clicks', 'Impr.', 'CTR', 'Pos.'],
			queries.map((r) => [r.keys[0], r.clicks, r.impressions, pct(r.ctr), r.position.toFixed(1)]),
		);
		log();
		log('### Top pages in search');
		log();
		table(
			['Page', 'Clicks', 'Impr.', 'CTR', 'Pos.'],
			pages.map((r) => [`\`${pathOf(r.keys[0])}\``, r.clicks, r.impressions, pct(r.ctr), r.position.toFixed(1)]),
		);
		const opportunities = queries.filter((r) => r.position <= 20 && r.impressions >= 20 && r.ctr < 0.02);
		if (opportunities.length) {
			log();
			log('Queries with impressions but few clicks (rewrite title/description, or answer the query more directly):');
			for (const r of opportunities) log(`- "${r.keys[0]}" — ${r.impressions} impr., pos. ${r.position.toFixed(1)}`);
		}
		log();
	} catch (err) {
		warn(err.message);
		log(`_Search Console query failed: ${err.message}_`);
		log();
	}
}

// 3. Traffic (Vercel)
log('## Site traffic (Vercel Web Analytics)');
log();
const vDays = `${Math.min(days, VERCEL_MAX_DAYS)}d`;
const M = 'vercel.analytics.page_view.count';
const totalRows = vercel(M, ['-s', vDays]);
if (totalRows) {
	const total = totalRows.reduce((s, r) => s + countOf(r), 0);
	const refs = vercel(M, ['-s', vDays, '--group-by', 'referrerHostname', '-l', '50']) ?? [];
	const paths = vercel(M, ['-s', vDays, '--group-by', 'requestPath', '-l', '20']) ?? [];
	const utm = vercel(M, ['-s', vDays, '--group-by', 'utmSource', '-l', '20']) ?? [];

	const channels = {};
	const aiRefs = [];
	for (const r of refs) {
		const ch = classify(r.referrerHostname);
		channels[ch] = (channels[ch] ?? 0) + countOf(r);
		if (ch === 'AI assistants') aiRefs.push([r.referrerHostname, countOf(r)]);
	}
	// ChatGPT and some others tag outbound links with utm_source instead of a referrer.
	for (const r of utm) {
		if (r.utmSource && AI_UTM.some((a) => r.utmSource.toLowerCase().includes(a))) aiRefs.push([`utm_source=${r.utmSource}`, countOf(r)]);
	}
	snap.vercel = { pageViews: total, channels };

	log(`**${num(total)}** page views${delta(total, prev?.vercel?.pageViews)}.`);
	log();
	log('### Channels');
	log();
	table(
		['Channel', 'Views', 'Share'],
		Object.entries(channels)
			.sort((a, b) => b[1] - a[1])
			.map(([k, v]) => [k, `${v}${delta(v, prev?.vercel?.channels?.[k] ?? (prev?.vercel ? 0 : undefined))}`, total ? pct(v / total) : '—']),
	);
	log();
	log('### AI assistant referrals');
	log();
	if (aiRefs.length) table(['Source', 'Views'], aiRefs);
	else log('_None yet. Visits from ChatGPT, Perplexity, Claude, Gemini or Copilot show up here — the clearest AIO signal available without Observability Plus._');
	log();
	log('### Referrers');
	log();
	table(['Referrer', 'Channel', 'Views'], refs.filter((r) => r.referrerHostname).slice(0, 15).map((r) => [r.referrerHostname, classify(r.referrerHostname), countOf(r)]));
	log();
	log('### UTM sources');
	log();
	const tagged = utm.filter((r) => r.utmSource);
	if (tagged.length) table(['utm_source', 'Views'], tagged.map((r) => [r.utmSource, countOf(r)]));
	else log('_None — tag links you share, e.g. `?utm_source=linkedin&utm_campaign=<post-slug>`._');
	log();
	log('### Top pages');
	log();
	table(['Page', 'Views', 'In Google?'], paths.map((r) => {
		const status = snap.index[r.requestPath];
		return [`\`${r.requestPath}\``, countOf(r), status === undefined ? '—' : /^Submitted and indexed|^Indexed/.test(status) ? 'yes' : 'no'];
	}));
	log();
}

// ---------- write ----------
mkdirSync(SNAPSHOT_DIR, { recursive: true });
writeFileSync(join(SNAPSHOT_DIR, `${today}.json`), JSON.stringify(snap, null, 2));
writeFileSync(join(SNAPSHOT_DIR, `${today}.md`), out.join('\n'));
console.log(out.join('\n'));
process.stderr.write(`\nSaved .seo-reports/${today}.md and .json\n`);
