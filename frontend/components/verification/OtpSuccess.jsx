import Image from "next/image";
import PillButton from "@/components/shared/PillButton";
import { maskPhone } from "./OtpPhoneInfo";

export default function OtpSuccess({ country, phone }) {
  return (
    <div className="flex flex-col items-center text-center py-2 px-1">
      <div className="relative w-20 h-20 rounded-3xl bg-brand-cyanLight ink-border shadow-ink flex items-center justify-center mb-3">
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-brand-coral text-white text-[10px] font-bold ink-border shadow-ink-sm animate-bounce">
          Yay!
        </div>
        <svg className="w-11 h-11 text-brand-cyanDark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 12l2 2 4-4m5-4v9a9 9 0 11-18 0V6l9-3 9 3z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3 className="text-2xl font-extrabold text-brand-charcoal">You&apos;re verified! 🎉</h3>
      <p className="text-xs text-neutral-600 max-w-xs mt-1 mb-4 leading-relaxed">
        Your number{" "}
        <strong className="text-brand-charcoal">
          {country.dialCode} {maskPhone(phone)}
        </strong>{" "}
        is authenticated with nativeChat.
      </p>

      <div className="w-full bg-brand-surface rounded-2xl p-3 ink-border shadow-ink-sm mb-4 flex items-center gap-3 text-left">
        <Image
          src="/assets/login/avatar-placeholder.jpg"
          alt=""
          aria-hidden="true"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full object-cover ink-border"
        />
        <div className="flex-1">
          <span className="text-[10px] text-brand-cyanDark uppercase font-bold tracking-wider">Next Step</span>
          <div className="text-sm font-bold text-brand-charcoal">Setup Your Profile</div>
          <div className="text-[11px] text-neutral-500">Pick your handle &amp; avatar</div>
        </div>
        <svg className="w-5 h-5 text-brand-cyanDark shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <PillButton href="/initials" variant="primary" className="w-full justify-center py-3.5 text-base">
        <span>Create your profile</span>
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PillButton>
    </div>
  );
}
