const exams = [
  {
    code: 'CLAT',
    slug: 'clat',
    name: 'Common Law Admission Test',
    tagline: 'Gateway to top 23 NLUs!',
    icon: '🏛️',
    iconBg: '#EEF4FF',
    seats: '2700+ seats',
    colleges: '23 NLUs',
  },
  {
    code: 'AILET',
    slug: 'ailet',
    name: 'All India Law Entrance Test',
    tagline: 'Path to NLU Delhi.',
    icon: '⚖️',
    iconBg: '#FFF4E6',
    seats: '110 seats',
    colleges: 'NLU Delhi',
  },
  {
    code: 'MH-CET',
    slug: 'mh-cet-law',
    name: 'Maharashtra CET Law',
    tagline: 'Top MH law colleges.',
    icon: '📍',
    iconBg: '#FFF0F0',
    seats: '5000+ seats',
    colleges: '25+ MH Colleges',
  },
  {
    code: 'CUET',
    slug: 'cuet',
    name: 'Common University Entrance',
    tagline: '200+ universities.',
    icon: '🎓',
    iconBg: '#F0FFF8',
    seats: '3000+ seats',
    colleges: 'Central Universities',
  },
  {
    code: 'AIL-LET',
    slug: 'ail-let',
    name: 'Army Institute of Law Entrance',
    tagline: 'Army Institute of Law.',
    icon: '🎖️',
    iconBg: '#F5F0FF',
    seats: '120 seats',
    colleges: 'AIL Mohali',
  },
  {
    code: 'LSAT',
    slug: 'lsat',
    name: 'Law School Admission Test',
    tagline: '85+ private law schools.',
    icon: '🌐',
    iconBg: '#F0F9FF',
    seats: '2000+ seats',
    colleges: '85+ Private Universities',
  },
];

export default function ExamsSection() {
  return (
    <>
      {/* ─── Desktop Exams Section ─────────────────────────── */}
      <section id="exams" className="hidden md:block py-14" style={{ background: '#F7F9FB' }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2
                className="text-3xl font-extrabold mb-2"
                style={{ color: '#3C4852', fontWeight: 800 }}
              >
                Law Entrance Exams
              </h2>
              <p className="text-base" style={{ color: '#7A8B94' }}>
                Expert coaching for all major law entrances
              </p>
            </div>
            <a
              href="/exams/clat"
              className="see-all flex items-center gap-1 flex-shrink-0 mb-1"
            >
              SEE ALL EXAMS →
            </a>
          </div>

          {/* 3-col × 2-row grid */}
          <div className="grid grid-cols-3 gap-5">
            {exams.map((exam) => (
              <a
                key={exam.code}
                href={`/exams/${exam.slug}`}
                className="group bg-white rounded-xl p-6 card-hover flex flex-col gap-4"
                style={{ border: '1px solid #E9EEF2', borderRadius: '12px' }}
              >
                {/* Icon + badge row */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: exam.iconBg }}
                  >
                    {exam.icon}
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: '#E6FAF4', color: '#08BD80' }}
                  >
                    {exam.code}
                  </span>
                </div>

                {/* Name + tagline */}
                <div>
                  <h3
                    className="font-bold text-sm leading-snug"
                    style={{ color: '#3C4852' }}
                  >
                    {exam.name}
                  </h3>
                  <p className="text-sm mt-1 font-medium" style={{ color: '#08BD80' }}>
                    {exam.tagline}
                  </p>
                </div>

                {/* Seats / colleges row */}
                <div
                  className="flex items-center gap-3 text-xs border-t pt-3 mt-auto"
                  style={{ color: '#9CA3AF', borderColor: '#E9EEF2' }}
                >
                  <span>🪑 {exam.seats}</span>
                  <span>·</span>
                  <span>📍 {exam.colleges}</span>
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: '#08BD80' }}
                >
                  Prepare Now{' '}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mobile Exams Section ─────────────────────────── */}
      <section className="md:hidden py-6 px-4" style={{ background: '#0D1837' }}>
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white mb-2"
              style={{ background: '#f97316' }}
            >
              🏛 LAW ENTRANCE
            </span>
            <h2 className="text-xl font-black text-white leading-tight">Choose Your Exam</h2>
            <p className="text-white/60 text-xs mt-1">Expert coaching for every law entrance</p>
          </div>
          <a
            href="/exams/clat"
            className="text-xs font-bold flex items-center gap-1 mt-8 flex-shrink-0"
            style={{ color: '#f97316' }}
          >
            View All →
          </a>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {exams.map((exam) => (
            <a
              key={exam.code}
              href={`/exams/${exam.slug}`}
              className="bg-white rounded-2xl p-3 flex flex-col items-center text-center"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2"
                style={{ background: exam.iconBg }}
              >
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
