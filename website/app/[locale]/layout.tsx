import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { notFound } from "next/navigation";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { routing } from "../../i18n/routing";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { StructuredData } from "../components/seo/StructuredData";
import { EasterEggOverlay } from "../components/ui/EasterEgg";
import GradientBackground from "../components/ui/GradientBackground";

import "../globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dalton Ponder | Full-Stack Developer & Cybersecurity Expert",
  description:
    "Professional portfolio of Dalton Ponder - Full-stack developer and cybersecurity expert crafting secure, scalable solutions.",
  keywords: [
    "Full-Stack Developer",
    "Cybersecurity",
    "React",
    "Next.js",
    "TypeScript",
    "Software Engineer",
  ],
  authors: [{ name: "Dalton Ponder" }],
  creator: "Dalton Ponder",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Dalton Ponder | Full-Stack Developer & Cybersecurity Expert",
    description:
      "Professional portfolio of Dalton Ponder - Full-stack developer and cybersecurity expert crafting secure, scalable solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Dalton Ponder Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dalton Ponder | Full-Stack Developer & Cybersecurity Expert",
    description:
      "Professional portfolio of Dalton Ponder - Full-stack developer and cybersecurity expert crafting secure, scalable solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.iconify.design" />
        <StructuredData
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dalton Ponder",
              "url": SITE_URL,
              "jobTitle": "Full-Stack Developer",
              "description": "Senior full-stack developer and cybersecurity expert crafting secure, scalable solutions.",
              "sameAs": [
                SOCIAL_LINKS.linkedin,
                SOCIAL_LINKS.github
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Dalton Ponder Portfolio",
              "url": SITE_URL
            }
          ]}
        />
      </head>
      <body
        className={`${plexMono.variable} ${plexSans.variable} ${plexSerif.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <GradientBackground />
            <EasterEggOverlay />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview" ? (
          <VercelToolbar />
        ) : null}
      </body>
    </html>
  );
}
