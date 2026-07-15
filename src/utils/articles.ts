import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/**
 * All articles that should appear on the site, newest first.
 * Drafts are excluded from production builds (pages, RSS, sitemap, search)
 * but stay visible in `astro dev` so writers can preview them locally.
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Word-count based reading time, floored at 1 minute. */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '')
    .replace(/^---[\s\S]*?---/, '') // strip frontmatter if present
    .replace(/[#>*_`~[\]()!-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
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

/** Unique tags among the given articles, alphabetical. */
export function collectTags(articles: Article[]): string[] {
  return [...new Set(articles.flatMap((a) => a.data.tags))].sort();
}

/** Prefix a root-relative path with the configured base (works on project pages and custom domains). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
