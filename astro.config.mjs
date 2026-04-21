// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sule-bt-abdellah.vercel.app',
  // Default pages remain static; /admin, /api/*, /keystatic/* opt into SSR
  // individually with `export const prerender = false`.
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    react(),
    keystatic(),
    sitemap(),
    mdx(),
    markdoc(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
