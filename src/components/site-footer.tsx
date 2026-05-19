import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerNav, mainNav, siteConfig } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-7 text-ink-soft">
            MINDWAVE is a KUHeS student-led mental health initiative advancing
            awareness, support systems, resilience, and healthy help-seeking.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-ink-soft">
            <p className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 text-primary" />
              <span>{siteConfig.contact.email}</span>
            </p>
            <p className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 text-primary" />
              <span>{siteConfig.contact.phone}</span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 text-primary" />
              <span>{siteConfig.contact.address}</span>
            </p>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-6 text-sm" aria-label="Footer navigation">
          <div>
            <h2 className="font-semibold text-foreground">Explore</h2>
            <div className="mt-4 grid gap-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-lg text-ink-soft transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Organization</h2>
            <div className="mt-4 grid gap-3">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-lg text-ink-soft transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div>
          <h2 className="font-semibold text-foreground">Stay close to the work</h2>
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            Get updates on events, student resources, stories, and partnership
            opportunities.
          </p>
          <div className="mt-5">
            <NewsletterForm compact />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {siteConfig.social.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="focus-ring rounded-lg border border-border px-3 py-2 text-ink-soft transition hover:border-primary/50 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-ink-soft">
        <p>
          © {new Date().getFullYear()} MINDWAVE - KUHeS Mental Health
          Initiative. Built for awareness, connection, and care.
        </p>
      </div>
    </footer>
  );
}
