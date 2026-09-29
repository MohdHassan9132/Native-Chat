import { SelfAvatarIcon } from "./avatars";

const RING_CLASSES = {
  coral: "border-brand-coral",
  cyan: "border-brand-cyan",
  ink: "border-brand-charcoal",
};

const BADGE_CLASSES = {
  coral: "bg-brand-coral text-white",
  cyan: "bg-brand-cyan text-brand-charcoal",
};

export default function StoryItem({ story }) {
  if (story.self) {
    return (
      <button type="button" className="flex flex-col items-center shrink-0 group">
        <div className="relative w-[58px] h-[58px] rounded-full border-2 border-dashed border-brand-charcoal bg-white flex items-center justify-center p-1">
          <div className="w-full h-full rounded-full bg-brand-surface flex items-center justify-center overflow-hidden">
            <SelfAvatarIcon className="w-8 h-8 text-brand-charcoal opacity-80" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-coral border-2 border-brand-charcoal flex items-center justify-center text-white font-extrabold text-xs">
            +
          </div>
        </div>
        <span className="text-xs font-bold text-brand-charcoal mt-1.5">You</span>
      </button>
    );
  }

  const { name, ring, unread, bg, Avatar } = story;

  return (
    <button type="button" className="flex flex-col items-center shrink-0">
      <div className={`relative w-[58px] h-[58px] rounded-full border-2 p-0.5 bg-white ${RING_CLASSES[ring]}`}>
        <div
          className="w-full h-full rounded-full border-[1.5px] border-brand-charcoal overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          <Avatar className="w-full h-full" />
        </div>
        {unread != null && (
          <span
            className={`absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] text-[10px] font-extrabold rounded-full border border-brand-charcoal flex items-center justify-center ${BADGE_CLASSES[ring]}`}
          >
            {unread}
          </span>
        )}
      </div>
      <span className="text-xs font-bold text-brand-charcoal mt-1.5">{name}</span>
    </button>
  );
}
