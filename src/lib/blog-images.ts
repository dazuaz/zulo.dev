import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { ResponsiveImage } from './blog-image-markup';

// Import metadata rather than passing public URL strings: Astro then transforms
// these originals while their established public/full-size URLs remain intact.
const originals = import.meta.glob<{ default: ImageMetadata }>(
  '/public/blog/**/*.{png,jpg,jpeg,webp}', { eager: true },
);
const cache = new Map<string, Promise<ResponsiveImage | undefined>>();

export function getBlogImage(source: string): Promise<ResponsiveImage | undefined> {
  if (!cache.has(source)) cache.set(source, optimize(source));
  return cache.get(source)!;
}

async function optimize(source: string): Promise<ResponsiveImage | undefined> {
  const original = originals[`/public${source}`]?.default;
  if (!original) return undefined;
  const preserveOriginal = original.format === 'webp';
  const widths = [320, 640, 960, 1280, 1600, 1920];
  const image = await getImage({
    src: original,
    width: Math.min(original.width, 1600),
    // Cover up to 3x at the ~640px reading width. Astro caps at source resolution.
    widths: preserveOriginal ? widths.filter(width => width < original.width) : widths,
    format: 'webp',
    quality: source.includes('how-git-worktrees-work') ? 95 : 90,
  });
  return {
    src: preserveOriginal && original.width <= 1600 ? source : image.src,
    srcset: [image.srcSet.attribute, preserveOriginal && original.width <= 1920 ? `${source} ${original.width}w` : ''].filter(Boolean).join(', '),
    width: Number(image.attributes.width),
    height: Number(image.attributes.height),
  };
}
