import {
  DEFAULT_LOCALE,
  LOCALE_CODES,
  getLocale,
  isLocaleCode,
  type LocaleCode,
} from './config';
import { en } from './locales/en';
import type { Dictionary, UIKey } from './locales/en';

// Locale dictionaries. Each import is a whole language; adding one here is the
// only wiring step beyond writing the file itself.
import { ja } from './locales/ja';

const DICTIONARIES: Record<LocaleCode, Dictionary> = {
  en,
  ja,
};

/**
 * The `lang` route param for a locale. The default locale gets `undefined`, so
 * the [...lang] rest param collapses and the page is emitted at the site root
 * (`/team/`) rather than `/en/team/`.
 */
export function langParam(code: LocaleCode): string | undefined {
  return code === DEFAULT_LOCALE ? undefined : code;
}

/**
 * getStaticPaths entries for a page that exists once per locale and has no
 * other route params. Pages with their own params (slug, tag, issue) should
 * flatMap over LOCALE_CODES themselves and merge in `langParam(code)`.
 */
export function localeStaticPaths() {
  return LOCALE_CODES.map((code) => ({
    params: { lang: langParam(code) },
    props: { lang: code },
  }));
}

/**
 * The locale for a URL. `/ja/team/` -> 'ja'; anything without a known prefix
 * is the default locale, since English is served unprefixed at the root.
 */
export function localeFromUrl(url: URL): LocaleCode {
  const first = url.pathname.split('/').filter(Boolean)[0];
  return isLocaleCode(first) ? first : DEFAULT_LOCALE;
}

/**
 * Returns a translator bound to one locale.
 *
 *   const t = useTranslations(lang);
 *   t('nav.articles')
 *   t('card.minRead', { count: 4 })
 *
 * Falls back to English for any key a locale somehow lacks at runtime; the
 * Dictionary type means that shouldn't be reachable, but a missing string is a
 * better failure than a crash on a live page.
 */
export function useTranslations(lang: LocaleCode) {
  const dict = DICTIONARIES[lang] ?? en;
  return function t(key: UIKey, vars?: Record<string, string | number>): string {
    const raw = dict[key] ?? en[key] ?? key;
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in vars ? String(vars[name]) : match
    );
  };
}

/**
 * Build a path in a given locale. The default locale is served unprefixed, so
 * localePath('en', '/team/') is '/team/' and localePath('ja', '/team/') is
 * '/ja/team/'. `path` is always the English/root-relative form.
 */
export function localePath(lang: LocaleCode, path = '/'): string {
  const clean = `/${path.replace(/^\/+/, '')}`;
  if (lang === DEFAULT_LOCALE) return clean;
  const suffix = clean === '/' ? '/' : clean;
  return `/${lang}${suffix}`;
}

/**
 * Strip the locale prefix from a pathname, giving the root-relative path.
 * '/ja/articles/foo/' -> '/articles/foo/'. Used by the language picker to keep
 * the reader on the same page when they switch language.
 */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (isLocaleCode(parts[0])) parts.shift();
  return `/${parts.join('/')}${parts.length ? '/' : ''}`;
}

/** Localized long date, e.g. "July 1, 2026" / "2026年7月1日". */
export function formatDateIn(lang: LocaleCode, date: Date): string {
  return date.toLocaleDateString(getLocale(lang).dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Localized month+year for an issue string, e.g. "2026-07" -> "July 2026". */
export function issueLabelIn(lang: LocaleCode, issue: string): string {
  const [year, month] = issue.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return date.toLocaleDateString(getLocale(lang).dateLocale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Display label for a tag. Tag slugs stay English because they're URL
 * segments and must be stable across languages; only the label is translated.
 * Falls back to the raw slug for any tag without a dictionary entry, so adding
 * a new tag never breaks a page.
 */
export function tagLabel(lang: LocaleCode, tag: string): string {
  const dict = DICTIONARIES[lang] ?? en;
  const key = `tag.${tag}` as UIKey;
  return dict[key] ?? tag;
}

/** Short month for the issue-shelf spine: "JUL" in English, "7月" in Japanese. */
export function issueMonthShortIn(lang: LocaleCode, issue: string): string {
  const [year, month] = issue.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  const short = date.toLocaleDateString(getLocale(lang).dateLocale, {
    month: 'short',
    timeZone: 'UTC',
  });
  // Latin abbreviations look right upper-cased; CJK ones must not be touched.
  return /^[A-Za-z.]+$/.test(short) ? short.slice(0, 3).toUpperCase() : short;
}

/** Localized integer, so 1,234 renders correctly per locale. */
export function formatNumberIn(lang: LocaleCode, value: number): string {
  return new Intl.NumberFormat(getLocale(lang).dateLocale).format(value);
}
