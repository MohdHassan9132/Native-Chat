"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import HeaderStrip from "./HeaderStrip";
import PhoneNumberCard from "./PhoneNumberCard";
import AuthActions from "./AuthActions";
import ConnectIllustrationCard from "./ConnectIllustrationCard";
import LegalFooter from "./LegalFooter";
import OtpVerificationModal from "@/components/verification/OtpVerificationModal";
import { PENDING_PHONE_KEY } from "@/lib/api/session";

const PHONE_LENGTH = 10;

export default function LoginPage({ countries, defaultCountry }) {
  const [country, setCountry] = useState(defaultCountry);
  const [phone, setPhone] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const canSubmit = phone.length === PHONE_LENGTH;

  // Opens the OTP bottom sheet (OTP itself is still mocked — no backend
  // endpoint). The phone is kept for the profile step, which registers the user.
  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      sessionStorage.setItem(PENDING_PHONE_KEY, phone);
    } catch {}
    setOtpOpen(true);
  }

  return (
    <>
      <TopBar />
      <main className="flex-1 flex justify-center bg-brand-warmCanvas">
        <div className="w-full max-w-[440px] px-5 pb-10">
          <HeaderStrip />

          <div className="mt-4 mb-6 flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-brand-coralLight ink-border shadow-ink-sm text-[11px] font-bold text-brand-charcoal">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Safe &amp; Encrypted</span>
            </div>

            <h1 className="text-2xl font-bold text-brand-charcoal tracking-tight">
              Enter your mobile number
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We&apos;ll use your number to verify your nativeChat account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <PhoneNumberCard
              countries={countries}
              country={country}
              onCountryChange={setCountry}
              value={phone}
              onChange={setPhone}
            />
            <AuthActions canSubmit={canSubmit} />
          </form>

          <ConnectIllustrationCard />
          <LegalFooter />
        </div>
      </main>

      <OtpVerificationModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        country={country}
        phone={phone}
      />
    </>
  );
}
