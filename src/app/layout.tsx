import type { Metadata } from "next";
import { Libre_Baskerville, Lora, Merriweather } from "next/font/google";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "@/components/providers";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
  display: "swap",
});

const siteUrl = "https://siddharthn.com";
const title = "Siddharth Nair | Software Engineer";
const description =
  "Portfolio of Siddharth Nair, a software engineer specializing in Python, full-stack development, and data/AI systems, with experience across five internships including four at JPMorgan Chase.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Siddharth Nair",
    type: "website",
    images: [{ url: "/moi.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/moi.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Siddharth Nair",
  url: siteUrl,
  image: `${siteUrl}/moi.jpg`,
  jobTitle: "Software Engineer",
  description,
  sameAs: [
    "https://www.linkedin.com/in/siddharthnair01",
    "https://github.com/NairSiddharth",
  ],
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${libreBaskerville.variable} ${lora.variable} ${merriweather.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-body transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
