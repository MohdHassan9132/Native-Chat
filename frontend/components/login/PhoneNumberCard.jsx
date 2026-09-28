"use client";

import CountrySelector from "./CountrySelector";

export default function PhoneNumberCard({ countries, country, onCountryChange, value, onChange }) {
  return (
    <div className="bg-white rounded-2xl p-2 ink-border shadow-ink-sm flex flex-col">
      <CountrySelector countries={countries} value={country} onChange={onCountryChange} />

      <div className="h-[1.5px] bg-brand-surface w-full my-0.5" />

      <div className="flex items-center gap-2 px-2 py-2 bg-brand-surface rounded-xl mt-1">
        <div className="px-2.5 py-1 rounded-full bg-white ink-border shadow-ink-active text-sm font-bold text-brand-charcoal whitespace-nowrap">
          {country.dialCode}
        </div>
        <div className="relative flex items-center flex-1">
          <label htmlFor="phoneInput" className="sr-only">
            Phone number
          </label>
          <input
            id="phoneInput"
            autoFocus
            inputMode="numeric"
            type="tel"
            placeholder="Phone number"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className="w-full bg-transparent text-lg font-bold text-brand-charcoal placeholder:text-neutral-400 placeholder:font-normal focus:outline-none tracking-wider"
          />
          {value.length === 0 && (
            <span
              className="pointer-events-none text-brand-cyanDark text-base animate-pulse -ml-1"
              aria-hidden="true"
            >
              |
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
