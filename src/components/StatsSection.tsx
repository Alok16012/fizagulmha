const desktopStats = [
  { value: '5000+', label: 'Success Stories', icon: '🏆', desc: 'Students placed in top NLUs' },
  { value: 'Top NLU', label: 'Selections', icon: '🏛️', desc: 'NLSIU, NLU Delhi, NALSAR & more' },
  { value: '20+', label: 'Expert Faculty', icon: '👨‍🏫', desc: 'NLU Alumni & Advocates' },
  { value: '4.9★', label: 'Student Trust', icon: '⭐', desc: 'Average rating by our students' },
];

const mobileStats = [
  { value: '15000+', label: 'SUCCESS STORIES', color: '#3b82f6' },
  { value: 'Top', label: 'NLU SELECTIONS', color: '#f97316' },
  { value: '23+', label: 'EXPERT FACULTY', color: '#22c55e' },
  { value: '4.9/5 ★', label: 'STUDENT TRUST', color: '#f59e0b' },
];

export default function StatsSection() {
  return (
    <section className="py-10 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop: horizontal row */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {desktopStats.map((stat) => (
            <div key={stat.label}
              className="text-center px-6 py-6 rounded-2xl border border-gray-100 hover:border-cyan-200 hover:shadow-md transition-all card-hover"
              style={{ background: 'linear-gradient(135deg, #f8fafc, #fff)' }}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black" style={{ color: 'var(--navy)' }}>{stat.value}</div>
              <div className="font-bold text-gray-700 mt-1">{stat.label}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Mobile: single row equal boxes */}
        <div className="md:hidden grid grid-cols-4 gap-2">
          {mobileStats.map((stat) => (
            <div key={stat.label}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center py-4 px-1">
              <div className="text-lg font-black leading-none" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[9px] font-bold text-gray-500 mt-1.5 tracking-wide leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
