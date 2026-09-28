export default function FeatureCard({
  index,
  title,
  description,
  icon,
  iconBg,
  iconColor,
  statLabel,
  statValue,
  statColor,
}) {
  return (
    <div className="bg-brand-warmCanvas ink-border rounded-3xl p-6 sm:p-8 shadow-ink hand-wiggle flex flex-col justify-between">
      <div>
        <div
          className={`w-14 h-14 rounded-2xl ink-border flex items-center justify-center shadow-ink-sm mb-6 ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">
          Feature {String(index).padStart(2, "0")}
        </span>
        <h3 className="text-xl font-extrabold text-brand-charcoal mb-2">
          {String(index).padStart(2, "0")} — {title}
        </h3>
        <p className="text-sm font-medium text-neutral-700 leading-relaxed">{description}</p>
      </div>
      <div
        className={`mt-6 pt-4 border-t-2 border-neutral-200 flex items-center justify-between text-xs font-bold ${statColor}`}
      >
        <span>{statLabel}</span>
        <span>{statValue}</span>
      </div>
    </div>
  );
}
