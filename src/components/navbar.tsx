"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ACCENT_GRADIENT } from "@/lib/theme";

const navLinks = [
  { label: "About", href: "/" },
  { label: "Contact", href: "/", fragment: "contact", page: "/" }, 
  { label: "Resume", href: "/resume" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Offscreen", href: "/ensemble" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const renderLink = (link: any, isMobile = false) => {
    const active = isActive(link.href);

    // Case 1: fragment + same page → scroll only
    if (link.fragment && link.page === pathname) {
      return (
        <a
          key={link.label}
          href={`#${link.fragment}`}
          className={isMobile ? "w-full" : ""}
          onClick={() => isMobile && setMobileOpen(false)}
        >
          <Button
            variant={active ? "default" : "ghost"}
            className={active ? "bg-primary text-primary-foreground" : ""}
          >
            {link.label}
          </Button>
        </a>
      );
    }

    // Case 2: fragment + different page → navigate with full href#fragment
    if (link.fragment) {
      return (
        <Link
          key={link.label}
          href={`${link.href}#${link.fragment}`}
          className={isMobile ? "w-full" : ""}
          onClick={() => isMobile && setMobileOpen(false)}
        >
          <Button
            variant={active ? "default" : "ghost"}
            className={active ? "bg-primary text-primary-foreground" : ""}
          >
            {link.label}
          </Button>
        </Link>
      );
    }

    // Case 3: normal link
    return (
      <Link
        key={link.label}
        href={link.href}
        className={isMobile ? "w-full" : ""}
        onClick={() => isMobile && setMobileOpen(false)}
      >
        <Button
          variant={active ? "default" : "ghost"}
          className={active ? "bg-primary text-primary-foreground" : ""}
        >
          {link.label}
        </Button>
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 w-full backdrop-opacity-100 bg-background/100 z-50 p-5 flex justify-between items-center">
        {/* Left: Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>

        {/* Right: Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => renderLink(link))}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Button
            variant="outline"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div
            id="mobile-nav-menu"
            className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg flex flex-col z-50"
          >
            {navLinks.map((link) => renderLink(link, true))}
          </div>
        )}
      </nav>
      
      {/* Accent Gradient Border */}
      <div
        className="fixed top-[72px] w-full h-[1px] z-50 shadow-lg"
        style={{
          backgroundImage: ACCENT_GRADIENT,
          opacity: 0.8,
        }}
      />
    </>
  );
}