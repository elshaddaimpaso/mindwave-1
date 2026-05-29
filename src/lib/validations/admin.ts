import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
});

export const contentSchema = z.object({
  section: z.string().min(1),
  key: z.string().min(1),
  value: z.string(),
});

export const programSchema = z.object({
  title: z.string().min(1, 'Title required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  order_index: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name required'),
  role: z.string().optional(),
  bio: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  twitter: z.string().optional(),
  order_index: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  author_name: z.string().min(1, 'Author name required'),
  author_role: z.string().optional(),
  content: z.string().min(1, 'Content required'),
  image_url: z.string().url().optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5).default(5),
  is_active: z.boolean().default(true),
});

export const eventSchema = z.object({
  title: z.string().min(1, 'Title required'),
  description: z.string().optional(),
  location: z.string().optional(),
  event_date: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().default(true),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title required'),
  slug: z.string().min(1, 'Slug required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  cover_url: z.string().url().optional().or(z.literal('')),
  author: z.string().optional(),
  is_published: z.boolean().default(false),
});

export const seoSchema = z.object({
  page_slug: z.string().min(1),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
  og_title: z.string().optional(),
  og_description: z.string().optional(),
  og_image_url: z.string().url().optional().or(z.literal('')),
});