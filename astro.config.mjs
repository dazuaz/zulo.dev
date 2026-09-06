// @ts-check
import { defineConfig, sharpImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.zulo.dev',
  output: 'server',
  trailingSlash: 'never',
  image: {
    service: sharpImageService({ webp: { effort: 6, smartSubsample: true } }),
  },
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});