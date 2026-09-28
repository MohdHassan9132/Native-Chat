export function maskPhone(phone) {
  if (phone.length <= 4) return phone;
  const first = phone.slice(0, 2);
  const last = phone.slice(-2);
  const masked = "•".repeat(phone.length - 4);
  return `${first}${masked}${last}`;
}

export default function OtpPhoneInfo({ country, phone, onEdit }) {
  return (
    <div className="mt-2 mb-4 px-3 py-2 rounded-xl bg-brand-surface border border-neutral-200 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <svg className="w-[18px] h-[18px] text-brand-cyanDark shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="7" y="2" width="10" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 18h2" strokeLinecap="round" />
        </svg>
        <span className="text-[13px] text-neutral-600">
          Code sent to{" "}
          <strong className="text-brand-charcoal font-bold">
            {country.dialCode} {maskPhone(phone)}
          </strong>
        </span>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1 text-xs font-bold text-brand-cyanDark hover:underline bg-brand-cyanLight px-2 py-0.5 rounded-full border border-brand-cyanDark/20"
      >
        <span>Edit number</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
