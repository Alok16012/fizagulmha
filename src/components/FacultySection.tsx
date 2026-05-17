const faculty = [
  {
    name: 'Adv. Ravi Kumar',
    subject: 'Legal Reasoning / CLAT Expert',
    rating: 4.9,
    students: '2,400+',
    experience: '12 yrs',
    avatar: 'RK',
    color: '#06b6d4',
    tags: ['Legal Reasoning', 'CLAT'],
  },
  {
    name: 'Adv. Priya Singh',
    subject: 'English / AILET Expert',
    rating: 4.8,
    students: '1,800+',
    experience: '9 yrs',
    avatar: 'PS',
    color: '#818cf8',
    tags: ['English', 'AILET'],
  },
  {
    name: 'Adv. Arjun Sharma',
    subject: 'Maths & LR / CUET Expert',
    rating: 4.9,
    students: '1,200+',
    experience: '7 yrs',
    avatar: 'AS',
    color: '#34d399',
    tags: ['Maths', 'Logical Reasoning'],
  },
  {
    name: 'Dr. Neha Verma',
    subject: 'GK & Current Affairs',
    rating: 5.0,
    students: '3,100+',
    experience: '10 yrs',
    avatar: 'NV',
    color: '#f59e0b',
    tags: ['GK', 'Current Affairs'],
  },
  {
    name: 'Adv. Sahil Gupta',
    subject: 'Legal Aptitude / AILET Expert',
    rating: 4.8,
    students: '900+',
    experience: '6 yrs',
    avatar: 'SG',
    color: '#fb923c',
    tags: ['Legal Aptitude', 'AILET'],
  },
  {
    name: 'Ms. Kavya Nair',
    subject: 'Comprehension / MH-CET Expert',
    rating: 4.7,
    students: '750+',
    experience: '5 yrs',
    avatar: 'KN',
    color: '#a855f7',
    tags: ['Comprehension', 'MH-CET'],
  },
  {
    name: 'Adv. Rohit Mishra',
    subject: 'Logical Reasoning / CLAT Expert',
    rating: 4.9,
    students: '1,500+',
    experience: '8 yrs',
    avatar: 'RM',
    color: '#ef4444',
    tags: ['Logical Reasoning', 'CLAT'],
  },
  {
    name: 'Dr. Ankita Roy',
    subject: 'Polity & Constitution',
    rating: 5.0,
    students: '2,200+',
    experience: '11 yrs',
    avatar: 'AR',
    color: '#06b6d4',
    tags: ['Polity', 'Constitution'],
  },
  {
    name: 'Adv. Vikram Das',
    subject: 'Quantitative / CUET Expert',
    rating: 4.8,
    students: '1,050+',
    experience: '7 yrs',
    avatar: 'VD',
    color: '#818cf8',
    tags: ['Quantitative', 'CUET'],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="stars text-sm">{'★'.repeat(Math.floor(rating))}</span>
      <span className="text-xs font-bold text-gray-700">{rating}</span>
    </div>
  );
}

export default function FacultySection() {
  return (
    <section className="py-12 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="chip mb-3">Expert Faculty</span>
          <h2 className="section-title">Learn from the Best Minds</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Advocates, NLU alumni &amp; toppers — handpicked for one goal: your selection.
          </p>
        </div>

        {/* Stat bar */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mt-4"
            style={{ background: 'var(--navy)' }}>
            <span>👨‍🏫</span> 10,000+ students trained by our faculty
          </div>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {faculty.map((f) => (
            <div key={f.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 card-hover flex flex-col gap-3">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)` }}>
                  {f.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{f.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{f.subject}</p>
                  <StarRating rating={f.rating} />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {f.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: f.color + '18', color: f.color }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-50 text-xs text-gray-400">
                <span>👥 {f.students} students</span>
                <span>·</span>
                <span>📅 {f.experience}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll cards (clatians.com style) */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none">
            {faculty.map((f) => (
              <div key={f.name}
                className="flex-shrink-0 w-52 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: f.color }}>
                    {f.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-gray-900 truncate">{f.name}</div>
                    <StarRating rating={f.rating} />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 leading-snug">{f.subject}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {f.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: f.color + '18', color: f.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[9px] text-gray-400 mt-2">👥 {f.students} · 📅 {f.experience}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
