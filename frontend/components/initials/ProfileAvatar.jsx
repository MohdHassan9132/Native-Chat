"use client";

import { useRef } from "react";
import Image from "next/image";

const DEFAULT_AVATAR_SRC = "/assets/login/avatar-placeholder.jpg";

export default function ProfileAvatar({ avatarSrc, onAvatarChange }) {
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    onAvatarChange(URL.createObjectURL(file));
    // Allow re-selecting the same file later and firing change again.
    e.target.value = "";
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  const isCustom = avatarSrc !== DEFAULT_AVATAR_SRC;

  return (
    <div className="flex flex-col items-center justify-center mb-6 relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload profile photo"
      />

      <div className="relative -mb-2 z-10 animate-bounce [animation-duration:1s]">
        <div className="relative bg-brand-cyanDark text-white text-xs font-bold px-3 py-1 rounded-full shadow-ink-sm flex items-center gap-1">
          <span>Looking fresh!</span>
          <span aria-hidden="true">✨</span>
        </div>
        <div className="w-2.5 h-2.5 bg-brand-cyanDark rotate-45 mx-auto -mt-1.5 rounded-[1px]" aria-hidden="true" />
      </div>

      <div className="relative">
        <div className="w-32 h-32 rounded-full p-1.5 bg-brand-cyan/30 shadow-ink flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
            {/* Local preview only — never uploaded anywhere. */}
            <Image
              src={avatarSrc}
              alt={isCustom ? "Your selected profile photo" : "Default illustrated profile avatar"}
              fill
              sizes="128px"
              unoptimized={isCustom}
              className="object-cover select-none"
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Change photo"
          onClick={openFilePicker}
          className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-brand-cyan text-brand-charcoal ink-border shadow-ink-sm flex items-center justify-center active:scale-95 transition-transform"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h3l2-2h6l2 2h3a1 1 0 011 1v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="13" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="absolute -bottom-1 -left-2 text-brand-cyanDark select-none text-[18px]" aria-hidden="true">
          ✧
        </span>
      </div>

      <button
        type="button"
        onClick={openFilePicker}
        className="mt-3 inline-flex items-center gap-1 text-sm text-brand-cyanDark font-bold hover:underline"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Change photo</span>
      </button>
    </div>
  );
}

export { DEFAULT_AVATAR_SRC };
