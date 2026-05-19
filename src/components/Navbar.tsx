'use client';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Courses', href: '/courses/offline',
    sub: [
      { label: 'Offline Course', href: '/courses/offline' },
      { label: 'Online Course', href: '/courses/online' },
      { label: 'OLET Program', href: '/courses/mentorship' },
      { label: 'Mock Tests', href: '/courses/mock-tests' },
    ],
  },
  {
    label: 'Exams', href: '/exams/clat',
    sub: [
      { label: 'CLAT', href: '/exams/clat' },
      { label: 'AILET', href: '/exams/ailet' },
      { label: 'MH-CET Law', href: '/exams/mh-cet-law' },
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <>
      {/* ─── Desktop Navbar ─────────────────────────────────── */}
      <nav
        style={{ background: 'white' }}
        className="sticky top-0 z-50 shadow-sm border-b border-gray-100 hidden md:block"
      >
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img src="/logo.png" alt="CLATians" className="h-10 w-auto object-contain" />
          </a>

          {/* Nav Links */}
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md hover:bg-blue-50 transition-all"
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
                      <a key={s.label} href={s.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 first:rounded-t-xl last:rounded-b-xl transition-colors">
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a href="tel:8507700177" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              8507700177
            </a>
            <a href="/college-predictor" className="text-sm font-semibold px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
              College Predictor
            </a>
            <a href="/admission" style={{ background: '#f97316' }} className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity shadow-md">
              Admission 2026
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Sub Navigation Bar (Unacademy style) ─── */}
      <div className="hidden md:block bg-white border-b border-gray-100 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {[
              { label: 'Get Started', href: '#courses' },
              { label: 'Courses', href: '/courses/offline' },
              { label: 'Exams', href: '/exams/clat' },
              { label: 'Mock Tests', href: '/courses/mock-tests' },
              { label: 'Faculty', href: '#faculty' },
              { label: 'Results', href: '/about' },
              { label: 'About CLAT', href: '/exams/clat' },
            ].map((item) => (
              <a key={item.label} href={item.href}
                className="flex-shrink-0 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 transition-all whitespace-nowrap">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Mobile Navbar ──────────────────────────────────── */}
      <nav className="sticky top-0 z-50 md:hidden bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-3 py-2.5">
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 rounded-lg text-gray-700">
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

          {/* Logo center */}
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="CLATians" className="h-10 w-auto object-contain" />
          </a>

          {/* Right CTAs */}
          <div className="flex flex-col gap-1 items-end">
            <a href="/college-predictor"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[10px] font-bold"
              style={{ background: '#08BD80' }}>
              ⚡ College Predictor
            </a>
            <a href="/admission"
              className="px-2.5 py-1 rounded-lg text-white text-[10px] font-bold"
              style={{ background: '#0D1837' }}>
              Admission 2026
            </a>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="bg-white border-t border-gray-100 shadow-xl animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a href={link.href} onClick={() => setMobileOpen(false)}
                    className="block py-3 px-3 rounded-lg font-semibold text-gray-800 hover:bg-cyan-50 hover:text-cyan-700 transition-colors border-b border-gray-50">
                    {link.label}
                  </a>
                  {link.sub && (
                    <div className="pl-4 space-y-1 mt-1">
                      {link.sub.map((s) => (
                        <a key={s.label} href={s.href} onClick={() => setMobileOpen(false)}
                          className="block py-2 px-3 text-sm text-gray-600 hover:text-cyan-700">
                          → {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-1 flex gap-2">
                <a href="/college-predictor" onClick={() => setMobileOpen(false)}
                  style={{ borderColor: '#0D1837', color: '#0D1837' }}
                  className="flex-1 text-center py-2.5 rounded-lg border-2 font-semibold text-sm">
                  College Predictor
                </a>
                <a href="/admission" onClick={() => setMobileOpen(false)}
                  style={{ background: '#08BD80' }}
                  className="flex-1 text-center py-2.5 rounded-lg text-white font-semibold text-sm">
                  Admission 2026
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Mobile Bottom Navigation ───────────────────────── */}
      <div className="mobile-bottom-nav md:hidden">
        {mobileNavItems.map((item) => (
          <a key={item.label} href={item.href}
            className="flex flex-col items-center gap-0.5 py-1 flex-1 text-gray-400 hover:text-blue-600 transition-colors">
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
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
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
