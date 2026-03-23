import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'data',
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
  type: 'data',
  schema: z.object({
    dateLabel: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number()
  })
});

const filmographyCollection = defineCollection({
  type: 'data',
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
