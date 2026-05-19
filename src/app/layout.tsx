import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SupportAssistant } from "@/components/support-assistant";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: siteConfig.title,
    template: "%s | MINDWAVE",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "MINDWAVE - KUHeS Mental Health Initiative" }],
  creator: "MINDWAVE",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl(),
    siteName: "MINDWAVE",
    locale: "en_MW",
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.svg"),
        width: 1200,
        height: 630,
        alt: "MINDWAVE - KUHeS Mental Health Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/og-image.svg")],
  },
  alternates: {
    canonical: absoluteUrl(),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfdfc" },
    { media: "(prefers-color-scheme: dark)", color: "#071716" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: siteConfig.name,
  alternateName: "KUHeS Mental Health Initiative",
  url: absoluteUrl(),
  description: siteConfig.description,
  areaServed: "Kamuzu University of Health Sciences, Malawi",
  sameAs: siteConfig.social.map((item) => item.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="focus-ring sr-only rounded-lg bg-surface px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <SupportAssistant />
        </ThemeProvider>
        <Script
          id="mindwave-organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
