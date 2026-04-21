import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Existing: Blog ─────────────────────────────────────────────────────────
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().default(() => new Date()),
    description: z.string().default(''),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

// ─── Publications (full list) ───────────────────────────────────────────────
const publications = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    journal: z.string(),
    year: z.number(),
    doi: z.string().optional(),
    note: z.string().optional(),
    desc: z.string().optional(),
    isBook: z.boolean().default(false),
    trackId: z
      .enum(['sofalizing', 'sharenting', 'phubbing', 'social-media-addiction'])
      .optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    ref: z.string().optional(),
    detail: z.string().optional(),
    cvSection: z.enum(['none', 'digital', 'edtech', 'book']).default('none'),
  }),
});

// ─── Research Tracks ────────────────────────────────────────────────────────
const researchTracks = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/research-tracks' }),
  schema: z.object({
    title: z.string(),
    definition: z.string(),
    img: z.string(),
    pubLink: z.string().optional(),
    desc: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ─── CV: Education ──────────────────────────────────────────────────────────
const education = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/education' }),
  schema: z.object({
    degree: z.string(),
    institution: z.string().optional(),
    department: z.string().optional(),
    period: z.string().optional(),
    thesis: z.string().optional(),
    logo: z.string().optional(),
    initials: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ─── CV: Appointments ───────────────────────────────────────────────────────
const appointments = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/appointments' }),
  schema: z.object({
    role: z.string(),
    institution: z.string().optional(),
    period: z.string().optional(),
    current: z.boolean().default(false),
    logo: z.string().optional(),
    initials: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ─── CV: Admin Roles ────────────────────────────────────────────────────────
const adminRoles = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/admin-roles' }),
  schema: z.object({
    role: z.string(),
    institution: z.string().optional(),
    period: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ─── CV: Awards ─────────────────────────────────────────────────────────────
const awards = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/awards' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string().optional(),
    year: z.string().optional(),
    type: z.enum(['university', 'tubitak', 'fellowship']),
    desc: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ─── CV: Teaching ───────────────────────────────────────────────────────────
const teaching = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/teaching' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['designed', 'taught']),
    level: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ─── Contact: Academic Profiles ─────────────────────────────────────────────
const academicProfiles = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/academic-profiles' }),
  schema: z.object({
    label: z.string(),
    href: z.string(),
    desc: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ─── Navigation Links ───────────────────────────────────────────────────────
const navLinks = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/nav-links' }),
  schema: z.object({
    label: z.string(),
    href: z.string(),
    order: z.number().default(0),
  }),
});

// ─── Site Settings (singleton — stored as one JSON file read by Keystatic) ──
const siteSettings = defineCollection({
  loader: async () => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const url = await import('node:url');
    const base = path.resolve('src/content/site-settings/settings.json');
    try {
      const raw = await fs.readFile(base, 'utf-8');
      const data = JSON.parse(raw);
      return [{ id: 'settings', ...data }];
    } catch {
      return [];
    }
  },
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    heroImage: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    officeLocation: z.string().optional(),
    institution: z.string().optional(),
    footerText: z.string().optional(),
    footerTagline: z.string().optional(),
    heroGreeting: z.string().optional(),
    heroSubtitle: z.string().optional(),
    welcomeMessage: z.string().optional(),
    cvHeroImage: z.string().optional(),
    contactHeroImage: z.string().optional(),
    publicationsHeroImage: z.string().optional(),
    hIndex: z.string().optional(),
    citations: z.string().optional(),
    publicationCount: z.string().optional(),
  }),
});

// ─── Contact form submissions (written by /api/contact) ─────────────────────
const submissions = defineCollection({
  loader: glob({ pattern: '**/*.{md,yaml}', base: './src/content/submissions' }),
  schema: z.object({
    name: z.string(),
    email: z.string(),
    subject: z.string().optional(),
    message: z.string(),
    receivedAt: z.coerce.date(),
  }),
});

export const collections = {
  blog,
  publications,
  researchTracks,
  education,
  appointments,
  adminRoles,
  awards,
  teaching,
  academicProfiles,
  navLinks,
  siteSettings,
  submissions,
};
