import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    category: z.string(), // Changed to string for flexibility with Uppercase and 'OTRAS'
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

export const collections = {
  projects: projectsCollection,
  bio: bioCollection
};
