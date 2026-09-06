import { parseFragment, serialize } from 'parse5';
import type { DefaultTreeAdapterMap } from 'parse5';

// Match the reading column and its mobile/tablet gutters. Lazy images use their
// actual laid-out width via sizes=auto where supported, with these fallbacks.
export const articleImageSizes = '(max-width: 640px) calc(100vw - 2.5rem), (max-width: 688px) calc(100vw - 3rem), 40rem';
const comparisonImageSizes = '(min-width: 768px) 20rem, ' + articleImageSizes;

export interface ResponsiveImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

/** Update image elements, preserving full-size links and escaped code examples. */
export async function optimizeBlogImages(
  html: string,
  resolveImage: (source: string) => Promise<ResponsiveImage | undefined>,
): Promise<string> {
  const fragment = parseFragment(html);
  async function walk(node: DefaultTreeAdapterMap['node'], comparison = false) {
    if ('tagName' in node) {
      const element = node as DefaultTreeAdapterMap['element'];
      const get = (name: string) => element.attrs.find(attribute => attribute.name === name)?.value;
      const set = (name: string, value: string) => {
        const attribute = element.attrs.find(attribute => attribute.name === name);
        if (attribute) attribute.value = value;
        else element.attrs.push({ name, value });
      };
      comparison ||= (get('class') ?? '').split(/\s+/).includes('md:grid-cols-2');
      if (element.tagName === 'img') {
        const image = await resolveImage(get('src') ?? '');
        if (image) {
          const loading = get('loading') ?? 'lazy';
          set('src', image.src);
          set('srcset', image.srcset);
          set('sizes', get('sizes') ?? ((loading === 'lazy' ? 'auto, ' : '') + (comparison ? comparisonImageSizes : articleImageSizes)));
          set('width', String(image.width));
          set('height', String(image.height));
          set('loading', loading);
          set('decoding', get('decoding') ?? 'async');
        }
      }
    }
    if ('childNodes' in node) await Promise.all(node.childNodes.map(child => walk(child, comparison)));
  }
  await walk(fragment);
  return serialize(fragment);
}
