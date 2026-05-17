'use client';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Aman Deep Singh',
    achievement: 'CRACKED CLAT 2024',
    rank: 'AIR 23',
    college: 'NLU Delhi',
    avatar: 'AD',
    color: '#06b6d4',
    quote: 'CLATians gave me the structure, mentors, and mock tests I needed. The faculty\'s guidance was exceptional throughout my preparation journey.',
  },
  {
    name: 'Priya Sharma',
    achievement: 'CRACKED CLAT 2024',
    rank: 'AIR 47',
    college: 'NALSAR Hyderabad',
    avatar: 'PS',
    color: '#818cf8',
    quote: 'The online program was incredibly flexible. I could study at my own pace while still getting personalized attention from mentors.',
  },
  {
    name: 'Rohan Gupta',
    achievement: 'CRACKED AILET 2024',
    rank: 'AIR 12',
    college: 'NLU Delhi',
    avatar: 'RG',
    color: '#34d399',
    quote: 'AILET preparation at CLATians is top-notch. The specialized mock tests and legal reasoning classes made all the difference.',
  },
  {
    name: 'Sneha Patel',
    achievement: 'CRACKED CLAT 2024',
    rank: 'AIR 89',
    college: 'NLIU Bhopal',
    avatar: 'SP',
    color: '#fb923c',
    quote: 'From a small town to a national law university — CLATians made my dream possible. The faculty is truly dedicated to every student\'s success.',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="chip mb-3">Success Stories</span>
          <h2 className="section-title">Hear Them Out</h2>
          <p className="section-subtitle">Real students, real results. Their success is our pride.</p>
        </div>

        {/* Desktop: featured + grid */}
        <div className="hidden md:block">
          {/* Featured card */}
          <div
            className="rounded-2xl p-8 md:p-10 mb-8 flex items-center gap-10"
            style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))' }}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ background: 'rgba(6,182,212,0.3)', border: '1px solid rgba(6,182,212,0.5)' }}>
                  CRACKED CLAT 2024
                </span>
                <span className="text-white/60 text-sm">AIR 23</span>
              </div>
              <blockquote className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 mt-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg"
                  style={{ background: 'var(--cyan)' }}>
                  {testimonials[0].avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{testimonials[0].name}</div>
                  <div className="text-white/60 text-sm">{testimonials[0].college}</div>
                </div>
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="text-6xl font-black text-white">12K</div>
              <div className="text-white/60 text-sm mt-1">NLU Selections</div>
              <a href="#"
                className="mt-4 block px-6 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: 'var(--cyan)' }}>
                WATCH ALL SUCCESS STORIES
              </a>
            </div>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-3 gap-5">
            {testimonials.slice(1).map((t) => (
              <div key={t.name}
                className="bg-white border border-gray-100 rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.college}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: t.color }}>
                      {t.rank}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 pt-3 border-t border-gray-50">
                  <span className="text-xs font-semibold" style={{ color: t.color }}>{t.achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: tab slider (clatians.com style) */}
        <div className="md:hidden">
          {/* Featured achievement banner */}
          <div className="rounded-xl p-5 mb-4"
            style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold px-2 py-1 rounded-full text-white"
                style={{ background: 'rgba(6,182,212,0.4)' }}>
                {testimonials[active].achievement}
              </span>
              <span className="text-white/50 text-xs">{testimonials[active].rank}</span>
            </div>
            <p className="text-white text-sm leading-relaxed">&ldquo;{testimonials[active].quote}&rdquo;</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: testimonials[active].color }}>
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="text-white text-sm font-bold">{testimonials[active].name}</div>
                <div className="text-white/50 text-xs">{testimonials[active].college}</div>
              </div>
            </div>
          </div>

          {/* Tab dots */}
          <div className="flex justify-center gap-2 mb-4">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  background: i === active ? 'var(--cyan)' : '#d1d5db',
                }} />
            ))}
          </div>

          {/* Mini list */}
          <div className="space-y-3">
            {testimonials.map((t, i) => (
              <button key={t.name} onClick={() => setActive(i)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all"
                style={{
                  borderColor: i === active ? 'var(--cyan)' : '#e5e7eb',
                  background: i === active ? '#e0f9ff' : 'white',
                }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.college}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                  style={{ background: t.color }}>
                  {t.rank}
                </span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 text-center">
            <div className="text-3xl font-black" style={{ color: 'var(--navy)' }}>12K+</div>
            <div className="text-sm text-gray-500">NLU Selections</div>
            <a href="#" style={{ background: 'var(--cyan)' }}
              className="mt-3 inline-block px-6 py-2.5 rounded-xl font-bold text-white text-sm">
              WATCH ALL SUCCESS STORIES
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
