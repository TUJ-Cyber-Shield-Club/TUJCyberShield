// ─────────────────────────────────────────────────────────────────────────────
// Locale registry — the single source of truth for what languages the site
// speaks. Adding a language is three steps:
//   1. Add an entry here.
//   2. Write src/i18n/locales/<code>.ts (copy en.ts and translate the values;
//      the Dictionary type flags any key you miss) and register it in the
//      DICTIONARIES map in src/i18n/utils.ts.
//   3. Add translated article files under src/content/articles/<code>/ and a
//      bio block in src/data/team.ts.
// Everything else — routing, the header picker, hreflang tags, the sitemap —
// picks the new language up automatically.
//
// Only locales listed here are offered in the picker, so this array is
// deliberately the set that is *actually translated*. Adding a code before its
// dictionary and article files exist would serve English content under a
// non-English URL, which is worse than not offering the language at all.
// ─────────────────────────────────────────────────────────────────────────────

export interface Locale {
  /** URL segment. Lowercase by convention: /ja/, /zh-hans/, /pt-br/. */
  code: string;
  /** BCP-47 tag for <html lang> and hreflang. Not always the same as `code`. */
  bcp47: string;
  /** Name in English, used for aria labels and the title attribute. */
  name: string;
  /** Name in its own language — what actually shows in the picker. */
  native: string;
  /** Writing direction. Every locale here is ltr; see the note at the bottom. */
  dir: 'ltr' | 'rtl';
  /** Locale passed to Intl for dates. */
  dateLocale: string;
}

export const LOCALES = [
  { code: 'en',      bcp47: 'en',      name: 'English',              native: 'English',            dir: 'ltr', dateLocale: 'en-US' },
  { code: 'ja',      bcp47: 'ja',      name: 'Japanese',             native: '日本語',              dir: 'ltr', dateLocale: 'ja-JP' },
] as const satisfies readonly Locale[];

export type LocaleCode = (typeof LOCALES)[number]['code'];

/** The language the site is authored in. Served unprefixed, at the site root. */
export const DEFAULT_LOCALE: LocaleCode = 'en';

export const LOCALE_CODES = LOCALES.map((l) => l.code) as LocaleCode[];

/** Locales other than the default — the ones that live under a /<code>/ prefix. */
export const PREFIXED_LOCALES = LOCALE_CODES.filter((c) => c !== DEFAULT_LOCALE);

export function getLocale(code: string): Locale {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function isLocaleCode(value: string | undefined): value is LocaleCode {
  return value !== undefined && LOCALE_CODES.includes(value as LocaleCode);
}

// ─────────────────────────────────────────────────────────────────────────────
// On right-to-left languages (Arabic, Hebrew, Farsi, Urdu): deliberately not
// listed yet. The stylesheets still use physical properties in places
// (padding-right, margin-left, text-align: left, absolute right offsets on the
// popup close buttons), so an RTL locale would render visibly broken. Adding
// one means first converting those to logical properties — padding-inline-end,
// margin-inline-start, inset-inline-end — which is a self-contained job, but
// it is a real job rather than a config line.
// ─────────────────────────────────────────────────────────────────────────────
