import Link from "next/link";

const VARIANTS = {
  primary: "bg-brand-cyan hover:bg-brand-cyanDark text-brand-charcoal",
  secondary: "bg-white text-brand-charcoal",
};

/**
 * Shared tactile "ink" pill CTA. Renders a Next.js Link for internal routes
 * or a plain anchor for in-page hashes, keeping one visual component for
 * both nav/CTA use cases (see DESIGN.md — Primary CTA button).
 */
export default function PillButton({
  href,
  variant = "primary",
  className = "",
  children,
}) {
  const classes = `${VARIANTS[variant]} font-bold rounded-full ink-border shadow-ink-sm hover:shadow-ink hand-wiggle inline-flex items-center gap-2 ${className}`;

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
