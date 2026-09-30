"use client";

import { useIsLoggedIn } from "@/lib/auth";
import LogoLockup from "@/components/shared/LogoLockup";
import PillButton from "@/components/shared/PillButton";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About Us" },
];

export default function Navbar() {
  const loggedIn = useIsLoggedIn();
  return (
    <header className="sticky top-0 z-50 bg-brand-warmCanvas/90 backdrop-blur-md border-b-2 border-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#hero" aria-label="nativeChat home">
          <LogoLockup />
        </a>

        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-charcoal hover:text-brand-cyanDark transition-colors relative py-1 border-b-2 border-transparent hover:border-brand-charcoal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Log In only — no Sign Up button, per design reference */}
        <div className="flex items-center gap-3">
          <PillButton href={loggedIn ? "/home" : "/login"} variant="secondary" className="text-sm px-6 py-2.5">
            <span>Log In</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </PillButton>
        </div>
      </div>
    </header>
  );
}
