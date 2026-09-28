import Image from "next/image";

// Downloaded from the temporary googleusercontent.com URL in the design
// reference (UI/Landing/code.html) and stored locally — see /DESIGN.md and
// the asset-handling skill. Original asset is 512x512.
const HERO_IMAGE_SRC = "/assets/landing/hero-illustration.jpg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 border-b-2 border-brand-charcoal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellowLight ink-border shadow-ink-sm text-xs sm:text-sm font-bold tracking-tight">
            <span className="text-base" aria-hidden="true">
              💬
            </span>
            <span className="text-brand-charcoal">Real-Time Mobile Messaging</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal" />
            <span className="text-brand-cyanDark">v1.0 Release</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-brand-cyanDark">One Chat.</span>{" "}
            <span className="text-brand-charcoal">Every Conversation.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto font-medium leading-relaxed">
            nativeChat is our 5th semester project — a fully functional and
            scalable real-time messaging application built for conversations,
            groups, calls, media sharing and everyday communication.
          </p>
        </div>

        {/* Illustration composition */}
        <div className="relative max-w-4xl mx-auto mt-8 mb-10 pt-4">
          {/* Background organic shapes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
            <div className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full bg-brand-cyan/35 ink-border absolute -bottom-6 -left-6 sm:left-10" />
            <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-brand-coral/25 ink-border absolute -top-8 -right-4 sm:right-12" />
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-brand-yellow/30 ink-border-dashed absolute top-12 left-16 sm:left-24" />
          </div>

          {/* Center illustration */}
          <div className="relative z-10 flex justify-center">
            <div className="relative">
              <Image
                alt="Editorial illustration of a confident, friendly young adult woman using a modern smartphone, centered composition."
                className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] object-contain rounded-2xl mx-auto drop-shadow-md border-2 border-brand-charcoal bg-[#FAF8F5]"
                src={HERO_IMAGE_SRC}
                width={512}
                height={512}
                priority
              />
              <div className="hidden md:block absolute -top-12 -left-20 pointer-events-none text-brand-yellow">
                <svg fill="none" height="90" viewBox="0 0 120 90" width="120" aria-hidden="true">
                  <path
                    d="M10 80 Q 40 10, 70 50 T 110 20"
                    fill="none"
                    stroke="#F5C95B"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M105 15 L 112 21 L 104 27"
                    fill="#F5C95B"
                    stroke="#222222"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating decorative UI cards — hidden below sm/md, desktop-only flourish */}
          <div className="hidden sm:flex absolute top-6 -left-4 lg:-left-12 z-20 bg-white ink-border rounded-2xl p-3.5 shadow-ink max-w-[210px] flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-brand-yellow px-2 py-0.5 rounded-full ink-border text-brand-charcoal">
                Weekend Group
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs font-bold text-brand-charcoal">Trip to Beach 🏖️</p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="w-6 h-6 rounded-full bg-brand-cyan ink-border flex items-center justify-center text-[10px] font-bold">
                  AS
                </div>
                <div className="w-6 h-6 rounded-full bg-brand-coral ink-border flex items-center justify-center text-[10px] font-bold text-white">
                  RC
                </div>
                <div className="w-6 h-6 rounded-full bg-brand-yellow ink-border flex items-center justify-center text-[10px] font-bold">
                  EM
                </div>
              </div>
              <span className="text-[10px] font-semibold text-neutral-500">12 members</span>
            </div>
          </div>

          <div className="hidden md:flex absolute top-1/2 -translate-y-8 -left-8 lg:-left-20 z-20 bg-white ink-border rounded-2xl p-4 shadow-ink max-w-[220px] flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-brand-cyanLight ink-border flex items-center justify-center text-xs">
                💬
              </span>
              <span className="text-xs font-bold text-brand-charcoal">Onboard Clients</span>
            </div>
            <p className="text-[11px] text-neutral-600 font-medium">
              Share the link with prospects and discuss all stuff.
            </p>
            <button
              type="button"
              className="w-full bg-brand-cyan text-brand-charcoal text-xs font-bold py-1.5 px-3 rounded-xl ink-border shadow-ink-sm flex items-center justify-center gap-1.5 hover:bg-brand-cyanDark transition-colors"
            >
              <span>Copy Link</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex absolute -bottom-4 left-0 lg:-left-8 z-20 items-end gap-2.5">
            <div className="w-9 h-9 rounded-full bg-brand-coral ink-border text-white text-xs font-extrabold flex items-center justify-center shadow-ink-sm">
              HB
            </div>
            <div className="bg-white ink-border rounded-2xl rounded-bl-sm p-3 shadow-ink text-xs font-semibold text-brand-charcoal speech-cusp-left relative">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-[11px] text-neutral-800">Henry Boyd</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              Yep, give me 5 minutes 😄
            </div>
          </div>

          <div className="hidden sm:flex absolute top-4 -right-4 lg:-right-12 z-20 bg-white ink-border rounded-2xl px-3.5 py-2.5 shadow-ink items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-brand-coral ink-border flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-coral border border-white animate-ping" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-coral">
                Video Call
              </div>
              <div className="text-xs font-mono font-bold text-brand-charcoal">03:42 • Live</div>
            </div>
          </div>

          <div className="hidden md:flex absolute top-1/3 -right-10 lg:-right-24 z-20 bg-white ink-border rounded-2xl p-3.5 shadow-ink w-[240px] flex-col gap-2">
            <div className="flex items-center justify-between pb-2 border-b-2 border-brand-surface">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-brand-charcoal">Chatting Room</span>
                <span className="bg-brand-coral text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">07:22 AM</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-warmCanvas p-1.5 rounded-xl ink-border">
              <div className="w-7 h-7 rounded-lg bg-brand-cyan ink-border flex items-center justify-center text-[10px] font-bold">
                RC
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold truncate">Rose Carr</span>
                  <span className="text-[9px] text-neutral-500">06:32</span>
                </div>
                <p className="text-[10px] text-neutral-600 truncate">Project Dev mobile finished...</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-1">
              <div className="w-7 h-7 rounded-lg bg-brand-yellow ink-border flex items-center justify-center text-[10px] font-bold">
                EM
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold truncate">Etta McDaniel</span>
                  <span className="bg-brand-cyan text-brand-charcoal text-[9px] font-extrabold px-1 rounded-full ink-border">
                    NEW
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 truncate">I don&apos;t think I can join...</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex absolute -bottom-6 right-2 lg:-right-10 z-20 items-end gap-2.5 flex-row-reverse">
            <div className="w-9 h-9 rounded-full bg-brand-cyan ink-border text-brand-charcoal text-xs font-extrabold flex items-center justify-center shadow-ink-sm">
              ME
            </div>
            <div className="bg-brand-cyan text-brand-charcoal ink-border rounded-2xl rounded-br-sm p-3 shadow-ink text-xs font-semibold speech-cusp-right relative">
              <div className="flex items-center justify-end gap-1.5 mb-1">
                <span className="font-bold text-[11px]">How can I help you today?</span>
                <svg className="w-3.5 h-3.5 text-brand-charcoal" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              Let&apos;s test the socket stream ⚡
            </div>
          </div>

          {/* Mock chat input preview bar */}
          <div className="max-w-xl mx-auto mt-10">
            <div className="bg-white ink-border rounded-full p-2 pl-5 shadow-ink flex items-center gap-3">
              <button
                type="button"
                aria-label="Attach file"
                className="text-neutral-500 hover:text-brand-charcoal transition-colors p-1"
              >
                <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <input
                className="flex-1 bg-transparent border-none text-xs sm:text-sm font-medium text-brand-charcoal placeholder-neutral-400 focus:ring-0 p-0"
                placeholder="Type a message to preview live conversation..."
                readOnly
                type="text"
                value="Hi team! The real-time socket connection is active."
              />
              <button
                type="button"
                aria-label="Emoji picker"
                className="text-neutral-500 hover:text-brand-charcoal transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-brand-cyan ink-border flex items-center justify-center text-brand-charcoal shadow-ink-sm hover:scale-105 active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
