import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

import { AnimatedStat } from "@/components/animated-stat";
import { ContentCard } from "@/components/content-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import {
  events,
  heroImages,
  metrics,
  partners,
  programs,
  siteConfig,
  stories,
  values,
} from "@/lib/content";

export default function Home() {
  const featuredPrograms = programs.slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[78svh] overflow-hidden">
        <Image
          src={heroImages.students}
          alt="Students learning together in a bright campus setting"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/56 to-slate-950/18" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,23,22,0.08),rgba(7,23,22,0.42))]" />
        <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md">
              KUHeS Mental Health Initiative
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.03] text-white md:text-7xl">
              MINDWAVE
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-xl leading-8 text-white/88 md:text-2xl md:leading-10">
              A safe, student-led movement changing the conversation around
              mental health at Kamuzu University of Health Sciences.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/join-the-initiative">Join the initiative</ButtonLink>
              <ButtonLink href="/emergency-help-resources" variant="secondary">
                Get help resources
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <AnimatedStat key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Mission"
              title="Healing minds. Empowering futures."
              description={siteConfig.description}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/mission-vision">Mission & vision</ButtonLink>
              <ButtonLink href="/about-us" variant="secondary">
                About MINDWAVE
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <ContentCard
                  title={value.title}
                  description={value.description}
                  icon={value.icon}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Featured programs"
              title="Support systems designed for students before crisis."
              description="MINDWAVE blends peer care, professional guidance, media, screening, and campus activation into one trusted mental wellness identity."
            />
            <ButtonLink href="/programs-services" variant="secondary" className="md:mb-1">
              View all programs
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredPrograms.map((program, index) => (
              <Reveal key={program.slug} delay={index * 0.08}>
                <ContentCard
                  title={program.title}
                  description={program.summary}
                  icon={program.icon}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Impact"
              title="Built for credibility, student trust, and long-term adoption."
              description="Every MINDWAVE touchpoint is designed around dignity, privacy, referral awareness, and measurable campus value."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Mental health literacy campaigns",
                "Peer-support safe spaces",
                "Anonymous support pathways",
                "Professional referral awareness",
              ].map((item) => (
                <p
                  key={item}
                  className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm font-medium text-foreground shadow-sm shadow-teal-950/5"
                >
                  <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-primary" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5">
            <div className="flex items-center gap-3">
              <ShieldCheck aria-hidden="true" className="size-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Trust architecture</h2>
            </div>
            <div className="mt-6 grid gap-4">
              {[
                "Consent-first storytelling and anonymized testimonials.",
                "Clear distinction between peer support and clinical care.",
                "Escalation-aware emergency and referral pathways.",
                "CMS, database, and admin structure ready for scale.",
              ].map((item) => (
                <p key={item} className="text-sm leading-7 text-ink-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Student voice"
            title="Hopeful stories without exposing private lives."
            description="Testimonials are written as anonymized reflections to model a safe storytelling standard for the initiative."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {stories.map((story) => (
              <article
                key={story.quote}
                className="rounded-lg border border-border bg-background p-6 shadow-sm shadow-teal-950/5"
              >
                <p className="text-base leading-8 text-foreground">“{story.quote}”</p>
                <p className="mt-5 text-sm font-semibold text-primary">{story.author}</p>
                <p className="mt-1 text-sm text-ink-soft">{story.context}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Upcoming events"
            title="Moments for learning, connection, and recovery."
            description="Events are structured for student engagement, safe facilitation, and future registration workflows."
          />
          <div className="grid gap-4">
            {events.map((event) => (
              <article
                key={event.title}
                className="rounded-lg border border-border bg-surface p-5 shadow-sm shadow-teal-950/5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{event.description}</p>
                  </div>
                  <p className="inline-flex items-center gap-2 rounded-lg bg-surface-muted px-3 py-2 text-sm font-semibold text-primary">
                    <CalendarDays aria-hidden="true" className="size-4" />
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(event.date))}
                  </p>
                </div>
              </article>
            ))}
            <Link
              href="/events#register"
              className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary hover:text-primary-strong"
            >
              Register interest
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Partners"
            title="Trusted collaborators strengthen the safety net."
            description="MINDWAVE is built for university, clinical, community, sponsor, and research partnerships."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5"
              >
                <HeartHandshake aria-hidden="true" className="size-6 text-primary" />
                <h3 className="mt-5 text-xl font-semibold text-foreground">{partner.name}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{partner.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-border bg-surface p-6 shadow-sm shadow-teal-950/5 md:grid-cols-[1fr_0.9fr] md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Stay connected</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground">
              Build a campus where support is easier to find.
            </h2>
            <p className="mt-4 text-base leading-8 text-ink-soft">
              Receive updates on programs, events, resources, and partnership
              opportunities as MINDWAVE grows.
            </p>
          </div>
          <div className="self-center">
            <NewsletterForm />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/join-the-initiative">Join MINDWAVE</ButtonLink>
              <ButtonLink href="/donate-sponsor" variant="secondary">
                Sponsor the work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
