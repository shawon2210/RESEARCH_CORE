import type { Metadata } from "next";
import { Funnel_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/animations/PageTransitionWrapper";
import { KeyboardNav } from "@/components/ui/KeyboardNav";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://research-core.io";

export const metadata: Metadata = {
  title: {
    default: "RESEARCH_CORE — The Future of Research",
    template: "%s | RESEARCH_CORE",
  },
  description:
    "Redefining the boundaries of computational analysis through high-fidelity, monochromatic precision. Advanced data processing, quantum arrays, and cryptographic infrastructure.",
  keywords: [
    "research",
    "data analysis",
    "quantum computing",
    "cryptographic",
    "computation",
    "RESEARCH_CORE",
  ],
  authors: [{ name: "RESEARCH_CORE" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RESEARCH_CORE",
    title: "RESEARCH_CORE — The Future of Research",
    description:
      "System-initiated. Data streams optimized. Redefining computational analysis through monochromatic precision.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RESEARCH_CORE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RESEARCH_CORE — The Future of Research",
    description:
      "System-initiated. Data streams optimized. Redefining computational analysis through monochromatic precision.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        />
      </head>
      <body className="min-h-full flex flex-col noise-overlay">
        <Navbar />
        <KeyboardNav />
        <PageTransitionWrapper>
          <main className="flex-1 pt-16">{children}</main>
        </PageTransitionWrapper>
        <Footer />
      </body>
    </html>
  );
}
