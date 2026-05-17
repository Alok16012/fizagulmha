import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CLATians – Best CLAT Coaching Institute in Patna, Bihar',
  description: "CLATians is India's most trusted CLAT coaching institute. Founded by NLU alumni, 12+ years of excellence, 5000+ NLU selections. Know our story.",
};

const stats = [
  { val: '5000+', label: 'NLU Selections', icon: '🏆' },
  { val: '1.25L+', label: 'Total Students', icon: '👥' },
  { val: '20+', label: 'Expert Faculty', icon: '👨‍🏫' },
  { val: '12+', label: 'Years of Excellence', icon: '📅' },
  { val: '4.9★', label: 'Student Rating', icon: '⭐' },
  { val: '#1', label: 'CLAT Institute Bihar', icon: '🥇' },
];

const values = [
  {
    icon: '🎯',
    title: 'Student-First Approach',
    desc: 'Every decision at CLATians is made with one question: "Does this help the student succeed?" No shortcuts, no compromises.',
    color: '#06b6d4',
    bg: '#e0f9ff',
  },
  {
    icon: '📚',
    title: 'Expert Knowledge',
    desc: 'Our faculty are NLU alumni, practicing advocates, and CLAT toppers themselves — not just teachers reading from textbooks.',
    color: '#818cf8',
    bg: '#eef2ff',
  },
  {
    icon: '🤝',
    title: 'Accessible Education',
    desc: 'Quality CLAT prep should be available to every student regardless of city, background, or financial situation.',
    color: '#34d399',
    bg: '#ecfdf5',
  },
  {
    icon: '🏆',
    title: 'Results-Driven',
    desc: 'We measure our success exclusively through your results. 5000+ NLU selections across every batch since 2012.',
    color: '#fb923c',
    bg: '#fff7ed',
  },
];

const milestones = [
  {
    year: '2012',
    title: 'Founded in Patna',
    desc: 'CLATians was established in Patna by NLU alumni with a mission to democratize quality law entrance preparation across Bihar and beyond.',
    icon: '🏫',
  },
  {
    year: '2014',
    title: 'First AIR 1',
    desc: 'Our first AIR 1 in CLAT — a moment that defined our identity and proved that students from Bihar could compete with anyone in the country.',
    icon: '🏆',
  },
  {
    year: '2016',
    title: '500 NLU Selections',
    desc: 'Crossed 500 NLU selections milestone. CLATians became the go-to CLAT coaching in Bihar and neighboring states.',
    icon: '🎓',
  },
  {
    year: '2018',
    title: 'Online Platform Launch',
    desc: 'Launched online program to reach students across India. Quality CLAT prep finally accessible beyond Patna.',
    icon: '💻',
  },
  {
    year: '2020',
    title: '2000+ Selections',
    desc: 'Crossed 2000 NLU selections. Pivoted fully to online during pandemic — zero disruption in teaching quality.',
    icon: '🌐',
  },
  {
    year: '2022',
    title: 'Mock Test Series',
    desc: 'Launched India\'s most comprehensive CLAT mock test platform — 150+ tests, AI analytics, and rank predictor.',
    icon: '📝',
  },
  {
    year: '2024',
    title: '#1 in Bihar',
    desc: 'Recognized as Bihar\'s #1 CLAT coaching institute. Faculty expanded to 20+ experts. 5000+ NLU selections milestone.',
    icon: '🥇',
  },
  {
    year: '2026',
    title: '1.25 Lakh+ Students',
    desc: 'Today CLATians serves 1.25 lakh+ students with offline, online, mentorship, and mock test programs across India.',
    icon: '🚀',
  },
];

const team = [
  { name: 'Adv. Ravi Kumar', role: 'Founder & Legal Reasoning Head', avatar: 'RK', color: '#06b6d4', exp: '12 yrs', college: 'NALSAR Hyderabad' },
  { name: 'Dr. Neha Verma', role: 'GK & Current Affairs Head', avatar: 'NV', color: '#f59e0b', exp: '10 yrs', college: 'Patna University (PhD)' },
  { name: 'Dr. Ankita Roy', role: 'Constitutional Law Expert', avatar: 'AR', color: '#34d399', exp: '11 yrs', college: 'NLU Jodhpur' },
  { name: 'Adv. Priya Singh', role: 'English & AILET Head', avatar: 'PS', color: '#818cf8', exp: '9 yrs', college: 'NLU Delhi' },
];

const whyClatians = [
  { icon: '🏛️', title: 'NLU Alumni Faculty', desc: 'Every subject is taught by someone who has cracked the exam themselves.' },
  { icon: '📊', title: 'Data-Driven Teaching', desc: 'Mock test analytics guide every student\'s unique preparation journey.' },
  { icon: '🕐', title: 'Small Batches', desc: '30-student offline batches ensure individual attention — not factory coaching.' },
  { icon: '📱', title: 'App + Classroom', desc: 'Offline classes + online access + app = preparation from everywhere.' },
  { icon: '💰', title: 'EMI Available', desc: 'Flexible payment options so fees never become a barrier to quality prep.' },
  { icon: '📞', title: 'Always Available', desc: 'Call 8507700177 Mon–Sat 9AM–7PM. We never leave a doubt unanswered.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* ── Hero ──────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #071560 0%, #0a1e8a 50%, #0038c8 100%)', minHeight: '70vh' }}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #818cf8, transparent)', transform: 'translate(-30%, 30%)' }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                  About CLATians
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                India's Most Trusted<br />
                <span style={{ color: 'var(--cyan)' }}>Law Entrance</span> Institute
              </h1>
              <p className="text-white/60 mt-5 text-lg leading-relaxed max-w-xl">
                Born in Patna, built for every CLAT aspirant across India. 12 years of turning dreams into NLU seats — one student at a time.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="/admission"
                  className="px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: 'var(--cyan)' }}>
                  Join CLATians →
                </a>
                <a href="tel:8507700177"
                  className="px-7 py-3.5 rounded-xl font-bold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors">
                  📞 Free Counselling
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────── */}
        <section style={{ background: 'var(--navy)' }} className="py-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-0 md:divide-x md:divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="text-center py-2">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-xl md:text-2xl font-black text-white">{s.val}</div>
                  <div className="text-white/50 text-[11px] mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ─────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                  <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                    Our Story
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-5" style={{ color: 'var(--navy)' }}>
                  From a Classroom in Patna to India's #1 CLAT Institute
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    CLATians was founded in 2012 in Patna by a group of NLU alumni who noticed a glaring gap: students from Bihar and smaller cities were as talented as anyone in India, but lacked access to quality CLAT preparation that could help them compete at a national level.
                  </p>
                  <p>
                    We started with a single classroom, 15 students, and one conviction — <strong className="text-gray-800">talent is equally distributed, opportunity is not.</strong> Our job was to fix that.
                  </p>
                  <p>
                    Twelve years later, CLATians has produced 5000+ NLU selections, including multiple AIR 1 ranks. We have expanded from one Patna classroom to a national online platform serving 1.25 lakh+ students across India — without ever compromising on the personal attention that defines us.
                  </p>
                </div>
                <div className="mt-7 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black"
                    style={{ background: 'var(--cyan)' }}>
                    RK
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Adv. Ravi Kumar</div>
                    <div className="text-sm text-gray-500">Founder, CLATians · NALSAR Alumnus</div>
                  </div>
                </div>
              </div>

              {/* Visual card grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-6 flex flex-col gap-2"
                  style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))' }}>
                  <div className="text-4xl">🏛️</div>
                  <div className="text-3xl font-black text-white">5000+</div>
                  <div className="text-white/60 text-sm">NLU Selections in 12 years</div>
                </div>
                <div className="rounded-2xl p-6 flex flex-col gap-2 bg-white border border-gray-100 shadow-sm">
                  <div className="text-4xl">👥</div>
                  <div className="text-3xl font-black" style={{ color: 'var(--navy)' }}>1.25L+</div>
                  <div className="text-gray-500 text-sm">Students trained nationally</div>
                </div>
                <div className="rounded-2xl p-6 flex flex-col gap-2 bg-white border border-gray-100 shadow-sm">
                  <div className="text-4xl">👨‍🏫</div>
                  <div className="text-3xl font-black" style={{ color: 'var(--navy)' }}>20+</div>
                  <div className="text-gray-500 text-sm">NLU Alumni faculty members</div>
                </div>
                <div className="rounded-2xl p-6 flex flex-col gap-2"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                  <div className="text-4xl">📍</div>
                  <div className="text-3xl font-black text-white">#1</div>
                  <div className="text-white/70 text-sm">CLAT Institute in Bihar</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ──────────────────────────── */}
        <section className="py-14 md:py-20" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                  What Drives Us
                </span>
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
              </div>
              <h2 className="section-title">Mission & Vision</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: '#e0f9ff' }}>🎯</div>
                <h3 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  To provide every CLAT aspirant — regardless of their background, city, or financial situation — access to the same quality of preparation that was once only available to a privileged few.
                </p>
                <p className="text-gray-600 leading-relaxed text-base mt-3">
                  We believe talent is equally distributed. Opportunity is not. <strong className="text-gray-800">CLATians exists to fix that.</strong>
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: '#eef2ff' }}>🔭</div>
                <h3 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  To become India's most trusted law entrance preparation institute — where every student who walks in with a dream walks out with a plan, a rank, and a seat at a top National Law University.
                </p>
                <p className="text-gray-600 leading-relaxed text-base mt-3">
                  A future where <strong className="text-gray-800">geography is never a barrier</strong> to reaching India's finest law schools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ───────────────────────────────── */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                  What We Stand For
                </span>
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
              </div>
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle max-w-lg mx-auto">Four principles that guide every decision we make at CLATians.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {values.map((v) => (
                <div key={v.title}
                  className="rounded-2xl p-6 border border-gray-100 card-hover flex flex-col"
                  style={{ background: v.bg }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-white shadow-sm">
                    {v.icon}
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ color: 'var(--navy)' }}>{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{v.desc}</p>
                  <div className="mt-4 w-8 h-1 rounded-full" style={{ background: v.color }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────── */}
        <section className="py-14 md:py-20" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                  Our Journey
                </span>
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
              </div>
              <h2 className="section-title">12 Years of Excellence</h2>
              <p className="section-subtitle">From a single classroom in Patna to a national platform.</p>
            </div>

            {/* Desktop timeline */}
            <div className="hidden md:block relative">
              {/* Center line */}
              <div className="absolute left-1/2 -translate-x-0.5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 to-indigo-400 opacity-30" />

              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={m.year} className={`flex items-center gap-0 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                    {/* Card */}
                    <div className={`w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white border border-gray-100 rounded-2xl p-5 card-hover inline-block w-full">
                        <div className="flex items-center gap-2 mb-2 justify-end" style={{ flexDirection: i % 2 === 0 ? 'row-reverse' : 'row' }}>
                          <span className="text-xl">{m.icon}</span>
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                            style={{ background: 'var(--cyan)' }}>
                            {m.year}
                          </span>
                        </div>
                        <h3 className="font-black text-gray-900">{m.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="w-20 flex-shrink-0 flex justify-center z-10">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg"
                        style={{ background: 'linear-gradient(135deg, var(--navy), var(--cyan))' }}>
                        {m.year.slice(2)}
                      </div>
                    </div>

                    {/* Empty side */}
                    <div className="w-[calc(50%-2.5rem)]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="md:hidden relative pl-6 border-l-2" style={{ borderColor: 'var(--cyan)' }}>
              <div className="space-y-5">
                {milestones.map((m) => (
                  <div key={m.year} className="relative pl-5">
                    <span className="absolute -left-[21px] top-2 w-4 h-4 rounded-full border-2 border-white shadow"
                      style={{ background: 'var(--cyan)' }} />
                    <div className="bg-white border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{m.icon}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ background: 'var(--navy)' }}>
                          {m.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-gray-900">{m.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Leadership Team ───────────────────────────── */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                  The People Behind CLATians
                </span>
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
              </div>
              <h2 className="section-title">Our Leadership Team</h2>
              <p className="section-subtitle max-w-lg mx-auto">
                NLU alumni and domain experts who have devoted their careers to your success.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {team.map((t) => (
                <a key={t.name}
                  href={`/faculty/${t.name.toLowerCase().replace(/[\s.]/g, '-').replace(/--+/g, '-').replace(/-$/, '')}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover text-center">
                  <div className="h-1.5" style={{ background: t.color }} />
                  <div className="p-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}>
                      {t.avatar}
                    </div>
                    <h3 className="font-black text-gray-900 group-hover:text-cyan-700 transition-colors">{t.name}</h3>
                    <p className="text-sm font-medium mt-1" style={{ color: t.color }}>{t.role}</p>
                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-center gap-3 text-xs text-gray-400">
                      <span>🎓 {t.college}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">📅 {t.exp} experience</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/#faculty"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl border-2 transition-all hover:bg-cyan-50"
                style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}>
                View All 20+ Faculty Members →
              </a>
            </div>
          </div>
        </section>

        {/* ── Why CLATians ──────────────────────────────── */}
        <section className="py-14 md:py-20" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                  Why 1.25 Lakh Students Choose Us
                </span>
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
              </div>
              <h2 className="section-title">What Makes CLATians Different</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {whyClatians.map((w) => (
                <div key={w.title} className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-4 card-hover">
                  <div className="text-3xl flex-shrink-0">{w.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{w.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location & Contact ────────────────────────── */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--cyan)' }}>
                  Find Us
                </span>
                <span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--cyan)' }} />
              </div>
              <h2 className="section-title">Visit Us in Patna</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden flex items-center justify-center min-h-64"
                style={{ background: 'linear-gradient(135deg, #e0f9ff, #f0fdff)', border: '1px solid #e2e8f0' }}>
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="font-bold text-gray-700 text-lg">CLATians, Patna</p>
                  <p className="text-gray-500 text-sm mt-1">2nd Floor, Gangotri Palace</p>
                  <p className="text-gray-500 text-sm">Boring Rd, Patna, Bihar 800001</p>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                    className="mt-4 inline-block px-5 py-2 rounded-xl font-semibold text-white text-sm"
                    style={{ background: 'var(--navy)' }}>
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  {
                    icon: '📍',
                    title: 'Address',
                    lines: ['2nd Floor, Gangotri Palace, Boring Rd,', 'near Sumati Palace, Nageshwar Colony,', 'Kidwaipuri, Patna, Bihar 800001'],
                  },
                  {
                    icon: '📞',
                    title: 'Phone',
                    lines: ['8507700177'],
                    href: 'tel:8507700177',
                  },
                  {
                    icon: '⏰',
                    title: 'Office Hours',
                    lines: ['Monday – Saturday: 9:00 AM – 7:00 PM', 'Sunday: Closed (Online support available)'],
                  },
                  {
                    icon: '🌐',
                    title: 'Online Support',
                    lines: ['Available 7 days a week', 'WhatsApp: 8507700177'],
                  },
                ].map((c) => (
                  <div key={c.title} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: '#e0f9ff' }}>
                      {c.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{c.title}</h4>
                      {c.lines.map((l, i) => (
                        c.href ? (
                          <a key={i} href={c.href} className="block text-sm font-semibold mt-0.5" style={{ color: 'var(--cyan)' }}>
                            {l}
                          </a>
                        ) : (
                          <p key={i} className="text-sm text-gray-500 mt-0.5">{l}</p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────── */}
        <section className="py-14 md:py-20"
          style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="text-5xl mb-5">🚀</div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Ready to Write Your<br />
              <span style={{ color: 'var(--cyan)' }}>NLU Success Story?</span>
            </h2>
            <p className="text-white/60 mt-4 text-base md:text-lg max-w-xl mx-auto">
              Join 1.25 lakh+ students who chose CLATians. Our experts are ready to guide you every step of the way.
            </p>
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <a href="/admission"
                className="px-8 py-4 rounded-xl font-bold text-white text-base"
                style={{ background: 'var(--cyan)' }}>
                Start Your Journey →
              </a>
              <a href="tel:8507700177"
                className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 text-base hover:bg-white/10 transition-colors">
                📞 Free Counselling
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
