import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  metadataBase: new URL("https://daltonponder.com"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plexMono.variable} ${plexSans.variable} ${plexSerif.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
