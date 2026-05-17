const services = [
  {
    icon: '🏫',
    count: '100+',
    title: 'Online University Options',
    desc: 'Find Top Ranked Online Universities',
    sub: 'UGC-approved universities verified by CLATians for premium legal education.',
    cta: 'View Universities',
    color: '#06b6d4',
    bg: 'from-[#e0f9ff] to-[#f0fdff]',
  },
  {
    icon: '📊',
    count: '500+',
    title: 'Course Options Available',
    desc: 'Compare & Choose The Best Courses',
    sub: 'Detailed comparison of all law courses — fees, rankings, placements, and more.',
    cta: 'Compare Courses',
    color: '#818cf8',
    bg: 'from-[#eef2ff] to-[#f5f7ff]',
  },
  {
    icon: '👨‍💼',
    count: '500+',
    title: 'Expert Counsellors',
    desc: 'Get Free Expert Counselling Today',
    sub: 'Connect with NLU alumni and legal professionals for personalized guidance.',
    cta: 'Book Free Session',
    color: '#34d399',
    bg: 'from-[#ecfdf5] to-[#f5fffe]',
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-12 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="chip mb-3">Our Services</span>
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            From university search to expert counselling — CLATians is your all-in-one law entrance platform.
          </p>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title}
              className={`bg-gradient-to-br ${s.bg} rounded-2xl border border-gray-100 p-8 card-hover flex flex-col`}>
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-white shadow-sm">
                  {s.icon}
                </div>
                <span className="text-4xl font-black" style={{ color: s.color }}>{s.count}</span>
              </div>
              <h3 className="font-black text-xl text-gray-900">{s.title}</h3>
              <p className="font-semibold mt-1" style={{ color: s.color }}>{s.desc}</p>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed flex-1">{s.sub}</p>
              <a href="#" className="mt-6 inline-flex items-center gap-2 font-semibold text-sm transition-all hover:gap-3"
                style={{ color: s.color }}>
                {s.cta} <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Mobile: stacked cards (clatians.com style) */}
        <div className="md:hidden space-y-4">
          {services.map((s) => (
            <div key={s.title}
              className={`bg-gradient-to-r ${s.bg} rounded-xl border border-gray-100 p-5 flex items-center gap-4`}>
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-3xl flex-shrink-0">
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                  <span className="text-lg font-black ml-2 flex-shrink-0" style={{ color: s.color }}>{s.count}</span>
                </div>
                <p className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.desc}</p>
                <a href="#" className="text-xs font-semibold mt-1.5 inline-block" style={{ color: s.color }}>
                  {s.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Universities banner */}
        <div
          className="mt-10 md:mt-16 rounded-2xl p-6 md:p-10 text-center"
          style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))' }}>
          <p className="text-white/60 text-sm mb-2">Our Partner Universities</p>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            UGC-approved Universities, verified by CLATians
          </h3>
          <p className="text-white/70 mt-2 text-sm md:text-base">
            For premium legal education across India
          </p>
          <a href="#"
            className="mt-6 inline-block px-8 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'var(--cyan)' }}>
            VIEW ALL UNIVERSITIES →
          </a>
        </div>
      </div>
    </section>
  );
}
