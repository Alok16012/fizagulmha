'use client';
import { useState } from 'react';

const programs = [
  {
    icon: '🏫',
    title: 'Offline Course',
    desc: 'Attend live classes at our Patna center. Direct interaction with faculty, structured timetable, and peer learning environment.',
    features: ['Live Classes', 'Study Material', 'Doubt Sessions', 'Mock Tests'],
    cta: 'View Schedule',
    color: '#06b6d4',
    bg: '#e0f9ff',
  },
  {
    icon: '💻',
    title: 'Online Course',
    desc: 'Study from anywhere with recorded & live online classes. Full access to study material, tests, and mentor support.',
    features: ['Recorded Lectures', 'Live Doubt Sessions', 'Digital Notes', 'Mock Tests'],
    cta: 'Enroll Online',
    color: '#818cf8',
    bg: '#eef2ff',
    badge: 'Most Popular',
  },
  {
    icon: '🎯',
    title: 'Mentorship',
    desc: 'One-on-one mentorship from NLU toppers and advocates. Personalized study plan tailored to your strengths.',
    features: ['1-on-1 Sessions', 'Custom Study Plan', 'NLU Mentor', 'Interview Prep'],
    cta: 'Book Mentor',
    color: '#34d399',
    bg: '#ecfdf5',
  },
  {
    icon: '📝',
    title: 'Mock Tests',
    desc: 'Full-length mock tests simulating actual CLAT/AILET exam patterns. Detailed analytics and rank predictions.',
    features: ['150+ Mock Tests', 'AI Analytics', 'Rank Predictor', 'Solutions PDF'],
    cta: 'Try Free Mock',
    color: '#fb923c',
    bg: '#fff7ed',
  },
];

const tabCourses: Record<string, { badge: string; badgeColor: string; badgeBg: string; name: string; slug: string }[]> = {
  'Offline Course': [
    { badge: '🎓 Your Path to Top NLUs', badgeColor: '#6366f1', badgeBg: '#eef2ff', name: 'CLAT', slug: 'offline' },
    { badge: '🎓 Path to NLU Delhi', badgeColor: '#818cf8', badgeBg: '#f5f3ff', name: 'AILET', slug: 'offline' },
    { badge: '🎓 Top MH Colleges', badgeColor: '#10b981', badgeBg: '#ecfdf5', name: 'MH-CET', slug: 'offline' },
  ],
  'Online Course': [
    { badge: '🎓 Early Edge for CUET', badgeColor: '#10b981', badgeBg: '#ecfdf5', name: 'CUET-UG', slug: 'online' },
    { badge: '🎓 Gateway to NLUs', badgeColor: '#6366f1', badgeBg: '#eef2ff', name: 'CLAT', slug: 'online' },
    { badge: '🎓 Global Law Schools', badgeColor: '#a855f7', badgeBg: '#faf5ff', name: 'LSAT', slug: 'online' },
  ],
  'Mentorship': [
    { badge: '🎓 1-on-1 CLAT Prep', badgeColor: '#6366f1', badgeBg: '#eef2ff', name: 'CLAT', slug: 'mentorship' },
    { badge: '🎓 NLU Delhi Focus', badgeColor: '#818cf8', badgeBg: '#f5f3ff', name: 'AILET', slug: 'mentorship' },
    { badge: '🎓 All Exams Covered', badgeColor: '#f97316', badgeBg: '#fff7ed', name: 'All Exams', slug: 'mentorship' },
  ],
  'Mock Tests': [
    { badge: '🎓 CLAT Mock Series', badgeColor: '#6366f1', badgeBg: '#eef2ff', name: 'CLAT', slug: 'mock-tests' },
    { badge: '🎓 AILET Mock Series', badgeColor: '#818cf8', badgeBg: '#f5f3ff', name: 'AILET', slug: 'mock-tests' },
    { badge: '🎓 MH-CET Mock Tests', badgeColor: '#10b981', badgeBg: '#ecfdf5', name: 'MH-CET', slug: 'mock-tests' },
  ],
};

const tabLabels = ['Offline Course', 'Online Course', 'Mentorship', 'Mock Tests'];

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState('Offline Course');
  const cards = tabCourses[activeTab];

  return (
    <section id="courses" className="pt-2 pb-3 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-1 md:px-4">
        {/* Section Header — desktop only */}
        <div className="hidden md:block text-center mb-14">
          <span className="chip mb-3">Our Programs</span>
          <h2 className="section-title">Choose Your Learning Path</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Whether you prefer classroom learning or digital flexibility — we have the perfect program for your CLAT preparation.
          </p>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p) => (
            <div key={p.title}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover relative flex flex-col">
              {p.badge && (
                <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ background: 'var(--cyan)' }}>
                  {p.badge}
                </div>
              )}
              <div className="h-1.5 w-full" style={{ background: p.color }} />
              <div className="p-6 flex flex-col flex-1">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
                  style={{ background: p.bg }}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed flex-1">{p.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span style={{ color: p.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#admission"
                  className="mt-5 block text-center py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: p.bg, color: p.color }}>
                  {p.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Tab filters + 3-column grid */}
        <div className="md:hidden">
          {/* Tab pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {tabLabels.map((tab) => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all"
                style={activeTab === tab
                  ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                  : { background: 'white', color: '#374151', borderColor: '#e5e7eb' }
                }>
                {tab}
              </button>
            ))}
          </div>

          {/* Course cards — 3-column grid, compact */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {cards.map((c) => (
              <div key={c.name + c.badge}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex flex-col">
                {/* Colored top strip */}
                <div className="h-1 w-full" style={{ background: c.badgeColor }} />
                <div className="flex-1 px-2 pt-2">
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full inline-block leading-tight"
                    style={{ background: c.badgeBg, color: c.badgeColor }}>
                    {c.badge.replace('🎓 ', '')}
                  </span>
                  <div className="font-black text-sm text-gray-900 mt-1 leading-tight">{c.name}</div>
                </div>
                <a href={`/courses/${c.slug}`}
                  className="block mx-2 mb-2 mt-1.5 py-1.5 text-center text-[10px] font-bold text-white rounded-lg"
                  style={{ background: 'var(--navy)' }}>
                  Explore →
                </a>
              </div>
            ))}
          </div>

          {/* View All Courses button */}
          <div className="flex justify-center mt-3">
            <a href="/courses/offline"
              className="flex items-center gap-1.5 px-6 py-2 rounded-full border-2 font-bold text-xs"
              style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>
              View All Courses →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
