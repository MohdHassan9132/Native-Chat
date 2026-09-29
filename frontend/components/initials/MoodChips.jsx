const MOODS = ["👋 Hello", "☕ Caffeinated", "🚀 Building", "🎧 In the zone"];

export default function MoodChips({ bio, onSelectMood }) {
  return (
    <div className="flex items-center gap-2 pt-1 overflow-x-auto">
      <span className="text-xs text-neutral-500 mr-1 shrink-0">Mood:</span>
      {MOODS.map((mood) => {
        const selected = bio === mood;
        return (
          <button
            key={mood}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelectMood(mood)}
            className={`px-2.5 py-1 rounded-full text-[13px] whitespace-nowrap active:scale-95 transition-all shrink-0 ${
              selected
                ? "bg-brand-cyan text-brand-charcoal font-bold ink-border shadow-ink-active"
                : "bg-brand-surface text-brand-charcoal hover:bg-brand-cyanLight border-2 border-transparent"
            }`}
          >
            {mood}
          </button>
        );
      })}
    </div>
  );
}
