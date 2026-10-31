import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const coaches = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/coaches" }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = { faq, coaches };
