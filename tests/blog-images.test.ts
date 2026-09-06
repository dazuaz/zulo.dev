import assert from 'node:assert/strict';
import test from 'node:test';
import { parseFragment } from 'parse5';
import type { DefaultTreeAdapterMap } from 'parse5';
type Element = DefaultTreeAdapterMap['element'];
import { optimizeBlogImages as optimize } from '../src/lib/blog-image-markup.ts';

const image = { src: '/_astro/diagram.webp', srcset: '/_astro/small.webp 320w, /_astro/large.webp 1280w', width: 1280, height: 720 };
const optimizeBlogImages = (html: string) => optimize(html, async src => src === source ? image : undefined);

const source = '/blog/how-git-worktrees-work.png';

test('optimizes inline images while preserving full-size links and alt text', async () => {
  const html = await optimizeBlogImages(`<a href="${source}"><img src="${source}" alt="A &amp; B"></a>`);
  const anchor = parseFragment(html).childNodes[0] as Element;
  const node = anchor.childNodes[0] as Element;
  const attrs = Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]));
  assert.equal(anchor.attrs[0].value, source);
  assert.equal(attrs.alt, 'A & B');
  assert.equal(attrs.src, image.src);
  assert.equal(attrs.loading, 'lazy');
  assert.equal(attrs.decoding, 'async');
  assert.ok(Number(attrs.width) > 0 && Number(attrs.height) > 0);
  assert.ok(attrs.srcset.includes('320w') && attrs.srcset.includes('1280w'));
});

test('leaves escaped code examples and external images alone', async () => {
  const html = '<pre><code>&lt;img src="/blog/how-git-worktrees-work.png"&gt;</code></pre><img src="https://example.com/image.png" alt="External">';
  assert.equal(await optimizeBlogImages(html), html);
});

test('uses comparison sizes only inside the comparison grid and respects explicit loading', async () => {
  const html = await optimizeBlogImages(`<div class="md:grid-cols-2"><img src="${source}" loading="eager"></div><img src="${source}">`);
  const nodes = parseFragment(html).childNodes as Element[];
  const comparison = Object.fromEntries((nodes[0].childNodes[0] as Element).attrs.map(({ name, value }) => [name, value]));
  const full = Object.fromEntries(nodes[1].attrs.map(({ name, value }) => [name, value]));
  assert.match(comparison.sizes, /20rem/);
  assert.doesNotMatch(full.sizes, /20rem/);
  assert.equal(comparison.loading, 'eager');
});
