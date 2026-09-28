import Link from "next/link";

const CHECK_CLASSES = {
  read: "text-brand-cyanDark",
  sent: "text-neutral-500",
  delivered: "text-emerald-500",
};

// UI phase: every conversation card opens the same mock chat. Once real
// conversations exist, swap this for `conversation.id` in the href below —
// nothing else about this component (or the /chat/[id] route) changes.
const MOCK_CONVERSATION_ID = "ahmad-syarif";

export default function ChatListItem({ conversation }) {
  const { name, preview, clamp, time, check, unread, online, bg, Avatar } = conversation;

  return (
    <Link
      href={`/chat/${MOCK_CONVERSATION_ID}`}
      className="w-full text-left bg-white p-3 rounded-2xl ink-border shadow-ink-sm flex items-center justify-between active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyanDark"
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div className="relative w-12 h-12 shrink-0">
          <div
            className="w-full h-full rounded-full border-2 border-brand-charcoal overflow-hidden"
            style={{ backgroundColor: bg }}
          >
            <Avatar className="w-full h-full" />
          </div>
          {online && (
            <span
              className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-extrabold text-brand-charcoal truncate leading-snug">{name}</h2>
          <p
            className={`text-[12.5px] font-medium text-neutral-500 mt-0.5 ${
              clamp ? "line-clamp-2 leading-tight" : "truncate"
            }`}
          >
            {preview}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-[11px] font-semibold text-neutral-500 flex items-center gap-1">
          <span className={`font-bold ${CHECK_CLASSES[check]}`} aria-hidden="true">
            ✓
          </span>
          <span>{time}</span>
        </span>
        {unread != null && (
          <span className="w-5 h-5 rounded-full bg-emerald-600 border-[1.5px] border-brand-charcoal text-white font-extrabold text-[11px] flex items-center justify-center">
            {unread}
          </span>
        )}
      </div>
    </Link>
  );
}
