import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "@/components/providers";

const siteUrl = "https://siddharthnair.pages.dev";
const title = "Siddharth Nair — Software Engineer";
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

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-body transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
