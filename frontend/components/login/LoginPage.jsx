"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import HeaderStrip from "./HeaderStrip";
import PhoneNumberCard from "./PhoneNumberCard";
import AuthActions from "./AuthActions";
import ConnectIllustrationCard from "./ConnectIllustrationCard";
import LegalFooter from "./LegalFooter";
import OtpVerificationModal from "@/components/verification/OtpVerificationModal";
import OtpErrorBanner from "@/components/verification/OtpErrorBanner";
import { startLogin, startRegistration } from "@/lib/api/auth";

const PHONE_LENGTH = 10;

export default function LoginPage({ countries, defaultCountry }) {
  const [country, setCountry] = useState(defaultCountry);
  const [phone, setPhone] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [challengeId, setChallengeId] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");
  const [identifier, setIdentifier] = useState("");
  const [otpPending, setOtpPending] = useState(false);
  const [otpWasAlreadyActive, setOtpWasAlreadyActive] = useState(false);
  const isEmail = identifier.includes("@");
  const canSubmit = (mode === "register" ? phone.length === PHONE_LENGTH : (isEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) : identifier.replace(/\D/g, "").length >= 7)) && !sending;
  const fullPhone = `${country.dialCode}${phone}`;

  // Requests an OTP (POST /api/auth/register); the challengeId is then verified
  // inside the OTP sheet.
  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSending(true);
    setError("");
    try {
      const enteredNumber = identifier.trim();
      const resolvedIdentifier = isEmail ? identifier.trim() : (enteredNumber.startsWith("+") ? `+${enteredNumber.slice(1).replace(/\D/g, "")}` : `${country.dialCode}${enteredNumber.replace(/\D/g, "")}`);
      const result = mode === "register" ? await startRegistration({ phoneNumber: fullPhone }) : await startLogin({ identifier: resolvedIdentifier });
      setChallengeId(result.challengeId);
      setOtpPending(true);
      setOtpWasAlreadyActive(result.alreadyExists);
      setOtpOpen(true);
    } catch (err) {
      setError(
          err.status === 409 && /user already exists/i.test(err.message) ? "This number already has an account. Switch to Log in to continue."
          : err.status === 409 ? "A verification is already in progress. Reopen the code entry below or wait for it to expire."
          : err.status === 404 ? "We couldn't find an account with those details. Check them or sign up."
          : err.status === 400 ? "Please enter a valid email address or phone number."
          : err.status === 429 && err.data?.blockedUntil ? err.message
          : err.status === 429 ? "Too many attempts. Please wait a little and try again."
          : err.status >= 500 ? "We couldn't send a code right now. Please try again shortly."
          : err.message
      );
    } finally {
      setSending(false);
    }
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
              {mode === "register" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {mode === "register" ? "Start with your mobile number. We’ll send a one-time code." : "Sign in with your email address or mobile number."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "register" ? <PhoneNumberCard
              countries={countries}
              country={country}
              onCountryChange={(value) => { setCountry(value); setOtpPending(false); setChallengeId(null); }}
              value={phone}
              onChange={(value) => { setPhone(value); setOtpPending(false); setChallengeId(null); }}
            /> : <div className="bg-white rounded-2xl p-3 ink-border shadow-ink-sm">
              <label htmlFor="loginIdentifier" className="sr-only">Email address or phone number</label>
              <input id="loginIdentifier" autoFocus autoComplete="username" type="text" value={identifier} onChange={(e) => { setIdentifier(e.target.value); setOtpPending(false); setChallengeId(null); }} placeholder="Email address or phone number" className="w-full rounded-xl bg-brand-surface p-4 text-base text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-cyanDark" />
            </div>}
            {error && (
              <div className="mt-4">
                <OtpErrorBanner message={error} />
              </div>
            )}
            <p className="mt-3 text-center text-xs text-neutral-500">
              {mode === "register" ? "Next, a secure code-entry window will open so you can verify your number." : "Next, a secure code-entry window will open so you can enter your sign-in code."}
            </p>
            <AuthActions canSubmit={canSubmit} />
          </form>

          {otpPending && !otpOpen && (
            <div className="mt-4 rounded-2xl border-2 border-brand-cyanDark/30 bg-brand-cyanLight p-4" role="status">
              <p className="text-sm font-bold text-brand-charcoal">{otpWasAlreadyActive ? "Your code is still active" : "Your verification is waiting"}</p>
              <p className="mt-1 text-xs text-neutral-600">{otpWasAlreadyActive ? "We found an active code for these details. Reopen the code entry to continue." : "We’ve kept your code-entry step here. Reopen it when you’re ready."}</p>
              <button type="button" onClick={() => setOtpOpen(true)} className="mt-3 w-full rounded-xl bg-brand-charcoal px-4 py-3 text-sm font-bold text-white">
                Continue to code entry
              </button>
              <button type="button" onClick={() => { setOtpPending(false); setChallengeId(null); }} className="mt-2 w-full text-xs font-semibold text-neutral-600 underline">
                Dismiss this verification
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-sm text-neutral-600">
            {mode === "register" ? "Already have an account?" : "New to nativeChat?"}{" "}
            <button type="button" className="font-bold text-brand-cyanDark underline" onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); setOtpPending(false); setChallengeId(null); }}>
              {mode === "register" ? "Log in" : "Sign up"}
            </button>
          </p>

          <ConnectIllustrationCard />
          <LegalFooter />
        </div>
      </main>

      <OtpVerificationModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onChangeDetails={() => { setOtpOpen(false); setOtpPending(false); setChallengeId(null); }}
        country={country}
        phone={phone}
        challengeId={challengeId}
        onChallengeChange={setChallengeId}
        fullPhone={fullPhone}
        mode={mode}
        alreadyActive={otpWasAlreadyActive}
        identifier={mode === "login" ? (isEmail ? identifier : (identifier.trim().startsWith("+") ? `+${identifier.trim().slice(1).replace(/\D/g, "")}` : `${country.dialCode}${identifier.replace(/\D/g, "")}`)) : fullPhone}
      />
    </>
  );
}
