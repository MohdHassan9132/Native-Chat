import LogoLockup from "@/components/shared/LogoLockup";

export default function HeaderStrip() {
  return (
    <div className="flex items-center justify-between py-2">
      <LogoLockup />
      <button
        type="button"
        aria-label="Help and info"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-brand-charcoal ink-border shadow-ink-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.09 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
