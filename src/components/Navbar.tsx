'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Courses', href: '/courses',
    sub: [
      { label: '🏫 Offline Course', href: '/courses?cat=offline' },
      { label: '💻 Online Course', href: '/courses?cat=online' },
      { label: '🎯 Mentorship', href: '/courses?cat=mentorship' },
      { label: '📝 Mock Tests', href: '/courses?cat=mock' },
    ],
  },
  {
    label: 'Exams', href: '/exams/clat',
    sub: [
      { label: '🏛️ CLAT', href: '/exams/clat' },
      { label: '⚖️ AILET', href: '/exams/ailet' },
      { label: '📍 MH-CET Law', href: '/exams/mh-cet-law' },
      { label: '🎓 CUET', href: '/exams/cuet' },
      { label: '🎖️ AIL-LET', href: '/exams/ail-let' },
      { label: '🌐 LSAT India', href: '/exams/lsat' },
    ],
  },
  { label: 'Admission', href: '/admission' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const mobileMenuLinks = [
  { label: 'Courses', href: '/courses', icon: '📚' },
  { label: 'Exams', href: '/exams/clat', icon: '🏛️' },
  { label: 'Admission', href: '/admission', icon: '🎓' },
  { label: 'Blogs', href: '/blogs', icon: '✍️' },
  { label: 'About', href: '/about', icon: '👥' },
  { label: 'Contact', href: '/contact', icon: '📞' },
];

const mobileNavItems = [
  { label: 'Home', href: '/', icon: <HomeIcon />, match: (p: string) => p === '/', color: '#06b6d4' },
  { label: 'Courses', href: '/courses', icon: <BookIcon />, match: (p: string) => p.startsWith('/courses'), color: '#8b5cf6' },
  { label: 'Exams', href: '/exams/clat', icon: <LawIcon />, match: (p: string) => p.startsWith('/exams'), color: '#f59e0b' },
  { label: 'Admission', href: '/admission', icon: <GradIcon />, match: (p: string) => p.startsWith('/admission'), color: '#f97316' },
  { label: 'More', href: '/about', icon: <MenuIcon />, match: (p: string) => p.startsWith('/about') || p.startsWith('/blogs') || p.startsWith('/faculty'), color: '#ec4899' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <>
      {/* ─── Desktop Navbar ─────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 hidden md:block"
        style={{ background: 'white', borderBottom: '1px solid #E9EEF2', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="CLATians" className="h-11 w-auto object-contain" />
          </a>

          <ul className="flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all"
                  style={{ color: '#3C4852' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#08BD80'; (e.currentTarget as HTMLElement).style.background = '#F0FDF9'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#3C4852'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {link.label}
                  {link.sub && (
                    <svg className="w-3 h-3 opacity-50 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
                {link.sub && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 py-1">
                    {link.sub.map((s) => (
                      <a key={s.label} href={s.href}
                        className="flex items-center px-4 py-2.5 text-sm font-medium transition-colors"
                        style={{ color: '#3C4852' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#08BD80'; (e.currentTarget as HTMLElement).style.background = '#F0FDF9'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#3C4852'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="tel:8507700177"
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
              style={{ color: '#5a6a75' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#08BD80'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#5a6a75'; }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              8507700177
            </a>
            <a href="/college-predictor"
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all"
              style={{ borderColor: '#E9EEF2', color: '#3C4852' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#08BD80'; (e.currentTarget as HTMLElement).style.color = '#08BD80'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#E9EEF2'; (e.currentTarget as HTMLElement).style.color = '#3C4852'; }}
            >
              College Predictor
            </a>
            <a href="/admission"
              className="text-sm font-bold px-5 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ background: '#f97316' }}
            >
              Admission 2026
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Mobile App Top Bar ─────────────────────────────── */}
      <nav className="sticky top-0 z-50 md:hidden" style={{ background: '#0D1837' }}>
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ background: mobileOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)', color: 'white' }}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="CLATians" className="h-7 w-auto object-contain brightness-0 invert" />
            </a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Call button */}
            <a href="tel:8507700177"
              className="w-9 h-9 flex items-center justify-center rounded-xl"
              style={{ background: 'rgba(8,189,128,0.2)', color: '#08BD80', border: '1px solid rgba(8,189,128,0.35)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            {/* College Predictor CTA */}
            <a href="/college-predictor"
              className="px-3 py-2 rounded-xl text-white text-xs font-black whitespace-nowrap flex items-center gap-1"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
              🔮 Predictor
            </a>
          </div>
        </div>

        {/* Hamburger Drawer — simple vertical stack */}
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 z-50" style={{ background: '#0D1837', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="px-4 py-3 flex flex-col">
              {mobileMenuLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3.5 text-sm font-semibold"
                  style={{
                    color: 'rgba(255,255,255,0.88)',
                    borderBottom: i < mobileMenuLinks.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  <span className="text-base w-6 text-center">{link.icon}</span>
                  {link.label}
                </a>
              ))}
              {/* CTA at bottom */}
              <a href="/college-predictor" onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-bold"
                style={{ background: 'rgba(8,189,128,0.15)', color: '#08BD80', border: '1px solid rgba(8,189,128,0.25)' }}>
                🔮 College Predictor — Free Tool
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Mobile Bottom Navigation ───────────────────────── */}
      <div className="mobile-bottom-nav md:hidden">
        {mobileNavItems.map((item) => {
          const isActive = item.match(pathname);
          return (
            <a key={item.label} href={item.href}
              className="bottom-nav-item flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all relative">
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: item.color }} />
              )}
              <span className="nav-icon w-5 h-5 transition-colors"
                style={{ color: isActive ? item.color : '#9CA3AF' }}>
                {item.icon}
              </span>
              <span className="nav-label text-[10px] font-bold leading-tight transition-colors"
                style={{ color: isActive ? item.color : '#9CA3AF' }}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </>
  );
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
}
function BookIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>;
}
function GradIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
}
function MenuIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>;
}
function LawIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>;
}
