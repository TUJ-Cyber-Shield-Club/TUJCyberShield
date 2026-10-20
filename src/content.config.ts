import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  // Underscore-prefixed files (like _TEMPLATE.md) are not articles.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/articles' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1, 'title is required'),
        description: z
          .string()
          .min(1, 'description is required')
          .max(160, 'description must be 160 characters or fewer (it becomes the SEO meta description and card text)'),
        pubDate: z.coerce.date({
          errorMap: () => ({ message: 'pubDate must be a date, e.g. 2026-07-01' }),
        }),
        authors: z
          .array(z.string().min(1))
          .nonempty('authors must list at least one name, e.g. authors: ["Aiko Tanaka"]'),
        tags: z.array(z.string().min(1)).default([]),
        issue: z
          .string()
          .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'issue must be in "YYYY-MM" format, e.g. "2026-07"'),
        coverImage: image().optional(),
        coverAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((data) => !data.coverImage || (data.coverAlt && data.coverAlt.length > 0), {
        message: 'coverAlt is required whenever coverImage is set (describe the image for screen readers)',
        path: ['coverAlt'],
      }),
});

export const collections = { articles };
