"use client";

import { useEffect, useId, useRef, useState } from "react";
import PillButton from "@/components/shared/PillButton";
import OtpHeader from "./OtpHeader";
import OtpPhoneInfo from "./OtpPhoneInfo";
import OtpInput from "./OtpInput";
import OtpErrorBanner from "./OtpErrorBanner";
import OtpResend from "./OtpResend";
import OtpSuccess from "./OtpSuccess";
import { startLogin, startRegistration, verifyLogin, verifyRegistration } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 42;
function focusIdentifierInput() {
  const input = document.getElementById("phoneInput") || document.getElementById("loginIdentifier");
  input?.focus();
}

export default function OtpVerificationModal({ open, onClose, onChangeDetails, country, phone, challengeId, onChallengeChange, fullPhone, mode = "register", identifier = fullPhone, alreadyActive = false }) {
  const router = useRouter();
  const [digits, setDigits] = useState(() => Array(OTP_LENGTH).fill(""));
  const [verifyState, setVerifyState] = useState("entering"); // entering | incorrect | success
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [shakeKey, setShakeKey] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");

  const sheetRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();

  const complete = digits.every((d) => d !== "");

  // Reset to a clean Empty state every time the modal is (re)opened, so
  // closing + reopening (e.g. after editing the number) starts fresh.
  useEffect(() => {
    if (open) {
      setDigits(Array(OTP_LENGTH).fill(""));
      setVerifyState("entering");
      setNoticeMessage(alreadyActive ? "A code is already active for these details. Check your messages and enter that code." : "");
      setShakeKey((k) => k + 1);
    }
  }, [open, alreadyActive]);

  // Countdown, only while open and in the input-form states.
  useEffect(() => {
    if (!open || verifyState === "success" || secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [open, verifyState, secondsLeft]);

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close + a lightweight Tab focus trap within the sheet.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !sheetRef.current) return;

      const focusable = sheetRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleClose() {
    onClose();
    // Return focus to where the user left off on Login.
    requestAnimationFrame(focusIdentifierInput);
  }

  function handleDigitsChange(next) {
    if (verifyState === "incorrect") setVerifyState("entering");
    setNoticeMessage("");
    setDigits(next);
  }

  function showError(message) {
    setErrorMessage(message);
    setVerifyState("incorrect");
    setShakeKey((k) => k + 1);
  }

  // POST /api/auth/register/verify — creates the user and sets the auth cookies.
  async function handleVerifySubmit(e) {
    e.preventDefault();
    if (!complete || verifying) return;
    setVerifying(true);
    try {
      if (mode === "login") {
        await verifyLogin({ challengeId, userOTP: digits.join("") });
        onClose();
        router.push("/home");
        return;
      }
      await verifyRegistration({ challengeId, userOTP: digits.join("") });
      setVerifyState("success");
    } catch (err) {
      if (err.status === 401) showError("That code doesn't look right. Please try again.");
      else if (err.status === 404) showError("This code has expired. Request a new one.");
      else showError(err.message);
    } finally {
      setVerifying(false);
    }
  }

  // Re-requests an OTP via POST /api/auth/register (new challengeId).
  async function handleResend() {
    try {
      const result = mode === "register" ? await startRegistration({ phoneNumber: fullPhone }) : await startLogin({ identifier });
      onChallengeChange(result.challengeId);
      if (result.alreadyExists) {
        setNoticeMessage("A code is already active for these details. Check your messages and enter that code.");
        return;
      }
    } catch (err) {
      showError(err.message);
      return;
    }
    setDigits(Array(OTP_LENGTH).fill(""));
    setVerifyState("entering");
    setNoticeMessage("");
    setSecondsLeft(RESEND_SECONDS);
    setShakeKey((k) => k + 1);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/40 backdrop-blur-[2px]"
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg mx-auto bg-brand-warmCanvas rounded-t-[32px] border-t-2 border-x-2 border-brand-charcoal shadow-[0_-8px_30px_rgba(0,0,0,0.22)] px-5 pt-3 max-h-[90vh] overflow-y-auto"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="w-12 h-1.5 bg-brand-charcoal/25 rounded-full mx-auto mb-4" aria-hidden="true" />

        <OtpHeader onClose={handleClose} closeButtonRef={closeButtonRef} titleId={titleId} />
        <OtpPhoneInfo country={country} phone={phone} identifier={identifier} onEdit={onChangeDetails || handleClose} />

        {verifyState === "success" ? (
          <OtpSuccess country={country} phone={phone} />
        ) : (
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <OtpInput
              digits={digits}
              onDigitsChange={handleDigitsChange}
              hasError={verifyState === "incorrect"}
              autoFocus={open}
              shakeKey={shakeKey}
            />

            {noticeMessage && <div role="status" className="rounded-xl border border-brand-cyanDark/30 bg-brand-cyanLight px-3.5 py-2.5 text-xs font-semibold text-brand-charcoal">{noticeMessage}</div>}
            {verifyState === "incorrect" && <OtpErrorBanner message={errorMessage} />}

            <PillButton type="submit" variant="primary" disabled={!complete || verifying} className="w-full justify-center py-3.5 text-sm">
              <span>Verify &amp; Continue</span>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PillButton>

            <OtpResend secondsLeft={secondsLeft} onResend={handleResend} onChangeNumber={onChangeDetails || handleClose} />
          </form>
        )}

        <div className="pt-2 pb-1 text-center border-t border-neutral-200 mt-2">
          <p className="mb-2 text-[11px] text-neutral-500">You can close this window and reopen code entry from the page whenever you’re ready.</p>
          <div className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
            <svg className="w-[13px] h-[13px] text-brand-cyanDark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11V7a4 4 0 118 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Secured with end-to-end authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}
