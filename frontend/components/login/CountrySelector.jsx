"use client";

import { useEffect, useRef, useState } from "react";

export default function CountrySelector({ countries, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);

  const filtered = query.trim()
    ? countries.filter((c) => {
        const q = query.trim().toLowerCase();
        return c.name.toLowerCase().includes(q) || c.dialCode.includes(q);
      })
    : countries;

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();

    function handlePointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function closeAndReturnFocus() {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }

  function selectCountry(country) {
    onChange(country);
    closeAndReturnFocus();
  }

  function handleSearchKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(filtered.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[activeIndex]) selectCountry(filtered[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        closeAndReturnFocus();
        break;
      default:
        break;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-2 py-3 rounded-xl hover:bg-brand-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyanDark focus-visible:ring-offset-2"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none" aria-hidden="true">
            {value.flag}
          </span>
          <span className="text-base font-semibold text-brand-charcoal">{value.name}</span>
        </div>
        <div className="flex items-center gap-1 text-neutral-500">
          <span className="text-xs font-semibold">Select</span>
          <svg
            className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 bg-white rounded-2xl ink-border shadow-ink overflow-hidden flex flex-col">
          <div className="p-2 border-b-2 border-brand-surface">
            <div className="flex items-center gap-2 bg-brand-surface rounded-xl px-3 py-2 ring-1 ring-transparent focus-within:ring-2 focus-within:ring-brand-cyanDark">
              <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="country-listbox"
                aria-activedescendant={
                  filtered[activeIndex] ? `country-option-${filtered[activeIndex].cca2}` : undefined
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search country or code"
                className="flex-1 bg-transparent text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          <ul
            id="country-listbox"
            role="listbox"
            aria-label="Countries"
            className="max-h-60 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-neutral-500">No countries found</li>
            )}
            {filtered.map((c, i) => {
              const selected = c.cca2 === value.cca2;
              const active = i === activeIndex;
              return (
                <li
                  key={c.cca2}
                  id={`country-option-${c.cca2}`}
                  role="option"
                  aria-selected={selected}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => selectCountry(c)}
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer ${
                    selected ? "bg-brand-cyanLight" : active ? "bg-brand-surface" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg leading-none shrink-0" aria-hidden="true">
                      {c.flag}
                    </span>
                    <span className="text-sm font-semibold text-brand-charcoal truncate">
                      {c.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 shrink-0">
                    {c.dialCode}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
