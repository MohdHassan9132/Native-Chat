// Decorative status bar for the self-contained phone-frame mockup used on
// this screen only (see DESIGN.md discussion in the Home implementation —
// unlike the full-page Login/Verification/Initials screens, /home renders
// as a bordered device frame, so a matching illustrated status bar belongs
// inside it rather than relying on the visitor's real browser chrome).
export default function StatusBar() {
  return (
    <div
      className="w-full pt-3 px-7 flex justify-between items-center text-brand-charcoal font-bold text-xs tracking-tight select-none shrink-0"
      aria-hidden="true"
    >
      <span>9:41</span>
      <div className="flex items-center space-x-1.5">
        <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
          <rect height="4" rx="0.5" width="2.5" x="0.5" y="8" />
          <rect height="6.5" rx="0.5" width="2.5" x="4.5" y="5.5" />
          <rect height="9" rx="0.5" width="2.5" x="8.5" y="3" />
          <rect height="11.5" rx="0.5" width="2.5" x="12.5" y="0.5" />
        </svg>
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
          <path d="M8 12.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4.24-3.18a6 6 0 0 1 8.48 0 .8.8 0 0 1-1.13 1.13 4.4 4.4 0 0 0-6.22 0 .8.8 0 0 1-1.13-1.13zm-2.83-2.83a10 10 0 0 1 14.14 0 .8.8 0 0 1-1.13 1.13 8.4 8.4 0 0 0-11.88 0 .8.8 0 0 1-1.13-1.13z" />
        </svg>
        <div className="w-6 h-3 border-[1.8px] border-brand-charcoal rounded-[4px] p-0.5 flex items-center relative">
          <div className="h-full w-3.5 bg-brand-charcoal rounded-[1px]" />
          <div className="w-0.5 h-1.5 bg-brand-charcoal absolute -right-1 rounded-r-[1px]" />
        </div>
      </div>
    </div>
  );
}
