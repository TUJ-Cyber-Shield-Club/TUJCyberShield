// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site:
//   https://tuj-cyber-shield-club.github.io/TUJ-Cyber-Shield-Club-Website/
//
// When the club buys a custom domain (e.g. cybershield.example):
//   1. Change `site` to 'https://cybershield.example' and delete the `base` line.
//   2. Add a `public/CNAME` file containing the bare domain (see README).
export default defineConfig({
  site: 'https://tuj-cyber-shield-club.github.io',
  base: '/TUJ-Cyber-Shield-Club-Website',
  integrations: [sitemap()],
});
