"use client";

import { useState } from "react";
import { FILTERS } from "./data";

export default function ChatFilters() {
  const [selected, setSelected] = useState(FILTERS[0]);

  return (
    <section className="mt-4 px-5 shrink-0" aria-label="Chat filters">
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1" role="tablist">
        {FILTERS.map((filter) => {
          const isSelected = filter === selected;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelected(filter)}
              className={`shrink-0 px-4 py-1.5 rounded-full font-bold text-sm border-2 border-brand-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyanDark ${
                isSelected
                  ? "bg-brand-cyan text-brand-charcoal font-extrabold shadow-ink-sm px-5"
                  : "bg-white text-brand-charcoal shadow-ink-active hover:bg-brand-surface"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );
}
