'use client';
import { useState, useEffect } from 'react';
import { batches as staticBatches, type Batch } from '@/data/batches';
import { courses as staticCourses, type Course } from '@/data/courses';

type CatKey = 'offline' | 'online' | 'mentorship' | 'mock';

const tabs: { key: CatKey; label: string; icon: string }[] = [
  { key: 'offline',    label: 'Offline Course', icon: '🏫' },
  { key: 'online',     label: 'Online Course',  icon: '💻' },
  { key: 'mentorship', label: 'Mentorship',     icon: '🎯' },
  { key: 'mock',       label: 'Mock Tests',     icon: '📝' },
];

const cardPalettes: Record<string, { from: string; to: string; avatarBg: string }> = {
  'Target Batch':     { from: '#0f3460', to: '#1a6b5c', avatarBg: '#f77420' },
  'Foundation Batch': { from: '#1e3a5f', to: '#2563eb', avatarBg: '#3b82f6' },
  'Dream Batch':      { from: '#3b1f6b', to: '#7c3aed', avatarBg: '#8b5cf6' },
  'Crash Course':     { from: '#7c1d1d', to: '#c2410c', avatarBg: '#f97316' },
  'Starter Pack':     { from: '#7a3412', to: '#c95516', avatarBg: '#f77420' },
  'Pro Pack':         { from: '#1e3a8a', to: '#1d4ed8', avatarBg: '#3b82f6' },
  'Ultimate Pack':    { from: '#78350f', to: '#b45309', avatarBg: '#f59e0b' },
};

const batchTypeColors: Record<string, { bg: string; color: string }> = {
  'Target Batch':     { bg: '#ccfbf1', color: '#c95516' },
  'Foundation Batch': { bg: '#dbeafe', color: '#1d4ed8' },
  'Dream Batch':      { bg: '#ede9fe', color: '#6d28d9' },
  'Crash Course':     { bg: '#ffedd5', color: '#c2410c' },
  'Starter Pack':     { bg: '#fff1e8', color: '#c95516' },
  'Pro Pack':         { bg: '#dbeafe', color: '#1d4ed8' },
  'Ultimate Pack':    { bg: '#fef3c7', color: '#b45309' },
};

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function getSeatsInfo(batch: Batch): { text: string; urgent: boolean } {
  const left = batch.seats - batch.filled;
  if (batch.seats >= 999) return { text: 'Open Enrollment', urgent: false };
  if (left <= 3)          return { text: `Only ${left} Seat${left === 1 ? '' : 's'} Left!`, urgent: true };
  if (batch.seats <= 20)  return { text: `Only ${batch.seats} Students`, urgent: false };
  return { text: `${left} Seats Left`, urgent: false };
}

function getBatchesForCourse(slug: string, batchList: Batch[]): Batch[] {
  return batchList.filter((b) => b.courseSlug === slug);
}

// ─── Desktop Batch Card (same as courses page) ─────────────────────────────
function BatchCard({ batch }: { batch: Batch }) {
  const palette   = cardPalettes[batch.batchType] || { from: '#0D1837', to: '#374151', avatarBg: '#6B7280' };
  const typeStyle = batchTypeColors[batch.batchType] || { bg: '#f3f4f6', color: '#374151' };
  const { text: seatsText, urgent } = getSeatsInfo(batch);
  const primaryFaculty = batch.faculty[0] || 'CLATians Faculty';
  const isSingle       = !primaryFaculty.includes('Team') && !primaryFaculty.includes('Faculty');

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
      style={{ background: 'white', border: '1.5px solid #E9EEF2', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow  = '0 12px 40px rgba(0,0,0,0.12)';
        el.style.transform  = 'translateY(-4px)';
        el.style.borderColor = '#f77420';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow  = '0 2px 8px rgba(0,0,0,0.05)';
        el.style.transform  = 'translateY(0)';
        el.style.borderColor = '#E9EEF2';
      }}
    >
      {/* Header */}
      <div className="relative h-32 flex items-end justify-between px-4 pb-3 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)` }}>
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10" style={{ background: 'white' }} />
        <div className="flex items-end gap-2.5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20 flex-shrink-0"
            style={{ background: palette.avatarBg }}>
            {isSingle
              ? <span className="text-lg font-black text-white">{getInitials(primaryFaculty)}</span>
              : <svg className="w-7 h-7 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
            }
          </div>
          <div className="pb-0.5">
            <p className="text-white/50 text-[9px] font-semibold uppercase tracking-wider">Instructor</p>
            <p className="text-white font-bold text-xs leading-tight">{primaryFaculty}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 pb-1">
          {batch.status === 'upcoming'     && <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: 'rgba(247,116,32,0.9)' }}>NEW</span>}
          {batch.status === 'filling-fast' && <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: 'rgba(249,115,22,0.9)' }}>🔥 HOT</span>}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#FEF9C3', color: '#92400E' }}>{batch.language}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: typeStyle.bg, color: typeStyle.color }}>{batch.batchType}</span>
        </div>

        <h4 className="font-black text-sm leading-snug mb-2" style={{ color: '#0D1837' }}>{batch.name}</h4>

        <div className="flex items-center gap-1 text-[11px] mb-2.5" style={{ color: '#9CA3AF' }}>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{batch.startDate} · {batch.endDate}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2.5">
          {batch.chips.slice(0, 3).map((chip) => (
            <span key={chip} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: '#fff7ed', color: '#c95516', border: '1px solid #ffd4ba' }}>✓ {chip}</span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: urgent ? '#f97316' : '#f77420' }} />
          <span className="text-[11px] font-semibold" style={{ color: urgent ? '#c2410c' : '#c95516' }}>{seatsText}</span>
        </div>

        <div className="flex-1" />

        <div className="border-t pt-3 mt-2" style={{ borderColor: '#F3F4F6' }}>
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black" style={{ color: '#0D1837' }}>{batch.fee}</span>
                {batch.originalFee && <span className="text-xs line-through" style={{ color: '#9CA3AF' }}>{batch.originalFee}</span>}
              </div>
              {batch.offer && <p className="text-[10px] font-bold" style={{ color: '#f77420' }}>🎉 {batch.offer}</p>}
            </div>
            <a href={`/courses/${batch.courseSlug}/${batch.slug}`}
              className="px-3.5 py-2 rounded-xl text-xs font-black text-white hover:opacity-90 transition-opacity flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}
              onClick={(e) => e.stopPropagation()}>
              Enroll →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Batch Card (same as courses page) ──────────────────────────────
function MobileBatchCard({ batch }: { batch: Batch }) {
  const palette   = cardPalettes[batch.batchType] || { from: '#0D1837', to: '#374151', avatarBg: '#6B7280' };
  const typeStyle = batchTypeColors[batch.batchType] || { bg: '#f3f4f6', color: '#374151' };
  const { text: seatsText, urgent } = getSeatsInfo(batch);

  return (
    <a href={`/courses/${batch.courseSlug}/${batch.slug}`}
      style={{ display: 'block', background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #F0F0F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: '5px', background: `linear-gradient(180deg, ${palette.from}, ${palette.to})`, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: '14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: typeStyle.bg, color: typeStyle.color }}>{batch.batchType}</span>
                <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: '#FEF9C3', color: '#92400E' }}>{batch.language}</span>
                {batch.status === 'upcoming'     && <span style={{ fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '20px', background: '#fff1e8', color: '#f77420' }}>✦ NEW</span>}
                {batch.status === 'filling-fast' && <span style={{ fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '20px', background: '#FFF0E6', color: '#f97316' }}>🔥 HOT</span>}
              </div>
              <div style={{ fontWeight: 800, fontSize: '13px', color: '#0D1837', lineHeight: 1.3, marginBottom: '5px' }}>{batch.name}</div>
              <div style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '6px' }}>📅 {batch.startDate} – {batch.endDate}</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {batch.chips.slice(0, 3).map((chip) => (
                  <span key={chip} style={{ fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '6px', background: '#fff7ed', color: '#c95516', border: '1px solid #ffd4ba' }}>✓ {chip}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '70px' }}>
              <div style={{ fontWeight: 900, fontSize: '15px', color: '#0D1837' }}>{batch.fee}</div>
              {batch.originalFee && <div style={{ fontSize: '9px', textDecoration: 'line-through', color: '#9CA3AF' }}>{batch.originalFee}</div>}
              <div style={{ marginTop: '8px', background: 'linear-gradient(135deg, #060d1f, #0D1837)', color: 'white', fontWeight: 800, fontSize: '11px', padding: '6px 10px', borderRadius: '10px', textAlign: 'center' }}>Enroll →</div>
              <div style={{ marginTop: '5px', fontSize: '9px', fontWeight: 600, color: urgent ? '#c2410c' : '#f77420' }}>{seatsText}</div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Desktop two-panel (courses page style, max 3 batches) ─────────────────
function CoursePanels({ categoryKey, courses, batches }: { categoryKey: CatKey; courses: Course[]; batches: Batch[] }) {
  const filtered = courses.filter((c) => c.category === categoryKey);
  const [selectedSlug, setSelectedSlug] = useState(filtered[0]?.slug ?? '');

  useEffect(() => {
    const first = courses.find((c) => c.category === categoryKey);
    if (first) setSelectedSlug(first.slug);
  }, [categoryKey, courses]);

  const selectedCourse  = courses.find((c) => c.slug === selectedSlug);
  // ← limit to 3 batches on home page
  const selectedBatches = getBatchesForCourse(selectedSlug, batches).slice(0, 3);

  if (filtered.length === 0) return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">📚</div>
      <h3 className="text-lg font-bold" style={{ color: '#0D1837' }}>Coming Soon</h3>
    </div>
  );

  return (
    <div className="flex gap-6 items-start">
      {/* Left sidebar */}
      <div className="w-72 flex-shrink-0 sticky top-32">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#9CA3AF' }}>Select a Course</p>
        <div className="space-y-2">
          {filtered.map((course) => {
            const batchCount = getBatchesForCourse(course.slug, batches).length;
            const isActive   = course.slug === selectedSlug;
            return (
              <button key={course.slug} onClick={() => setSelectedSlug(course.slug)}
                className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-150"
                style={isActive
                  ? { background: '#fff1e8', border: '1.5px solid #f77420', boxShadow: '0 2px 12px rgba(247,116,32,0.15)' }
                  : { background: 'white', border: '1.5px solid #E9EEF2' }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = '#f77420'; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = '#E9EEF2'; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: isActive ? '#ffd4ba' : course.bg }}>
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-snug truncate"
                    style={{ color: isActive ? '#f77420' : '#0D1837' }}>{course.title}</p>
                  <p className="text-[11px] mt-0.5 font-semibold"
                    style={{ color: isActive ? '#c95516' : '#9CA3AF' }}>
                    {batchCount} {batchCount === 1 ? 'Batch' : 'Batches'}
                  </p>
                </div>
                {isActive && (
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#f77420">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Counselling CTA */}
        <div className="mt-5 p-4 rounded-2xl text-center"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <p className="text-white text-xs font-bold mb-1">Need Help Choosing?</p>
          <p className="text-white/50 text-[11px] mb-3">Talk to our expert counsellors — free!</p>
          <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
            className="block py-2 rounded-xl text-xs font-black text-white transition-opacity hover:opacity-90"
            style={{ background: '#f77420' }}>
            💬 Free Counselling
          </a>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0">
        {selectedCourse && (
          <div className="mb-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: selectedCourse.bg }}>{selectedCourse.icon}</div>
            <div>
              <h2 className="font-black text-xl" style={{ color: '#0D1837' }}>{selectedCourse.title}</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>{selectedCourse.tagline}</p>
            </div>
          </div>
        )}

        {selectedBatches.length === 0 ? (
          <div className="text-center py-16 rounded-2xl"
            style={{ background: '#F8FAFC', border: '1.5px dashed #E9EEF2' }}>
            <div className="text-4xl mb-3">🔜</div>
            <p className="font-semibold" style={{ color: '#9CA3AF' }}>Batches coming soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {selectedBatches.map((batch) => (
              <BatchCard key={batch.slug} batch={batch} />
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="mt-5 text-center">
          <a href={`/courses?cat=${categoryKey}`}
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl border-2 transition-all"
            style={{ color: '#f77420', borderColor: '#f77420' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#fff1e8'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            View All Batches →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function CourseTabsSection() {
  const [activeTab, setActiveTab] = useState<CatKey>('offline');
  const [courses, setCourses]     = useState<Course[]>(staticCourses);
  const [batches, setBatches]     = useState<Batch[]>(staticBatches);

  useEffect(() => {
    fetch('/api/courses').then((r) => r.json()).then(setCourses).catch(() => {});
    fetch('/api/batches').then((r) => r.json()).then(setBatches).catch(() => {});
  }, []);

  function getTabCount(key: CatKey) {
    return courses.filter((c) => c.category === key).length;
  }

  // Mobile state
  const mobileFiltered = courses.filter((c) => c.category === activeTab);
  const [mobileSlug, setMobileSlug] = useState(mobileFiltered[0]?.slug ?? '');
  useEffect(() => {
    const first = courses.find((c) => c.category === activeTab);
    if (first) setMobileSlug(first.slug);
  }, [activeTab, courses]);
  const mobileCourse  = courses.find((c) => c.slug === mobileSlug);
  // ← limit to 3 batches on home page
  const mobileBatches = getBatchesForCourse(mobileSlug, batches).slice(0, 3);

  return (
    <div>
      {/* ── Tab Bar (same as courses page) ── */}
      <div className="mb-6 rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #E9EEF2', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div className="flex items-stretch overflow-x-auto scrollbar-none border-b-2" style={{ borderColor: '#E9EEF2' }}>
          {tabs.map((tab) => {
            const count    = getTabCount(tab.key);
            const isActive = activeTab === tab.key;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-3.5 md:py-4 text-xs md:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border-b-2 -mb-0.5"
                style={isActive
                  ? { color: '#f77420', borderBottomColor: '#f77420' }
                  : { color: '#6B7280', borderBottomColor: 'transparent' }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#f77420'; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
              >
                <span className="text-sm md:text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                <span className="text-[9px] md:text-[10px] font-black px-1.5 py-0.5 rounded-full"
                  style={isActive
                    ? { background: '#fff1e8', color: '#f77420' }
                    : { background: '#F3F4F6', color: '#9CA3AF' }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Desktop: two-panel ── */}
      <div className="hidden md:block">
        <CoursePanels categoryKey={activeTab} courses={courses} batches={batches} />
      </div>

      {/* ── Mobile: course chips + batch cards ── */}
      <div className="md:hidden">
        {/* Course chips */}
        <div style={{ overflowX: 'auto', display: 'flex', gap: '10px', paddingBottom: '4px', marginBottom: '16px' }} className="scrollbar-none">
          {mobileFiltered.map((course) => {
            const isActive = course.slug === mobileSlug;
            return (
              <button key={course.slug} onClick={() => setMobileSlug(course.slug)}
                style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '99px', border: `1.5px solid ${isActive ? '#f77420' : '#E9EEF2'}`, background: isActive ? '#fff1e8' : 'white', cursor: 'pointer' }}>
                <span style={{ fontSize: '16px' }}>{course.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: isActive ? '#f77420' : '#0D1837', whiteSpace: 'nowrap' }}>{course.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected course header */}
        {mobileCourse && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', padding: '12px', background: 'white', borderRadius: '14px', border: '1px solid #E9EEF2' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: mobileCourse.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{mobileCourse.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#0D1837' }}>{mobileCourse.title}</div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>{mobileCourse.tagline}</div>
            </div>
          </div>
        )}

        {/* Batch cards — max 3 */}
        {mobileFiltered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 16px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
            <p style={{ fontWeight: 700, color: '#0D1837' }}>Coming Soon</p>
          </div>
        ) : mobileBatches.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 16px', background: '#F8FAFC', borderRadius: '16px', border: '1.5px dashed #E9EEF2' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔜</div>
            <p style={{ fontWeight: 600, color: '#9CA3AF', fontSize: '13px' }}>Batches coming soon</p>
          </div>
        ) : (
          <div>
            {mobileBatches.map((batch) => <MobileBatchCard key={batch.slug} batch={batch} />)}
          </div>
        )}

        {/* View all */}
        <div style={{ marginTop: '4px' }}>
          <a href={`/courses?cat=${activeTab}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '14px', borderRadius: '16px', fontWeight: 700, fontSize: '14px', background: '#fff1e8', color: '#f77420', border: '1.5px solid #ffd4ba', textDecoration: 'none' }}>
            See All Batches →
          </a>
        </div>
      </div>
    </div>
  );
}
