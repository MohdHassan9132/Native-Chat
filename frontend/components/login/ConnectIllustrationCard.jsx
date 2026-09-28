import Image from "next/image";

export default function ConnectIllustrationCard() {
  return (
    <div className="relative mt-6 bg-white rounded-2xl p-2 ink-border shadow-ink-sm overflow-hidden flex flex-col items-center">
      <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-brand-cyan" aria-hidden="true" />
      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-coral" aria-hidden="true" />

      <div className="self-start -mt-1 ml-1 mb-2 px-3 py-1 rounded-full bg-brand-coral text-white ink-border shadow-ink-active text-xs font-bold flex items-center gap-1">
        <span aria-hidden="true">✨</span>
        <span>Let&apos;s get you connected!</span>
      </div>

      <div className="relative w-full max-w-[260px] aspect-square rounded-xl overflow-hidden bg-brand-surface">
        <Image
          src="/assets/login/connect-illustration.jpg"
          alt="Two friends excitedly talking and chatting on nativeChat"
          fill
          className="object-cover"
          sizes="260px"
        />
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-neutral-500">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
        <span className="text-[11px] font-semibold">Real-time chats • Zero clutter • Pure paper vibes</span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
      </div>
    </div>
  );
}
