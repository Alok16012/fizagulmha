'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    exam: 'CLAT 2026',
    tag: '🏛️ Gateway to Top NLUs',
    heading: 'Crack CLAT with',
    highlight: 'Expert Coaching',
    sub: 'Your gateway to top National Law Universities. Join thousands of successful CLATians who secured their dream college.',
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'CLAT 2026',
  },
  {
    exam: 'AILET',
    tag: '⚖️ NLU Delhi Preparation',
    heading: 'Crack AILET with',
    highlight: 'Focused Mentorship',
    sub: "Your path to NLU Delhi — one of India's most prestigious law schools. Expert guidance from NLU Alumni.",
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'AILET',
  },
  {
    exam: 'MH-CET Law',
    tag: '📍 Maharashtra Law Colleges',
    heading: 'Ace MH-CET with',
    highlight: 'Proven Strategies',
    sub: 'Top law colleges in Maharashtra are within your reach. Our MH-CET specialists ensure comprehensive preparation.',
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'MH-CET',
  },
  {
    exam: 'CUET 2026',
    tag: '🎓 Top University Entrance',
    heading: 'Prepare for CUET with',
    highlight: 'Complete Guidance',
    sub: 'Gateway to top central universities across India. Comprehensive CUET Law preparation designed for success.',
    cta: 'Start Preparation',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    pill: 'CUET',
  },
];

const examPills = ['CLAT', 'AILET', 'MH-CET Law', 'CUET', 'AIL-LET', 'LSAT'];

const heroStats = [
  { val: '15,000+', label: 'Students' },
  { val: '1000+', label: 'NLU Selections' },
  { val: '15+', label: 'Years Experience' },
  { val: '25+', label: 'Expert Faculty' },
];

const mobileSlides = [
  {
    initials: 'AK',
    name: 'A.K. SINGH',
    title: 'Director, IEE CLATians',
    subtitle: 'Founder — "BHARAT that is INDIA"',
    tagline:
      'Empowering CLAT aspirants with legal knowledge, social awareness, and the skills needed for top NLU admissions.',
    features: [
      { icon: '🎯', text: 'Individual Mentorship' },
      { icon: '📊', text: 'Weekly Progress Reports' },
      { icon: '📝', text: 'Unlimited Test-Series' },
    ],
  },
  {
    initials: 'CL',
    name: 'CLAT 2026 BATCH',
    title: 'Now Enrolling — Limited Seats',
    subtitle: 'Offline · Online · Mentorship',
    tagline:
      'Join thousands of CLATians who cracked top NLUs. Expert faculty, comprehensive material, proven results.',
    features: [
      { icon: '🏛️', text: 'Top NLU Selections' },
      { icon: '👨‍🏫', text: '20+ Expert Faculty' },
      { icon: '🏆', text: '5000+ Success Stories' },
    ],
  },
  {
    initials: 'MT',
    name: 'MOCK TEST SERIES',
    title: '150+ Full-Length Mock Tests',
    subtitle: 'CLAT · AILET · MH-CET · CUET',
    tagline:
      'AI-powered analytics, detailed solutions, and national rank predictions. The most comprehensive test series in India.',
    features: [
      { icon: '🤖', text: 'AI-Powered Analytics' },
      { icon: '📈', text: 'National Rank Predictor' },
      { icon: '📄', text: 'Detailed Solutions PDF' },
    ],
  },
  {
    initials: 'NL',
    name: 'NLU COLLEGE PREDICTOR',
    title: 'Know Your Chances Now',
    subtitle: 'Free Tool — Try It Today',
    tagline:
      'Enter your expected CLAT rank and instantly see which of the 23 NLUs you are likely to get into.',
    features: [
      { icon: '🔮', text: 'Rank-Based Prediction' },
      { icon: '🪑', text: 'All 23 NLUs Covered' },
      { icon: '✅', text: 'Category-Wise Results' },
    ],
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  const goTo = (idx: number) => {
    if (idx === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section>
      {/* ─── Desktop Hero ─────────────────────────────────────── */}
      <div
        className="hidden md:block relative overflow-hidden"
        style={{ background: '#0D1837', minHeight: '88vh' }}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: '#08BD80' }}
          />
          <div
            className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-5"
            style={{ background: '#08BD80' }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full opacity-5"
            style={{ background: '#ffffff' }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="w-full px-8 md:px-16 py-20 flex items-center gap-10 relative z-10">
          {/* Left Content */}
          <div className="flex-1">
            {/* Exam pill */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: 'rgba(8,189,128,0.2)', border: '1px solid rgba(8,189,128,0.4)' }}
              >
                {slide.pill}
              </span>
              <span className="text-white/60 text-sm">{slide.tag}</span>
            </div>

            {/* Heading */}
            <h1
              className={`font-extrabold text-white leading-tight transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
              style={{ fontSize: '2.75rem' }}
            >
              {slide.heading}
              <br />
              <span style={{ color: '#08BD80' }}>{slide.highlight}</span>
            </h1>

            <p
              className={`mt-6 text-lg leading-relaxed max-w-md transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              style={{ color: 'rgba(255,255,255,0.70)' }}
            >
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href={slide.ctaLink}
                className="px-7 py-3.5 rounded-xl font-bold text-white text-base shadow-lg hover:opacity-90 transition-all duration-200"
                style={{ background: '#08BD80' }}
              >
                {slide.cta} →
              </a>
              <a
                href="#demo"
                className="px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-white/10 transition-all"
                style={{ color: 'white', border: '1px solid rgba(255,255,255,0.35)' }}
              >
                {slide.secondaryCta}
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex items-center gap-0 flex-wrap">
              {heroStats.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div className="text-center px-5 first:pl-0">
                    <div className="text-2xl font-black text-white">{s.val}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {s.label}
                    </div>
                  </div>
                  {i < heroStats.length - 1 && (
                    <div className="w-px h-8 mx-1" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Topper Showcase + compact Exam Selector */}
          <div className="w-[380px] flex-shrink-0 space-y-3">
            {/* Topper Results Card */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-sm">🏆 Recent Toppers</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(8,189,128,0.2)', color: '#08BD80', border: '1px solid rgba(8,189,128,0.3)' }}>CLAT 2024</span>
              </div>
              {[
                { name: 'Aman Deep Singh', rank: 'AIR 23', college: 'NLU Delhi', avatar: 'AD', color: '#6366f1' },
                { name: 'Priya Sharma', rank: 'AIR 47', college: 'NALSAR', avatar: 'PS', color: '#ec4899' },
                { name: 'Rohan Gupta', rank: 'AIR 12', college: 'NLU Delhi (AILET)', avatar: 'RG', color: '#f59e0b' },
                { name: 'Kavya Reddy', rank: 'AIR 34', college: 'NALSAR', avatar: 'KR', color: '#f97316' },
              ].map((t) => (
                <div key={t.name} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background: t.color }}>{t.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-bold truncate">{t.name}</div>
                    <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.college}</div>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(8,189,128,0.2)', color: '#08BD80' }}>{t.rank}</span>
                </div>
              ))}
            </div>
            {/* Exam Selector compact */}
            <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Prepare For</p>
              <div className="grid grid-cols-3 gap-1.5">
                {examPills.map((exam) => (
                  <a key={exam} href={`/exams/${exam.toLowerCase().replace(' law','').replace('-law','')}`}
                    className="text-center py-2 rounded-lg text-[11px] font-bold transition-all"
                    style={{ background: exam === slides[current].pill ? '#08BD80' : 'rgba(255,255,255,0.08)', color: 'white', border: `1px solid ${exam === slides[current].pill ? '#08BD80' : 'rgba(255,255,255,0.1)'}` }}>
                    {exam}
                  </a>
                ))}
              </div>
              <a href="/admission" className="mt-3 block text-center py-2.5 rounded-xl font-bold text-white text-xs hover:opacity-90 transition-all" style={{ background: '#08BD80' }}>
                Get Free Counselling →
              </a>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                background: i === current ? '#08BD80' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Mobile Hero — App Style ─────────────────────────── */}
      <div className="md:hidden" style={{ background: '#0D1837' }}>
        {/* Gradient bg blobs */}
        <div className="absolute top-14 right-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(8,189,128,0.18) 0%,transparent 70%)', transform: 'translate(20%,-10%)' }} />

        <div className="relative z-10 px-4 pt-5 pb-5">

          {/* Exam selector — 3-col grid (all 6 visible, no scroll) */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {['CLAT', 'AILET', 'MH-CET', 'CUET', 'AIL-LET', 'LSAT'].map((exam) => (
              <a key={exam} href={`/exams/${exam.toLowerCase().replace('-cet','-cet-law')}`}
                className="text-center py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: exam === slide.pill || (exam === 'MH-CET' && slide.pill === 'MH-CET') ? '#08BD80' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: `1.5px solid ${exam === slide.pill || (exam === 'MH-CET' && slide.pill === 'MH-CET') ? 'rgba(8,189,128,0.6)' : 'rgba(255,255,255,0.08)'}`,
                }}>
                {exam}
              </a>
            ))}
          </div>

          {/* Hero card — slide content */}
          <div className={`rounded-3xl p-5 mb-4 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(8,189,128,0.2)', color: '#08BD80', border: '1px solid rgba(8,189,128,0.35)' }}>
                {slide.tag}
              </span>
            </div>
            <h1 className="font-black text-white leading-tight mb-2" style={{ fontSize: '1.7rem', lineHeight: '1.2' }}>
              {slide.heading}<br />
              <span style={{ color: '#08BD80' }}>{slide.highlight}</span>
            </h1>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {slide.sub}
            </p>

            {/* CTA row */}
            <div className="flex gap-2.5">
              <a href={slide.ctaLink}
                className="flex-1 text-center py-3.5 rounded-2xl font-black text-white text-sm shadow-lg"
                style={{ background: 'linear-gradient(135deg,#08BD80,#06a870)', boxShadow: '0 8px 20px rgba(8,189,128,0.4)' }}>
                Start Prep →
              </a>
              <a href="/admission"
                className="px-4 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-1.5"
                style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1.5px solid rgba(249,115,22,0.3)' }}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Enroll
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-4 rounded-2xl overflow-hidden mb-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {heroStats.map((s, i) => (
              <div key={s.label} className="flex items-stretch">
                <div className="flex-1 flex flex-col items-center justify-center py-3.5">
                  <div className="text-sm font-black text-white leading-tight">{s.val}</div>
                  <div className="text-[9px] mt-0.5 text-center leading-tight font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                </div>
                {i < heroStats.length - 1 && <div className="w-px my-3" style={{ background: 'rgba(255,255,255,0.1)' }} />}
              </div>
            ))}
          </div>

          {/* Toppers strip */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="text-xs font-bold text-white">🏆 Recent Toppers</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(8,189,128,0.15)', color: '#08BD80' }}>CLAT 2024</span>
            </div>
            <div className="flex overflow-x-auto gap-3 px-4 py-3" style={{ scrollbarWidth: 'none' }}>
              {[
                { name: 'Aman Deep', rank: 'AIR 23', college: 'NLU Delhi', avatar: 'AD', color: '#6366f1' },
                { name: 'Priya Sharma', rank: 'AIR 47', college: 'NALSAR', avatar: 'PS', color: '#ec4899' },
                { name: 'Rohan Gupta', rank: 'AIR 12', college: 'NLU Delhi', avatar: 'RG', color: '#f59e0b' },
                { name: 'Kavya Reddy', rank: 'AIR 34', college: 'NALSAR', avatar: 'KR', color: '#f97316' },
              ].map((t) => (
                <div key={t.name} className="flex-shrink-0 flex flex-col items-center gap-1.5" style={{ width: '68px' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[11px] font-black" style={{ background: t.color }}>{t.avatar}</div>
                  <div className="text-[10px] font-bold text-white text-center leading-tight">{t.name}</div>
                  <div className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: 'rgba(8,189,128,0.2)', color: '#08BD80' }}>{t.rank}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? '20px' : '6px', height: '6px', background: i === current ? '#08BD80' : 'rgba(255,255,255,0.2)', border: 'none' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
