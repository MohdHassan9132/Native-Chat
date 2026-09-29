const ICON_BUTTON_CLASSES =
  "w-10 h-10 rounded-full bg-white border-2 border-brand-charcoal flex items-center justify-center shadow-ink-sm active:translate-y-0.5 active:shadow-none transition-all";

export default function HomeHeader() {
  return (
    <section className="mt-4 px-5 flex items-center justify-between shrink-0">
      <h1 className="text-3xl font-extrabold text-brand-charcoal tracking-tight">Chats</h1>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Search chats" className={ICON_BUTTON_CLASSES}>
          <svg className="w-5 h-5 text-brand-charcoal" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" x2="21" y1="16.5" y2="21" />
          </svg>
        </button>
        <button type="button" aria-label="Camera" className={ICON_BUTTON_CLASSES}>
          <svg className="w-5 h-5 text-brand-charcoal" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        </button>
        <button type="button" aria-label="More options" className={ICON_BUTTON_CLASSES}>
          <svg className="w-5 h-5 text-brand-charcoal" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="5.5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="18.5" r="1.8" />
          </svg>
        </button>
      </div>
    </section>
  );
}
