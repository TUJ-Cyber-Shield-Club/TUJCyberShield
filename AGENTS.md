# AGENTS.md

## Cursor Cloud specific instructions

This is the **Cyber Shield Club** website: a fully static [Astro](https://astro.build) site with no backend, database, or external services. Articles are Markdown files under `src/content/articles/`; search runs entirely in the browser via [Pagefind](https://pagefind.app). Standard commands live in `package.json` scripts and `README.md`.

Non-obvious notes for running/testing here:

- Dependencies (`npm install`) are refreshed automatically by the cloud startup script, so you normally don't need to install them yourself.
- There is no lint script. `npm run build` is the validation step: it type-checks and fails with a file/field-named error if any article's frontmatter is invalid (missing title, description over 160 chars, bad date, etc.). `astro check` is intentionally not a dependency — don't add it just to lint.
- Search only works against a production build, not `npm run dev`. To test search, run `npm run build` then `npm run preview` and use the search box, which is on the **Articles** page (not the homepage).
- Draft articles (`draft: true`) are visible in `npm run dev` but excluded from production builds, pages, sitemap, and search.
- `npm run dev` serves on port 4321. When running both dev and preview at once, start preview on a different port, e.g. `npm run preview -- --port 4322`. Add `--host` when the server must be reachable from outside the VM.
