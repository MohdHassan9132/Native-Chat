"use client";

import { useState } from "react";

export default function MessageComposer() {
  const [value, setValue] = useState("");

  // UI-only: no send/backend wiring yet — just a real controlled input
  // that doesn't reload the page or navigate on Enter.
  function handleSubmit(e) {
    e.preventDefault();
    setValue("");
  }

  return (
    <footer
      className="p-4 pt-2 z-20 bg-brand-warmCanvas/95 backdrop-blur-sm border-t border-brand-charcoal/10 shrink-0"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border-2 border-brand-charcoal rounded-full flex items-center px-3.5 py-2 shadow-ink-sm"
      >
        <button type="button" aria-label="Select emoji" className="text-brand-charcoal hover:text-brand-cyanDark transition-colors p-1 mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M8.5 14.5c.8 1.5 2 2.5 3.5 2.5s2.7-1 3.5-2.5" strokeLinecap="round" />
            <circle cx="9" cy="9.5" fill="currentColor" r="1.25" />
            <circle cx="15" cy="9.5" fill="currentColor" r="1.25" />
          </svg>
        </button>

        <label htmlFor="chatMessageInput" className="sr-only">
          Message
        </label>
        <input
          id="chatMessageInput"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something"
          className="flex-1 min-w-0 bg-transparent text-brand-charcoal text-sm placeholder:text-neutral-400 focus:outline-none border-none p-0 font-medium"
        />

        <div className="flex items-center gap-2.5 text-brand-charcoal ml-1 shrink-0">
          <button type="button" aria-label="Take picture" className="hover:text-brand-cyanDark transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Attach file" className="hover:text-brand-cyanDark transition-colors p-1">
            <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.373L8.552 18.32a1.5 1.5 0 0 1-2.122-2.122l8.84-8.84"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Record voice note"
            className="w-8 h-8 rounded-full border-2 border-brand-charcoal bg-white flex items-center justify-center text-brand-charcoal hover:bg-brand-cyan transition-all shadow-ink-sm ml-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>

      <div className="w-32 h-1 bg-brand-charcoal/30 rounded-full mx-auto mt-4" aria-hidden="true" />
    </footer>
  );
}
