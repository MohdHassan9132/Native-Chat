function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function OtpResend({ secondsLeft, onResend, onChangeNumber }) {
  const canResend = secondsLeft <= 0;

  return (
    <div className="pt-1 pb-2 flex flex-col items-center justify-center gap-1.5 text-center">
      <div className="flex items-center gap-1.5 text-xs text-neutral-600">
        <span>Didn&apos;t receive the code?</span>
        {!canResend && (
          <span className="font-bold text-brand-charcoal flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span aria-live="off">Resend in {formatTime(secondsLeft)}</span>
          </span>
        )}
      </div>

      {canResend && (
        <button
          type="button"
          onClick={onResend}
          aria-live="polite"
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-cyanDark hover:underline bg-brand-cyanLight px-3 py-1 rounded-full border border-brand-cyanDark/30"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4v5h5M20 20v-5h-5M5.5 9a7 7 0 0112.6-2M18.5 15a7 7 0 01-12.6 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Resend code now</span>
        </button>
      )}

      <button
        type="button"
        onClick={onChangeNumber}
        className="text-[11px] text-neutral-500 hover:text-brand-charcoal underline decoration-dotted mt-1"
      >
        Change phone number
      </button>
    </div>
  );
}
