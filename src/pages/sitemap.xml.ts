import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { canonicalUrl } from '../lib/seo';

export const prerender = true;

const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[character]!);

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const pages = ['/', '/services', '/approach', '/about', '/work', '/work/vaster', '/work/expenses', '/blog', '/contact'].map(path => ({ url: canonicalUrl(path, site!), lastmod: undefined as Date | undefined }));
  pages.push(...posts.map(post => ({
    url: canonicalUrl(`/blog/${post.id}`, site!),
    lastmod: post.data.updatedDate ?? post.data.pubDate,
  })));
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page =>
      `<url><loc>${escapeXml(page.url)}</loc>${page.lastmod ? `<lastmod>${page.lastmod.toISOString()}</lastmod>` : ''}</url>`,
    ).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
