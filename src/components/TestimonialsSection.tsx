'use client';
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  { name: 'Aman Deep Singh', rank: 'AIR 23', college: 'NLU Delhi', year: 'CLAT 2024', avatar: 'AD', color: '#6366f1', quote: "CLATians gave me the structure, mentors, and mock tests I needed. A.K. Sir's teaching of legal reasoning is absolutely unmatched.", stars: 5 },
  { name: 'Priya Sharma', rank: 'AIR 47', college: 'NALSAR Hyderabad', year: 'CLAT 2024', avatar: 'PS', color: '#ec4899', quote: 'The online program was incredibly flexible. I could study from home while still getting personalized mentorship. Mock test analytics helped me improve 40 ranks.', stars: 5 },
  { name: 'Rohan Gupta', rank: 'AIR 12', college: 'NLU Delhi', year: 'AILET 2024', avatar: 'RG', color: '#f59e0b', quote: 'AILET preparation at CLATians is top-notch. The specialized legal reasoning classes and focused GK sessions made all the difference.', stars: 5 },
  { name: 'Sneha Patel', rank: 'AIR 89', college: 'NLIU Bhopal', year: 'CLAT 2024', avatar: 'SP', color: '#14b8a6', quote: 'From a small town in Bihar to NLIU Bhopal — CLATians made my dream possible. The faculty is truly dedicated to every student.', stars: 5 },
  { name: 'Vikram Mishra', rank: 'AIR 156', college: 'GNLU Gandhinagar', year: 'CLAT 2024', avatar: 'VM', color: '#f77420', quote: "I was a dropper who had failed CLAT twice. CLATians' personalized approach completely changed my strategy. Third attempt — AIR 156.", stars: 5 },
  { name: 'Kavya Reddy', rank: 'AIR 34', college: 'NALSAR Hyderabad', year: 'CLAT 2025', avatar: 'KR', color: '#f97316', quote: 'The study material quality is exceptional. 8 volumes covering every topic in depth. Combined with daily GK sessions, I scored 98/120 in current affairs.', stars: 5 },
  { name: 'Arjun Tiwari', rank: 'AIR 67', college: 'RMLNLU Lucknow', year: 'CLAT 2024', avatar: 'AT', color: '#8b5cf6', quote: "Joined CLATians in Class 11. Two years of consistent preparation with A.K. Sir's guidance. Best decision of my life.", stars: 5 },
  { name: 'Riya Bose', rank: 'AIR 203', college: 'CNLU Patna', year: 'CLAT 2024', avatar: 'RB', color: '#ef4444', quote: 'As a girl from a small family, fees were a concern. CLATians offered scholarship which made it possible. Extremely grateful for the support.', stars: 5 },
];

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

const rankBadges = [
  { label: 'AIR 1–50', count: '47 students', bg: '#fef3c7', color: '#92400e', icon: '🥇' },
  { label: 'AIR 51–100', count: '112 students', bg: '#fff1e8', color: '#c95516', icon: '🥈' },
  { label: 'AIR 101–500', count: '389 students', bg: '#e0f2fe', color: '#0369a1', icon: '🥉' },
  { label: 'NLU Selections', count: '1,000+', bg: '#ede9fe', color: '#5b21b6', icon: '🏛️' },
];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function TestiCard({ t }: { t: typeof testimonials[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'white',
        border: `1.5px solid ${hov ? t.color + '44' : '#F0F0F0'}`,
        borderRadius: '18px', padding: '20px',
        width: '280px', flexShrink: 0,
        boxShadow: hov ? `0 12px 32px ${t.color}22` : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'all .25s ease',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Accent top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${t.color},${t.color}88)`, borderRadius: '18px 18px 0 0' }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', marginTop: '4px' }}>
        <div style={{ color: t.color, fontSize: '36px', fontWeight: 900, lineHeight: 1, fontFamily: 'Georgia, serif' }}>"</div>
        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: t.color + '18', color: t.color }}>{t.college}</span>
      </div>

      {/* Stars */}
      <div style={{ color: '#f59e0b', fontSize: '12px', marginBottom: '8px' }}>{'★'.repeat(t.stars)}</div>

      {/* Quote */}
      <p style={{ color: '#374151', fontSize: '12px', lineHeight: 1.65, marginBottom: '14px', flex: 1 }}>{t.quote}</p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>{t.avatar}</div>
        <div>
          <div style={{ color: '#0D1837', fontWeight: 700, fontSize: '12px' }}>{t.name}</div>
          <div style={{ color: t.color, fontWeight: 700, fontSize: '10px' }}>{t.rank} · {t.year}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ cards, reverse }: { cards: typeof testimonials; reverse?: boolean }) {
  const doubled = [...cards, ...cards];
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,black 80px,black calc(100% - 80px),transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,black 80px,black calc(100% - 80px),transparent)' }}>
      <div style={{
        display: 'flex', gap: '14px',
        animation: `marquee${reverse ? 'Rev' : ''} 30s linear infinite`,
        width: 'max-content',
      }}>
        {doubled.map((t, i) => <TestiCard key={`${t.name}-${i}`} t={t} />)}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref, visible } = useReveal(0.1);

  return (
    <>
      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes marqueeRev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
      `}</style>

      <section style={{ background: '#0D1837', padding: '52px 0 48px', overflow: 'hidden' }}>
        {/* Header */}
        <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-10" style={{
          textAlign: 'center', marginBottom: '36px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity .6s ease, transform .6s ease',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '5px 14px', borderRadius: '99px', background: 'rgba(247,116,32,0.1)', border: '1px solid rgba(247,116,32,0.25)' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f77420', display: 'inline-block' }} />
            <span style={{ color: '#f77420', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Student Success</span>
          </div>
          <h2 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.15, marginBottom: '8px' }}>
            15,000+ Students<br />
            <span style={{ background: 'linear-gradient(90deg,#f77420,#ffad75)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trust CLATians</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '20px' }}>Real students, real NLU selections. Their success is our greatest achievement.</p>

          {/* Rank badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {rankBadges.map((b, i) => (
              <div key={b.label} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '99px',
                background: b.bg, color: b.color,
                fontSize: '12px', fontWeight: 700,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(10px)',
                transition: `opacity .5s ease ${0.2 + i * 0.08}s, transform .5s ease ${0.2 + i * 0.08}s`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                <span>{b.icon}</span>
                <span>{b.label}</span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>{b.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: two marquee rows */}
        <div className="hidden md:flex flex-col gap-4">
          <MarqueeRow cards={row1} />
          <MarqueeRow cards={row2} reverse />
        </div>

        {/* Mobile: single auto-scroll row */}
        <div className="md:hidden flex flex-col gap-4">
          <MarqueeRow cards={testimonials} />
        </div>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
          <div style={{ background: 'linear-gradient(90deg,#d95f18,#f77420)', borderRadius: '16px', padding: '16px 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            {['1000+ NLU Selections', '23+ NLUs Covered', '15+ Years Track Record'].map((stat, i, arr) => (
              <div key={stat} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{stat}</span>
                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '18px' }}>|</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
