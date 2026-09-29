import Link from "next/link";

const BACK_BUTTON_CLASSES =
  "w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full text-brand-charcoal hover:bg-brand-surface active:scale-95 transition-transform";

function BackArrowIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Shared sticky app header: back control + centered brand pill + a
 * screen-specific right-side slot (e.g. an avatar on Login, a help icon on
 * Initials). Extracted from Login's original TopBar so both screens share
 * one implementation instead of duplicating the chrome.
 */
export default function AppTopBar({ backHref, onBack, right }) {
  return (
    <header className="sticky top-0 z-50 bg-brand-warmCanvas/90 backdrop-blur-md border-b-2 border-brand-charcoal">
      <div className="h-14 px-4 flex items-center justify-between">
        {backHref ? (
          <Link href={backHref} aria-label="Go back" className={BACK_BUTTON_CLASSES}>
            <BackArrowIcon />
          </Link>
        ) : (
          <button type="button" aria-label="Go back" onClick={onBack} className={BACK_BUTTON_CLASSES}>
            <BackArrowIcon />
          </button>
        )}

        <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-surface rounded-full">
          <svg className="w-[18px] h-[18px] text-brand-cyanDark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
            nativeChat
          </span>
        </div>

        {right}
      </div>
    </header>
  );
}
