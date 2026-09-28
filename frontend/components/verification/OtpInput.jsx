"use client";

import { useRef } from "react";

const LENGTH = 6;

export default function OtpInput({ digits, onDigitsChange, hasError, autoFocus, shakeKey }) {
  const inputRefs = useRef([]);

  function setDigitAt(index, char) {
    const next = [...digits];
    next[index] = char;
    onDigitsChange(next);
  }

  function handleChange(index, e) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigitAt(index, "");
      return;
    }
    // Take the last typed character (covers mobile IME quirks where the
    // input can briefly hold more than one character).
    const char = raw.slice(-1);
    setDigitAt(index, char);
    if (index < LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        setDigitAt(index, "");
        return;
      }
      if (index > 0) {
        e.preventDefault();
        setDigitAt(index - 1, "");
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < LENGTH - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(index, e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    const next = [...digits];
    let cursor = index;
    for (const char of pasted) {
      if (cursor >= LENGTH) break;
      next[cursor] = char;
      cursor += 1;
    }
    onDigitsChange(next);
    inputRefs.current[Math.min(cursor, LENGTH - 1)]?.focus();
  }

  return (
    <div key={shakeKey} className={`grid grid-cols-6 gap-2 sm:gap-2.5 my-1 ${hasError ? "animate-shake" : ""}`}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          aria-label={`Digit ${i + 1} of 6`}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          className={`h-14 rounded-2xl text-center text-[22px] font-extrabold border-2 shadow-ink-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyanDark ${
            hasError
              ? "bg-brand-coralLight border-brand-coral text-brand-charcoal"
              : "bg-white border-brand-charcoal text-brand-charcoal"
          }`}
        />
      ))}
    </div>
  );
}
