import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada charla es un archivo Markdown en src/content/talks/
// Los archivos que empiezan por "_" se ignoran (útil para plantillas).
const talks = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    speaker: z.string(),
    speakerLinkedIn: z.string().url().optional(),
    city: z.string(),
    date: z.coerce.date(),
    youtubeId: z.string(),          // el ID del vídeo, p.ej. 'dQw4w9WgXcQ'
    duration: z.string().default('8–10 min'),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['es', 'en']).default('es'),
  }),
});

export const collections = { talks };
