import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Astro v5 Content Collections — glob loader.
// Dateinamen ohne .md-Endung werden die Slugs (= article.id).

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    publication: z.enum(["LVZ", "BILD"]),
    section: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    lead: z.string(),
    kicker: z.string().optional(),
    hero_image: z.string().optional(),
    hero_caption: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const chronik = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/chronik" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    description: z.string(),
    related_article: z.string().optional(),
  }),
});

export const collections = { articles, chronik };
