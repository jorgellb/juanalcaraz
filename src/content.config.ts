import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    year: z.number(),
    videoUrl: z.string().url(),
    order: z.number(),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false),
    description: z.string().optional()
  })
});

const bioCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/bio' }),
  schema: z.object({
    dateLabel: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number()
  })
});

const filmographyCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/filmography' }),
  schema: z.object({
    year: z.number(),
    items: z.array(z.object({
      title: z.string(),
      category: z.string(),
      roles: z.string()
    }))
  })
});

export const collections = {
  projects: projectsCollection,
  bio: bioCollection,
  filmography: filmographyCollection
};
