"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { useState } from "react";

const links = [
  { href: "/", label: "ARCHIVE" },
  { href: "/dashboard", label: "STREAMS" },
  { href: "/terminal", label: "TERMINAL" },
  { href: "/protocols", label: "PROTOCOLS" },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.95)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)]"
      style={{ backgroundColor: navBg }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          opacity: borderOpacity,
          background:
            "linear-gradient(90deg, transparent, rgba(218,132,10,0.5), transparent)",
        }}
      />

      <Link href="/" className="flex items-center gap-2 group">
        <Logo size={28} />
        <span className="heading-md text-brand-gold leading-none group-hover:opacity-80 transition-opacity">
          RESEARCH_CORE
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex items-center h-12 px-3 body-mono transition-colors duration-150",
              pathname === link.href
                ? "text-brand-gold border-b border-brand-gold opacity-100"
                : "text-text-on-dark opacity-70 hover:opacity-100 hover:text-brand-gold"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-on-dark opacity-60 hover:opacity-100 hover:text-brand-gold transition-all duration-200"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-on-dark opacity-60 hover:opacity-100 hover:text-brand-gold transition-all duration-200"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <div className="w-px h-5 bg-white/20 mx-1" />
          <Button variant="primary" size="sm">
            AUTHENTICATE
          </Button>
        </div>
        <button
          className="md:hidden text-text-on-dark material-symbols-outlined"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? "close" : "menu"}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bg-surface-dark border-b border-white/15 p-6 flex flex-col gap-4 md:hidden z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "body-mono text-[14px]",
                pathname === link.href
                  ? "text-brand-gold"
                  : "text-text-on-dark opacity-70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-on-dark opacity-60 hover:text-brand-gold transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-on-dark opacity-60 hover:text-brand-gold transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <div className="ml-auto">
              <Button variant="primary" size="sm">
                AUTHENTICATE
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
