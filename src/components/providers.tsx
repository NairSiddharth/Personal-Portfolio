"use client";

import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AccessibilityToolbar } from "@/components/accessibility-toolbar";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      <TooltipProvider>
        <main className="flex-1 pt-24">{children}</main>
      </TooltipProvider>
      <Footer />
      <AccessibilityToolbar />
    </ThemeProvider>
  );
}
