import Link from "next/link";

const VARIANTS = {
  primary: "bg-brand-cyan hover:bg-brand-cyanDark text-brand-charcoal",
  secondary: "bg-white text-brand-charcoal",
};

const DISABLED_CLASSES =
  "bg-brand-surface text-neutral-400 border-2 border-neutral-300 shadow-none pointer-events-none";

/**
 * Shared tactile "ink" pill CTA. Renders a Next.js Link/anchor when `href`
 * is given (nav/CTA use case), or a real <button> when it's omitted (form
 * actions, e.g. Login's Continue). One visual component for both, per
 * DESIGN.md — Primary CTA button / Disabled State.
 */
export default function PillButton({
  href,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  children,
}) {
  const base = "font-bold rounded-full inline-flex items-center gap-2 transition-all";
  const interactive = disabled
    ? DISABLED_CLASSES
    : `${VARIANTS[variant]} ink-border shadow-ink-sm hover:shadow-ink hand-wiggle`;
  const classes = `${base} ${interactive} ${className}`;

  if (href) {
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

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
