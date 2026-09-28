const NAME_MAX_LENGTH = 25;

export default function ProfileNameCard({ name, onNameChange, inputRef }) {
  return (
    <div className="bg-white p-4 rounded-2xl ink-border shadow-ink-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="displayNameInput"
          className="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-brand-coral inline-block" aria-hidden="true" />
          Your Name
        </label>
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-surface text-neutral-600 font-mono"
          aria-hidden="true"
        >
          {name.length}/{NAME_MAX_LENGTH}
        </span>
      </div>

      <div className="relative flex items-center rounded-xl bg-brand-surface px-3 py-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-cyanDark">
        <svg className="w-5 h-5 text-neutral-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="7" width="16" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <input
          ref={inputRef}
          id="displayNameInput"
          type="text"
          required
          maxLength={NAME_MAX_LENGTH}
          placeholder="Enter your name or nickname"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full bg-transparent text-base font-semibold text-brand-charcoal outline-none placeholder:text-neutral-400 placeholder:font-normal"
        />
        {name.length > 0 && (
          <button
            type="button"
            aria-label="Clear name"
            onClick={() => {
              onNameChange("");
              inputRef?.current?.focus();
            }}
            className="text-neutral-400 hover:text-brand-charcoal transition-colors shrink-0"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9.5l5 5m0-5l-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-neutral-500">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="11" width="14" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 11V8a4 4 0 118 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-xs">Visible to contacts and mutual group members.</p>
      </div>
    </div>
  );
}

export { NAME_MAX_LENGTH };
