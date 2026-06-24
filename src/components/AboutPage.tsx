'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Data ─────────────────────────────────────────── */
const stats = [
  { val: 5000, suffix: '+', label: 'NLU Selections', icon: '🏆' },
  { val: 125000, suffix: '+', label: 'Total Students', icon: '👥', display: '1.25L+' },
  { val: 20, suffix: '+', label: 'Expert Faculty', icon: '👨‍🏫' },
  { val: 12, suffix: '+', label: 'Years Excellence', icon: '📅' },
  { val: 4.9, suffix: '★', label: 'Student Rating', icon: '⭐', isFloat: true },
  { val: 1, suffix: '', label: 'CLAT Institute Bihar', icon: '🥇', display: '#1' },
];

const values = [
  { icon: '🎯', title: 'Student-First', desc: 'Every decision: "Does this help the student succeed?" No shortcuts, no compromises.', color: '#06b6d4', bg: 'linear-gradient(135deg,#e0f9ff,#cffafe)' },
  { icon: '📚', title: 'Expert Knowledge', desc: 'Faculty are NLU alumni and CLAT toppers — not just teachers from textbooks.', color: '#818cf8', bg: 'linear-gradient(135deg,#eef2ff,#e0e7ff)' },
  { icon: '🤝', title: 'Accessible Education', desc: 'Quality CLAT prep available regardless of city, background, or finances.', color: '#ffad75', bg: 'linear-gradient(135deg,#ecfdf5,#ffd4ba)' },
  { icon: '🏆', title: 'Results-Driven', desc: '5000+ NLU selections since 2012. Your rank is our report card.', color: '#fb923c', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)' },
];

const milestones = [
  { year: '2012', title: 'Founded in Patna', desc: 'Started with 15 students, one classroom, one mission.', icon: '🏫', color: '#06b6d4' },
  { year: '2014', title: 'First AIR 1', desc: 'Proved Bihar students can dominate nationally.', icon: '🏆', color: '#f59e0b' },
  { year: '2016', title: '500 Selections', desc: "Crossed first major milestone — Bihar's go-to CLAT coaching.", icon: '🎓', color: '#8b5cf6' },
  { year: '2018', title: 'Online Platform', desc: 'Launched online to reach students across India.', icon: '💻', color: '#ec4899' },
  { year: '2020', title: '2000+ Selections', desc: 'Zero disruption during pandemic — full digital pivot.', icon: '🌐', color: '#10b981' },
  { year: '2022', title: 'Mock Test Series', desc: '150+ AI-powered tests with rank predictor launched.', icon: '📝', color: '#ef4444' },
  { year: '2024', title: '#1 in Bihar', desc: '20+ faculty, 5000+ NLU selections milestone reached.', icon: '🥇', color: '#f97316' },
  { year: '2026', title: '1.25L+ Students', desc: 'National platform — offline, online, mentorship, mocks.', icon: '🚀', color: '#f77420' },
];

const team = [
  { name: 'Adv. Ravi Kumar', role: 'Founder & Legal Reasoning', avatar: 'RK', color: '#06b6d4', college: 'NALSAR Hyderabad', exp: '12 yrs' },
  { name: 'Dr. Neha Verma', role: 'GK & Current Affairs Head', avatar: 'NV', color: '#f59e0b', college: 'Patna University PhD', exp: '10 yrs' },
  { name: 'Dr. Ankita Roy', role: 'Constitutional Law Expert', avatar: 'AR', color: '#ffad75', college: 'NLU Jodhpur', exp: '11 yrs' },
  { name: 'Adv. Priya Singh', role: 'English & AILET Head', avatar: 'PS', color: '#818cf8', college: 'NLU Delhi', exp: '9 yrs' },
];

const whyClatians = [
  { icon: '🏛️', title: 'NLU Alumni Faculty', desc: 'Every subject taught by someone who cracked the exam.' },
  { icon: '📊', title: 'Data-Driven Teaching', desc: "Analytics guide each student's unique journey." },
  { icon: '🕐', title: 'Small Batches', desc: '30-seat offline batches. Individual attention guaranteed.' },
  { icon: '📱', title: 'App + Classroom', desc: 'Offline + online + app = prep from everywhere.' },
  { icon: '💰', title: 'EMI Available', desc: 'Flexible payment — fees never a barrier.' },
  { icon: '📞', title: 'Always Available', desc: 'Call 8507700177 Mon–Sat 9AM–7PM.' },
];

/* ─── useReveal hook ────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── AnimatedCounter ───────────────────────────────── */
function Counter({ target, suffix, display, isFloat }: { target: number; suffix: string; display?: string; isFloat?: boolean }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 2000; const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(parseFloat((eased * target).toFixed(isFloat ? 1 : 0)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, isFloat]);
  if (display) return <span ref={ref}>{display}</span>;
  if (isFloat) return <span ref={ref}>{val.toFixed(1)}{suffix}</span>;
  return <span ref={ref}>{val >= 1000 ? `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K` : val}{suffix}</span>;
}

/* ─── Snake Timeline ────────────────────────────────── */
function SnakeTimeline() {
  const { ref, visible } = useReveal(0.1);
  const svgRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (svgRef.current) setPathLen(svgRef.current.getTotalLength());
  }, []);

  // 8 items, x: 50,150,250,350,450,550,650,750 in viewBox 0 0 800 140
  // even y=35, odd y=105
  const pts = milestones.map((_, i) => ({ x: 50 + i * 100, y: i % 2 === 0 ? 35 : 105 }));
  const pathD = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = pts[i - 1];
    const mx = (prev.x + p.x) / 2;
    return `${acc} C ${mx},${prev.y} ${mx},${p.y} ${p.x},${p.y}`;
  }, '');

  return (
    <div ref={ref} className="px-4 md:px-6 pb-6 pt-4">
      {/* Desktop */}
      <div className="hidden md:block relative" style={{ height: '320px' }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 140"
          preserveAspectRatio="xMidYMid meet"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          {/* Glow track */}
          <path d={pathD} fill="none" stroke="rgba(247,116,32,0.12)" strokeWidth="12" strokeLinecap="round" />
          {/* Animated draw path */}
          <path
            ref={svgRef}
            d={pathD}
            fill="none"
            stroke="url(#timelineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={pathLen || 2000}
            strokeDashoffset={visible ? 0 : (pathLen || 2000)}
            style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1)' }}
          />
          <defs>
            <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="30%" stopColor="#8b5cf6" />
              <stop offset="60%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f77420" />
            </linearGradient>
          </defs>
        </svg>

        {/* Milestone items absolutely positioned */}
        {milestones.map((m, i) => {
          const isTop = i % 2 === 0;
          // x as % of container: (50 + i*100) / 800 * 100
          const xPct = ((50 + i * 100) / 800) * 100;
          // y of dot in viewBox: 35 or 105 out of 140 → % of container
          // container height 320px, svg is 140 units tall centered
          // We'll position using left% and top% relative to 320px
          // SVG viewBox 140 units, container 320px → scale = 320/140 ≈ 2.28
          // Actually let me just use fixed vertical positions based on top/bottom
          return (
            <div
              key={m.year}
              className="absolute flex flex-col items-center"
              style={{
                left: `${xPct}%`,
                transform: 'translateX(-50%)',
                top: 0,
                bottom: 0,
                width: '90px',
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s ease ${0.3 + i * 0.15}s, transform 0.4s ease ${0.3 + i * 0.15}s`,
                ...(visible ? {} : { transform: 'translateX(-50%) scale(0.7)' }),
              }}
            >
              {/* Card top */}
              {isTop && (
                <div className="bg-white rounded-xl p-2.5 text-center w-full"
                  style={{
                    border: `2px solid ${m.color}33`,
                    boxShadow: `0 4px 16px ${m.color}22`,
                    marginTop: '8px',
                  }}>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white inline-block mb-1"
                    style={{ background: m.color }}>{m.year}</span>
                  <div className="text-lg mb-0.5">{m.icon}</div>
                  <p className="text-[11px] font-black leading-tight" style={{ color: '#0D1837' }}>{m.title}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">{m.desc}</p>
                </div>
              )}

              {/* Spacer top */}
              {!isTop && <div style={{ flex: 1 }} />}

              {/* Connector line to dot */}
              <div className="w-0.5 flex-shrink-0"
                style={{
                  height: '28px',
                  background: `linear-gradient(to ${isTop ? 'bottom' : 'top'}, ${m.color}88, ${m.color})`,
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.3s ease ${0.5 + i * 0.15}s`,
                }} />

              {/* Dot */}
              <div
                className="flex-shrink-0 flex items-center justify-center text-lg rounded-full z-10"
                style={{
                  width: '46px', height: '46px',
                  background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`,
                  boxShadow: visible ? `0 0 0 6px ${m.color}22, 0 4px 16px ${m.color}44` : 'none',
                  transition: `box-shadow 0.4s ease ${0.6 + i * 0.15}s`,
                }}>
                {m.icon}
              </div>

              {/* Connector line below */}
              <div className="w-0.5 flex-shrink-0"
                style={{
                  height: '28px',
                  background: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, ${m.color}88, ${m.color})`,
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.3s ease ${0.5 + i * 0.15}s`,
                }} />

              {/* Card bottom */}
              {!isTop && (
                <div className="bg-white rounded-xl p-2.5 text-center w-full"
                  style={{
                    border: `2px solid ${m.color}33`,
                    boxShadow: `0 4px 16px ${m.color}22`,
                    marginBottom: '8px',
                  }}>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white inline-block mb-1"
                    style={{ background: m.color }}>{m.year}</span>
                  <div className="text-lg mb-0.5">{m.icon}</div>
                  <p className="text-[11px] font-black leading-tight" style={{ color: '#0D1837' }}>{m.title}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">{m.desc}</p>
                </div>
              )}

              {/* Spacer bottom */}
              {isTop && <div style={{ flex: 1 }} />}
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden relative pl-5 border-l-2" style={{ borderColor: '#f77420' }}>
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div key={m.year} className="relative pl-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.4s ease ${i * 0.1}s`,
              }}>
              <span className="absolute -left-[21px] top-3 w-3.5 h-3.5 rounded-full border-2 border-white shadow"
                style={{ background: m.color }} />
              <div className="rounded-xl p-3.5"
                style={{ background: '#F8FAFC', border: `1.5px solid ${m.color}33` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{m.icon}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full text-white"
                    style={{ background: m.color }}>{m.year}</span>
                </div>
                <p className="font-bold text-sm" style={{ color: '#0D1837' }}>{m.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Reveal wrapper ────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', from = 'bottom' }:
  { children: React.ReactNode; delay?: number; className?: string; from?: 'bottom' | 'left' | 'right' }) {
  const { ref, visible } = useReveal(0.1);
  const transforms: Record<string, string> = {
    bottom: 'translateY(32px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0,0)' : transforms[from],
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── Section Label ─────────────────────────────────── */
function Label({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-2">
      <span className="w-5 h-0.5 rounded-full" style={{ background: '#f77420' }} />
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f77420' }}>{text}</span>
      <span className="w-5 h-0.5 rounded-full" style={{ background: '#f77420' }} />
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes floatA{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(25px,-35px) scale(1.08)}}
        @keyframes floatB{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,28px) scale(0.94)}}
        @keyframes floatC{0%,100%{transform:translate(0,0)}33%{transform:translate(18px,16px)}66%{transform:translate(-12px,-18px)}}
        @keyframes pulseDot{0%,100%{box-shadow:0 0 0 0 rgba(247,116,32,0.5)}50%{box-shadow:0 0 0 10px rgba(247,116,32,0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .card-lift{transition:transform .22s ease,box-shadow .22s ease}
        .card-lift:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,0.1)!important}
        .btn-glow:hover{box-shadow:0 4px 20px rgba(247,116,32,0.5)!important}
        .dot-pulse{animation:pulseDot 2s infinite}
      `}</style>

      <main style={{ background: '#F8FAFC' }} className="pb-20 md:pb-0">

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <div className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #060d1f 0%, #0D1837 55%, #0f3460 100%)', minHeight: '76vh' }}>
          {/* Animated orbs */}
          <div className="absolute top-16 right-24 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: '#f77420', animation: 'floatA 9s ease-in-out infinite' }} />
          <div className="absolute bottom-12 left-8 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: '#06b6d4', animation: 'floatB 11s ease-in-out infinite' }} />
          <div className="absolute top-1/3 left-1/3 w-52 h-52 rounded-full opacity-8 blur-2xl pointer-events-none"
            style={{ background: '#818cf8', animation: 'floatC 13s ease-in-out infinite' }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '52px 52px' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-20">
            <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>›</span>
              <span className="text-white/70">About CLATians</span>
            </div>
            <div className="grid md:grid-cols-5 gap-10 items-center">
              {/* Text */}
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(247,116,32,0.12)', border: '1px solid rgba(247,116,32,0.3)' }}>
                  <span className="w-2 h-2 rounded-full dot-pulse" style={{ background: '#f77420' }} />
                  <span className="text-xs font-bold" style={{ color: '#f77420' }}>India&apos;s Most Trusted CLAT Institute</span>
                </div>
                <h1 className="text-2xl md:text-6xl font-black text-white leading-tight mb-4"
                  style={{ animation: 'floatB 0.01s ease both' }}>
                  Born in Patna.<br />
                  Built for <span style={{
                    background: 'linear-gradient(90deg, #f77420, #06b6d4, #f77420)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s linear infinite',
                  }}>Every</span><br />
                  CLAT Aspirant.
                </h1>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-8">
                  12 years. 5000+ NLU selections. One mission — turn every CLAT dream into a National Law University seat.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/admission"
                    className="text-center px-7 py-3.5 rounded-xl font-black text-white text-sm btn-glow transition-all hover:scale-105"
                    style={{ background: '#f77420', boxShadow: '0 4px 20px rgba(247,116,32,0.35)' }}>
                    Join CLATians →
                  </a>
                  <a href="tel:8507700177"
                    className="text-center px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:bg-white/15"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    📞 Free Counselling
                  </a>
                </div>
              </div>

              {/* Stat tiles */}
              <div className="hidden md:grid md:col-span-2 grid-cols-3 gap-3">
                {stats.map((s, i) => (
                  <div key={s.label} className="rounded-2xl px-3 py-4 text-center card-lift"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(8px)',
                      animationDelay: `${i * 0.1}s`,
                    }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-white font-black text-lg leading-none">
                      <Counter target={s.val} suffix={s.suffix} display={s.display} isFloat={s.isFloat} />
                    </div>
                    <div className="text-[10px] mt-1 leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stats horizontal scroll strip */}
        <div className="md:hidden overflow-x-auto scrollbar-none"
          style={{ background: 'linear-gradient(135deg,#060d1f,#0D1837)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex gap-2.5 px-4 py-4" style={{ width: 'max-content' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ flexShrink: 0, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '10px 12px', textAlign: 'center', minWidth: '78px' }}>
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>{s.icon}</div>
                <div style={{ color: 'white', fontWeight: 900, fontSize: '13px', lineHeight: 1 }}>
                  <Counter target={s.val} suffix={s.suffix} display={s.display} isFloat={s.isFloat} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '9px', marginTop: '3px', lineHeight: 1.2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 space-y-8">

          {/* ══ STORY ═══════════════════════════════════════════ */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <Reveal from="left">
              <div className="bg-white rounded-2xl p-6 h-full card-lift"
                style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                <Label text="Our Story" />
                <h2 className="text-2xl font-black mb-4 leading-snug" style={{ color: '#0D1837' }}>
                  From a Classroom in Patna<br />to India&apos;s #1 CLAT Institute
                </h2>
                <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                  <p>Founded in 2012 by NLU alumni who saw one truth: students from Bihar were just as talented — but lacked the platform to compete nationally.</p>
                  <p>We started with 15 students, one classroom, and one conviction — <strong className="text-gray-800">talent is equally distributed. Opportunity is not.</strong></p>
                  <p>Twelve years, 5000+ NLU selections and 1.25 lakh students later — that belief still drives every class we teach.</p>
                </div>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t" style={{ borderColor: '#F3F4F6' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0f3460, #f77420)' }}>RK</div>
                  <div>
                    <div className="font-bold text-gray-900 text-base">Adv. Ravi Kumar</div>
                    <div className="text-sm text-gray-500">Founder · NALSAR Hyderabad</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '🏛️', val: '5000+', desc: 'NLU Selections', dark: true },
                  { emoji: '👥', val: '1.25L+', desc: 'Students Trained', dark: false },
                  { emoji: '📍', val: '2012', desc: 'Founded Patna', dark: false },
                  { emoji: '🥇', val: '#1', desc: 'CLAT Bihar', accent: true },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl p-5 card-lift"
                    style={{
                      background: c.dark ? 'linear-gradient(135deg,#0D1837,#1f3160)' : c.accent ? 'linear-gradient(135deg,#06b6d4,#0891b2)' : '#F8FAFC',
                      border: (!c.dark && !c.accent) ? '1.5px solid #E9EEF2' : 'none',
                    }}>
                    <div className="text-3xl mb-2">{c.emoji}</div>
                    <div className="text-2xl font-black mb-0.5" style={{ color: (c.dark || c.accent) ? 'white' : '#0D1837' }}>{c.val}</div>
                    <div className="text-sm" style={{ color: (c.dark || c.accent) ? 'rgba(255,255,255,0.65)' : '#6B7280' }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ══ ANIMATED SNAKE TIMELINE ═════════════════════════ */}
          <Reveal>
            <div className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
              {/* Header bar */}
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #0f3460, #1a6b5c)' }}>
                <div className="text-center w-full">
                  <Label text="Our Journey" />
                  <h2 className="text-xl md:text-2xl font-black text-white">12 Years of Excellence</h2>
                </div>
              </div>
              <SnakeTimeline />
            </div>
          </Reveal>

          {/* ══ MISSION + VISION ════════════════════════════════ */}
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal from="left" delay={0}>
              <div className="rounded-2xl p-5 h-full card-lift"
                style={{ background: 'linear-gradient(135deg,#e0f9ff,#cffafe)', border: '1.5px solid #a5f3fc' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white shadow-sm flex-shrink-0">🎯</div>
                  <h3 className="text-xl font-black" style={{ color: '#0D1837' }}>Our Mission</h3>
                </div>
                <p className="text-base text-gray-600 leading-relaxed mb-3">To provide every CLAT aspirant — regardless of background, city, or finances — the same quality preparation that was once only for the privileged.</p>
                <p className="text-base font-bold" style={{ color: '#06b6d4' }}>CLATians exists to fix that.</p>
              </div>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <div className="rounded-2xl p-5 h-full card-lift"
                style={{ background: 'linear-gradient(135deg,#eef2ff,#e0e7ff)', border: '1.5px solid #c7d2fe' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white shadow-sm flex-shrink-0">🔭</div>
                  <h3 className="text-xl font-black" style={{ color: '#0D1837' }}>Our Vision</h3>
                </div>
                <p className="text-base text-gray-600 leading-relaxed mb-3">To become India&apos;s most trusted law entrance institute — where every student who walks in with a dream, walks out with a rank and an NLU seat.</p>
                <p className="text-base font-bold" style={{ color: '#818cf8' }}>Geography is never a barrier.</p>
              </div>
            </Reveal>
          </div>

          {/* ══ VALUES ══════════════════════════════════════════ */}
          <div>
            <Reveal>
              <div className="text-center mb-6">
                <Label text="What We Stand For" />
                <h2 className="text-2xl md:text-3xl font-black" style={{ color: '#0D1837' }}>Our Core Values</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="rounded-2xl p-4 md:p-5 flex flex-col h-full card-lift"
                    style={{ background: v.bg, border: `1.5px solid ${v.color}33` }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-white shadow-sm">{v.icon}</div>
                    <h3 className="font-black text-lg mb-2" style={{ color: '#0D1837' }}>{v.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{v.desc}</p>
                    <div className="mt-4 h-1 rounded-full" style={{ background: `linear-gradient(90deg,${v.color},${v.color}44)` }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ══ TEAM ════════════════════════════════════════════ */}
          <div>
            <Reveal>
              <div className="text-center mb-6">
                <Label text="The People Behind CLATians" />
                <h2 className="text-2xl md:text-3xl font-black" style={{ color: '#0D1837' }}>Our Leadership Team</h2>
              </div>
            </Reveal>
            {/* Desktop: grid */}
            <div className="hidden md:grid grid-cols-4 gap-4 mb-5">
              {team.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1}>
                  <a href={`/faculty/${t.name.toLowerCase().replace(/[\s.]/g, '-').replace(/--+/g, '-').replace(/-$/, '')}`}
                    className="group bg-white rounded-2xl overflow-hidden text-center block card-lift"
                    style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div className="h-1.5 transition-all group-hover:h-2.5"
                      style={{ background: `linear-gradient(90deg,${t.color},${t.color}88)` }} />
                    <div className="p-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-3"
                        style={{ background: `linear-gradient(135deg,${t.color},${t.color}88)` }}>
                        {t.avatar}
                      </div>
                      <h3 className="font-black text-base text-gray-900 mb-0.5">{t.name}</h3>
                      <p className="text-sm font-semibold mb-3" style={{ color: t.color }}>{t.role}</p>
                      <div className="text-xs text-gray-400 space-y-0.5 pt-3 border-t border-gray-50">
                        <div>🎓 {t.college}</div>
                        <div>📅 {t.exp} experience</div>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
            {/* Mobile: horizontal scroll */}
            <div className="md:hidden -mx-4 mb-5">
              <div className="flex gap-3 overflow-x-auto px-4 pb-3 scrollbar-none">
                {team.map((t) => (
                  <a key={t.name} href={`/faculty/${t.name.toLowerCase().replace(/[\s.]/g, '-').replace(/--+/g, '-').replace(/-$/, '')}`}
                    style={{ flexShrink: 0, width: '150px', background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #F0F0F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'block', textDecoration: 'none' }}>
                    <div style={{ height: '4px', background: `linear-gradient(90deg,${t.color},${t.color}88)` }} />
                    <div style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: `linear-gradient(135deg,${t.color},${t.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '20px', margin: '0 auto 10px' }}>{t.avatar}</div>
                      <div style={{ fontWeight: 800, fontSize: '12px', color: '#0D1837', marginBottom: '3px', lineHeight: 1.2 }}>{t.name}</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: t.color, marginBottom: '8px' }}>{t.role.split('&')[0].trim()}</div>
                      <div style={{ fontSize: '9px', color: '#9CA3AF' }}>🎓 {t.college}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="text-center">
              <a href="/#faculty"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-xl border-2 transition-all hover:bg-orange-50"
                style={{ borderColor: '#f77420', color: '#f77420' }}>
                View All 20+ Faculty Members →
              </a>
            </div>
          </div>

          {/* ══ WHY + CONTACT ═══════════════════════════════════ */}
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal from="left">
              <div className="bg-white rounded-2xl overflow-hidden card-lift h-full"
                style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div className="px-5 py-3" style={{ background: 'linear-gradient(135deg,#0f3460,#1a6b5c)' }}>
                  <h2 className="text-sm font-black text-white">⭐ What Makes CLATians Different</h2>
                </div>
                <div className="p-4 md:p-5 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3">
                  {whyClatians.map((w, i) => (
                    <div key={w.title} className="flex flex-col md:flex-row items-start gap-1.5 md:gap-3 p-2.5 md:p-3 rounded-xl transition-all hover:bg-orange-50 cursor-default"
                      style={{ background: '#F8FAFC', border: '1px solid #E9EEF2', animationDelay: `${i * 0.08}s` }}>
                      <span className="text-xl md:text-2xl flex-shrink-0">{w.icon}</span>
                      <div>
                        <h3 className="font-bold text-xs md:text-base leading-tight" style={{ color: '#0D1837' }}>{w.title}</h3>
                        <p className="hidden md:block text-sm text-gray-500 leading-relaxed">{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="bg-white rounded-2xl overflow-hidden card-lift h-full"
                style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div className="px-5 py-3" style={{ background: 'linear-gradient(135deg,#0f3460,#1a6b5c)' }}>
                  <h2 className="text-sm font-black text-white">📍 Visit Us in Patna</h2>
                </div>
                <div className="p-5 space-y-3">
                  <div className="rounded-2xl flex items-center justify-center py-8"
                    style={{ background: 'linear-gradient(135deg,#e0f9ff,#cffafe)', border: '1px solid #a5f3fc' }}>
                    <div className="text-center">
                      <div className="text-5xl mb-3" style={{ animation: 'floatB 4s ease-in-out infinite' }}>🗺️</div>
                      <p className="font-black text-gray-700 text-lg">CLATians, Patna</p>
                      <p className="text-gray-500 text-sm">2nd Floor, Gangotri Palace, Boring Rd</p>
                      <p className="text-gray-500 text-sm">Kidwaipuri, Patna, Bihar 800001</p>
                      <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                        className="mt-4 inline-block px-5 py-2 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                        style={{ background: '#0D1837' }}>Open in Maps →</a>
                    </div>
                  </div>
                  {[
                    { icon: '📞', label: 'Phone', val: '8507700177', href: 'tel:8507700177', color: '#f77420' },
                    { icon: '💬', label: 'WhatsApp', val: '8507700177', href: 'https://wa.me/918507700177', color: '#f77420' },
                    { icon: '⏰', label: 'Hours', val: 'Mon–Sat: 9AM–7PM · Online 7 days', href: null, color: '#6B7280' },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-orange-50"
                      style={{ background: '#F8FAFC', border: '1px solid #E9EEF2' }}>
                      <div className="text-xl w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: '#e0f9ff' }}>{c.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-gray-400">{c.label}</div>
                        {c.href
                          ? <a href={c.href} target={c.href.startsWith('https') ? '_blank' : undefined} rel="noreferrer"
                              className="text-base font-bold" style={{ color: c.color }}>{c.val}</a>
                          : <p className="text-base font-semibold text-gray-700">{c.val}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ══ CTA ═════════════════════════════════════════════ */}
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl p-8 text-center"
              style={{ background: 'linear-gradient(135deg,#060d1f,#0f3460,#1a6b5c)' }}>
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-2xl"
                style={{ background: '#f77420', animation: 'floatA 6s ease-in-out infinite' }} />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-15 blur-2xl"
                style={{ background: '#06b6d4', animation: 'floatB 8s ease-in-out infinite' }} />
              <div className="relative z-10">
                <div className="text-5xl mb-4" style={{ display: 'inline-block', animation: 'floatB 4s ease-in-out infinite' }}>🚀</div>
                <h3 className="font-black text-white text-2xl md:text-3xl mb-2 leading-tight">
                  Ready to Write Your<br />
                  <span style={{
                    background: 'linear-gradient(90deg,#f77420,#06b6d4,#f77420)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s linear infinite',
                  }}>NLU Success Story?</span>
                </h3>
                <p className="text-white/60 text-base mb-6 max-w-md mx-auto">
                  Join 1.25 lakh+ students who chose CLATians. Our experts are ready to guide you every step.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a href="/admission"
                    className="text-center px-8 py-3.5 rounded-xl font-black text-white text-sm hover:scale-105 transition-all btn-glow"
                    style={{ background: '#f77420', boxShadow: '0 4px 20px rgba(247,116,32,0.4)' }}>
                    Start Your Journey →
                  </a>
                  <a href="tel:8507700177"
                    className="text-center px-8 py-3.5 rounded-xl font-bold text-white text-sm hover:bg-white/15 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    📞 Free Counselling
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </main>
    </>
  );
}
