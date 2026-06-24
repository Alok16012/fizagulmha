'use client';
import { useState, useEffect, useRef } from 'react';

const exams = [
  {
    code: 'CLAT',
    slug: 'clat',
    name: 'Common Law Admission Test',
    tagline: 'Gateway to top 23 NLUs',
    icon: '🏛️',
    color: '#0f3460',
    accent: '#f77420',
    seats: '2,700+',
    colleges: '23 NLUs',
    difficulty: 85,
    applicants: '70,000+',
    date: 'Dec 2025',
  },
  {
    code: 'AILET',
    slug: 'ailet',
    name: 'All India Law Entrance Test',
    tagline: 'Path to NLU Delhi',
    icon: '⚖️',
    color: '#7c2d12',
    accent: '#f97316',
    seats: '110',
    colleges: 'NLU Delhi',
    difficulty: 95,
    applicants: '25,000+',
    date: 'Dec 2025',
  },
  {
    code: 'MH-CET',
    slug: 'mh-cet-law',
    name: 'Maharashtra CET Law',
    tagline: 'Top MH law colleges',
    icon: '📍',
    color: '#7c1d2c',
    accent: '#ec4899',
    seats: '5,000+',
    colleges: '25+ Colleges',
    difficulty: 65,
    applicants: '40,000+',
    date: 'Mar 2026',
  },
  {
    code: 'CUET',
    slug: 'cuet',
    name: 'Common University Entrance',
    tagline: '200+ universities',
    icon: '🎓',
    color: '#7a3412',
    accent: '#ffad75',
    seats: '3,000+',
    colleges: 'Central Univs.',
    difficulty: 70,
    applicants: '14 lakh+',
    date: 'May 2026',
  },
  {
    code: 'AIL-LET',
    slug: 'ail-let',
    name: 'Army Institute of Law Entrance',
    tagline: 'Army Institute of Law',
    icon: '🎖️',
    color: '#1e3a5f',
    accent: '#3b82f6',
    seats: '120',
    colleges: 'AIL Mohali',
    difficulty: 80,
    applicants: '8,000+',
    date: 'Jan 2026',
  },
  {
    code: 'LSAT',
    slug: 'lsat',
    name: 'Law School Admission Test',
    tagline: '85+ private law schools',
    icon: '🌐',
    color: '#4c1d95',
    accent: '#8b5cf6',
    seats: '2,000+',
    colleges: '85+ Colleges',
    difficulty: 75,
    applicants: '30,000+',
    date: 'Jan 2026',
  },
];

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

function DifficultyBar({ pct, color }: { pct: number; color: string }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(pct), 200); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ background: '#F3F4F6', borderRadius: '99px', height: '5px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: '99px', transition: 'width 1s ease' }} />
    </div>
  );
}

export default function ExamsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { ref, visible } = useReveal(0.1);

  return (
    <>
      <style>{`
        @keyframes floatIcon{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .exam-icon-float{animation:floatIcon 3s ease-in-out infinite}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── DESKTOP ─────────────────────────────────────────── */}
      <section id="exams" className="hidden md:block" style={{ background: '#0D1837', padding: '72px 0', position: 'relative', overflow: 'hidden' }}>
        {/* BG orbs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: '#f77420', opacity: 0.05, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '240px', height: '240px', borderRadius: '50%', background: '#3b82f6', opacity: 0.06, filter: 'blur(50px)', pointerEvents: 'none' }} />
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
          {/* Header */}
          <div ref={ref} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity .6s ease, transform .6s ease' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px', padding: '5px 14px', borderRadius: '99px', background: 'rgba(247,116,32,0.12)', border: '1px solid rgba(247,116,32,0.25)' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f77420' }} />
                <span style={{ color: '#f77420', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Law Entrance Exams</span>
              </div>
              <h2 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.2, marginBottom: '6px' }}>
                Expert Coaching for<br />
                <span style={{ background: 'linear-gradient(90deg,#f77420,#ffad75)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Every Major Law Exam</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Pick your exam — we have a specialist batch ready for you.</p>
            </div>
            <a href="/exams/clat" style={{ color: '#f77420', fontWeight: 700, fontSize: '13px', textDecoration: 'none', border: '1px solid rgba(247,116,32,0.3)', padding: '8px 18px', borderRadius: '10px', flexShrink: 0, marginBottom: '4px', transition: 'all .2s' }}>
              See All Exams →
            </a>
          </div>

          {/* Exam cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {exams.map((exam, i) => {
              const isHov = hovered === exam.code;
              return (
                <a
                  key={exam.code}
                  href={`/exams/${exam.slug}`}
                  onMouseEnter={() => setHovered(exam.code)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'block', textDecoration: 'none',
                    background: isHov ? `linear-gradient(135deg, ${exam.color}ee, ${exam.color}aa)` : 'rgba(255,255,255,0.05)',
                    border: `1.5px solid ${isHov ? exam.accent + '66' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '18px', padding: '20px',
                    transition: 'all .25s ease',
                    boxShadow: isHov ? `0 8px 32px ${exam.color}55` : 'none',
                    transform: isHov ? 'translateY(-4px)' : 'none',
                    opacity: visible ? 1 : 0,
                    animationDelay: `${i * 0.08}s`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '14px',
                      background: isHov ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
                      ...(isHov ? { animation: 'floatIcon 2s ease-in-out infinite' } : {}),
                    }}>
                      {exam.icon}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ background: isHov ? exam.accent : 'rgba(255,255,255,0.1)', color: isHov ? 'white' : 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '99px', display: 'inline-block', transition: 'all .2s' }}>
                        {exam.code}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginTop: '4px' }}>📅 {exam.date}</div>
                    </div>
                  </div>

                  {/* Name */}
                  <div style={{ color: 'white', fontWeight: 800, fontSize: '15px', lineHeight: 1.3, marginBottom: '4px' }}>{exam.name}</div>
                  <div style={{ color: exam.accent, fontWeight: 600, fontSize: '12px', marginBottom: '14px' }}>{exam.tagline}</div>

                  {/* Infographic stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                    {[
                      { label: 'Seats', val: exam.seats, icon: '🪑' },
                      { label: 'Colleges', val: exam.colleges, icon: '🏛️' },
                      { label: 'Applicants', val: exam.applicants, icon: '👥' },
                      { label: 'Difficulty', val: `${exam.difficulty}%`, icon: '📊' },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '8px 10px' }}>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>{s.icon} {s.label}</div>
                        <div style={{ color: 'white', fontWeight: 800, fontSize: '12px' }}>{s.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Difficulty bar */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 600 }}>Competition Level</span>
                      <span style={{ color: exam.accent, fontSize: '10px', fontWeight: 700 }}>{exam.difficulty}%</span>
                    </div>
                    <DifficultyBar pct={exam.difficulty} color={exam.accent} />
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: exam.accent, fontWeight: 700, fontSize: '13px' }}>Prepare Now</span>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: isHov ? exam.accent : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: '13px', fontWeight: 700,
                      transition: 'all .2s',
                      transform: isHov ? 'translateX(3px)' : 'none',
                    }}>→</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MOBILE — App horizontal scroll cards ──────────── */}
      <section className="md:hidden" style={{ background: '#0D1837', padding: '24px 0 28px' }}>
        {/* Header */}
        <div style={{ padding: '0 16px', marginBottom: '18px' }}>
          <span style={{ background: 'rgba(247,116,32,0.15)', color: '#f77420', fontSize: '10px', fontWeight: 700, padding: '5px 12px', borderRadius: '99px', display: 'inline-block', marginBottom: '10px', border: '1px solid rgba(247,116,32,0.25)' }}>
            LAW ENTRANCE EXAMS
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ color: 'white', fontWeight: 900, fontSize: '20px', lineHeight: 1.25, margin: 0 }}>Choose Your Exam</h2>
          </div>
        </div>

        {/* Horizontal scroll exam cards */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '4px 16px 8px', scrollbarWidth: 'none' }}>
          {exams.map((exam) => (
            <a key={exam.code} href={`/exams/${exam.slug}`}
              style={{
                flexShrink: 0, width: '160px', textDecoration: 'none',
                background: `linear-gradient(160deg,${exam.color}ee,${exam.color}bb)`,
                borderRadius: '20px', padding: '16px 14px',
                border: `1.5px solid ${exam.accent}33`,
                boxShadow: `0 8px 24px ${exam.color}55`,
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
              {/* Icon + code */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                  {exam.icon}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: exam.accent, background: `${exam.accent}22`, padding: '3px 8px', borderRadius: '99px', border: `1px solid ${exam.accent}44` }}>{exam.code}</span>
              </div>

              {/* Name + tagline */}
              <div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '13px', lineHeight: 1.25, marginBottom: '3px' }}>{exam.name}</div>
                <div style={{ color: exam.accent, fontWeight: 600, fontSize: '11px' }}>{exam.tagline}</div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '6px 8px', textAlign: 'center' }}>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: '12px' }}>{exam.seats}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: 600 }}>SEATS</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '6px 8px', textAlign: 'center' }}>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: '12px' }}>{exam.difficulty}%</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: 600 }}>LEVEL</div>
                </div>
              </div>

              {/* Difficulty bar */}
              <div>
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '99px', height: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${exam.difficulty}%`, background: exam.accent, borderRadius: '99px' }} />
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: exam.accent, fontWeight: 700, fontSize: '12px' }}>Prepare →</span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px' }}>📅 {exam.date}</span>
              </div>
            </a>
          ))}
        </div>

      </section>
    </>
  );
}
