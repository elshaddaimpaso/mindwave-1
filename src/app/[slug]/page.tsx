import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

import { ContentCard } from "@/components/content-card";
import { AnonymousHelpForm } from "@/components/forms/anonymous-help-form";
import { ContactForm } from "@/components/forms/contact-form";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";
import { JoinForm } from "@/components/forms/join-form";
import { SponsorForm } from "@/components/forms/sponsor-form";
import { PageHero } from "@/components/page-hero";
import { ResourceRecommender } from "@/components/resource-recommender";
import { SectionHeading } from "@/components/section-heading";
import { SelfAssessment } from "@/components/self-assessment";
import { ButtonLink } from "@/components/ui/button-link";
import {
  adminModules,
  articles,
  emergencyContacts,
  events,
  faqs,
  objectiveFeatures,
  pages,
  partners,
  programs,
  requiredPageSlugs,
  resources,
  siteConfig,
  stories,
  teamRoles,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return requiredPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.summary,
    alternates: {
      canonical: absoluteUrl(`/${slug}`),
    },
    openGraph: {
      title: `${page.title} | MINDWAVE`,
      description: page.summary,
      url: absoluteUrl(`/${slug}`),
      type: "website",
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        summary={page.summary}
        image={page.heroImage}
      />
      <PageBody slug={slug} />
    </>
  );
}

function PageBody({ slug }: { slug: string }) {
  switch (slug) {
    case "about-us":
    case "mission-vision":
      return <OverviewPage slug={slug} />;
    case "programs-services":
      return <ProgramsPage />;
    case "events":
      return <EventsPage />;
    case "mental-health-resources":
      return <ResourcesPage />;
    case "meet-the-team":
      return <TeamPage />;
    case "partners-collaborators":
      return <PartnersPage />;
    case "stories-testimonials":
      return <StoriesPage />;
    case "blog-articles":
      return <BlogPage />;
    case "contact":
      return <ContactPage />;
    case "join-the-initiative":
      return <JoinPage />;
    case "donate-sponsor":
      return <SponsorPage />;
    case "faq":
      return <FaqPage />;
    case "emergency-help-resources":
      return <EmergencyPage />;
    case "privacy-confidentiality-policy":
      return <PolicyPage />;
    default:
      return null;
  }
}

function OverviewPage({ slug }: { slug: string }) {
  const page = pages[slug];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {page.features ? (
          <div className="grid gap-5 md:grid-cols-3">
            {page.features.map((feature) => (
              <ContentCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        ) : null}
        {page.sections ? (
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
              >
                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-ink-soft">{section.body}</p>
                {section.items ? (
                  <ul className="mt-5 grid gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-foreground">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
        {page.cta ? (
          <div className="mt-10">
            <ButtonLink href={page.cta.href}>{page.cta.label}</ButtonLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProgramsPage() {
  return (
    <>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Objectives"
            title="A complete mental wellness layer for campus life."
            description="Programs are designed as connected pathways: awareness, early support, screening, referral, storytelling, and long-term institutional learning."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {objectiveFeatures.map((item) => (
              <ContentCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="Programs students can recognize, trust, and use."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.slug}
                className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
              >
                <program.icon aria-hidden="true" className="size-6 text-primary" />
                <h2 className="mt-5 text-xl font-semibold text-foreground">{program.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{program.summary}</p>
                <ul className="mt-5 grid gap-2">
                  {program.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2 text-sm text-foreground">
                      <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-primary" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EventsPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <SectionHeading
            eyebrow="Calendar"
            title="Designed for participation, not performance."
            description="Each event can later connect to Supabase registration, capacity controls, attendance reporting, and automated reminders."
          />
          <div className="mt-10 grid gap-5">
            {events.map((event) => (
              <article
                key={event.title}
                className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
              >
                <p className="inline-flex items-center gap-2 rounded-lg bg-surface-muted px-3 py-2 text-sm font-semibold text-primary">
                  <CalendarDays aria-hidden="true" className="size-4" />
                  {event.format} · {event.location}
                </p>
                <h2 className="mt-5 text-2xl font-semibold text-foreground">{event.title}</h2>
                <p className="mt-2 text-sm font-semibold text-ink-soft">{event.date}</p>
                <p className="mt-4 text-base leading-8 text-ink-soft">{event.description}</p>
              </article>
            ))}
          </div>
        </div>
        <EventRegistrationForm />
      </div>
    </section>
  );
}

function ResourcesPage() {
  return (
    <>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Library"
            title="Resource pathways for different moments."
            description="The resources below are content-ready and can later be managed through Sanity or Contentful."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="focus-ring rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:border-primary/40"
              >
                <p className="text-sm font-semibold text-primary">{resource.category}</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">{resource.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{resource.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <SelfAssessment />
          <ResourceRecommender />
        </div>
      </section>
    </>
  );
}

function TeamPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Roles"
          title="A practical team model for a growing initiative."
          description="Profiles are structured as role slots so MINDWAVE can add real names, photos, permissions, and bios when governance is ready."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {teamRoles.map((member) => (
            <article
              key={member.name}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
            >
              <div className="grid aspect-square place-items-center rounded-lg bg-surface-muted text-5xl font-semibold text-primary">
                {member.name.charAt(0)}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-foreground">{member.name}</h2>
              <p className="mt-2 text-sm font-semibold text-primary">{member.role}</p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{member.focus}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Collaboration"
          title="Partnerships make the initiative safer, stronger, and more sustainable."
          description="MINDWAVE can support sponsorship packages, professional referral agreements, research collaborations, and campus-wide campaigns."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {partners.map((partner) => (
            <article
              key={partner.name}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
            >
              <h2 className="text-xl font-semibold text-foreground">{partner.name}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{partner.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoriesPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Stories are powerful when they are protected."
          description="This page models anonymized, consent-first storytelling suitable for students, funders, and university stakeholders."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.quote}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
            >
              <p className="text-base leading-8 text-foreground">“{story.quote}”</p>
              <p className="mt-5 text-sm font-semibold text-primary">{story.author}</p>
              <p className="mt-1 text-sm text-ink-soft">{story.context}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Articles"
          title="Clear mental health education for busy students."
          description="The blog structure is CMS-ready and can map directly to Sanity or Contentful content types."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
            >
              <p className="text-sm font-semibold text-primary">{article.category}</p>
              <h2 className="mt-3 text-xl font-semibold leading-snug text-foreground">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{article.excerpt}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink-soft">
                <Clock aria-hidden="true" className="size-4 text-primary" />
                {article.minutes} min read · {article.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="For partnership, support, media, and university conversations."
            description="MINDWAVE can receive general inquiries and anonymous non-emergency support requests through separate channels."
          />
          <div className="mt-8 rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5">
            <h2 className="text-xl font-semibold text-foreground">Direct details</h2>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-ink-soft">
              <p>{siteConfig.contact.email}</p>
              <p>{siteConfig.contact.phone}</p>
              <p>{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-8">
          <ContactForm />
          <AnonymousHelpForm />
        </div>
      </div>
    </section>
  );
}

function JoinPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Join"
            title="A movement this important needs many kinds of care."
            description="Students can help with peer spaces, campaigns, events, storytelling, research, administration, and digital content."
          />
          <div className="mt-8 grid gap-4">
            {["Volunteer training", "Peer support ethics", "Event facilitation", "Content review"].map((item) => (
              <p key={item} className="flex gap-3 rounded-lg bg-surface p-4 text-sm font-medium text-foreground">
                <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-primary" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <JoinForm />
      </div>
    </section>
  );
}

function SponsorPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Sponsor"
            title="Invest in mental wellness infrastructure students can trust."
            description="Funding can support screening days, peer-support training, media production, safe-space events, platform infrastructure, research, and operational continuity."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {adminModules.slice(0, 4).map((module) => (
              <ContentCard
                key={module.title}
                title={module.title}
                description={module.description}
                icon={module.icon}
              />
            ))}
          </div>
        </div>
        <SponsorForm />
      </div>
    </section>
  );
}

function FaqPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
            >
              <summary className="cursor-pointer text-lg font-semibold text-foreground">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmergencyPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-100">
          <div className="flex gap-3">
            <ShieldAlert aria-hidden="true" className="mt-1 size-6 shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold">If there is immediate danger</h2>
              <p className="mt-3 text-base leading-8">
                Contact emergency services, go to the nearest health facility, or
                alert a trusted person who can stay with you. Do not wait for a
                website form response.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {emergencyContacts.map((contact) => (
            <article
              key={contact.label}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
            >
              <p className="text-sm font-semibold text-primary">{contact.label}</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{contact.value}</p>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{contact.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-border bg-surface p-6 text-sm leading-7 text-ink-soft">
          <p>
            Source guidance checked on May 19, 2026: GOV.UK travel advice lists
            Malawi emergency numbers 997/990 for police, 998 for ambulance, and
            999 for fire; the U.S. State Department lists police 997, ambulance
            998, and fire 999. Local campus protocols should be verified before
            publishing final printed materials.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="https://www.gov.uk/foreign-travel-advice/malawi/getting-help"
              className="focus-ring inline-flex items-center gap-2 rounded-lg text-primary"
            >
              GOV.UK source <ExternalLink aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Malawi.html"
              className="focus-ring inline-flex items-center gap-2 rounded-lg text-primary"
            >
              U.S. State Dept. source <ExternalLink aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyPage() {
  const page = pages["privacy-confidentiality-policy"];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6">
          {page.sections?.map((section) => (
            <article
              key={section.title}
              className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
            >
              <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">{section.body}</p>
              {section.items ? (
                <ul className="mt-5 grid gap-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-foreground">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/contact"
            className="focus-ring inline-flex items-center gap-2 rounded-lg font-semibold text-primary"
          >
            Ask a privacy question
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
