import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: z.string(),            // base image name in src/assets/images
    coverAlt: z.string(),
    readingMinutes: z.number().default(4),
  }),
});

export const collections = { blog };
