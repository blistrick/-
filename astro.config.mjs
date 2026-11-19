import { defineConfig } from 'astro/config';

// Netlify exposes URL, Vercel exposes VERCEL_PROJECT_PRODUCTION_URL; PUBLIC_SITE_URL overrides both.
const site =
  process.env.PUBLIC_SITE_URL ||
  process.env.URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

export default defineConfig({
  site,
  output: 'static',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: false },
  // three.js lives in a lazy chunk loaded only near the 3D block
  vite: { build: { assetsInlineLimit: 0, chunkSizeWarningLimit: 900 } },
});
