/** Generate the comparison through Vercel AI Gateway, as requested.
 * Install ai, @ai-sdk/gateway, and sharp in a separate runtime, then run:
 * IMAGE_COMPARISON_RUNTIME=/path/to/runtime node scripts/generate-illustration-comparison-gateway.mjs --style flat-vector
 * Omit --style for remaining styles. Existing successful files are retained.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = fileURLToPath(new URL('../', import.meta.url));
const runtime = process.env.IMAGE_COMPARISON_RUNTIME;
if (!runtime) throw new Error('Set IMAGE_COMPARISON_RUNTIME to the directory with the gateway SDK installed.');
const require = createRequire(path.join(runtime, 'package.json'));
const { generateImage, generateText } = require('ai');
const { createGateway } = require('@ai-sdk/gateway');
const sharp = require('sharp');
if (fs.existsSync(path.join(root, '.env'))) process.loadEnvFile(path.join(root, '.env'));
const key = process.env.AI_GATEWAY || process.env.AI_GATEWAY_API_KEY;
if (!key) throw new Error('Set AI_GATEWAY in the ignored .env file.');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/illustration-styles-revisited/prompts.json'), 'utf8'));
const args = process.argv.slice(2);
let selectedStyle;
let selectedProvider;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--style' && args[i + 1]) selectedStyle = args[++i];
  else if (args[i] === '--provider' && ['openai', 'google'].includes(args[i + 1])) selectedProvider = args[++i];
  else throw new Error(`Unknown or incomplete argument: ${args[i]}`);
}
const styles = manifest.styles.filter(s => !selectedStyle || s.slug === selectedStyle);
if (!styles.length) throw new Error('Unknown style.');
const outputDir = path.join(root, 'output/imagegen/illustration-styles-revisited');
const recordsDir = path.join(root, 'docs/illustration-styles-revisited/runs');
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(recordsDir, { recursive: true });

async function generate(style, provider) {
  const suffix = provider === 'openai' ? 'gpt-image-2' : 'nano-banana-2';
  const modelId = provider === 'openai' ? 'openai/gpt-image-2' : 'google/gemini-3.1-flash-image';
  const outputPath = path.join(outputDir, `${style.slug}-${suffix}.png`);
  if (fs.existsSync(outputPath)) { console.log(`Keeping ${style.slug}/${suffix}`); return; }
  const record = { style: style.slug, transport: 'Vercel AI Gateway', requestedModel: modelId,
    startedAt: new Date().toISOString(), prompt: style.prompt, sdkVersions: {
      ai: require('ai/package.json').version, gateway: require('@ai-sdk/gateway/package.json').version,
    }, requests: [] };
  const recordPath = path.join(recordsDir, `${style.slug}-${suffix}-${Date.now()}.json`);
  const gateway = createGateway({ apiKey: key, fetch: async (url, options) => {
    // Retain request bodies and endpoint only; never authentication headers.
    if (options?.body && typeof options.body === 'string') {
      try { record.requests.push({ endpoint: String(url), body: JSON.parse(options.body) }); } catch {}
    }
    return fetch(url, options);
  } });
  console.log(`Generating ${style.slug}/${suffix}`);
  try {
    const common = { prompt: style.prompt, maxRetries: 0, abortSignal: AbortSignal.timeout(300000) };
    let result, images;
    if (provider === 'openai') {
      record.settings = { size: '1024x1024', quality: 'high', output_format: 'png', n: 1 };
      result = await generateImage({ ...common, model: gateway.image(modelId), size: '1024x1024', n: 1,
        providerOptions: { openai: { quality: 'high', output_format: 'png' } } });
      images = result.images;
    } else {
      record.settings = { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '1:1', imageSize: '1K' } };
      result = await generateText({ ...common, model: gateway(modelId),
        providerOptions: { google: record.settings } });
      images = result.files.filter(f => f.mediaType.startsWith('image/'));
    }
    record.completedAt = new Date().toISOString();
    record.providerMetadata = result.providerMetadata;
    record.usage = result.usage;
    record.warnings = result.warnings;
    record.responses = (result.responses ?? (result.response ? [result.response] : [])).map(r => ({
      modelId: r.modelId, timestamp: r.timestamp, id: r.id,
    }));
    if (images.length !== 1) throw new Error(`Expected one image, received ${images.length}`);
    const buffer = Buffer.from(images[0].uint8Array);
    const metadata = await sharp(buffer).metadata();
    if (metadata.format !== 'png') throw new Error(`Expected PNG, received ${metadata.format}`);
    record.dimensions = { width: metadata.width, height: metadata.height };
    record.sha256 = createHash('sha256').update(buffer).digest('hex');
    record.output = path.relative(root, outputPath);
    record.status = 'success';
    fs.writeFileSync(outputPath, buffer, { flag: 'wx' });
    console.log(`Saved ${style.slug}/${suffix} ${metadata.width}x${metadata.height}`);
  } catch (error) {
    record.status = 'error';
    record.completedAt = new Date().toISOString();
    // Redact the only credential used before recording a bounded error message.
    record.error = String(error.message).replaceAll(key, '[REDACTED]').slice(0, 1800);
    record.httpStatus = error.statusCode;
    console.error(`${style.slug}/${suffix}: ${record.error}`);
    process.exitCode = 1;
  } finally {
    fs.writeFileSync(recordPath, JSON.stringify(record, null, 2) + '\n', { flag: 'wx' });
  }
}
const jobs = styles.flatMap(style => (selectedProvider ? [selectedProvider] : ['openai', 'google']).map(provider => ({ style, provider })));
// A bounded group of three requests keeps the long image calls moving without a burst of 22.
for (let i = 0; i < jobs.length; i += 3) {
  await Promise.all(jobs.slice(i, i + 3).map(({ style, provider }) => generate(style, provider)));
  if (process.exitCode) break;
}
