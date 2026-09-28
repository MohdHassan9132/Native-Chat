import MoodChips from "./MoodChips";

const BIO_MAX_LENGTH = 60;

export default function ProfileBioCard({ bio, onBioChange, onSelectMood, textareaRef }) {
  return (
    <div className="bg-white p-4 rounded-2xl ink-border shadow-ink-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="statusBioInput"
          className="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-brand-cyan inline-block" aria-hidden="true" />
          Status / Bio <span className="text-xs text-neutral-500 normal-case font-normal">(optional)</span>
        </label>
        <span className="text-xs text-neutral-500" aria-hidden="true">
          Max {BIO_MAX_LENGTH}
        </span>
      </div>

      <div className="rounded-xl bg-brand-surface p-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-cyanDark">
        <textarea
          ref={textareaRef}
          id="statusBioInput"
          maxLength={BIO_MAX_LENGTH}
          rows={2}
          placeholder="Hey there! I am using nativeChat ✨"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          className="w-full bg-transparent text-sm text-brand-charcoal outline-none resize-none placeholder:text-neutral-400"
        />
      </div>

      <MoodChips bio={bio} onSelectMood={onSelectMood} />
    </div>
  );
}

export { BIO_MAX_LENGTH };
