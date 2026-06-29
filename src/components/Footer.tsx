'use client';

import { useSiteSettings } from '@/components/SiteSettingsProvider';

export default function Footer() {
  const settings = useSiteSettings();

  return (
    <footer style={{ background: '#111827' }} className="text-white">

      {/* ── Desktop Main footer ─────────────────────────── */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <img src={settings.logoSrc} alt={settings.logoAlt} className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#9CA3AF' }}>
              {settings.footerDescription}
            </p>
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm mb-5" style={{ color: '#9CA3AF' }}>
              <span>📞</span> {settings.phone}
            </a>
            <div className="flex gap-3">
              {settings.socials.map((s) => (
                <a key={s.label} href={s.href} title={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">{settings.footerCoursesTitle}</h4>
            <ul className="space-y-3">
              {settings.footerCourses.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: '#9CA3AF' }}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">{settings.footerExamsTitle}</h4>
            <ul className="space-y-3">
              {settings.footerExams.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors" style={{ color: '#9CA3AF' }}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">{settings.footerQuickLinksTitle}</h4>
            <ul className="space-y-3">
              {settings.footerQuickLinks.map((item) => (
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
          <img src={settings.logoSrc} alt={settings.logoAlt} className="h-8 w-auto brightness-0 invert" />
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#6B7280' }}>
          {settings.footerMobileDescription}
        </p>

        {/* CTA row */}
        <div className="flex gap-3 mb-7">
          <a href={`tel:${settings.phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
            style={{ background: '#f77420', color: 'white' }}>
            📞 Call Us
          </a>
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
            style={{ background: 'rgba(247,116,32,0.15)', color: '#f77420', border: '1px solid rgba(247,116,32,0.25)' }}>
            💬 WhatsApp
          </a>
        </div>

        {/* Courses section */}
        <div className="mb-5">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: '#8b5cf6' }}>📚 {settings.footerCoursesTitle}</p>
          <div className="flex flex-wrap gap-2">
            {settings.footerCourses.map((item) => (
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
          <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: '#f59e0b' }}>⚖️ {settings.footerExamsTitle}</p>
          <div className="flex flex-wrap gap-2">
            {settings.footerExams.map((item) => (
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
          <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: '#f77420' }}>🔗 {settings.footerQuickLinksTitle}</p>
          <div className="flex flex-wrap gap-2">
            {settings.footerQuickLinks.map((item) => (
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
          {settings.socials.map((s) => (
            <a key={s.label} href={s.href} title={s.label}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-opacity hover:opacity-80"
              style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </a>
          ))}
        </div>

        <p className="text-xs text-center" style={{ color: '#374151' }}>{settings.footerCopyright}</p>
      </div>

      {/* ── Desktop bottom bar ───────────────────────── */}
      <div className="hidden md:block" style={{ background: '#0d1117', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <p className="text-sm" style={{ color: '#6B7280' }}>{settings.footerCopyright}</p>
          <div className="flex items-center gap-4">
            {settings.socials.map((s) => (
              <a key={s.label} href={s.href} title={s.label}
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
