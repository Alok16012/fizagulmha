'use client';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Courses', href: '/courses/offline',
    sub: [
      { label: 'Offline Course', href: '/courses/offline' },
      { label: 'Online Course', href: '/courses/online' },
      { label: 'Mentorship', href: '/courses/mentorship' },
      { label: 'Mock Tests', href: '/courses/mock-tests' },
    ],
  },
  {
    label: 'Exams', href: '/exams/clat',
    sub: [
      { label: 'CLAT', href: '/exams/clat' },
      { label: 'AILET', href: '/exams/ailet' },
      { label: 'MH-CET Law', href: '/exams/mh-cet' },
      { label: 'CUET', href: '/exams/cuet' },
      { label: 'AIL-LET', href: '/exams/ail-let' },
      { label: 'LSAT India', href: '/exams/lsat' },
    ],
  },
  { label: 'Admission', href: '/admission' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
];

const mobileNavItems = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Courses', href: '/courses/offline', icon: <BookIcon /> },
  { label: 'Admission', href: '/admission', icon: <GradIcon /> },
  { label: 'Students', href: '/about', icon: <StudentsIcon /> },
  { label: 'Law Exams', href: '/exams/clat', icon: <LawIcon /> },
  { label: 'More', href: '/about', icon: <MenuIcon /> },
];

/* ── Inline SVG logo (fallback if logo.png missing) ── */
function CLATiansLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Scales of Justice Icon */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#fff3e0" />
        {/* Pillar */}
        <rect x="17" y="8" width="2" height="20" rx="1" fill="#f97316" />
        <rect x="10" y="27" width="16" height="2" rx="1" fill="#f97316" />
        {/* Top bar */}
        <rect x="9" y="10" width="18" height="2" rx="1" fill="#f97316" />
        {/* Left pan chain */}
        <line x1="11" y1="12" x2="11" y2="19" stroke="#f97316" strokeWidth="1.5" />
        {/* Right pan chain */}
        <line x1="25" y1="12" x2="25" y2="19" stroke="#f97316" strokeWidth="1.5" />
        {/* Left pan */}
        <path d="M8 19 Q11 22 14 19" stroke="#f97316" strokeWidth="1.5" fill="none" />
        {/* Right pan */}
        <path d="M22 19 Q25 22 28 19" stroke="#f97316" strokeWidth="1.5" fill="none" />
      </svg>
      {/* Text */}
      <div className="flex flex-col leading-none">
        <span style={{ color: '#0a1e8a', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>
          CLAT<span style={{ color: '#f97316' }}>ians</span>
        </span>
        <span style={{ color: '#64748b', fontSize: '0.48rem', fontWeight: 600, letterSpacing: '1.5px' }}>
          LEARN&nbsp;|&nbsp;PRACTICE&nbsp;|&nbsp;ACHIEVE
        </span>
      </div>
    </div>
  );
}

/* ── Innovative College Predictor Button ── */
function CollegePredictorBtn({ size = 'md', onClick }: { size?: 'sm' | 'md', onClick?: () => void }) {
  const isSmall = size === 'sm';
  return (
    <a
      href="/college-predictor"
      onClick={onClick}
      className="college-predictor-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '5px' : '7px',
        padding: isSmall ? '6px 13px' : '8px 18px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
        color: '#fff',
        fontWeight: 700,
        fontSize: isSmall ? '10px' : '13px',
        textDecoration: 'none',
        boxShadow: '0 4px 16px rgba(249,115,22,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
        position: 'relative',
        overflow: 'hidden',
        letterSpacing: '0.2px',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(249,115,22,0.6), inset 0 1px 0 rgba(255,255,255,0.25)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(249,115,22,0.45), inset 0 1px 0 rgba(255,255,255,0.25)';
      }}
    >
      {/* shimmer overlay */}
      <span style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
        animation: 'shimmer 2.5s infinite',
        pointerEvents: 'none',
      }} />
      {/* bolt icon */}
      <svg width={isSmall ? 11 : 14} height={isSmall ? 11 : 14} viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, zIndex: 1 }}>
        <path d="M8.5 1L3 7.5H7L5.5 13L11 6.5H7.5L8.5 1Z" fill="white" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeLinejoin="round" />
      </svg>
      <span style={{ zIndex: 1 }}>College Predictor</span>
    </a>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(249,115,22,0); }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
        }
      `}</style>

      {/* ─── Desktop Navbar ─────────────────────────────────── */}
      <nav
        style={{ background: 'var(--navy)' }}
        className="sticky top-0 z-50 shadow-lg hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="bg-white rounded-xl px-3 py-1.5 flex items-center">
              <img
                src="/logo.png"
                alt="CLATians"
                className="h-10 w-auto object-contain"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex'; }}
              />
              <span style={{ display: 'none' }}><CLATiansLogo /></span>
            </div>
          </a>

          {/* Nav Links */}
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-all"
                  onClick={() => setOpenSub(openSub === link.label ? null : link.label)}
                >
                  {link.label}
                  {link.sub && (
                    <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
                {link.sub && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {link.sub.map((s) => (
                      <a key={s.label} href={s.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 first:rounded-t-xl last:rounded-b-xl transition-colors">
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a href="tel:8507700177" className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              8507700177
            </a>
            <CollegePredictorBtn />
          </div>
        </div>
      </nav>

      {/* ─── Mobile Navbar ──────────────────────────────────── */}
      <nav className="sticky top-0 z-50 md:hidden bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-3" style={{ height: '60px' }}>

          {/* Hamburger + Logo — left */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-gray-700 flex-shrink-0"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <a href="/">
              <img
                src="/logo.png"
                alt="CLATians"
                style={{ height: '42px', width: 'auto', objectFit: 'contain', display: 'block' }}
                onError={e => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                }}
              />
              <span style={{ display: 'none' }}>
                <CLATiansLogo />
              </span>
            </a>
          </div>

          {/* College Predictor — right */}
          <CollegePredictorBtn size="sm" />
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="bg-white border-t border-gray-100 shadow-xl animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-3 rounded-lg font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-50"
                  >
                    {link.label}
                  </a>
                  {link.sub && (
                    <div className="pl-4 space-y-1 mt-1">
                      {link.sub.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 px-3 text-sm text-gray-600 hover:text-orange-600"
                        >
                          → {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-2 flex justify-center">
                <CollegePredictorBtn onClick={() => setMobileOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Mobile Bottom Navigation ───────────────────────── */}
      <div className="mobile-bottom-nav md:hidden">
        {mobileNavItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-0.5 py-1 flex-1 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <span className="w-5 h-5">{item.icon}</span>
            <span className="text-[9px] font-semibold leading-tight">{item.label}</span>
          </a>
        ))}
      </div>
    </>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}
function GradIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
    </svg>
  );
}
function StudentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function LawIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  );
}
