// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/config.ts';

// Deployed on Cloudflare Pages at the custom domain, served from the root.
// `site` drives absolute URLs (canonical tags, sitemap, social-share images),
// so it must match the public domain. The Cloudflare *.pages.dev address still
// works as a fallback; the domain is configured under the Pages project's
// Custom domains. No `base` is needed because the site is served from the root.
export default defineConfig({
  site: 'https://tujcybershield.com',
  // Locale routing: the default language is served unprefixed at the root, the
  // rest under /<code>/. The pages themselves live in src/pages/[...lang]/ and
  // emit one route per locale; this block is what makes Astro's own i18n
  // helpers and the sitemap agree with that layout.
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES.map((l) => l.code),
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Emits <xhtml:link rel="alternate" hreflang="..."> per URL, so search
      // engines see the translations as one page rather than duplicates.
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((l) => [l.code, l.bcp47])),
      },
    }),
  ],
});
