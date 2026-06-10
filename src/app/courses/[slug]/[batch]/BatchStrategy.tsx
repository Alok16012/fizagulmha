'use client';

import { useState } from 'react';

type Section = { title: string; subtitle?: string; items: string[] };

const COLORS = [
  { bar: '#E8B84B', bg: '#FCF7E8' },
  { bar: '#3FBF7F', bg: '#EAF8F0' },
  { bar: '#9B8CEC', bg: '#F1EEFC' },
  { bar: '#EF6B6B', bg: '#FDEDED' },
  { bar: '#5B9BE8', bg: '#EBF3FD' },
];

const COLLAPSED_COUNT = 3;

export default function BatchStrategy({ sections }: { sections: Section[] }) {
  const items: Section[] = sections;

  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, COLLAPSED_COUNT);
  const hasMore = items.length > COLLAPSED_COUNT;

  return (
    <div
      className="bg-white rounded-2xl p-5"
      style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <h2 className="text-sm font-black mb-3 uppercase tracking-wide" style={{ color: '#9CA3AF' }}>
        Batch Strategy
      </h2>

      <div className="space-y-3">
        {visible.map((sec, i) => {
          const c = COLORS[i % COLORS.length];
          const expandable = sec.items.length > 0;
          const isOpen = !!open[i];
          return (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ background: c.bg, borderLeft: `5px solid ${c.bar}` }}
            >
              <button
                type="button"
                onClick={() => expandable && setOpen((o) => ({ ...o, [i]: !o[i] }))}
                className="w-full flex items-center justify-between gap-3 text-left p-4"
                style={{ cursor: expandable ? 'pointer' : 'default' }}
                aria-expanded={isOpen}
              >
                <span>
                  <span className="block font-black text-sm" style={{ color: '#0D1837' }}>
                    {sec.title}
                  </span>
                  {sec.subtitle && (
                    <span className="block text-xs font-semibold mt-0.5" style={{ color: c.bar }}>
                      {sec.subtitle}
                    </span>
                  )}
                </span>
                {expandable && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>

              {expandable && isOpen && (
                <ul className="space-y-1.5 px-4 pb-4 -mt-1">
                  {sec.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#374151' }}>
                      <span className="font-black flex-shrink-0" style={{ color: c.bar }}>
                        •
                      </span>
                      <span className="leading-snug">{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="w-full mt-3 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          style={{ border: '1.5px solid #2563EB', color: '#2563EB' }}
        >
          {showAll ? 'Show Less' : 'Show More'}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: showAll ? 'rotate(180deg)' : 'none' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
}
