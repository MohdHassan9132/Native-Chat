export default function OtpErrorBanner() {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="px-3.5 py-2.5 rounded-xl bg-brand-coralLight border-2 border-brand-coral shadow-ink-sm flex items-center gap-2"
    >
      <svg className="w-[18px] h-[18px] text-brand-coral shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5m0 3h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xs font-bold text-brand-charcoal">
        That code doesn&apos;t look right. Please try again.
      </span>
    </div>
  );
}
