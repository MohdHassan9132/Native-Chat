export default function AhmadAvatar({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" fill="#BCE8E6" r="48" />
      <path d="M20 96 C25 76 40 72 50 72 C60 72 75 76 80 96 Z" fill="#4CC6C6" stroke="#252525" strokeWidth="3.5" />
      <path d="M44 72 L50 82 L56 72" fill="#FAFAF8" stroke="#252525" strokeWidth="3" />
      <rect fill="#FFDFC4" height="15" stroke="#252525" strokeWidth="3" width="14" x="43" y="60" />
      <ellipse cx="50" cy="46" fill="#FFDFC4" rx="22" ry="24" stroke="#252525" strokeWidth="3.5" />
      <path d="M28 42 C27 28 40 22 50 22 C62 22 73 28 72 42 C68 33 60 30 50 30 C38 30 32 35 28 42 Z" fill="#D98246" stroke="#252525" strokeWidth="3" />
      <rect fill="#FFFFFF" height="10" rx="3" stroke="#252525" strokeWidth="2.75" width="13" x="33" y="40" />
      <rect fill="#FFFFFF" height="10" rx="3" stroke="#252525" strokeWidth="2.75" width="13" x="54" y="40" />
      <line stroke="#252525" strokeWidth="2.5" x1="46" x2="54" y1="45" y2="45" />
      <circle cx="39.5" cy="45" fill="#252525" r="2.2" />
      <circle cx="60.5" cy="45" fill="#252525" r="2.2" />
      <path d="M43 57 Q50 64 57 57" fill="none" stroke="#252525" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
