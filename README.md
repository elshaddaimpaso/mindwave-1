# MINDWAVE - KUHeS Mental Health Initiative

Production-ready Next.js website for MINDWAVE, a student-led mental health initiative at Kamuzu University of Health Sciences in Malawi.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- next-themes

## Pages

The site includes Home, About Us, Mission & Vision, Programs & Services, Events, Mental Health Resources, Meet the Team, Partners & Collaboraborators, Stories / Testimonials, Blog / Articles, Contact, Join the Initiative, Donate / Sponsor, FAQ, Emergency Help Resources, and Privacy & Confidentiality Policy.

## Features

- Responsive, mobile-first UI
- Dark/light mode
- SEO metadata, Open Graph, sitemap, and robots
- Accessible navigation, forms, focus states, and reduced motion
- Newsletter, contact, anonymous help, join, sponsor, and event registration forms
- Non-diagnostic wellbeing pulse
- API-ready recommendation engine
- CMS-ready content model
- Future-ready Supabase/auth/admin architecture

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Architecture Docs

- [Architecture](./docs/ARCHITECTURE.md)
- [Brand Guide](./docs/BRAND-GUIDE.md)

## Production Integrations

Recommended next integrations:

- Supabase PostgreSQL for submissions, events, articles, and audit logs
- Clerk or Auth.js for protected admin access
- Sanity or Contentful for CMS editing
- Resend or SendGrid for notification emails
- Vercel Analytics and Speed Insights
- OpenAI API for guarded resource recommendations
