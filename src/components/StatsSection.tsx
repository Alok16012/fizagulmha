'use client';
import { useState, useEffect, useRef } from 'react';

const stats = [
  {
    num: 15000, suffix: '+', label: 'Success Stories',
    icon: '🏆', color: '#2563eb', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
    border: '#bfdbfe',
  },
  {
    num: 23, suffix: ' NLUs', label: 'Top NLU Access',
    icon: '🏛️', color: '#ea580c', bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)',
    border: '#fdba74',
  },
  {
    num: 25, suffix: '+', label: 'Expert Faculty',
    icon: '👨‍🏫', color: '#f77420', bg: 'linear-gradient(135deg,#f0fdf4,#ffd4ba)',
    border: '#86efac',
  },
  {
    num: 4.9, suffix: '/5', label: 'Student Trust',
    icon: '⭐', color: '#ca8a04', bg: 'linear-gradient(135deg,#fefce8,#fef08a)',
    border: '#fde047', isDecimal: true,
  },
];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimNum({ target, suffix, active, isDecimal }: { target: number; suffix: string; active: boolean; isDecimal?: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1600;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = e * target;
      setVal(isDecimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
      if (p < 1) requestAnimationFrame(tick); else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, isDecimal]);
  return <>{isDecimal ? val.toFixed(1) : val.toLocaleString()}{suffix}</>;
}

export default function StatsSection() {
  const { ref, visible } = useReveal(0.15);

  return (
    <>
      <style>{`
        @keyframes popIn{0%{transform:scale(.85);opacity:0}60%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}
        @keyframes countGlow{0%,100%{text-shadow:none}50%{text-shadow:0 0 20px currentColor}}
      `}</style>

      <section style={{ background: '#FCF8E7', padding: '28px 0 32px' }}>
        <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-10">

          {/* Desktop — 4 horizontal cards */}
          <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                background: s.bg,
                border: `1.5px solid ${s.border}`,
                borderRadius: '20px',
                padding: '24px 22px',
                opacity: visible ? 1 : 0,
                animation: visible ? `popIn .5s ease ${i * 0.1}s both` : 'none',
                boxShadow: `0 4px 20px ${s.color}18`,
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Bg icon watermark */}
                <div style={{
                  position: 'absolute', right: '-8px', bottom: '-8px',
                  fontSize: '64px', opacity: 0.12, lineHeight: 1,
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                  {s.icon}
                </div>

                {/* Icon badge */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', marginBottom: '14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}>
                  {s.icon}
                </div>

                {/* Number */}
                <div style={{
                  fontSize: '38px', fontWeight: 900, lineHeight: 1,
                  color: s.color, marginBottom: '6px',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  <AnimNum target={s.num} suffix={s.suffix} active={visible} isDecimal={s.isDecimal} />
                </div>

                {/* Label */}
                <div style={{
                  color: '#374151', fontWeight: 700, fontSize: '13px',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile — App-style 2×2 grid */}
          <div className="md:hidden grid grid-cols-2 gap-3 px-1">
            {stats.map((s, i) => (
              <div key={s.label} style={{
                background: s.bg, border: `1.5px solid ${s.border}`,
                borderRadius: '20px', padding: '18px 16px',
                opacity: visible ? 1 : 0,
                animation: visible ? `popIn .45s ease ${i * 0.08}s both` : 'none',
                position: 'relative', overflow: 'hidden',
                boxShadow: `0 4px 16px ${s.color}14`,
              }}>
                <div style={{ position: 'absolute', right: '-6px', bottom: '-6px', fontSize: '52px', opacity: 0.1, lineHeight: 1, pointerEvents: 'none' }}>{s.icon}</div>
                {/* Icon badge */}
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>{s.icon}</div>
                <div style={{ fontSize: '26px', fontWeight: 900, lineHeight: 1, color: s.color, marginBottom: '5px', fontVariantNumeric: 'tabular-nums' }}>
                  <AnimNum target={s.num} suffix={s.suffix} active={visible} isDecimal={s.isDecimal} />
                </div>
                <div style={{ color: '#374151', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
