import type { ImageMetadata } from 'astro';
import { DEFAULT_LOCALE, type LocaleCode } from '../i18n/config';

// ─────────────────────────────────────────────────────────────────────────────
// EDIT ME: the club team shown on the "Meet the team" page.
//
// To update a member:
//   1. Drop a real square photo into  src/assets/team/  (e.g. ruoan-li.jpg).
//   2. Import it below and set it as that member's `avatar`.
//   3. Replace "Insert bio here" with a real bio. Add or remove members freely.
// The order here is the order they appear on the page.
// Current avatars are placeholder initials. Swap in real photos when ready.
// ─────────────────────────────────────────────────────────────────────────────

import carlMasters from '../assets/team/carl-masters.jpg';
import ruoanLi from '../assets/team/ruoan-li.jpg';
import uchidaTerence from '../assets/team/uchida-terence.jpg';
import bhushithGujjalaHari from '../assets/team/bhushith-gujjala-hari.jpg';

// A circular icon button under a member's bio. `type` picks the brand logo
// (see the ICONS map in src/components/SocialIcons.astro for supported types:
// email, github, linkedin, instagram, x, website). For email, use a
// mailto: href, e.g. "mailto:you@example.com".
export interface SocialLink {
  type: 'email' | 'github' | 'linkedin' | 'instagram' | 'x' | 'website';
  href: string;
}

/**
 * Role and bio per locale. `en` is required; any locale you leave out falls
 * back to English, which is why a language should not be listed in
 * src/i18n/config.ts until every member here has been translated.
 */
export type Localized = { en: string } & Partial<Record<LocaleCode, string>>;

export interface TeamMember {
  name: string;
  role: Localized;
  bio: Localized;
  avatar: ImageMetadata;
  links?: SocialLink[];
  /**
   * Extra bylines that belong to this person, for when an article's `authors`
   * entry isn't written exactly like `name` above (e.g. name ordering, or a
   * maiden/preferred name). Matching already ignores case and extra spaces, so
   * you only need this for genuinely different spellings.
   *
   *   name: 'Uchida Terence',
   *   authorNames: ['Terence Uchida'],
   *
   * Their popup lists every article matched by `name` or any alias here; if
   * nothing matches, the "See my articles" link is not shown at all.
   */
  authorNames?: string[];
}

/** Pick the text for a locale, falling back to English. */
export function localized(field: Localized, lang: LocaleCode = DEFAULT_LOCALE): string {
  return field[lang] ?? field[DEFAULT_LOCALE];
}

export const team: TeamMember[] = [
  {
    name: 'Carl Masters',
    role: { en: 'Club President', ja: 'クラブ会長' },
    bio: {
      en: "Hello! I'm Carl Masters, a second-year cybersecurity major at TUJ and founder of the Cyber Shield club. I'm passionate about digital security, the responsible development of AI, and hackathons and tech events across Tokyo. Feel free to connect with me via email or LinkedIn, or check out my portfolio below!",
      ja: "こんにちは、Carl Masters です。TUJ でサイバーセキュリティを専攻する2年生で、Cyber Shield クラブの創設者です。デジタルセキュリティ、責任ある AI 開発、そして東京各地のハッカソンや技術イベントに情熱を注いでいます。メールや LinkedIn でお気軽にご連絡ください。下のポートフォリオもぜひご覧ください。",
    },
    avatar: carlMasters,
    links: [
      { type: 'email', href: 'mailto:carl.masters.professional@protonmail.com' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/carl-masters-724951297/' },
      { type: 'github', href: 'https://github.com/carlmasters02' },
      { type: 'website', href: 'https://carlmasters.com' },
    ],
  },
  {
    name: 'Ruoan Li',
    role: { en: 'Vice President', ja: '副会長' },
    bio: {
      en: "I'm Ruoan, a second-year Computer Science major. I'm passionate about coding and understanding how secure systems work. Always down to chat about CS projects or collaborate on tech challenges!",
      ja: "Ruoan です。コンピューターサイエンス専攻の2年生です。コードを書くことと、安全なシステムの仕組みを理解することに情熱をもっています。CS のプロジェクトの話や、技術的な課題での協力はいつでも大歓迎です。",
    },
    avatar: ruoanLi,
    links: [
      { type: 'email', href: 'mailto:ruoanli.an@gmail.com' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/ruoan-li' },
      { type: 'github', href: 'https://github.com/RuoanLi' },
    ],
  },
  {
    name: 'Uchida Terence',
    role: { en: 'Researcher', ja: 'リサーチャー' },
    bio: {
      en: "Hi, Terence here, a third year Computer Science major at TUJ. Currently, doing an intern at a HK startup and working part-time at Brandy Melville.",
      ja: "こんにちは、Terence です。TUJ でコンピューターサイエンスを専攻する3年生です。現在は香港のスタートアップでインターンをしながら、Brandy Melville でアルバイトもしています。",
    },
    avatar: uchidaTerence,
    links: [
      { type: 'email', href: 'mailto:uchidaterence@gmail.com' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/terence-win-5b212b2b7/' },
    ],
  },
  {
    name: 'Bhushith Gujjala Hari',
    role: { en: 'Writer', ja: 'ライター' },
    bio: {
      en: "Hello, I'm a passionate computer science student who is interested in Machine Learning and Game Development. I am also the leader of the CS Society and help organize hackathons and other events. I am currently in my fourth year Computer Science major with experience from multiple solo projects, 2 research projects in Machine Learning, and two internships. Outside of work and University, I love to make pixel art and code games as a hobby.",
      ja: "こんにちは。機械学習とゲーム開発に関心をもつ、コンピューターサイエンスの学生です。CS Society の代表も務めており、ハッカソンなどのイベント運営にも携わっています。現在は4年生で、複数の個人プロジェクト、機械学習の研究プロジェクト2件、インターンシップ2回の経験があります。大学や仕事を離れたときは、ドット絵を描いたり、趣味でゲームを作ったりしています。",
    },
    avatar: bhushithGujjalaHari,
    links: [
      { type: 'linkedin', href: 'https://www.linkedin.com/in/bhushith-gujjala-hari-9a5876276' },
      { type: 'github', href: 'https://github.com/teddyboy999' },
    ],
  },
];
