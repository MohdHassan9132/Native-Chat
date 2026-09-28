import Link from "next/link";
import Image from "next/image";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-warmCanvas/90 backdrop-blur-md border-b-2 border-brand-charcoal">
      <div className="h-14 px-4 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Back to home"
          className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full text-brand-charcoal hover:bg-brand-surface active:scale-95 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

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

        <Image
          src="/assets/login/avatar-placeholder.jpg"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover ink-border"
        />
      </div>
    </header>
  );
}
