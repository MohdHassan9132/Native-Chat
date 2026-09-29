export default function FloatingComposeButton() {
  return (
    // No compose/create-chat flow exists yet — UI-only per scope.
    <button
      type="button"
      aria-label="Create new conversation"
      className="absolute bottom-24 right-5 w-14 h-14 rounded-full bg-brand-coral ink-border shadow-ink flex items-center justify-center z-20 active:scale-95 transition-transform"
    >
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="3.2" viewBox="0 0 24 24" aria-hidden="true">
        <line x1="12" x2="12" y1="5" y2="19" />
        <line x1="5" x2="19" y1="12" y2="12" />
      </svg>
    </button>
  );
}
