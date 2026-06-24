const courses = [
  { label: 'Offline Course', href: '/courses?cat=offline' },
  { label: 'Online Course', href: '/courses?cat=online' },
  { label: 'CLAT Navigator™', href: '/courses/clat-mentorship-program/clat-navigator' },
  { label: 'Mock Tests', href: '/courses?cat=mock' },
];

const exams = [
  { label: 'CLAT', href: '/exams/clat' },
  { label: 'AILET', href: '/exams/ailet' },
  { label: 'MH-CET Law', href: '/exams/mh-cet-law' },
  { label: 'CUET', href: '/exams/cuet' },
  { label: 'AIL-LET', href: '/exams/ail-let' },
  { label: 'LSAT', href: '/exams/lsat' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Faculty', href: '/about' },
  { label: 'Admission', href: '/admission' },
  { label: 'The CLATians Journal', href: '/blogs' },
  { label: 'College Predictor', href: '/college-predictor' },
];

const socials = [
  { label: 'Facebook', icon: 'f', color: '#1877f2', bg: 'rgba(24,119,242,0.15)' },
  { label: 'YouTube', icon: '▶', color: '#ff0000', bg: 'rgba(255,0,0,0.12)' },
  { label: 'Instagram', icon: '📷', color: '#e1306c', bg: 'rgba(225,48,108,0.12)' },
  { label: 'LinkedIn', icon: 'in', color: '#0a66c2', bg: 'rgba(10,102,194,0.15)' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#111827' }} className="text-white">

      {/* ── Desktop Main footer ─────────────────────────── */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="CLATians" className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#9CA3AF' }}>
              Your trusted institute for CLAT, AILET, and all major law entrance exams. Expert guidance by NLU alumni and advocates.
            </p>
            <a href="tel:8507700177" className="flex items-center gap-2 text-sm mb-5" style={{ color: '#9CA3AF' }}>
              <span>📞</span> 8507700177
            </a>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href="#" title={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Courses</h4>
            <ul className="space-y-3">
              {courses.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: '#9CA3AF' }}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Exams</h4>
            <ul className="space-y-3">
              {exams.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: '#9CA3AF' }}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: '#9CA3AF' }}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Mobile footer ────────────────────────────────── */}
      <div className="md:hidden px-4 pt-8 pb-28">

        {/* Brand */}
        <div className="flex items-center gap-3 mb-3">
          <img src="/logo.png" alt="CLATians" className="h-8 w-auto brightness-0 invert" />
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#6B7280' }}>
          India's #1 CLAT coaching — 1.25L+ students, 5000+ NLU selections since 2012.
        </p>

        {/* CTA row */}
        <div className="flex gap-3 mb-7">
          <a href="tel:8507700177"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
            style={{ background: '#f77420', color: 'white' }}>
            📞 Call Us
          </a>
          <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
            style={{ background: 'rgba(247,116,32,0.15)', color: '#f77420', border: '1px solid rgba(247,116,32,0.25)' }}>
            💬 WhatsApp
          </a>
        </div>

        {/* Courses section */}
        <div className="mb-5">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: '#8b5cf6' }}>📚 Courses</p>
          <div className="flex flex-wrap gap-2">
            {courses.map((item) => (
              <a key={item.label} href={item.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Exams section */}
        <div className="mb-5">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: '#f59e0b' }}>⚖️ Exams</p>
          <div className="flex flex-wrap gap-2">
            {exams.map((item) => (
              <a key={item.label} href={item.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links section */}
        <div className="mb-6">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: '#f77420' }}>🔗 Quick Links</p>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((item) => (
              <a key={item.label} href={item.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                style={{ background: 'rgba(247,116,32,0.1)', color: '#f77420', border: '1px solid rgba(247,116,32,0.2)' }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social row */}
        <div className="flex gap-3 mb-5">
          {socials.map((s) => (
            <a key={s.label} href="#" title={s.label}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-opacity hover:opacity-80"
              style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </a>
          ))}
        </div>

        <p className="text-xs text-center" style={{ color: '#374151' }}>© 2026 CLATians – All rights reserved.</p>
      </div>

      {/* ── Desktop bottom bar ───────────────────────── */}
      <div className="hidden md:block" style={{ background: '#0d1117', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <p className="text-sm" style={{ color: '#6B7280' }}>© 2026 CLATians – All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a key={s.label} href="#" title={s.label}
                className="text-xs font-bold transition-opacity hover:opacity-80"
                style={{ color: s.color }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
