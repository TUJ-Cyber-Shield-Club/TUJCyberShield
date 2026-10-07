import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type LocaleCode } from '../i18n/config';

export type Article = CollectionEntry<'articles'>;

/**
 * Article files live at src/content/articles/<locale>/<slug>.md, so the
 * collection id is "ja/2026-07-foo". The slug is the part after the locale —
 * shared across languages, so /articles/foo/ and /ja/articles/foo/ are the
 * same story and hreflang lines up.
 */
export function articleSlug(article: Article): string {
  const [, ...rest] = article.id.split('/');
  return rest.join('/') || article.id;
}

/**
 * All articles for one locale, newest first.
 *
 * Falls back to the English file when a locale is missing a translation, so a
 * partially translated language still renders a complete site rather than a
 * pile of 404s. A locale should not be listed in src/i18n/config.ts until it
 * is fully translated, so in practice this is a safety net, not a strategy.
 *
 * Drafts are excluded from production builds (pages, sitemap, search) but stay
 * visible in `astro dev` so writers can preview them locally.
 */
export async function getPublishedArticles(lang: LocaleCode = DEFAULT_LOCALE): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const inLocale = new Map<string, Article>();
  for (const article of all) {
    const [locale] = article.id.split('/');
    const slug = articleSlug(article);
    if (locale === lang) inLocale.set(slug, article);
    else if (locale === DEFAULT_LOCALE && !inLocale.has(slug)) inLocale.set(slug, article);
  }

  return [...inLocale.values()].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Reading time in minutes, floored at 1.
 *
 * Counts CJK characters separately from space-delimited words: Chinese,
 * Japanese and Thai don't put spaces between words, so a whitespace split
 * scores a full article as a handful of "words" and every translation would
 * claim to be a 1-minute read. ~200 words/min for scripts that use spaces,
 * ~450 characters/min for CJK, which is the usual published range.
 */
export function readingTime(body: string | undefined): number {
  const text = (body ?? '')
    .replace(/^---[\s\S]*?---/, '') // strip frontmatter if present
    .replace(/[#>*_`~[\]()!-]/g, ' ');

  const cjk = text.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u0e00-\u0e7f]/g)?.length ?? 0;
  const words = text
    .replace(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u0e00-\u0e7f]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200 + cjk / 450));
}

/** "2026-07" -> "July 2026" */
export function issueLabel(issue: string): string {
  const [year, month] = issue.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Unique issues present among the given articles, newest first. */
export function collectIssues(articles: Article[]): string[] {
  return [...new Set(articles.map((a) => a.data.issue))].sort().reverse();
}

/**
 * An issue's running number, counting from 1 for the oldest published issue,
 * the same numbering as the issue archive's spines. Returns 0 for an issue
 * that isn't published (e.g. a draft-only month in production).
 */
export async function issueNumber(issue: string): Promise<number> {
  const oldestFirst = collectIssues(await getPublishedArticles()).reverse();
  return oldestFirst.indexOf(issue) + 1;
}

/** Unique tags among the given articles, alphabetical. */
export function collectTags(articles: Article[]): string[] {
  return [...new Set(articles.flatMap((a) => a.data.tags))].sort();
}

/** Compare bylines forgivingly: ignore case, surrounding space, and double spaces. */
function normalizeAuthor(name: string): string {
  return name.trim().replace(/\s+/g, ' ').toLowerCase();
}

/**
 * Articles credited to one person, newest first (input order is preserved).
 * `names` should be the member's display name plus any `authorNames` aliases,
 * so a byline that differs from the display name still matches.
 * Returns an empty array when they haven't been credited on anything.
 */
export function articlesByAuthor(articles: Article[], names: string[]): Article[] {
  const wanted = new Set(names.map(normalizeAuthor));
  return articles.filter((article) =>
    article.data.authors.some((author) => wanted.has(normalizeAuthor(author)))
  );
}

/** "Carl Masters" -> "carl-masters", for element ids. */
export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Prefix a root-relative path with the configured base (works on project pages and custom domains). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
