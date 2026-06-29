'use client';

import { useSiteSettings } from '@/components/SiteSettingsProvider';

export default function ManagedPageBanner({ pageKey }: { pageKey: string }) {
  const settings = useSiteSettings();
  const banner = settings.pageBanners.find((item) => item.key === pageKey);

  if (!banner?.enabled) return null;

  return (
    <section style={{ background: 'linear-gradient(135deg,#0D1837,#1a2744)' }} className="px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ background: 'rgba(247,116,32,0.14)', border: '1px solid rgba(247,116,32,0.28)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#f77420' }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: '#f77420' }}>{banner.eyebrow}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{banner.title}</h1>
          <p className="text-sm md:text-base mt-2 max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>{banner.subtitle}</p>
        </div>
        {banner.ctaLabel && banner.ctaHref && (
          <a href={banner.ctaHref} className="inline-flex justify-center px-6 py-3 rounded-xl font-bold text-sm text-white whitespace-nowrap" style={{ background: '#f77420' }}>
            {banner.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
