"use client";
import { usePathname } from "next/navigation";
import { Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/data/profile.json";
import { getEmail } from "@/lib/email";
import { ACCENT_GRADIENT } from "@/lib/theme";

export default function Footer() {
  const pathname = usePathname();

  // Only sections with fragment are "on-page" sections
  const sections = [
    { title: "About", href: "/" },
    { title: "Contact", href: "/", fragment: "contact", page: "/" },
    { title: "Resume", href: "/resume" },
    { title: "Experience", href: "/experience" },
    { title: "Projects", href: "/projects" },
    { title: "Offscreen", href: "/ensemble" },
  ];

  return (
    <>
      {/* Accent Gradient Border - Top of Footer */}
      <div
        className="w-full h-[1px] relative overflow-hidden"
        style={{
          backgroundImage: ACCENT_GRADIENT,
          opacity: 0.8,
        }}
      />

      <footer className="pt-8 pb-6 mt-auto w-full bg-background">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="flex flex-col items-center gap-4 lg:pr-32">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {sections.map((sec) => {
                // Handle fragment links dynamically
                if (sec.fragment && sec.page === pathname) {
                  // On-page fragment → scroll smoothly without changing URL
                  return (
                    <a
                      key={sec.title}
                      href={sec.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(sec.fragment)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-foreground transition-colors text-sm font-medium relative group"
                    >
                      {sec.title}
                      {/* Hover gradient underline */}
                      <span
                        className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                        style={{ backgroundImage: ACCENT_GRADIENT }}
                      />
                    </a>
                  );
                }

                // Normal link → navigate to the page
                return (
                  <a
                    key={sec.title}
                    href={sec.href}
                    className="hover:text-foreground transition-colors text-sm font-medium relative group"
                  >
                    {sec.title}
                    {/* Hover gradient underline */}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                      style={{ backgroundImage: ACCENT_GRADIENT }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} Siddharth Nair. All rights, preferably the cool ones, reserved.
            </div>
          </div>

          {/* Right-side buttons with fixed gradient hover effect */}
          <div className="flex flex-col items-center gap-2 mt-4 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:mt-0">
            <Button 
              asChild 
              variant="default" 
              size="sm"
              className="relative overflow-hidden group"
            >
              <a href={`mailto:${getEmail()}`} className="flex items-center gap-2">
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundImage: ACCENT_GRADIENT }}
                />
                <Mail className="w-4 h-4 relative z-10" /> 
                <span className="relative z-10">Email Me</span>
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="relative overflow-hidden group"
            >
              <a
                href={`https://www.linkedin.com/in/${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundImage: ACCENT_GRADIENT }}
                />
                <Linkedin className="w-4 h-4 relative z-10" /> 
                <span className="relative z-10">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}