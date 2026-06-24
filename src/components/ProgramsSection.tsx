'use client';
import { useState } from 'react';

const programs = [
  {
    icon: '🏛️',
    title: 'Offline Course',
    desc: 'Attend live classes at our Patna center. Direct interaction with faculty, structured timetable, and peer learning environment.',
    features: ['Live Classes', 'Study Material', 'Doubt Sessions', 'Mock Tests'],
    cta: 'View Schedule',
    href: '/courses/clat',
  },
  {
    icon: '💻',
    title: 'Online Course',
    desc: 'Study from anywhere with recorded & live online classes. Full access to study material, tests, and mentor support.',
    features: ['Recorded Lectures', 'Live Doubt Sessions', 'Digital Notes', 'Mock Tests'],
    cta: 'Enroll Online',
    href: '/courses/clat-online',
    badge: 'Most Popular',
  },
  {
    icon: '🎯',
    title: 'Mentorship',
    desc: 'One-on-one mentorship from NLU toppers and advocates. Personalized study plan tailored to your strengths.',
    features: ['1-on-1 Sessions', 'Custom Study Plan', 'NLU Mentor', 'Interview Prep'],
    cta: 'Book Mentor',
    href: '/courses?cat=mentorship',
  },
  {
    icon: '📝',
    title: 'Mock Tests',
    desc: 'Full-length mock tests simulating actual CLAT/AILET exam patterns. Detailed analytics and rank predictions.',
    features: ['150+ Mock Tests', 'AI Analytics', 'Rank Predictor', 'Solutions PDF'],
    cta: 'Try Free Mock',
    href: '/courses/mock-tests',
  },
];

const tabCourses: Record<
  string,
  { badge: string; badgeColor: string; badgeBg: string; name: string; slug: string }[]
> = {
  'Offline Course': [
    { badge: '🎓 Your Path to Top NLUs', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'CLAT', slug: 'clat' },
    { badge: '🎓 CLAT + NLU Delhi', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'CLAT+AILET', slug: 'clat-ailet' },
    { badge: '🎓 Central Universities', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'CUET-UG', slug: 'cuet-ug' },
  ],
  'Online Course': [
    { badge: '🎓 Study From Anywhere', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'Online CLAT', slug: 'clat-online' },
    { badge: '🎓 Global Law Schools', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'LSAT India', slug: 'lsat' },
    { badge: '🎓 Last 45 Days Boost', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'Booster', slug: 'booster' },
  ],
  Mentorship: [
    { badge: '🎓 1-on-1 CLAT Prep', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'CLAT', slug: 'clat' },
    { badge: '🎓 NLU Delhi Focus', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'AILET', slug: 'clat-ailet' },
    { badge: '🎓 All Exams Covered', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'All Exams', slug: 'olet' },
  ],
  'Mock Tests': [
    { badge: '🎓 CLAT Mock Series', badgeColor: '#f77420', badgeBg: '#fff1e8', name: 'CLAT', slug: 'mock-tests' },
    { badge: '🎓 10 Mocks Starter', badgeColor: '#f77420', badgeBg: '#fff1e8', name: '10 Mocks', slug: 'mock-tests' },
    { badge: '🎓 40 Mocks Ultimate', badgeColor: '#f77420', badgeBg: '#fff1e8', name: '40 Mocks', slug: 'mock-tests' },
  ],
};

const tabLabels = ['Offline Course', 'Online Course', 'Mentorship', 'Mock Tests'];

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState('Offline Course');
  const cards = tabCourses[activeTab];

  return (
    <section id="courses" className="pt-5 pb-8 md:py-14" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header — desktop only */}
        <div className="hidden md:block text-center mb-8">
          <h2
            className="text-4xl font-extrabold"
            style={{ color: '#3C4852', fontWeight: 800 }}
          >
            Our Programs
          </h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Whether you prefer classroom learning or digital flexibility — we have the perfect program
            for your CLAT preparation.
          </p>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p) => (
            <div
              key={p.title}
              className="relative flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E9EEF2',
                borderRadius: '12px',
              }}
            >
              {/* Badge */}
              {p.badge && (
                <div
                  className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ background: '#f77420' }}
                >
                  {p.badge}
                </div>
              )}

              {/* Top colored bar */}
              <div className="h-1.5 w-full" style={{ background: '#f77420' }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 flex-shrink-0"
                  style={{ background: '#fff1e8' }}
                >
                  {p.icon}
                </div>

                <h3 className="font-bold text-lg" style={{ color: '#3C4852' }}>
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed flex-1">{p.desc}</p>

                <ul className="mt-4 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span style={{ color: '#f77420' }} className="font-bold">
                        ✓
                      </span>{' '}
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.href}
                  className="mt-5 block text-center py-2.5 font-semibold text-sm text-white hover:opacity-90 transition-all"
                  style={{ background: '#f77420', borderRadius: '8px' }}
                >
                  {p.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Tab filters + cards */}
        <div className="md:hidden">
          {/* Tab pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4">
            {tabLabels.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all"
                style={
                  activeTab === tab
                    ? { background: '#f77420', color: 'white', borderColor: '#f77420' }
                    : { background: 'white', color: '#3C4852', borderColor: '#E9EEF2' }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Course cards */}
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 mt-2">
            {cards.map((c) => (
              <div
                key={c.name + c.badge}
                className="flex-shrink-0 w-40 overflow-hidden shadow-sm"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E9EEF2',
                  borderRadius: '12px',
                }}
              >
                <div className="h-1 w-full" style={{ background: '#f77420' }} />
                <div className="px-3 pt-3">
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full inline-block leading-tight"
                    style={{ background: c.badgeBg, color: c.badgeColor }}
                  >
                    {c.badge}
                  </span>
                </div>
                <div className="flex justify-center py-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 10v6M2 10l10-5 10 5-10 5z"
                      stroke="#f77420"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 12v5c3 3 9 3 12 0v-5"
                      stroke="#f77420"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="text-center font-black text-base pb-3"
                  style={{ color: '#3C4852' }}
                >
                  {c.name}
                </div>
                <a
                  href={`/courses/${c.slug}`}
                  className="block mx-3 mb-3 py-2.5 text-center text-xs font-bold text-white"
                  style={{ background: '#f77420', borderRadius: '8px' }}
                >
                  Explore Program
                </a>
              </div>
            ))}
          </div>

          {/* View All Courses */}
          <div className="flex justify-center mt-4">
            <a
              href="/courses"
              className="flex items-center gap-2 px-8 py-3 rounded-full border-2 font-bold text-sm uppercase tracking-wide"
              style={{ borderColor: '#f77420', color: '#f77420' }}
            >
              SEE ALL COURSES →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
