'use client';
import { useState, useEffect, useRef } from 'react';

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

function useCounter(target: number, duration = 1500, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return val;
}

const services = [
  {
    icon: '📚',
    color: '#0f3460',
    accent: '#f77420',
    title: 'Live & Recorded Classes',
    desc: 'Daily expert faculty sessions + 600+ hours of recorded lectures accessible 24/7 on the app.',
    stat: 600, statSuffix: '+ hrs', statLabel: 'Recorded Content',
    tags: ['Live Daily', 'HD Video', 'Downloadable'],
    link: '/courses/online',
  },
  {
    icon: '📝',
    color: '#6d28d9',
    accent: '#8b5cf6',
    title: 'Full-Length Mock Tests',
    desc: 'Attempt up to 40 CLAT mock tests simulating real exam conditions with AI-powered analytics.',
    stat: 40, statSuffix: '', statLabel: 'Mock Tests',
    tags: ['AI Analysis', 'Rank Predictor', 'Peer Compare'],
    link: '/courses/mock-tests',
  },
  {
    icon: '💬',
    color: '#7a3412',
    accent: '#ffad75',
    title: 'Doubt Clearing Sessions',
    desc: 'Daily offline doubt sessions at Patna center + weekly live doubt clearing for online students.',
    stat: 7, statSuffix: 'x/week', statLabel: 'Sessions',
    tags: ['Offline + Online', 'WhatsApp Support', 'NLU Mentors'],
    link: '/courses/offline',
  },
];

const appFeatures = [
  'Interactive live classes with real faculty',
  'Mock tests and practice questions',
  'High-quality notes & PDF material',
  'Daily doubt solving on WhatsApp',
];

function ServiceCard({ s, idx, active }: { s: typeof services[number]; idx: number; active: boolean }) {
  const [hov, setHov] = useState(false);
  const count = useCounter(s.stat, 1200, active);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `linear-gradient(135deg, ${s.color}f0, ${s.color}cc)` : 'white',
        border: `1.5px solid ${hov ? s.accent + '55' : '#E9EEF2'}`,
        borderRadius: '20px',
        padding: '24px',
        transition: 'all .3s ease',
        boxShadow: hov ? `0 16px 40px ${s.color}33` : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-6px)' : `translateY(0)`,
        animationDelay: `${idx * 0.12}s`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg glow */}
      {hov && (
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: s.accent, opacity: 0.08, filter: 'blur(40px)', pointerEvents: 'none' }} />
      )}

      {/* Top row: icon + stat */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: hov ? 'rgba(255,255,255,0.15)' : `${s.accent}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', transition: 'all .3s',
          ...(hov ? { animation: 'iconFloat 2s ease-in-out infinite' } : {}),
        }}>
          {s.icon}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, color: hov ? 'white' : s.accent, lineHeight: 1, transition: 'color .3s' }}>
            {count}{s.statSuffix}
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: hov ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>
            {s.statLabel}
          </div>
        </div>
      </div>

      {/* Title */}
      <div style={{ fontSize: '17px', fontWeight: 800, color: hov ? 'white' : '#0D1837', lineHeight: 1.3, marginBottom: '8px', transition: 'color .3s' }}>
        {s.title}
      </div>

      {/* Desc */}
      <div style={{ fontSize: '13px', color: hov ? 'rgba(255,255,255,0.7)' : '#6B7280', lineHeight: 1.65, marginBottom: '16px', transition: 'color .3s' }}>
        {s.desc}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {s.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
            background: hov ? 'rgba(255,255,255,0.15)' : `${s.accent}15`,
            color: hov ? 'rgba(255,255,255,0.9)' : s.accent,
            border: `1px solid ${hov ? 'rgba(255,255,255,0.2)' : s.accent + '30'}`,
            transition: 'all .3s',
          }}>{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href={s.link} style={{
          fontSize: '13px', fontWeight: 700, color: hov ? 'white' : s.accent,
          textDecoration: 'none', transition: 'color .3s',
        }}>
          Learn more
        </a>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: hov ? 'rgba(255,255,255,0.2)' : `${s.accent}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', color: hov ? 'white' : s.accent,
          transition: 'all .3s',
          transform: hov ? 'translateX(3px)' : 'none',
        }}>→</div>
      </div>
    </div>
  );
}

export default function FeaturedServices() {
  const { ref: cardsRef, visible: cardsVisible } = useReveal(0.1);
  const { ref: appRef, visible: appVisible } = useReveal(0.1);

  return (
    <>
      <style>{`
        @keyframes iconFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes pulseRing{0%{transform:scale(1);opacity:.4}100%{transform:scale(1.6);opacity:0}}
      `}</style>

      {/* ── Desktop section ── */}
      <section className="hidden md:block" style={{ background: '#F8FAFC', padding: '52px 0 48px' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div ref={cardsRef} style={{
            textAlign: 'center', marginBottom: '32px',
            opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px', padding: '5px 14px', borderRadius: '99px', background: 'rgba(247,116,32,0.1)', border: '1px solid rgba(247,116,32,0.2)' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f77420', display: 'inline-block' }} />
              <span style={{ color: '#f77420', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>What We Offer</span>
            </div>
            <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.2, marginBottom: '6px' }}>
              Everything You Need to <span style={{ color: '#f77420' }}>Crack CLAT</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: '14px', maxWidth: '460px', margin: '0 auto' }}>
              Comprehensive tools built for every stage of your CLAT preparation.
            </p>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px',
            opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity .7s ease .1s, transform .7s ease .1s',
          }}>
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} idx={i} active={cardsVisible} />
            ))}
          </div>
          <div ref={appRef} style={{
            marginTop: '24px', borderRadius: '24px',
            background: 'linear-gradient(135deg, #0D1837 0%, #0f3460 50%, #0D1837 100%)',
            overflow: 'hidden', position: 'relative',
            opacity: appVisible ? 1 : 0, transform: appVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}>
            <div style={{ position: 'absolute', top: '-60px', right: '200px', width: '200px', height: '200px', borderRadius: '50%', background: '#f77420', opacity: 0.06, filter: 'blur(50px)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <div style={{ flex: 1, minWidth: '260px', padding: '36px 40px' }}>
                <h3 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 30px)', lineHeight: 1.2, marginBottom: '16px' }}>
                  Study anytime, <span style={{ background: 'linear-gradient(90deg,#f77420,#ffad75)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>anywhere</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {appFeatures.map((item, i) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f77420', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: 'white', fontSize: '10px', fontWeight: 800 }}>✓</span>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href="/courses" style={{ padding: '11px 22px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', background: '#f77420', color: 'white', textDecoration: 'none' }}>Start Online Course →</a>
                  <a href="tel:8507700177" style={{ padding: '11px 18px', borderRadius: '12px', fontWeight: 600, fontSize: '13px', border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>📞 Call Us</a>
                </div>
              </div>
              <div style={{ width: '260px', flexShrink: 0, padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg,#f77420,#7a3412)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', boxShadow: '0 12px 32px rgba(247,116,32,0.4)' }}>📱</div>
                  <div style={{ position: 'absolute', inset: '-8px', borderRadius: '28px', border: '2px solid rgba(247,116,32,0.3)', animation: 'pulseRing 2s ease-out infinite' }} />
                </div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>CLATians App</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '18px' }}>Download for iOS & Android</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '99px', background: 'rgba(247,116,32,0.15)', border: '1px solid rgba(247,116,32,0.3)', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px' }}>⭐</span>
                  <span style={{ color: '#f77420', fontWeight: 800, fontSize: '13px' }}>4.9</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>/ 5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile app-style services ── */}
      <section className="md:hidden" style={{ background: '#F8FAFC', padding: '24px 0 28px' }}>
        {/* Section header */}
        <div style={{ padding: '0 16px', marginBottom: '16px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(247,116,32,0.1)', border: '1px solid rgba(247,116,32,0.2)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f77420', display: 'inline-block' }} />
            <span style={{ color: '#f77420', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>What We Offer</span>
          </div>
          <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: '20px', lineHeight: 1.25, margin: 0 }}>
            Everything to <span style={{ color: '#f77420' }}>Crack CLAT</span>
          </h2>
        </div>

        {/* Service cards — vertical list */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {services.map((s) => (
            <a key={s.title} href={s.link} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white', borderRadius: '18px', overflow: 'hidden',
                border: '1.5px solid #F0F0F0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', gap: '0',
              }}>
                {/* Color accent left */}
                <div style={{ width: '5px', alignSelf: 'stretch', background: `linear-gradient(180deg,${s.color},${s.accent})`, flexShrink: 0 }} />
                {/* Icon */}
                <div style={{ width: '60px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 10px', background: `${s.accent}0d` }}>
                  <span style={{ fontSize: '28px' }}>{s.icon}</span>
                </div>
                {/* Content */}
                <div style={{ flex: 1, padding: '14px 12px' }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: '#0D1837', marginBottom: '3px' }}>{s.title}</div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: s.accent, lineHeight: 1, marginBottom: '3px' }}>{s.stat}{s.statSuffix}</div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ fontSize: '10px', color: s.accent, background: `${s.accent}15`, padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '0 14px', color: s.accent, fontSize: '18px', flexShrink: 0 }}>→</div>
              </div>
            </a>
          ))}
        </div>

        {/* App download banner */}
        <div style={{ margin: '16px 16px 0', borderRadius: '20px', background: 'linear-gradient(135deg,#0D1837,#0f3460)', padding: '20px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: '#f77420', opacity: 0.08, filter: 'blur(30px)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg,#f77420,#7a3412)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 8px 20px rgba(247,116,32,0.4)' }}>📱</div>
              <div style={{ position: 'absolute', inset: '-5px', borderRadius: '21px', border: '2px solid rgba(247,116,32,0.3)', animation: 'pulseRing 2s ease-out infinite' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '15px', marginBottom: '2px' }}>CLATians App</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                <span style={{ color: '#f59e0b', fontSize: '11px' }}>★★★★★</span>
                <span style={{ color: '#f77420', fontWeight: 700, fontSize: '11px' }}>4.9</span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>· 10k+ downloads</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 10px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
                  <span style={{ fontSize: '14px' }}>🍎</span>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '8px', fontWeight: 600 }}>IOS</div>
                    <div style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>App Store</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 10px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
                  <span style={{ fontSize: '14px' }}>▶</span>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '8px', fontWeight: 600 }}>ANDROID</div>
                    <div style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
