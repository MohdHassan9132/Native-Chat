export default function LogoLockup({ size = "default" }) {
  const nameSize = size === "large" ? "text-2xl" : "text-xl";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`${nameSize} font-extrabold tracking-tight font-mono text-brand-charcoal`}
      >
        native
      </span>
      <span className="relative inline-flex items-center bg-brand-cyan text-brand-charcoal px-3 py-1 rounded-full ink-border shadow-ink-sm text-sm font-bold tracking-wide">
        Chat
        <span className="inline-block w-2 h-2 rounded-full bg-brand-coral ml-1.5 animate-pulse" />
      </span>
    </div>
  );
}
