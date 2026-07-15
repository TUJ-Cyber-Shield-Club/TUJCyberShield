# Cyber Shield Club website

The website of **Cyber Shield**, TUJ's digital-safety club — a monthly student publication that turns security research into plain-language advice anyone can use.

Built with [Astro](https://astro.build) as a fully static site: articles are Markdown files in this repo, search runs entirely in the browser ([Pagefind](https://pagefind.app)), and there is no database, backend, analytics, or third-party service of any kind.

**Want to publish an article without touching code?** Read [PUBLISHING.md](PUBLISHING.md).

## Local development

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # first time only
npm run dev      # start a dev server at http://localhost:4321
npm run build    # production build into dist/ + Pagefind search index
npm run preview  # serve the production build locally
```

Notes:

- In `npm run dev`, draft articles (`draft: true`) are visible so writers can preview them. Production builds exclude drafts from pages, RSS, sitemap, and search.
- The search box only works after `npm run build` (the index is generated then). Use `npm run preview` to test it locally.
- If an article's frontmatter is invalid (missing title, description over 160 characters, bad date, etc.), the build fails with a message naming the file and field. That's intentional — fix the frontmatter and rebuild.

## How the site is organized

```
src/content/articles/   ← one Markdown file per article (see PUBLISHING.md)
src/assets/             ← the club logo + article cover images
src/pages/              ← page templates (home, articles, issues, tags, about, 404, RSS)
src/components/         ← header, footer, cards, search, theme toggle
src/styles/             ← design tokens and global CSS
public/                 ← favicons, robots.txt, social-preview image
.github/workflows/      ← automatic deployment
```

## Deployment

Every push to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and deploys it to GitHub Pages. A typical publish is live about two minutes after the commit.

One-time repository setup (an admin has to do this once):

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Note: GitHub Pages is free for **public** repositories. If this repo is private, either make it public or the organization needs a paid plan.

The site is served at:

```
https://tuj-cyber-shield-club.github.io/TUJ-Cyber-Shield-Club-Website/
```

## Custom domain setup (when the club buys one)

Say the club buys `cybershield.example` (replace with the real domain everywhere below).

**1. One-line config change** in [astro.config.mjs](astro.config.mjs):

```diff
-  site: 'https://tuj-cyber-shield-club.github.io',
-  base: '/TUJ-Cyber-Shield-Club-Website',
+  site: 'https://cybershield.example',
```

(Change `site`, delete the `base` line.) Also update the `Sitemap:` URL in [public/robots.txt](public/robots.txt).

**2. Add the CNAME file** — create `public/CNAME` containing exactly one line:

```
cybershield.example
```

**3. DNS records** — at the domain registrar, create:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA (optional, IPv6) | `@` | `2606:50c0:8000::153` |
| AAAA (optional) | `@` | `2606:50c0:8001::153` |
| AAAA (optional) | `@` | `2606:50c0:8002::153` |
| AAAA (optional) | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `tuj-cyber-shield-club.github.io` |

**4. In GitHub:** Settings → Pages → Custom domain → enter the domain, wait for the DNS check to pass, then tick **Enforce HTTPS** (the certificate can take up to an hour to issue the first time).

## Credits

Designed and maintained by Cyber Shield club members. Type set in Bricolage Grotesque and Source Serif 4 (self-hosted via Fontsource).
