export default function InitialsHeader() {
  return (
    <>
      {/* Step indicator only — a page/progress readout, not a nav control.
          No second back arrow and no Skip button here (see product
          corrections: this onboarding flow has exactly 2 steps). */}
      <div className="flex justify-center py-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full ink-border shadow-ink-sm text-[11px] font-bold uppercase tracking-wider text-brand-charcoal">
          <svg className="w-3.5 h-3.5 text-brand-cyanDark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Step 2 of 2</span>
        </div>
      </div>

      <div className="relative mt-2 mb-6">
        <span
          className="absolute -top-2 right-2 text-brand-coral select-none text-[22px] font-bold animate-pulse"
          aria-hidden="true"
        >
          ✦
        </span>
        <h1 className="text-2xl font-extrabold text-brand-charcoal tracking-tight">
          Create your profile
        </h1>
        <p className="text-sm text-neutral-600 mt-1 pr-6 leading-relaxed">
          Add your name and a cheerful photo so your friends recognize you in
          the chat panels.
        </p>
      </div>
    </>
  );
}
