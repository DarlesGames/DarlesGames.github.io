import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { readdir, readFile } from 'node:fs/promises';

function markdownDataLoader(directory: URL) {
  return async () => {
    const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).sort();

    return Promise.all(files.map(async (file) => {
      const source = await readFile(new URL(file, directory), 'utf8');
      const match = source.match(/^---\s*([\s\S]*?)\s*---/);
      if (!match) throw new Error(`Missing frontmatter in ${file}`);

      return {
        id: file.replace(/\.md$/, ''),
        ...JSON.parse(match[1]),
      };
    }));
  };
}

const localizedText = z.object({
  ru: z.string(),
  en: z.string(),
});

const projects = defineCollection({
  // A tiny local loader avoids a Windows-only Astro 7.1/Vite 8 CJS interop bug
  // in picomatch while keeping each entry as an individual Markdown file.
  loader: markdownDataLoader(new URL('./content/projects/', import.meta.url)),
  schema: z.object({
    order: z.number().int().nonnegative(),
    title: localizedText,
    category: z.enum(['html5', 'desktop', 'mechanics', 'interactive', 'cases']),
    type: localizedText,
    status: z.enum(['released', 'development', 'internal']),
    statusLabel: localizedText,
    featured: z.boolean(),
    accent: z.string(),
    cover: z.string(),
    cardUrl: z.string().url().optional(),
    short: localizedText,
    details: localizedText,
    solutions: z.object({
      ru: z.array(z.string()),
      en: z.array(z.string()),
    }),
    stack: z.array(z.string()),
    links: z.array(z.object({
      label: localizedText,
      url: z.string().url(),
    })),
  }),
});

const cv = defineCollection({
  loader: markdownDataLoader(new URL('./content/cv/', import.meta.url)),
  schema: z.object({
    locale: z.enum(['ru', 'en']),
    metaTitle: z.string(),
    metaDescription: z.string(),
    eyebrow: z.string(),
    name: z.string(),
    alias: z.string(),
    role: z.string(),
    lead: z.string(),
    portraitAlt: z.string(),
    classLabel: z.string(),
    classValue: z.string(),
    metrics: z.array(z.object({ title: z.string(), text: z.string() })),
    profile: z.object({
      title: z.string(),
      intro: z.string(),
      specializationLabel: z.string(),
      specialization: z.string(),
      studioLabel: z.string(),
      studio: z.string(),
      rolesLabel: z.string(),
      roles: z.string(),
      learningLabel: z.string(),
      learning: z.string(),
    }),
    toolsTitle: z.string(),
    tools: z.array(z.string()),
    statsTitle: z.string(),
    statsNote: z.string(),
    stats: z.array(z.object({ name: z.string(), rank: z.string(), level: z.number() })),
    skillsEyebrow: z.string(),
    skillsTitle: z.string(),
    skillsLead: z.string(),
    selectedSkill: z.string(),
    skillGroups: z.array(z.object({
      title: z.string(),
      skills: z.array(z.object({
        name: z.string(),
        glyph: z.string(),
        rank: z.string(),
        description: z.string(),
        evidence: z.string(),
      })),
    })),
    experienceEyebrow: z.string(),
    experienceTitle: z.string(),
    experience: z.array(z.object({ date: z.string(), role: z.string(), text: z.string() })),
    projectsEyebrow: z.string(),
    projectsTitle: z.string(),
    selectedProjects: z.array(z.string()),
    hobbiesEyebrow: z.string(),
    hobbiesTitle: z.string(),
    hobbies: z.array(z.object({ icon: z.string(), title: z.string() })),
    contactEyebrow: z.string(),
    contactTitle: z.string(),
    contactLead: z.string(),
    downloadPdf: z.string(),
    pdf: z.string(),
  }),
});

export const collections = { projects, cv };
