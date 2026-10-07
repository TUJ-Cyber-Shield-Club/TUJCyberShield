// ─────────────────────────────────────────────────────────────────────────────
// Generated article covers.
//
// Every article without its own `coverImage` gets a cover drawn here at build
// time: a teal line glyph for its topic, a halftone field radiating from it
// (seeded by the slug, so no two articles match), registration corners, and
// the issue number set large in hollow type. Pure string output, no assets,
// no runtime JS.
//
// The same function feeds two places, so they can never drift apart:
//   · ArticleCover.astro inlines it on cards and article pages;
//   · src/pages/og/[slug].png.ts rasterizes it as the social-share image.
//
// To give a new tag its own glyph, add a path below and list the tag in
// GLYPH_FOR_TAG. Unlisted tags fall back to the club shield.
// ─────────────────────────────────────────────────────────────────────────────

export const COVER_WIDTH = 1200;
export const COVER_HEIGHT = 630;

/** Fixed palette: covers read as the same "ink plate" in both site themes. */
const INK = '#0b1721';
const INK_2 = '#10283a';
const TEAL = '#4cc8c4';

type GlyphName =
  | 'qr'
  | 'key'
  | 'padlock'
  | 'hook'
  | 'envelope'
  | 'phone'
  | 'wifi'
  | 'eye'
  | 'warning'
  | 'person'
  | 'shield';

/** Most specific first: an article tagged "phishing" and "email" gets the hook. */
const GLYPH_FOR_TAG: [tag: string, glyph: GlyphName][] = [
  ['qr-codes', 'qr'],
  ['passkeys', 'key'],
  ['passwords', 'padlock'],
  ['phishing', 'hook'],
  ['email', 'envelope'],
  ['phones', 'phone'],
  ['wifi', 'wifi'],
  ['privacy', 'eye'],
  ['scams', 'warning'],
  ['accounts', 'person'],
];

export function glyphFor(tags: string[]): GlyphName {
  for (const [tag, glyph] of GLYPH_FOR_TAG) if (tags.includes(tag)) return glyph;
  return 'shield';
}

const escapeXml = (text: string) =>
  text.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

// ── deterministic randomness ────────────────────────────────────────────────

/** FNV-1a: a stable 32-bit hash of the slug. */
function hash(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32: a tiny seeded PRNG returning floats in [0, 1). */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── glyphs: drawn in a 240×240 box centred on the origin ───────────────────

function qrGlyph(rand: () => number): string {
  const cell = 24;
  const n = 9; // 9×9 modules, 216px square
  const o = -(n * cell) / 2;
  const finder = (cx: number, cy: number) =>
    `<rect x="${o + cx * cell + 4}" y="${o + cy * cell + 4}" width="${3 * cell - 8}" height="${3 * cell - 8}" rx="6"/>` +
    `<rect x="${o + cx * cell + 22}" y="${o + cy * cell + 22}" width="${3 * cell - 44}" height="${3 * cell - 44}" rx="3" fill="${TEAL}" stroke="none"/>`;
  const inFinder = (x: number, y: number) =>
    (x < 3 && y < 3) || (x >= n - 3 && y < 3) || (x < 3 && y >= n - 3);
  let modules = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y) || rand() > 0.48) continue;
      modules += `<rect x="${o + x * cell + 5}" y="${o + y * cell + 5}" width="${cell - 10}" height="${cell - 10}" rx="2"/>`;
    }
  }
  return `${finder(0, 0)}${finder(n - 3, 0)}${finder(0, n - 3)}<g fill="${TEAL}" stroke="none">${modules}</g>`;
}

const GLYPHS: Record<Exclude<GlyphName, 'qr'>, string> = {
  key:
    '<circle cx="-58" cy="0" r="44"/><circle cx="-58" cy="0" r="14"/>' +
    '<path d="M-14 0H100M70 0v30M92 0v20"/>',
  padlock:
    '<rect x="-74" y="-12" width="148" height="112" rx="16"/>' +
    '<path d="M-46 -12V-48a46 46 0 0 1 92 0V-12"/>' +
    '<circle cx="0" cy="34" r="13"/><path d="M0 47V72"/>',
  hook:
    '<circle cx="0" cy="-104" r="10"/>' +
    '<path d="M0 -94V38a46 46 0 1 1 -92 0V18"/><path d="M-92 18l-18 22M-92 18l18 22"/>',
  envelope:
    '<rect x="-104" y="-70" width="208" height="140" rx="12"/>' +
    '<path d="M-104 -70L0 12L104 -70M-104 70L-30 -6M104 70L30 -6"/>',
  phone:
    '<rect x="-60" y="-108" width="120" height="216" rx="20"/>' +
    '<path d="M-16 -86H16"/><circle cx="0" cy="84" r="8"/>',
  wifi:
    '<path d="M-110 -30a156 156 0 0 1 220 0M-74 6a104 104 0 0 1 148 0M-38 42a52 52 0 0 1 76 0"/>' +
    `<circle cx="0" cy="80" r="11" fill="${TEAL}" stroke="none"/>`,
  eye:
    '<path d="M-116 0Q0 -96 116 0Q0 96 -116 0Z"/><circle cx="0" cy="0" r="36"/>' +
    `<circle cx="0" cy="0" r="13" fill="${TEAL}" stroke="none"/>`,
  warning:
    '<path d="M0 -104L110 88H-110Z"/><path d="M0 -26V30"/>' +
    `<circle cx="0" cy="58" r="8" fill="${TEAL}" stroke="none"/>`,
  person: '<circle cx="0" cy="-44" r="44"/><path d="M-86 100a86 86 0 0 1 172 0"/>',
  shield:
    '<path d="M0 -116L96 -76V8C96 66 54 100 0 120C-54 100 -96 66 -96 8V-76Z"/>' +
    '<path d="M0 -84L66 -56V6C66 48 38 74 0 88"/>',
};

// ── composition ─────────────────────────────────────────────────────────────

export interface CoverInput {
  slug: string;
  /** "YYYY-MM" */
  issue: string;
  tags: string[];
  /**
   * Already-localized issue tag drawn above the date, e.g. "ISSUE 1" or
   * "第1号". Omitted, the tag isn't drawn.
   */
  issueTag?: string;
  /**
   * Draw the lettering. Off for the rasterized share image: the build
   * machine's SVG renderer has none of the site's webfonts, and the share
   * card shows the title beside the image anyway.
   */
  withText?: boolean;
}

export function coverSvg({ slug, issue, tags, issueTag, withText = true }: CoverInput): string {
  const rand = rng(hash(slug));
  const glyphName = glyphFor(tags);
  const [year, month] = issue.split('-');

  // The glyph sits right of centre; nudge it per article so the set of
  // covers on a page doesn't look stamped from one template.
  const gx = Math.round(820 + rand() * 120);
  const gy = Math.round(300 + rand() * 40);
  const tilt = Math.round((rand() - 0.5) * 12);

  // Halftone field: dots on a lattice, biggest near the glyph, fading out
  // with distance, jittered by the seeded noise.
  const step = 30;
  let dots = '';
  for (let y = step / 2; y < COVER_HEIGHT; y += step) {
    for (let x = step / 2; x < COVER_WIDTH; x += step) {
      const d = Math.hypot(x - gx, (y - gy) * 1.25);
      const falloff = 1 - d / 560;
      if (falloff <= 0) continue;
      const r = 7.5 * falloff * (0.45 + 0.55 * rand());
      if (r < 0.9) continue;
      dots += `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}"/>`;
    }
  }

  const glyph = glyphName === 'qr' ? qrGlyph(rand) : GLYPHS[glyphName];

  // Four L-shaped registration corners, as on the site's .corner-frame.
  const t = 34;
  const m = 26;
  const corners =
    `M${m} ${m + t}V${m}H${m + t}` +
    `M${COVER_WIDTH - m - t} ${m}H${COVER_WIDTH - m}V${m + t}` +
    `M${m} ${COVER_HEIGHT - m - t}V${COVER_HEIGHT - m}H${m + t}` +
    `M${COVER_WIDTH - m - t} ${COVER_HEIGHT - m}H${COVER_WIDTH - m}V${COVER_HEIGHT - m - t}`;

  // Bottom left: the issue tag in an outlined chip, and under it the issue
  // date as "MM/YY" in big hollow type.
  const tagSize = 40;
  const tagTracking = 6;
  // Width estimate for the chip: mono Latin runs ~0.6em, CJK a full em.
  const tagWidth = issueTag
    ? [...issueTag].reduce((w, ch) => w + (ch.charCodeAt(0) > 0x2e80 ? tagSize : tagSize * 0.6) + tagTracking, 0)
    : 0;
  const chip = issueTag
    ? `<rect x="56" y="292" width="${Math.round(tagWidth + 44)}" height="70" rx="8" fill="${INK}" fill-opacity="0.6" stroke="${TEAL}" stroke-opacity="0.8" stroke-width="2.5"/>` +
      `<text x="78" y="341" fill="${TEAL}" font-size="${tagSize}" letter-spacing="${tagTracking}" style="font-family: var(--font-mono, monospace); font-weight: 600">${escapeXml(issueTag)}</text>`
    : '';
  const text = withText
    ? chip +
      `<text x="48" y="566" fill="none" stroke="${TEAL}" stroke-opacity="0.6" stroke-width="2.5" font-size="190" letter-spacing="-3" style="font-family: var(--font-display, sans-serif); font-weight: 850">${month}/${year.slice(2)}</text>`
    : '';

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${COVER_WIDTH} ${COVER_HEIGHT}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">` +
    `<defs><linearGradient id="cv-bg-${hash(slug).toString(36)}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${INK}"/><stop offset="1" stop-color="${INK_2}"/></linearGradient></defs>` +
    `<rect width="${COVER_WIDTH}" height="${COVER_HEIGHT}" fill="url(#cv-bg-${hash(slug).toString(36)})"/>` +
    `<g fill="${TEAL}" fill-opacity="0.32">${dots}</g>` +
    `<circle cx="${gx}" cy="${gy}" r="196" fill="none" stroke="${TEAL}" stroke-opacity="0.28" stroke-width="2" stroke-dasharray="3 9"/>` +
    `<path d="M${gx - 240} ${gy}h28M${gx + 212} ${gy}h28M${gx} ${gy - 240}v28M${gx} ${gy + 212}v28" stroke="${TEAL}" stroke-opacity="0.45" stroke-width="2"/>` +
    `<g transform="translate(${gx} ${gy}) rotate(${tilt}) scale(1.12)" fill="none" stroke="${TEAL}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>` +
    `<path d="${corners}" fill="none" stroke="${TEAL}" stroke-opacity="0.7" stroke-width="3"/>` +
    text +
    `</svg>`
  );
}
