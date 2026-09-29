export default function ContactAvatar({ Avatar, bg, size = 44, className = "" }) {
  return (
    <div
      className={`relative rounded-full border-2 border-brand-charcoal overflow-hidden shadow-ink-sm shrink-0 ${className}`}
      style={{ width: size, height: size, backgroundColor: bg }}
    >
      <Avatar className="w-full h-full" />
    </div>
  );
}
