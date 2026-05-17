'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    exam: 'CLAT 2026',
    tag: '🏛️ Gateway to Top NLUs',
    heading: 'Crack CLAT with',
    highlight: 'Expert Coaching',
    sub: 'Your gateway to top National Law Universities. Join thousands of successful CLATians who secured their dream college.',
    cta: 'Start Your Journey',
    ctaLink: '#courses',
    secondaryCta: 'View Demo Class',
    bg: 'from-[#071560] via-[#0a1e8a] to-[#0038c8]',
    accent: '#0050e0',
    pill: 'CLAT 2026',
  },
  {
    exam: 'AILET',
    tag: '⚖️ NLU Delhi Preparation',
    heading: 'Crack AILET with',
    highlight: 'Focused Mentorship',
    sub: 'Your path to NLU Delhi — one of India\'s most prestigious law schools. Expert guidance from NLU Alumni.',
    cta: 'Enroll Now',
    ctaLink: '#courses',
    secondaryCta: 'Free Mock Test',
    bg: 'from-[#071560] via-[#0a1e8a] to-[#0038c8]',
    accent: '#0050e0',
    pill: 'AILET',
  },
  {
    exam: 'MH-CET Law',
    tag: '📍 Maharashtra Law Colleges',
    heading: 'Ace MH-CET with',
    highlight: 'Proven Strategies',
    sub: 'Top law colleges in Maharashtra are within your reach. Our MH-CET specialists ensure comprehensive preparation.',
    cta: 'Learn More',
    ctaLink: '#courses',
    secondaryCta: 'Check Colleges',
    bg: 'from-[#071560] via-[#0a1e8a] to-[#0038c8]',
    accent: '#0050e0',
    pill: 'MH-CET',
  },
  {
    exam: 'CUET 2026',
    tag: '🎓 Top University Entrance',
    heading: 'Prepare for CUET with',
    highlight: 'Complete Guidance',
    sub: 'Gateway to top central universities across India. Comprehensive CUET Law preparation designed for success.',
    cta: 'Know More',
    ctaLink: '#courses',
    secondaryCta: 'Download Syllabus',
    bg: 'from-[#071560] via-[#0a1e8a] to-[#0038c8]',
    accent: '#0050e0',
    pill: 'CUET',
  },
];

const examPills = ['CLAT', 'AILET', 'MH-CET Law', 'CUET', 'AIL-LET', 'LSAT'];

const mobileSlides = [
  {
    initials: 'AK',
    name: 'A.K. SINGH',
    title: 'Director, IEE CLATians',
    subtitle: 'Founder — "BHARAT that is INDIA"',
    tagline: 'Empowering CLAT aspirants with legal knowledge, social awareness, and the skills needed for top NLU admissions.',
    gradFrom: '#6366f1',
    gradTo: '#06b6d4',
    featureBg: '#eef2ff',
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
    tagline: 'Join thousands of CLATians who cracked top NLUs. Expert faculty, comprehensive material, proven results.',
    gradFrom: '#f97316',
    gradTo: '#fb923c',
    featureBg: '#fff7ed',
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
    tagline: 'AI-powered analytics, detailed solutions, and national rank predictions. The most comprehensive test series in India.',
    gradFrom: '#10b981',
    gradTo: '#06b6d4',
    featureBg: '#ecfdf5',
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
    tagline: 'Enter your expected CLAT rank and instantly see which of the 23 NLUs you are likely to get into.',
    gradFrom: '#a855f7',
    gradTo: '#6366f1',
    featureBg: '#faf5ff',
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
        className={`hidden md:block relative bg-gradient-to-br ${slide.bg} overflow-hidden`}
        style={{ minHeight: '88vh' }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: slide.accent }} />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-5"
            style={{ background: slide.accent }} />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full opacity-5"
            style={{ background: '#ffffff' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 flex items-center gap-16 relative z-10">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            {/* Exam tag pill */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: slide.accent + '33', border: `1px solid ${slide.accent}55` }}
              >
                {slide.pill}
              </span>
              <span className="text-white/60 text-sm">{slide.tag}</span>
            </div>

            {/* Heading */}
            <h1
              className={`text-5xl xl:text-6xl font-black text-white leading-tight transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
            >
              {slide.heading}
              <br />
              <span style={{ color: slide.accent }}>{slide.highlight}</span>
            </h1>

            <p className={`mt-6 text-white/75 text-lg leading-relaxed max-w-md transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a href={slide.ctaLink}
                className="px-7 py-3.5 rounded-xl font-bold text-white text-base shadow-lg hover:scale-105 transition-all duration-200"
                style={{ background: slide.accent }}>
                {slide.cta} →
              </a>
              <a href="#demo"
                className="px-6 py-3.5 rounded-xl font-semibold text-white/90 border border-white/20 hover:bg-white/10 transition-all text-base">
                {slide.secondaryCta}
              </a>
            </div>

            {/* Quick stats under hero */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              {[
                { val: '5000+', label: 'Success Stories' },
                { val: '20+', label: 'Expert Faculty' },
                { val: '4.9★', label: 'Student Rating' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-white">{s.val}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Exam selector card */}
          <div className="flex-1 max-w-sm">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="text-white font-bold text-lg mb-4">Choose Your Exam</h3>
              <div className="space-y-2.5">
                {examPills.map((exam, i) => (
                  <a key={exam} href="#exams"
                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer group transition-all hover:scale-[1.02]"
                    style={{
                      background: exam === slides[current].pill ? slide.accent : 'rgba(255,255,255,0.08)',
                      border: `1px solid ${exam === slides[current].pill ? slide.accent : 'rgba(255,255,255,0.1)'}`,
                    }}>
                    <span className="text-white font-semibold text-sm">{exam}</span>
                    <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
              <a href="#admission"
                className="mt-4 block text-center py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: 'var(--cyan)' }}>
                Get Free Counselling
              </a>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                background: i === current ? slide.accent : 'rgba(255,255,255,0.3)',
              }} />
          ))}
        </div>
      </div>

      {/* ─── Mobile Hero ─────────────────────────────────────── */}
      <div className="md:hidden" style={{ background: '#f4f6fa' }}>
        <div className="relative overflow-hidden mx-1 mt-2 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="px-3 pt-4 pb-0">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-[72px] h-[72px]">
                    <div className="absolute inset-0 rounded-full p-[2px]"
                      style={{ background: `linear-gradient(135deg, ${mobileSlides[current].gradFrom}, ${mobileSlides[current].gradTo})` }}>
                      <div className="w-full h-full rounded-full flex items-center justify-center font-black text-xl text-white"
                        style={{ background: `linear-gradient(135deg, ${mobileSlides[current].gradFrom}, ${mobileSlides[current].gradTo})` }}>
                        {mobileSlides[current].initials}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name + subtitle + features */}
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm text-gray-900 tracking-wide">{mobileSlides[current].name}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{mobileSlides[current].title}</div>
                  <div className="text-[11px] font-semibold mt-0.5" style={{ color: mobileSlides[current].gradFrom }}>
                    {mobileSlides[current].subtitle}
                  </div>
                  {/* Features inline */}
                  <div className="mt-2 space-y-1">
                    {mobileSlides[current].features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: mobileSlides[current].featureBg }}>
                          <span className="text-[10px]">{f.icon}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-gray-700">{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed line-clamp-2 pb-3">
                {mobileSlides[current].tagline}
              </p>
            </div>

            {/* Gradient bar */}
            <div className="h-1.5 w-full"
              style={{ background: `linear-gradient(90deg, ${mobileSlides[current].gradFrom}, ${mobileSlides[current].gradTo})` }} />
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-1.5 py-2 bg-white">
            {mobileSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? '18px' : '6px',
                  height: '6px',
                  background: i === current ? mobileSlides[current].gradFrom : '#d1d5db',
                }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
