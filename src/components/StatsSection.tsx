const desktopStats = [
  { value: '5000+', label: 'Success Stories', icon: '🏆', desc: 'Students placed in top NLUs' },
  { value: 'Top NLU', label: 'Selections', icon: '🏛️', desc: 'NLSIU, NLU Delhi, NALSAR & more' },
  { value: '20+', label: 'Expert Faculty', icon: '👨‍🏫', desc: 'NLU Alumni & Advocates' },
  { value: '4.9★', label: 'Student Trust', icon: '⭐', desc: 'Average rating by our students' },
];

const mobileStats = [
  { value: '15000+', label: 'SUCCESS\nSTORIES',  color: '#3b82f6', bg: '#eff6ff' },
  { value: 'Top',    label: 'NLU\nSELECTIONS',  color: '#f97316', bg: '#fff7ed' },
  { value: '23+',    label: 'EXPERT\nFACULTY',   color: '#22c55e', bg: '#f0fdf4' },
  { value: '4.9/5 ★', label: 'STUDENT\nTRUST',  color: '#f59e0b', bg: '#fffbeb' },
];

export default function StatsSection() {
  return (
    <section className="py-3 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Desktop */}
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

        {/* Mobile — exact clatians.com style */}
        <div className="md:hidden grid grid-cols-4 gap-2 px-1">
          {mobileStats.map((stat) => (
            <div key={stat.label}
              className="rounded-2xl flex flex-col items-center justify-center text-center py-3 px-1"
              style={{ background: stat.bg }}>
              <div className="text-lg font-black leading-none" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div
                className="text-[8px] font-bold text-gray-500 mt-1.5 tracking-wide leading-tight text-center"
                style={{ whiteSpace: 'pre-line' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
