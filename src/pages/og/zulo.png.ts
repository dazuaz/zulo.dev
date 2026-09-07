import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { ImageResponse } from '@vercel/og';
import { SocialCard } from '../../lib/social-card';

// Generate once at build time; crawlers fetch a public PNG without a function call.
export const prerender = true;

export const GET: APIRoute = async () => {
  const [sora, manrope] = await Promise.all([
    readFile(resolve('src/assets/fonts/Sora-SemiBold.ttf')),
    readFile(resolve('src/assets/fonts/Manrope-Medium.ttf')),
  ]);
  return new ImageResponse(createElement(SocialCard), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Sora', data: sora, weight: 600, style: 'normal' },
      { name: 'Manrope', data: manrope, weight: 500, style: 'normal' },
    ],
  });
};
