'use client';
import { useState, useEffect, useRef } from 'react';
import { batches as staticBatches, type Batch } from '@/data/batches';
import { courses as staticCourses, type Course } from '@/data/courses';

const catTabs = [
  { key: 'offline',    label: '🏛️ Offline',    color: '#0f3460', accent: '#08BD80' },
  { key: 'online',     label: '💻 Online',      color: '#6d28d9', accent: '#8b5cf6' },
  { key: 'mentorship', label: '🎯 Mentorship',  color: '#065f46', accent: '#34d399' },
  { key: 'mock',       label: '📝 Mock Tests',  color: '#92400e', accent: '#f59e0b' },
] as const;
type CatKey = typeof catTabs[number]['key'];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function CourseCard({ course: c, accent, catColor, idx, allBatches }: { course: Course; accent: string; catColor: string; idx: number; allBatches: Batch[] }) {
  const [hov, setHov] = useState(false);
  const courseBatches = allBatches.filter(b => b.courseSlug === c.slug);
  const minFee = courseBatches.length > 0
    ? courseBatches.reduce((min, b) => parseInt(b.fee.replace(/\D/g, '')) < parseInt(min.replace(/\D/g, '')) ? b.fee : min, courseBatches[0].fee)
    : null;
  const openSeats = courseBatches.reduce((sum, b) => sum + (b.seats < 999 ? b.seats - b.filled : 0), 0);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'white', borderRadius: '20px',
        border: '1.5px solid #E9EEF2',
        boxShadow: hov ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'transform .22s ease, box-shadow .22s ease',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        animationDelay: `${idx * 0.1}s`,
      }}
    >
      {/* Gradient header */}
      <div style={{ background: `linear-gradient(135deg, ${catColor}, ${accent})`, padding: '22px 20px 18px', position: 'relative' }}>
        <div style={{ fontSize: '38px', marginBottom: '10px' }}>{c.icon}</div>
        <div style={{ color: 'white', fontWeight: 900, fontSize: '18px', lineHeight: 1.25 }}>{c.title}</div>
        {courseBatches.length > 0 && (
          <span style={{
            position: 'absolute', top: '14px', right: '14px',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
            color: 'white', fontSize: '10px', fontWeight: 700,
            padding: '4px 10px', borderRadius: '99px',
          }}>
            {courseBatches.length} batch{courseBatches.length > 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {minFee && (
          <div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, marginBottom: '2px' }}>STARTING FROM</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#0D1837' }}>{minFee}</div>
          </div>
        )}

        {c.includes && c.includes.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {c.includes.slice(0, 4).map(inc => (
              <div key={inc.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span>{inc.label}: <strong>{inc.value}</strong></span>
              </div>
            ))}
          </div>
        )}

        {openSeats > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#166534' }}>{openSeats} seats available</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <a href={`/courses?cat=${c.category}`}
            style={{ flex: 1, textAlign: 'center', padding: '11px', background: `linear-gradient(135deg, ${catColor}, ${accent})`, color: 'white', fontWeight: 700, fontSize: '13px', borderRadius: '12px', textDecoration: 'none' }}>
            View Batches →
          </a>
          <a href="/admission#form"
            style={{ padding: '11px 14px', background: '#F8FAFC', color: '#374151', fontWeight: 600, fontSize: '12px', borderRadius: '12px', textDecoration: 'none', border: '1.5px solid #E9EEF2', whiteSpace: 'nowrap' }}>
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileCourseCard({ course: c, accent, catColor, allBatches }: { course: Course; accent: string; catColor: string; allBatches: Batch[] }) {
  const courseBatches = allBatches.filter(b => b.courseSlug === c.slug);
  const minFee = courseBatches.length > 0
    ? courseBatches.reduce((min, b) => parseInt(b.fee.replace(/\D/g, '')) < parseInt(min.replace(/\D/g, '')) ? b.fee : min, courseBatches[0].fee)
    : null;
  const openSeats = courseBatches.reduce((sum, b) => sum + (b.seats < 999 ? b.seats - b.filled : 0), 0);

  return (
    <a href={`/courses?cat=${c.category}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'white', borderRadius: '20px', overflow: 'hidden',
        border: '1.5px solid #F0F0F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'stretch',
      }}>
        {/* Left color bar */}
        <div style={{ width: '6px', flexShrink: 0, background: `linear-gradient(180deg,${catColor},${accent})` }} />
        {/* Icon area */}
        <div style={{ width: '56px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${catColor}0d` }}>
          <span style={{ fontSize: '26px' }}>{c.icon}</span>
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: '14px 12px 14px 10px' }}>
          <div style={{ fontWeight: 800, fontSize: '14px', color: '#0D1837', marginBottom: '3px', lineHeight: 1.25 }}>{c.title}</div>
          {minFee && (
            <div style={{ fontSize: '13px', fontWeight: 700, color: catColor, marginBottom: '4px' }}>{minFee}</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {c.includes?.slice(0, 2).map(inc => (
              <span key={inc.label} style={{ fontSize: '10px', color: '#6B7280', background: '#F3F4F6', borderRadius: '6px', padding: '2px 6px', fontWeight: 600 }}>{inc.value}</span>
            ))}
            {openSeats > 0 && (
              <span style={{ fontSize: '10px', color: '#166534', background: '#dcfce7', borderRadius: '6px', padding: '2px 6px', fontWeight: 700 }}>● {openSeats} seats</span>
            )}
          </div>
        </div>
        {/* Arrow */}
        <div style={{ width: '36px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `${catColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: catColor, fontSize: '14px', fontWeight: 700 }}>→</div>
        </div>
      </div>
    </a>
  );
}

export default function CourseTabsSection() {
  const [activeTab, setActiveTab] = useState<CatKey>('offline');
  const { ref, visible } = useReveal(0.05);
  const [courses, setCourses] = useState<Course[]>(staticCourses);
  const [allBatches, setAllBatches] = useState<Batch[]>(staticBatches);

  useEffect(() => {
    fetch('/api/courses').then(r => r.json()).then(setCourses).catch(() => {});
    fetch('/api/batches').then(r => r.json()).then(setAllBatches).catch(() => {});
  }, []);

  const getCourses = (key: CatKey) => courses.filter(c => c.category === key).slice(0, 3);
  const activeCat = catTabs.find(t => t.key === activeTab)!;

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'opacity .6s ease, transform .6s ease' }}>

      {/* ── Desktop tab bar ── */}
      <div className="hidden md:flex" style={{ gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {catTabs.map(t => {
          const isActive = t.key === activeTab;
          const count = getCourses(t.key).length;
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              style={{
                padding: '10px 22px', borderRadius: '12px', fontWeight: 700, fontSize: '14px',
                cursor: 'pointer', border: 'none', outline: 'none',
                background: isActive ? `linear-gradient(135deg, ${t.color}, ${t.accent})` : 'white',
                color: isActive ? 'white' : '#374151',
                boxShadow: isActive ? `0 4px 16px ${t.color}44` : '0 1px 4px rgba(0,0,0,0.08)',
                transition: 'all .2s ease',
              }}>
              {t.label}
              <span style={{
                marginLeft: '8px', fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '99px',
                background: isActive ? 'rgba(255,255,255,0.25)' : '#F3F4F6',
                color: isActive ? 'white' : '#6B7280',
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop course grid */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {getCourses(activeTab).map((c, i) => (
          <CourseCard key={c.slug} course={c} accent={activeCat.accent} catColor={activeCat.color} idx={i} allBatches={allBatches} />
        ))}
      </div>

      {/* Desktop view all */}
      <div className="hidden md:block" style={{ textAlign: 'center', marginTop: '24px' }}>
        <a href={`/courses?cat=${activeTab}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '14px', fontWeight: 700, color: activeCat.accent,
            textDecoration: 'none', padding: '10px 24px', borderRadius: '12px',
            border: `2px solid ${activeCat.accent}`, transition: 'all .2s ease',
          }}>
          View All {activeCat.label} Batches →
        </a>
      </div>

      {/* ── Mobile app-style layout ── */}
      <div className="md:hidden -mx-4">
        {/* Horizontal scroll tabs */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 mb-2" style={{ scrollbarWidth: 'none' }}>
          {catTabs.map(t => {
            const isActive = t.key === activeTab;
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className="flex-shrink-0"
                style={{
                  padding: '9px 18px', borderRadius: '99px', fontWeight: 700, fontSize: '13px',
                  cursor: 'pointer', border: 'none', outline: 'none',
                  background: isActive ? `linear-gradient(135deg, ${t.color}, ${t.accent})` : 'white',
                  color: isActive ? 'white' : '#374151',
                  boxShadow: isActive ? `0 4px 14px ${t.color}40` : '0 1px 6px rgba(0,0,0,0.1)',
                  transition: 'all .2s ease',
                }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Course list */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {getCourses(activeTab).map((c) => (
            <MobileCourseCard key={c.slug} course={c} accent={activeCat.accent} catColor={activeCat.color} allBatches={allBatches} />
          ))}
        </div>

        {/* View all button */}
        <div style={{ padding: '16px 16px 0' }}>
          <a href={`/courses?cat=${activeTab}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '14px', borderRadius: '16px', fontWeight: 700, fontSize: '14px',
              background: `${activeCat.color}10`, color: activeCat.color,
              border: `1.5px solid ${activeCat.color}30`, textDecoration: 'none',
            }}>
            See All {activeCat.label} Batches →
          </a>
        </div>
      </div>
    </div>
  );
}
