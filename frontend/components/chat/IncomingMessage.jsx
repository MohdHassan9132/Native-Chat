import ContactAvatar from "./ContactAvatar";
import NinaAvatar from "./avatars/NinaAvatar";

export default function IncomingMessage({ senderName, text, timestamp }) {
  return (
    <div className="flex items-start gap-2.5 w-full pt-1">
      <ContactAvatar Avatar={NinaAvatar} bg="#FFE1D6" size={32} className="mt-3" />
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-xs font-extrabold text-brand-charcoal">{senderName}</span>
          <span className="text-[10px] font-bold text-brand-charcoal/60 uppercase tracking-wider">{timestamp}</span>
        </div>
        <div className="max-w-full bg-white border-2 border-brand-charcoal rounded-[22px] rounded-tl-[4px] px-4 py-2.5 shadow-ink-sm w-fit">
          <p className="text-[13.5px] font-semibold text-brand-charcoal">{text}</p>
        </div>
      </div>
    </div>
  );
}
