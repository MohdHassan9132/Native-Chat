export default function OutgoingMessage({ text, timestamp }) {
  return (
    <div className="flex flex-col items-end w-full pt-1">
      {timestamp && (
        <span className="text-[10px] font-bold text-brand-charcoal/60 uppercase tracking-wider mb-1 pr-3">
          {timestamp}
        </span>
      )}
      <div className="max-w-[78%] bg-brand-cyan text-brand-charcoal border-2 border-brand-charcoal rounded-[22px] rounded-br-[4px] px-4 py-3 shadow-ink-sm">
        <p className="text-[13.5px] leading-relaxed font-semibold whitespace-pre-line">{text}</p>
      </div>
    </div>
  );
}
