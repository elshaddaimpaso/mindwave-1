import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  topic: z.string().min(2, "Choose a topic."),
  message: z.string().min(20, "Share a little more context."),
  consent: z.literal(true, {
    error: "Please confirm consent to submit this message.",
  }),
});

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address."),
});

export const anonymousHelpSchema = z.object({
  concern: z.string().min(10, "Share a short description."),
  urgency: z.enum(["low", "medium", "high"]),
  contactPreference: z.enum(["anonymous", "email", "phone"]),
  contact: z.string().optional(),
  safety: z.literal(true, {
    error: "Please acknowledge the emergency guidance.",
  }),
});

export const joinSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  role: z.string().min(2, "Choose an area of interest."),
  motivation: z.string().min(20, "Tell us how you want to contribute."),
  consent: z.literal(true, {
    error: "Please consent to be contacted by MINDWAVE.",
  }),
});

export const sponsorSchema = z.object({
  organization: z.string().min(2, "Enter an organization or sponsor name."),
  email: z.email("Enter a valid email address."),
  sponsorshipType: z.string().min(2, "Choose a sponsorship area."),
  message: z.string().min(20, "Share your partnership goals."),
});

export const eventRegistrationSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  eventTitle: z.string().min(2, "Choose an event."),
  accessibility: z.string().optional(),
});

export const recommendationSchema = z.object({
  mood: z.enum(["overwhelmed", "isolated", "curious", "urgent"]),
  preference: z.enum(["read", "talk", "event", "anonymous"]),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type AnonymousHelpInput = z.infer<typeof anonymousHelpSchema>;
export type JoinInput = z.infer<typeof joinSchema>;
export type SponsorInput = z.infer<typeof sponsorSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type RecommendationInput = z.infer<typeof recommendationSchema>;
