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
    <section id="courses" className="pt-5 pb-8 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4">
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

        {/* Mobile: Tab filters + cards toggle */}
        <div className="md:hidden">
          {/* Tab pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4">
            {tabLabels.map((tab) => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all"
                style={activeTab === tab
                  ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                  : { background: 'white', color: '#374151', borderColor: '#e5e7eb' }
                }>
                {tab}
              </button>
            ))}
          </div>

          {/* Course cards — 3 cards for active tab */}
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 mt-2">
            {cards.map((c) => (
              <div key={c.name + c.badge}
                className="flex-shrink-0 w-40 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-3 pt-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full inline-block leading-tight"
                    style={{ background: c.badgeBg, color: c.badgeColor }}>
                    {c.badge}
                  </span>
                </div>
                <div className="flex justify-center py-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-center font-black text-base text-gray-900 pb-3">{c.name}</div>
                <a href={`/courses/${c.slug}`}
                  className="block mx-3 mb-3 py-2.5 text-center text-xs font-bold text-white rounded-xl"
                  style={{ background: 'var(--navy)' }}>
                  Explore Program
                </a>
              </div>
            ))}
          </div>

          {/* View All Courses button */}
          <div className="flex justify-center mt-4">
            <a href="/courses/offline"
              className="flex items-center gap-2 px-8 py-3 rounded-full border-2 font-bold text-sm"
              style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>
              View All Courses →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
