import DeskFlatlayArt from "./DeskFlatlayArt";

// Only one mock asset exists for now; keyed so a real attachment (uploaded
// asset URL) can slot in later without changing the message shape.
const ASSETS = {
  "desk-flatlay": DeskFlatlayArt,
};

export default function ImageMessage({ asset }) {
  const Art = ASSETS[asset];

  return (
    <div className="flex flex-col items-end w-full pt-1">
      <div className="p-1 rounded-xl border-2 border-dashed border-brand-charcoal/80 bg-white shadow-ink-sm max-w-[210px] -rotate-[0.5deg]">
        <div className="relative overflow-hidden rounded-lg border border-brand-charcoal/40 bg-[#f4f2ea]">
          {Art && <Art className="w-full h-auto block select-none" />}
        </div>
      </div>
    </div>
  );
}
