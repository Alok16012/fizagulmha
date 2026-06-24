'use client';

import Link from 'next/link';
import type { FacultyMember } from '@/data/faculty';

const avatarColors = [
  '#FFF0F0',
  '#F0F8FF',
  '#F0FFF4',
  '#FFF8F0',
  '#F5F0FF',
  '#FFFFF0',
  '#F0F0FF',
  '#FFF4F4',
];

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  const safeRating = Number.isFinite(rating) ? Math.max(0, Math.min(5, rating)) : 0;
  const full = Math.floor(safeRating);
  const half = safeRating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm" style={{ color: '#FBBF24' }}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
      </span>
      <span className="text-xs font-bold" style={{ color: '#3C4852' }}>
        {safeRating.toFixed(1)}
      </span>
    </div>
  );
}

function MobileCard({ f, idx }: { f: FacultyMember; idx: number }) {
  const avatarBg = f.bg || avatarColors[idx % avatarColors.length];
  const accent = f.color || '#f77420';
  const initials = f.avatar || getInitials(f.name);
  return (
    <Link
      href={`/faculty/${f.slug}`}
      className="faculty-card-link"
      style={{ flexShrink: 0, textDecoration: 'none', display: 'block' }}
    >
      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #F0F0F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {/* Avatar header */}
        <div style={{ background: avatarBg, padding: '18px 16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {f.photo ? (
            <img
              src={f.photo}
              alt={f.name}
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', marginBottom: '8px' }}
            />
          ) : (
            <div
              aria-label={f.name}
              style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', marginBottom: '8px', background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '22px' }}
            >
              {initials}
            </div>
          )}
          <StarRating rating={f.rating} />
          <div style={{ color: '#7A8B94', fontSize: '10px', fontWeight: 600, marginTop: '3px' }}>👥 {f.students}</div>
        </div>
        {/* Info */}
        <div style={{ padding: '12px 12px 14px' }}>
          <div style={{ fontWeight: 800, fontSize: '12px', color: '#0D1837', marginBottom: '3px', lineHeight: 1.2 }}>{f.name}</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: accent, marginBottom: '5px' }}>{f.designation}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {f.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: '#fff7ed', color: accent, border: '1px solid #ffd4ba' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FacultySection({ faculty }: { faculty: FacultyMember[] }) {
  if (faculty.length === 0) return null;

  const shouldScroll = faculty.length > 4;
  const items = shouldScroll ? [...faculty, ...faculty] : faculty;

  return (
    <section className="py-8 md:py-14 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: '#fff7ed', color: '#f77420' }}>
              Our Faculty
            </span>
            <h2 className="mt-2 font-black text-xl md:text-3xl" style={{ color: '#0D1837' }}>
              Meet Our Expert Faculty
            </h2>
            <p className="text-sm mt-1" style={{ color: '#7A8B94' }}>
              Advocates, NLU alumni &amp; toppers — handpicked for your selection.
            </p>
          </div>
          <Link href="/faculty" className="text-sm font-bold flex-shrink-0" style={{ color: '#f77420' }}>
            See All →
          </Link>
        </div>
      </div>

      {/* Auto-scrolling track */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div
          className={`flex gap-4 ${shouldScroll ? 'faculty-scroll-track' : 'faculty-static-track'}`}
          style={{ width: 'max-content', paddingLeft: '16px', paddingRight: '16px' }}
        >
          {items.map((f, idx) => (
            <div key={`${f.slug}-${idx}`} className="faculty-card" style={{ flexShrink: 0 }}>
              <MobileCard f={f} idx={idx % faculty.length} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faculty-scroll-track {
          animation: facultyScroll 28s linear infinite;
        }
        :global(.faculty-card-link) {
          width: 150px !important;
        }
        @media (min-width: 768px) {
          :global(.faculty-card-link) {
            width: calc((min(100vw, 1280px) - 32px - 48px) / 4) !important;
          }
        }
        .faculty-scroll-track:hover {
          animation-play-state: paused;
        }
        @keyframes facultyScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
