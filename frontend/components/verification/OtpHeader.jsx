export default function OtpHeader({ onClose, closeButtonRef, titleId }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-cyanLight ink-border shadow-ink-sm flex items-center justify-center relative shrink-0">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 36 36" aria-hidden="true">
            <circle cx="11" cy="20" fill="#FFB3B0" r="7" stroke="#222222" strokeWidth="1.8" />
            <path d="M8 15 C8 12, 14 12, 14 15" stroke="#222222" strokeLinecap="round" strokeWidth="1.8" />
            <circle cx="10" cy="20" fill="#222222" r="1" />
            <path d="M12 23 C11.5 24, 9.5 24, 9 23" stroke="#222222" strokeLinecap="round" strokeWidth="1.2" />
            <circle cx="25" cy="20" fill="#7AF5F5" r="7" stroke="#222222" strokeWidth="1.8" />
            <path d="M22 14 C23 11, 28 12, 28 15" stroke="#222222" strokeLinecap="round" strokeWidth="1.8" />
            <circle cx="24" cy="20" fill="#222222" r="1" />
            <path d="M22 23 C22.5 24, 24.5 24, 25 23" stroke="#222222" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M15 11 C15 8.5 21 8.5 21 11 C21 13 18 14 17 16" stroke="#222222" strokeLinecap="round" strokeWidth="1.5" />
            <circle cx="18" cy="10" fill="#FF6B6B" r="1.2" />
            <circle cx="21" cy="9" fill="#38A9A9" r="1" />
          </svg>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-brand-cyan ink-border" aria-hidden="true" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-coralLight text-brand-charcoal text-[10px] uppercase font-bold tracking-wider mb-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 12l2 2 4-4m5-4v9a9 9 0 11-18 0V6l9-3 9 3z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>SMS Verification</span>
          </div>
          <h2 id={titleId} className="text-[22px] leading-tight font-extrabold text-brand-charcoal">
            Verify your number
          </h2>
        </div>
      </div>

      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-white ink-border shadow-ink-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-brand-charcoal transition-all"
      >
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
