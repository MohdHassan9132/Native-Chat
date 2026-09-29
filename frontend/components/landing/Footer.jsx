import LogoLockup from "@/components/shared/LogoLockup";

const FOOTER_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About Us" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-brand-charcoal">
          <LogoLockup />

          <div className="flex items-center gap-8 text-sm font-bold text-neutral-700">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-cyanDark transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-neutral-500">
          <p>Built as a 5th semester project. © 2024 nativeChat Team.</p>
          <p className="flex items-center gap-1.5">
            <span>Made with real-time sockets &amp; ink linework</span>
            <span className="text-brand-coral" aria-hidden="true">
              ♥
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
