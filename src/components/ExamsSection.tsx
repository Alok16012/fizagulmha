const exams = [
  {
    code: 'CLAT',
    name: 'Common Law Admission Test',
    tagline: 'Gateway to top NLUs!',
    icon: '🏛️',
    color: '#06b6d4',
    bg: '#e0f9ff',
    seats: '2700+ seats',
    nlus: '23 NLUs',
  },
  {
    code: 'AILET',
    name: 'All India Law Entrance Test',
    tagline: 'Path to NLU Delhi.',
    icon: '⚖️',
    color: '#818cf8',
    bg: '#eef2ff',
    seats: '110 seats',
    nlus: 'NLU Delhi',
  },
  {
    code: 'MH-CET',
    name: 'Maharashtra CET Law',
    tagline: 'Top colleges in MH.',
    icon: '📍',
    color: '#34d399',
    bg: '#ecfdf5',
    seats: '5000+ seats',
    nlus: 'All MH Colleges',
  },
  {
    code: 'CUET',
    name: 'Common University Entrance Test',
    tagline: 'Top Universities.',
    icon: '🎓',
    color: '#fb923c',
    bg: '#fff7ed',
    seats: '3000+ seats',
    nlus: 'Central Universities',
  },
  {
    code: 'AIL-LET',
    name: 'Army Institute of Law Entrance',
    tagline: 'Army Institute of Law.',
    icon: '🎖️',
    color: '#f43f5e',
    bg: '#fff1f2',
    seats: '120 seats',
    nlus: 'AIL Mohali',
  },
  {
    code: 'LSAT',
    name: 'Law School Admission Test',
    tagline: 'Global law schools.',
    icon: '🌐',
    color: '#a855f7',
    bg: '#faf5ff',
    seats: 'Multiple seats',
    nlus: 'Global Schools',
  },
];

export default function ExamsSection() {
  return (
    <>
      {/* ─── Desktop Exams Section ─────────────────────────── */}
      <section id="exams" className="hidden md:block py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="chip mb-3">Law Entrance Exams</span>
            <h2 className="section-title">Choose Your Exam</h2>
            <p className="section-subtitle max-w-lg mx-auto">
              CLATians offers specialized coaching for all major law entrance examinations in India.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {exams.map((exam) => (
              <a key={exam.code} href={`/exams/${exam.code.toLowerCase()}`}
                className="group bg-white border border-gray-100 rounded-2xl p-6 card-hover flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: exam.bg }}>
                    {exam.icon}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: exam.bg, color: exam.color }}>
                    {exam.code}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">{exam.name}</h3>
                  <p className="text-sm mt-1 font-medium" style={{ color: exam.color }}>{exam.tagline}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 border-t border-gray-50 pt-3 mt-auto">
                  <span>🪑 {exam.seats}</span>
                  <span>·</span>
                  <span>📍 {exam.nlus}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: exam.color }}>
                  Prepare Now <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mobile Exams Section (clatians.com dark style) ── */}
      <section className="md:hidden py-6 px-4"
        style={{ background: 'var(--navy)' }}>
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white mb-2"
              style={{ background: 'var(--orange)' }}>
              🏛 LAW ENTRANCE
            </span>
            <h2 className="text-xl font-black text-white leading-tight">Choose Your Exam</h2>
            <p className="text-white/60 text-xs mt-1">Expert coaching for every law entrance</p>
          </div>
          <a href="/exams/clat"
            className="text-xs font-bold flex items-center gap-1 mt-8 flex-shrink-0"
            style={{ color: 'var(--orange)' }}>
            View All →
          </a>
        </div>

        {/* Exam cards — 3-col grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {exams.map((exam) => (
            <a key={exam.code} href={`/exams/${exam.code.toLowerCase()}`}
              className="bg-white rounded-2xl p-3 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2"
                style={{ background: exam.bg }}>
                {exam.icon}
              </div>
              <div className="font-black text-xs text-gray-900 leading-tight">{exam.code}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{exam.tagline}</div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
