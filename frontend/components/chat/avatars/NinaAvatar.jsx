export default function NinaAvatar({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" fill="#FFE1D6" r="48" />
      <path d="M22 96 C26 78 40 74 50 74 C60 74 74 78 78 96 Z" fill="#FF8364" stroke="#252525" strokeWidth="3" />
      <ellipse cx="50" cy="46" fill="#FAD0C3" rx="20" ry="22" stroke="#252525" strokeWidth="3" />
      <path d="M25 45 C20 30 32 18 50 18 C68 18 80 30 75 45 C78 56 68 62 68 62 C68 52 64 36 50 36 C36 36 32 52 32 62 C32 62 22 56 25 45 Z" fill="#5A3825" stroke="#252525" strokeWidth="3" />
      <circle cx="42" cy="46" fill="#252525" r="2.5" />
      <circle cx="58" cy="46" fill="#252525" r="2.5" />
      <path d="M45 57 Q50 61 55 57" fill="none" stroke="#252525" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
