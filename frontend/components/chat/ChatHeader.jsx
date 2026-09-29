"use client";

import { useRouter } from "next/navigation";
import ContactAvatar from "./ContactAvatar";
import AhmadAvatar from "./avatars/AhmadAvatar";

const ACTION_CLASSES = "p-1.5 text-brand-charcoal hover:text-brand-cyanDark transition-colors";

export default function ChatHeader({ participant }) {
  const router = useRouter();

  return (
    <nav className="relative z-10 px-4 py-2 flex items-center justify-between border-b-2 border-brand-charcoal bg-brand-warmCanvas/95 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => router.push("/home")}
          className="p-1 text-brand-charcoal hover:opacity-75 transition-opacity shrink-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ContactAvatar Avatar={AhmadAvatar} bg="#BCE8E6" size={44} />

        <div className="leading-tight min-w-0">
          <h1 className="text-base font-bold text-brand-charcoal tracking-tight truncate">{participant.name}</h1>
          <p className="text-xs font-semibold text-brand-cyanDark flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyanDark inline-block animate-pulse" aria-hidden="true" />
            {participant.status}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-brand-charcoal pr-1 shrink-0">
        <button type="button" aria-label="Audio call" className={ACTION_CLASSES}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button type="button" aria-label="Video call" className={ACTION_CLASSES}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button type="button" aria-label="More options" className={ACTION_CLASSES}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
