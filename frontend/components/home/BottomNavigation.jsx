import Link from "next/link";

export default function BottomNavigation() {
  return (
    <nav
      className="absolute bottom-0 left-0 right-0 bg-brand-warmCanvas border-t-[2.5px] border-brand-charcoal px-4 pt-2 z-20"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      aria-label="Primary"
    >
      <div className="flex items-center justify-around">
        {/* Message: this screen IS the message/chats view — active tab */}
        <Link href="/home" aria-current="page" className="flex flex-col items-center justify-center gap-1 py-1">
          <svg className="w-6 h-6 fill-brand-cyan stroke-brand-charcoal" style={{ strokeWidth: 1.8 }} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0-2-.9-2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span className="text-[11px] font-extrabold text-brand-charcoal">Message</span>
        </Link>

        {/* No /call route exists yet — UI-only inactive tab, no invented screen */}
        <button type="button" className="flex flex-col items-center justify-center gap-1 py-1 opacity-75 hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6 stroke-brand-charcoal fill-none" style={{ strokeWidth: 2 }} viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] font-bold text-brand-charcoal">Call</span>
        </button>

        {/* No /profile route exists yet — UI-only inactive tab, no invented screen */}
        <button type="button" className="flex flex-col items-center justify-center gap-1 py-1 opacity-75 hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6 stroke-brand-charcoal fill-none" style={{ strokeWidth: 2 }} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] font-bold text-brand-charcoal">Profile</span>
        </button>
      </div>
    </nav>
  );
}
