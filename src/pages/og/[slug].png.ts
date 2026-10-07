// Social-share image for each article: its generated cover (src/utils/covers.ts)
// rasterized to a 1200×630 PNG at build time, with the club shield stamped in
// the corner. Articles with their own `coverImage` share that instead (see
// the ogImage logic in src/pages/[...lang]/articles/[slug].astro), but every
// article gets one of these so the URL is always valid.
import type { APIRoute } from 'astro';
import path from 'node:path';
import sharp from 'sharp';
import { LOCALE_CODES } from '../../i18n/config';
import { articleSlug, getPublishedArticles, type Article } from '../../utils/articles';
import { COVER_HEIGHT, COVER_WIDTH, coverSvg } from '../../utils/covers';

export async function getStaticPaths() {
  // Translations share their English slug, so one image serves every locale.
  const bySlug = new Map<string, Article>();
  for (const code of LOCALE_CODES) {
    for (const article of await getPublishedArticles(code)) {
      const slug = articleSlug(article);
      if (!bySlug.has(slug)) bySlug.set(slug, article);
    }
  }
  return [...bySlug].map(([slug, article]) => ({ params: { slug }, props: { article } }));
}

export const GET: APIRoute = async ({ params, props }) => {
  const { article } = props as { article: Article };
  const svg = coverSvg({
    slug: params.slug!,
    issue: article.data.issue,
    tags: article.data.tags,
    withText: false,
  });

  const shield = await sharp(path.join(process.cwd(), 'src/assets/logo-shield.png'))
    .resize(132, 132)
    .toBuffer();

  const png = await sharp(Buffer.from(svg))
    .resize(COVER_WIDTH, COVER_HEIGHT)
    .composite([{ input: shield, left: 64, top: 64 }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
