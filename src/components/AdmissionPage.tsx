'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import CourseTabsSection from '@/components/CourseTabsSection';

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

/* ─── Countdown Hook ────────────────────────────────── */
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

/* ─── Data ──────────────────────────────────────────── */
const enrollments = [
  { name: 'Ankit', city: 'Patna', time: '2 hrs ago', program: 'Offline Batch' },
  { name: 'Priya', city: 'Delhi', time: '25 mins ago', program: 'Online Batch' },
  { name: 'Rohan', city: 'Lucknow', time: '1 hr ago', program: 'Mentorship' },
  { name: 'Sneha', city: 'Mumbai', time: '3 hrs ago', program: 'Offline Batch' },
  { name: 'Vikram', city: 'Jaipur', time: '45 mins ago', program: 'Mock Tests' },
  { name: 'Kavya', city: 'Ranchi', time: '2 hrs ago', program: 'Online Batch' },
  { name: 'Arjun', city: 'Varanasi', time: '4 hrs ago', program: 'Offline Batch' },
  { name: 'Ritika', city: 'Chandigarh', time: '30 mins ago', program: 'Mentorship' },
  { name: 'Dev', city: 'Bhopal', time: '1 hr 15 mins ago', program: 'Online Batch' },
  { name: 'Ananya', city: 'Kolkata', time: '50 mins ago', program: 'Mock Tests' },
];

const recentStudents = [
  { name: 'Rahul K.', city: 'Patna', program: 'Offline Batch', time: '10 min ago', avatar: 'RK', color: '#06b6d4' },
  { name: 'Simran P.', city: 'Delhi', program: 'Online Batch', time: '28 min ago', avatar: 'SP', color: '#8b5cf6' },
  { name: 'Aman S.', city: 'Lucknow', program: 'Mentorship', time: '1 hr ago', avatar: 'AS', color: '#f59e0b' },
  { name: 'Neha B.', city: 'Ranchi', program: 'Mock Tests', time: '2 hrs ago', avatar: 'NB', color: '#ec4899' },
];

const programs = [
  {
    name: 'Offline Batch',
    icon: '🏛️',
    duration: '12 Months',
    fee: '₹75,000',
    emi: '₹6,250/mo',
    seats: 8,
    totalSeats: 30,
    color: '#0f3460',
    accent: '#08BD80',
    badge: '🔥 Almost Full',
    features: ['Personal mentorship', 'Daily classes 4hrs', 'Study material', '150+ mocks', 'Doubt sessions'],
  },
  {
    name: 'Online Batch',
    icon: '💻',
    duration: '12 Months',
    fee: '₹45,000',
    emi: '₹3,750/mo',
    seats: 999,
    totalSeats: 999,
    color: '#6d28d9',
    accent: '#8b5cf6',
    badge: '⭐ Most Popular',
    features: ['Live classes', 'Recorded lectures', 'Study material', '150+ mocks', 'Doubt clearing'],
  },
  {
    name: 'Mentorship',
    icon: '🎯',
    duration: '6–12 Months',
    fee: '₹1,20,000',
    emi: '₹10,000/mo',
    seats: 3,
    totalSeats: 10,
    color: '#065f46',
    accent: '#34d399',
    badge: '👑 Premium',
    features: ['1-on-1 sessions', 'Personalized plan', 'All materials', 'Priority doubt', 'NLU counselling'],
  },
  {
    name: 'Mock Tests',
    icon: '📝',
    duration: '12 Months',
    fee: '₹8,999',
    emi: 'One-time',
    seats: 999,
    totalSeats: 999,
    color: '#92400e',
    accent: '#f59e0b',
    badge: '💡 Best Value',
    features: ['150+ full mocks', 'AI analytics', 'Rank predictor', 'Solutions PDF', 'Leaderboard'],
  },
];

const trustPoints = [
  { icon: '🏆', title: '5000+ NLU Selections', desc: 'Track record since 2012. Students from every batch cracked top NLUs.' },
  { icon: '👨‍🏫', title: 'NLU Alumni Faculty', desc: '20+ experts who are NLU graduates, advocates, and CLAT toppers themselves.' },
  { icon: '📝', title: '150+ Mock Tests', desc: 'Most comprehensive mock series with AI analytics and rank predictor.' },
  { icon: '🎯', title: 'Small Batches', desc: '30-seat offline limit ensures personal attention. Not just another number.' },
  { icon: '💰', title: 'EMI Available', desc: 'Flexible payment — fees never a barrier to quality education.' },
  { icon: '📱', title: 'App + Web Access', desc: 'Study anywhere via mobile app and web platform. 24/7 access.' },
];

const toppers = [
  { name: 'Aman Deep', air: 'AIR 23', college: 'NLU Delhi', avatar: 'AD', color: '#6366f1' },
  { name: 'Priya S.', air: 'AIR 47', college: 'NALSAR', avatar: 'PS', color: '#ec4899' },
  { name: 'Rohan G.', air: 'AIR 12', college: 'NLU Delhi', avatar: 'RG', color: '#f59e0b' },
  { name: 'Kavya R.', air: 'AIR 34', college: 'NALSAR', avatar: 'KR', color: '#10b981' },
];

const testimonials = [
  {
    name: 'Aman Deep Singh',
    air: 'AIR 23',
    college: 'NLU Delhi',
    year: 'CLAT 2024',
    avatar: 'AD',
    color: '#6366f1',
    quote: "CLATians gave me the structure, mentors, and mock tests I needed. The legal reasoning coaching is absolutely unmatched. Couldn't have cracked NLU Delhi without this team.",
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    air: 'AIR 47',
    college: 'NALSAR Hyderabad',
    year: 'CLAT 2024',
    avatar: 'PS',
    color: '#ec4899',
    quote: 'The online program was incredibly flexible. I got personalized mentorship while studying from home. Mock analytics helped me improve 40+ ranks in final weeks.',
    stars: 5,
  },
  {
    name: 'Vikram Mishra',
    air: 'AIR 156',
    college: 'GNLU Gandhinagar',
    year: 'CLAT 2024',
    avatar: 'VM',
    color: '#08BD80',
    quote: "I was a dropper who had failed CLAT twice. CLATians' personalized approach completely changed my strategy. Third attempt — AIR 156 and GNLU confirmed.",
    stars: 5,
  },
];

const applySteps = [
  { num: '1', title: 'Call / Fill Form', desc: 'Call 8507700177 or fill the form below. Our counsellor responds within 2 hours.', icon: '📞' },
  { num: '2', title: 'Free Counselling', desc: 'Free 30-min session — expert assesses your level and recommends the right program.', icon: '🤝' },
  { num: '3', title: 'Select Program', desc: 'Choose Offline, Online, Mentorship, or Mock Tests based on your needs.', icon: '🎯' },
  { num: '4', title: 'Pay & Enroll', desc: 'Complete payment (EMI available). Access starts immediately after enrollment.', icon: '✅' },
];

/* ─── Live Enrollment Toast ─────────────────────────── */
function EnrollmentToast() {
  const [current, setCurrent] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const idxRef = useRef(0);

  const showNext = useCallback(() => {
    const idx = idxRef.current % enrollments.length;
    idxRef.current += 1;
    setCurrent(idx);
    setVisible(true);
    const hideTimer = setTimeout(() => setVisible(false), 4000);
    return hideTimer;
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      const hideTimer = showNext();
      const interval = setInterval(() => {
        clearTimeout(hideTimer);
        showNext();
      }, 5000);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(delay);
  }, [showNext]);

  if (current === null) return null;
  const enroll = enrollments[current];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '16px',
        zIndex: 9999,
        transform: visible ? 'translateX(0)' : 'translateX(-120%)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        maxWidth: '280px',
        background: 'white',
        borderRadius: '14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1.5px solid #E9EEF2',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #08BD80, #06a865)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '13px',
        }}>
          {enroll.name[0]}
        </div>
        <div style={{
          position: 'absolute', bottom: '1px', right: '1px',
          width: '10px', height: '10px', borderRadius: '50%',
          background: '#22c55e', border: '2px solid white',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0D1837', lineHeight: 1.3 }}>
          {enroll.name} from {enroll.city}
        </div>
        <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '1px' }}>
          Enrolled in {enroll.program} · {enroll.time}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '14px', flexShrink: 0, padding: '2px' }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
export default function AdmissionPage() {
  const heroReveal = useReveal(0.1);
  const urgencyReveal = useReveal(0.1);
  const programsReveal = useReveal(0.1);
  const stepsReveal = useReveal(0.1);
  const formReveal = useReveal(0.1);
  const testimonialsReveal = useReveal(0.1);
  const finalCtaReveal = useReveal(0.1);

  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', city: '',
    program: '', currentClass: '', requirements: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  const PROGRAM_LABELS: Record<string, string> = {
    offline: 'Offline Batch — ₹75,000',
    online: 'Online Batch — ₹45,000',
    mentorship: 'Mentorship — ₹1,20,000',
    mock: 'Mock Test Series — ₹8,999',
  };
  const CLASS_LABELS: Record<string, string> = {
    '11': 'Class 11', '12': 'Class 12', dropper: 'Dropper / Repeat', graduate: 'Graduate',
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const messageParts = [
      formData.city && `City: ${formData.city}`,
      formData.currentClass && `Class: ${CLASS_LABELS[formData.currentClass] || formData.currentClass}`,
      formData.requirements && `Requirements: ${formData.requirements}`,
    ].filter(Boolean);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.mobile.trim(),
          email: formData.email.trim(),
          program: PROGRAM_LABELS[formData.program] || formData.program,
          exam: 'CLAT',
          message: messageParts.join(' | '),
          source: 'admission',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Live Enrollment Toast */}
      <EnrollmentToast />

      {/* ── HERO ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #060d1f 0%, #0D1837 50%, #0f3460 100%)',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        {/* Animated orbs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,189,128,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '30%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div
          ref={heroReveal.ref}
          className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-center"
          style={{
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Left 3 cols */}
          <div className="md:col-span-3">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(8,189,128,0.15)', border: '1px solid rgba(8,189,128,0.3)',
              borderRadius: '99px', padding: '6px 14px', marginBottom: '20px',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#08BD80', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#08BD80', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>
                ADMISSIONS OPEN — 2026 BATCH
              </span>
            </div>

            <h1 style={{
              color: 'white', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.15, marginBottom: '16px',
            }}>
              Secure Your NLU Seat.<br />
              <span style={{ color: '#08BD80' }}>Apply for CLATians 2026</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>
              <span style={{ color: '#f59e0b', fontWeight: 700 }}>⚡ Offline batch: Only 8 seats left.</span>{' '}
              Online enrollment open. Join 5000+ NLU qualifiers.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {['✅ 5000+ NLU Selections', '✅ 12+ Years', '✅ AIR 1 Multiple Times', '✅ EMI Available'].map(badge => (
                <span key={badge} style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px', padding: '6px 12px',
                  color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 600,
                }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:8507700177"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#08BD80', color: 'white', fontWeight: 700, fontSize: '14px', padding: '14px 24px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(8,189,128,0.4)' }}>
                📞 Call Now — 8507700177
              </a>
              <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#075E54', color: 'white', fontWeight: 700, fontSize: '14px', padding: '14px 24px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right 2 cols — Recent Enrollments card (desktop only) */}
          <div
            className="hidden md:block md:col-span-2"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255,255,255,0.12)',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>Recent Enrollments</span>
              <span style={{ marginLeft: 'auto', background: 'rgba(8,189,128,0.2)', color: '#08BD80', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px' }}>
                LIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentStudents.map((s) => (
                <div key={s.name} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 12px',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '12px', flexShrink: 0,
                  }}>
                    {s.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '12px' }}>{s.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px' }}>{s.program} · {s.city}</div>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', flexShrink: 0 }}>{s.time}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <a href="#form" style={{
                display: 'block', background: '#08BD80', color: 'white',
                fontWeight: 700, fontSize: '13px', padding: '10px',
                borderRadius: '10px', textDecoration: 'none',
              }}>
                Apply Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY STRIP ── */}
      <div
        ref={urgencyReveal.ref}
        style={{
          background: 'linear-gradient(90deg, #065f46, #08BD80, #065f46)',
          padding: '12px 0',
          overflow: 'hidden',
          opacity: urgencyReveal.visible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '8px',
        }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '13px', textAlign: 'center', padding: '0 16px' }}>
            🔥 Offline Batch 2026 — 22 of 30 seats filled
            <span style={{ margin: '0 12px', opacity: 0.6 }}>·</span>
            Online Enrollment Open
            <span style={{ margin: '0 12px', opacity: 0.6 }}>·</span>
            Admissions Close Dec 31
            <span style={{ margin: '0 12px', opacity: 0.6 }}>·</span>
            📞 8507700177
          </span>
        </div>
      </div>

      {/* ── CSAT 2026 SCHOLARSHIP TEST ── */}
      <CsatSection />

      {/* ── REAL BATCHES ── */}
      <section style={{ background: '#F8FAFC', padding: '60px 0' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ background: '#E6FAF4', color: '#08BD80', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '10px' }}>
              CHOOSE YOUR BATCH
            </span>
            <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', marginBottom: '8px' }}>
              Available Batches — 2026 / 2027
            </h2>
            <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
              Real batches, real seats. Click any batch to view full details and enroll.
            </p>
          </div>
          <CourseTabsSection />
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section style={{ background: 'white' }} className="py-10 md:py-[72px]">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div
            ref={stepsReveal.ref}
            style={{
              opacity: stepsReveal.visible ? 1 : 0,
              transform: stepsReveal.visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{
                background: '#EFF6FF', color: '#3b82f6', fontSize: '12px', fontWeight: 700,
                padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '12px',
              }}>
                HOW TO APPLY
              </span>
              <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '10px' }}>
                Simple 4-Step Admission Process
              </h2>
              <p style={{ color: '#6B7280', fontSize: '15px' }}>From inquiry to enrollment — done in under 24 hours.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', position: 'relative' }}>
              {applySteps.map((step, idx) => (
                <div key={step.num} style={{ textAlign: 'center', position: 'relative' }}>
                  {/* Dashed connector */}
                  {idx < applySteps.length - 1 && (
                    <div style={{
                      position: 'absolute', top: '28px', left: 'calc(50% + 32px)',
                      width: 'calc(100% - 64px)', height: '2px',
                      borderTop: '2px dashed #D1D5DB',
                      display: 'none',
                    }}
                      className="md:block"
                    />
                  )}

                  {/* Number circle */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0D1837, #0f3460)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: '0 4px 16px rgba(13,24,55,0.25)',
                    fontSize: '20px', fontWeight: 900, color: 'white',
                    position: 'relative',
                  }}>
                    {step.num}
                  </div>

                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{step.icon}</div>

                  <div style={{
                    background: 'white', borderRadius: '16px',
                    border: '1.5px solid #E9EEF2',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    padding: '16px',
                  }}>
                    <h3 style={{ color: '#0D1837', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: '#6B7280', fontSize: '12px', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM + TRUST SIDEBAR ── */}
      <section style={{ background: '#F8FAFC' }} className="py-10 md:py-[72px]" id="form">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div
            ref={formReveal.ref}
            style={{
              opacity: formReveal.visible ? 1 : 0,
              transform: formReveal.visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {/* Form */}
            <div>
              <span style={{
                background: '#E6FAF4', color: '#08BD80', fontSize: '12px', fontWeight: 700,
                padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '16px',
              }}>
                FREE COUNSELLING
              </span>
              <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(22px, 2.5vw, 30px)', marginBottom: '8px' }}>
                Apply for CLATians 2026
              </h2>
              <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '28px' }}>
                Fill your details — our counsellor will call within 2 hours. 100% free.
              </p>

              {submitted ? (
                <div style={{
                  background: '#E6FAF4', border: '2px solid #08BD80',
                  borderRadius: '16px', padding: '32px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
                  <h3 style={{ color: '#065f46', fontWeight: 800, fontSize: '18px', marginBottom: '6px' }}>
                    Application Received!
                  </h3>
                  <p style={{ color: '#374151', fontSize: '13px' }}>
                    Our counsellor will call you at {formData.mobile} within 2 hours. Thank you!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      style={{
                        width: '100%', padding: '12px 16px', fontSize: '14px',
                        border: '1.5px solid #E9EEF2', borderRadius: '12px',
                        outline: 'none', background: 'white', color: '#0D1837',
                        boxSizing: 'border-box',
                        transition: 'border-color .2s ease',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#08BD80')}
                      onBlur={e => (e.target.style.borderColor = '#E9EEF2')}
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      required
                      pattern="[0-9]{10}"
                      style={{
                        width: '100%', padding: '12px 16px', fontSize: '14px',
                        border: '1.5px solid #E9EEF2', borderRadius: '12px',
                        outline: 'none', background: 'white', color: '#0D1837',
                        boxSizing: 'border-box',
                        transition: 'border-color .2s ease',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#08BD80')}
                      onBlur={e => (e.target.style.borderColor = '#E9EEF2')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={{
                        width: '100%', padding: '12px 16px', fontSize: '14px',
                        border: '1.5px solid #E9EEF2', borderRadius: '12px',
                        outline: 'none', background: 'white', color: '#0D1837',
                        boxSizing: 'border-box',
                        transition: 'border-color .2s ease',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#08BD80')}
                      onBlur={e => (e.target.style.borderColor = '#E9EEF2')}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      City / State
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Patna, Bihar"
                      style={{
                        width: '100%', padding: '12px 16px', fontSize: '14px',
                        border: '1.5px solid #E9EEF2', borderRadius: '12px',
                        outline: 'none', background: 'white', color: '#0D1837',
                        boxSizing: 'border-box',
                        transition: 'border-color .2s ease',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#08BD80')}
                      onBlur={e => (e.target.style.borderColor = '#E9EEF2')}
                    />
                  </div>

                  {/* Program */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Program Interested In *
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%', padding: '12px 16px', fontSize: '14px',
                        border: '1.5px solid #E9EEF2', borderRadius: '12px',
                        outline: 'none', background: 'white', color: '#374151',
                        boxSizing: 'border-box',
                        transition: 'border-color .2s ease',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#08BD80')}
                      onBlur={e => (e.target.style.borderColor = '#E9EEF2')}
                    >
                      <option value="">Select program</option>
                      <option value="offline">Offline Batch — ₹75,000</option>
                      <option value="online">Online Batch — ₹45,000</option>
                      <option value="mentorship">Mentorship — ₹1,20,000</option>
                      <option value="mock">Mock Test Series — ₹8,999</option>
                    </select>
                  </div>

                  {/* Current Class */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Current Class / Year
                    </label>
                    <select
                      name="currentClass"
                      value={formData.currentClass}
                      onChange={handleChange}
                      style={{
                        width: '100%', padding: '12px 16px', fontSize: '14px',
                        border: '1.5px solid #E9EEF2', borderRadius: '12px',
                        outline: 'none', background: 'white', color: '#374151',
                        boxSizing: 'border-box',
                        transition: 'border-color .2s ease',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#08BD80')}
                      onBlur={e => (e.target.style.borderColor = '#E9EEF2')}
                    >
                      <option value="">Select</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                      <option value="dropper">Dropper / Repeat</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>

                  {/* Requirements */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Any specific requirements? <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Scholarship need, preferred batch timing, etc."
                      rows={3}
                      style={{
                        width: '100%', padding: '12px 16px', fontSize: '14px',
                        border: '1.5px solid #E9EEF2', borderRadius: '12px',
                        outline: 'none', background: 'white', color: '#0D1837',
                        resize: 'vertical', fontFamily: 'inherit',
                        boxSizing: 'border-box',
                        transition: 'border-color .2s ease',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#08BD80')}
                      onBlur={e => (e.target.style.borderColor = '#E9EEF2')}
                    />
                  </div>

                  {error && (
                    <p style={{ color: '#dc2626', fontSize: '13px', fontWeight: 600, margin: 0 }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%', padding: '14px',
                      background: 'linear-gradient(135deg, #08BD80, #06a865)',
                      color: 'white', fontWeight: 800, fontSize: '15px',
                      borderRadius: '12px', border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                      boxShadow: '0 4px 20px rgba(8,189,128,0.35)',
                      transition: 'transform .2s ease, box-shadow .2s ease',
                    }}
                    onMouseEnter={e => {
                      if (submitting) return;
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(8,189,128,0.45)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(8,189,128,0.35)';
                    }}
                  >
                    {submitting ? 'Submitting…' : 'Get Free Counselling →'}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                    📞 Or call directly: <a href="tel:8507700177" style={{ color: '#08BD80', fontWeight: 700, textDecoration: 'none' }}>8507700177</a>
                    <span style={{ margin: '0 6px', color: '#D1D5DB' }}>·</span>
                    Avg response time: &lt; 2 hours
                  </p>
                </form>
              )}
            </div>

            {/* Trust Sidebar */}
            <div style={{
              background: 'white', borderRadius: '20px',
              border: '1.5px solid #E9EEF2',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, #0D1837, #0f3460)',
                padding: '20px 24px',
              }}>
                <h3 style={{ color: 'white', fontWeight: 800, fontSize: '17px', marginBottom: '4px' }}>
                  Why 1.25 Lakh Students Trust CLATians
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                  12+ years of NLU selections. Proven results.
                </p>
              </div>

              <div style={{ padding: '20px 24px' }}>
                {/* Trust points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {trustPoints.map((tp) => (
                    <div key={tp.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ fontSize: '20px', flexShrink: 0, lineHeight: 1.3 }}>{tp.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#0D1837', marginBottom: '2px' }}>{tp.title}</div>
                        <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.5 }}>{tp.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Toppers bar */}
                <div style={{
                  background: '#F8FAFC', borderRadius: '14px',
                  border: '1.5px solid #E9EEF2', padding: '14px',
                  marginBottom: '16px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Recent Toppers
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {toppers.map((t) => (
                      <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '30px', height: '30px', borderRadius: '50%',
                          background: t.color, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 700, flexShrink: 0,
                        }}>{t.avatar}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#0D1837' }}>{t.name}</div>
                          <div style={{ fontSize: '10px', color: '#6B7280' }}>{t.college}</div>
                        </div>
                        <span style={{
                          background: '#E6FAF4', color: '#065f46',
                          fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '99px', flexShrink: 0,
                        }}>
                          {t.air}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div style={{
                  textAlign: 'center', padding: '12px',
                  background: '#FFFBEB', borderRadius: '12px', marginBottom: '14px',
                  border: '1px solid #FDE68A',
                }}>
                  <div style={{ fontSize: '18px', marginBottom: '2px' }}>⭐⭐⭐⭐⭐</div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#92400e' }}>4.9 / 5</div>
                  <div style={{ fontSize: '11px', color: '#78716c', marginTop: '2px' }}>2,400+ verified reviews</div>
                </div>

                {/* Call button */}
                <a
                  href="tel:8507700177"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #08BD80, #06a865)',
                    color: 'white', fontWeight: 700, fontSize: '14px',
                    padding: '12px', borderRadius: '12px', textDecoration: 'none',
                    boxShadow: '0 3px 12px rgba(8,189,128,0.3)',
                  }}
                >
                  📞 Call us FREE — 8507700177
                </a>
                <p style={{ textAlign: 'center', fontSize: '11px', color: '#9CA3AF', marginTop: '6px' }}>
                  Mon–Sat · 9 AM–7 PM · No spam, guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE RESOURCES ── */}
      <FreeResourcesSection />

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: 'white', padding: '72px 0' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div
            ref={testimonialsReveal.ref}
            style={{
              opacity: testimonialsReveal.visible ? 1 : 0,
              transform: testimonialsReveal.visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{
                background: '#FEF3C7', color: '#92400e', fontSize: '12px', fontWeight: 700,
                padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '12px',
              }}>
                STUDENT REVIEWS
              </span>
              <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '10px' }}>
                Real Students, Real NLU Selections
              </h2>
              <p style={{ color: '#6B7280', fontSize: '15px' }}>
                Their success is our greatest achievement.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section
        ref={finalCtaReveal.ref}
        style={{
          background: 'linear-gradient(135deg, #060d1f 0%, #0D1837 60%, #0f3460 100%)',
          padding: '72px 0',
          position: 'relative',
          overflow: 'hidden',
          opacity: finalCtaReveal.visible ? 1 : 0,
          transform: finalCtaReveal.visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,189,128,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-10" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '99px', padding: '6px 14px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '12px', color: '#fca5a5', fontWeight: 700 }}>
              🔥 Only 8 offline seats remaining
            </span>
          </div>

          <h2 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 44px)', marginBottom: '14px' }}>
            Ready to Join CLATians 2026?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Offline batch fills up every year. Secure your seat today — call us or fill the form above.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="tel:8507700177"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#08BD80', color: 'white', fontWeight: 700, fontSize: '15px',
                padding: '14px 32px', borderRadius: '12px', textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(8,189,128,0.4)',
              }}
            >
              📞 Call Now — 8507700177
            </a>
            <a
              href="#form"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: '15px',
                padding: '14px 32px', borderRadius: '12px', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              📋 Fill Application Form
            </a>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '20px' }}>
            No commitment required · Free counselling session · EMI available
          </p>
        </div>
      </section>

      {/* ── MOBILE STICKY BAR ── */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 9998,
          display: 'flex',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <a
          href="tel:8507700177"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            background: '#08BD80', color: 'white', fontWeight: 700, fontSize: '14px',
            padding: '14px', textDecoration: 'none',
          }}
        >
          📞 Call Now
        </a>
        <a
          href="https://wa.me/918507700177"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            background: '#075E54', color: 'white', fontWeight: 700, fontSize: '14px',
            padding: '14px', textDecoration: 'none',
          }}
        >
          💬 WhatsApp
        </a>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="md:hidden" style={{ height: '54px' }} />
    </>
  );
}

/* ─── Testimonial Card ───────────────────────────────── */
type Testimonial = typeof testimonials[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '18px',
        border: '1.5px solid #E9EEF2',
        boxShadow: hovered ? '0 10px 32px rgba(0,0,0,0.10)' : '0 2px 6px rgba(0,0,0,0.04)',
        padding: '22px',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform .22s ease, box-shadow .22s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* College badge */}
      <div style={{
        position: 'absolute', top: '16px', right: '16px',
        background: t.color + '20', color: t.color,
        fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px',
      }}>
        {t.college}
      </div>

      {/* Quote mark */}
      <div style={{ fontSize: '48px', fontWeight: 900, color: '#08BD80', lineHeight: 1, marginBottom: '4px', marginTop: '-6px' }}>
        &ldquo;
      </div>

      {/* Stars */}
      <div style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '10px' }}>
        {'⭐'.repeat(t.stars)}
      </div>

      {/* Quote */}
      <p style={{ color: 'rgba(0,0,0,0.78)', fontSize: '13px', lineHeight: 1.65, flex: 1, marginBottom: '16px' }}>
        {t.quote}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: t.color, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '12px', flexShrink: 0,
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#0D1837' }}>{t.name}</div>
          <div style={{ fontSize: '11px', color: '#08BD80', fontWeight: 600 }}>{t.air} · {t.year}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── CSAT 2026 Scholarship Section ─────────────────── */
const scholarshipSlabs = [
  { marks: '49–50', discount: '100%', bg: '#fef3c7', color: '#92400e', badge: '🏆 Full Scholarship' },
  { marks: '46–48', discount: '70%',  bg: '#dcfce7', color: '#166534', badge: '🥇 Gold' },
  { marks: '41–45', discount: '50%',  bg: '#dbeafe', color: '#1d4ed8', badge: '🥈 Silver' },
  { marks: '36–40', discount: '40%',  bg: '#ede9fe', color: '#6d28d9', badge: '🥉 Bronze' },
  { marks: '31–35', discount: '35%',  bg: '#fce7f3', color: '#be185d', badge: '' },
  { marks: '26–30', discount: '30%',  bg: '#ffedd5', color: '#c2410c', badge: '' },
  { marks: '21–25', discount: '25%',  bg: '#f0fdf4', color: '#15803d', badge: '' },
  { marks: '16–20', discount: '20%',  bg: '#f0f9ff', color: '#0369a1', badge: '' },
  { marks: 'Up to 15', discount: '15%', bg: '#fafafa', color: '#374151', badge: '' },
];

function CsatSection() {
  const target = new Date('2026-07-20T10:00:00');
  const { days, hours, mins, secs } = useCountdown(target);

  return (
    <section style={{ background: 'linear-gradient(135deg, #0D1837 0%, #0f3460 100%)', padding: '60px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,189,128,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-10" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '99px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px' }}>🎓</span>
            <span style={{ color: '#fbbf24', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em' }}>CSAT 2026 — SCHOLARSHIP TEST</span>
          </div>
          <h2 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: '10px', lineHeight: 1.2 }}>
            Reward Your Merit with<br />
            <span style={{ background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Up to 100% Fee Waiver</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
            Appear for our Scholarship Test and get major discounts on your CLATians program fee.
            <br /><span style={{ color: '#fbbf24', fontWeight: 700 }}>Limited to first 200 students.</span>
          </p>
        </div>

        {/* Countdown */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {[
            { val: String(days).padStart(2,'0'),  label: 'Days' },
            { val: String(hours).padStart(2,'0'), label: 'Hours' },
            { val: String(mins).padStart(2,'0'),  label: 'Mins' },
            { val: String(secs).padStart(2,'0'),  label: 'Secs' },
          ].map(({ val, label }, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '16px 22px', minWidth: '72px' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 900, fontSize: '36px', lineHeight: 1 }}>{val}</div>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600, marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
              {i < 3 && <span style={{ color: '#f59e0b', fontSize: '28px', fontWeight: 900, marginBottom: '20px' }}>:</span>}
            </div>
          ))}
        </div>

        {/* Slabs + CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
          {/* Scholarship Slabs */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '17px', marginBottom: '16px' }}>📊 Scholarship Slabs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scholarshipSlabs.map((slab) => (
                <div key={slab.marks} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, minWidth: '70px' }}>{slab.marks} marks</span>
                    {slab.badge && <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: slab.bg, color: slab.color }}>{slab.badge}</span>}
                  </div>
                  <span style={{ color: '#fbbf24', fontWeight: 900, fontSize: '18px' }}>{slab.discount} <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>off</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '28px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎯</div>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '20px', marginBottom: '8px' }}>Register for CSAT 2026</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
              50 MCQ questions · 60 minutes · CLAT pattern (English, LR, GK, Legal Aptitude). Conducted at Patna centre.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {['Free to appear — no registration fee', 'Results declared within 48 hours', 'Scholarship valid for 2026–27 batch', 'Both Offline & Online students eligible'].map(pt => (
                <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#08BD80', fontWeight: 700 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>{pt}</span>
                </div>
              ))}
            </div>
            <a href="tel:8507700177" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '12px', textDecoration: 'none', marginBottom: '10px' }}>
              📞 Call to Register — 8507700177
            </a>
            <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', color: 'white', fontWeight: 600, fontSize: '13px', padding: '12px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              💬 WhatsApp to Register
            </a>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '11px', marginTop: '12px' }}>Test Date: July 20, 2026 · Patna Centre</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Free Resources Section ─────────────────────────── */
const freeResources = [
  { icon: '📚', title: 'Free CLAT Study Material', desc: 'Comprehensive notes covering all 5 sections of CLAT — English, GK, Legal, Logical & Quant. Updated for CLAT 2026.', cta: 'Download Free', href: 'https://wa.me/918507700177?text=I want free CLAT study material', color: '#6366f1', bg: '#eef2ff' },
  { icon: '📝', title: 'Free Mock Test', desc: 'Experience the real CLAT exam interface. Full 120-question mock with detailed solutions and rank predictor.', cta: 'Attempt Free Mock', href: 'https://wa.me/918507700177?text=I want to attempt a free mock test', color: '#0891b2', bg: '#e0f2fe' },
  { icon: '🤝', title: 'Free Strategy Session', desc: '1-on-1 session with our expert mentors. Get a personalised study plan based on your current level and target NLU.', cta: 'Book Free Session', href: 'https://wa.me/918507700177?text=I want a free strategy session', color: '#08BD80', bg: '#E6FAF4' },
];

function FreeResourcesSection() {
  return (
    <section style={{ background: '#F8FAFC', padding: '60px 0' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ background: '#E6FAF4', color: '#08BD80', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '12px' }}>FREE FOR EVERYONE</span>
          <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', marginBottom: '8px' }}>Boost Your Prep — Free</h2>
          <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '440px', margin: '0 auto' }}>No payment needed. Get these resources to kickstart your CLAT preparation today.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {freeResources.map((r) => (
            <div key={r.title} style={{ background: 'white', borderRadius: '20px', border: '1.5px solid #E9EEF2', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: r.bg, padding: '28px 24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '44px', marginBottom: '8px' }}>{r.icon}</div>
                <span style={{ background: r.color, color: 'white', fontSize: '10px', fontWeight: 700, padding: '3px 12px', borderRadius: '99px' }}>FREE</span>
              </div>
              <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#0D1837', fontWeight: 800, fontSize: '16px', marginBottom: '8px' }}>{r.title}</h3>
                <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>{r.desc}</p>
                <a href={r.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px', borderRadius: '12px', background: r.color, color: 'white', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                  {r.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Section ────────────────────────────────────── */
const faqs = [
  { q: 'Is the Scholarship Test online or offline?', a: 'The CSAT 2026 test is conducted at our Patna centre (Boring Road). For outstation students, we also offer an online proctored mode. Call 8507700177 to confirm your preferred mode.' },
  { q: 'Is personal mentorship included in all programs?', a: 'Personal mentorship is a standard feature in our Offline Batch and Mentorship programs. Online Batch students get group doubt-clearing sessions. Our 1-on-1 Mentorship program includes unlimited 1-on-1 sessions.' },
  { q: 'Do you provide mock test analytics?', a: 'Yes! All enrolled students get access to our AI-powered analytics dashboard. It shows section-wise performance, time management analysis, rank prediction, and personalized improvement suggestions.' },
  { q: 'Is EMI available for fees?', a: 'Yes, EMI options are available for all programs. You can pay in 3–12 monthly instalments. Call us to discuss your preferred EMI plan. Zero-cost EMI available on select payment methods.' },
  { q: 'What if I am from outside Patna?', a: 'Our Online Batch is designed for students across India. For Offline Batch, we have hostel tie-ups near our Patna centre. Many students from Bihar, Jharkhand, UP, and Delhi study with us.' },
  { q: 'Can I switch from Online to Offline mid-session?', a: 'Yes, subject to seat availability. Any fee difference will need to be paid. Contact our admissions team at 8507700177 to initiate the switch.' },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: 'white', padding: '60px 0' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-10">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ background: '#EFF6FF', color: '#3b82f6', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '12px' }}>FAQ</span>
          <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', marginBottom: '8px' }}>Got Questions? We Have Answers.</h2>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>Everything you need to know about admissions, programs and fees.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: open === i ? '#F0FDF9' : 'white', border: `1.5px solid ${open === i ? '#08BD80' : '#E9EEF2'}`, borderRadius: '16px', overflow: 'hidden', transition: 'all .2s ease' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: open === i ? '#08BD80' : '#0D1837', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: open === i ? '#08BD80' : '#9CA3AF', fontSize: '20px', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform .2s ease', lineHeight: 1 }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 18px', color: '#374151', fontSize: '13px', lineHeight: 1.7, borderTop: '1px solid #D1FAE5' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '32px', textAlign: 'center', padding: '24px', background: '#F8FAFC', borderRadius: '16px', border: '1.5px solid #E9EEF2' }}>
          <p style={{ color: '#374151', fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>Still have questions? Talk to our counsellors directly.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:8507700177" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#08BD80', color: 'white', fontWeight: 700, fontSize: '13px', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>📞 Call 8507700177</a>
            <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#075E54', color: 'white', fontWeight: 700, fontSize: '13px', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
