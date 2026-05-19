import { notFound } from 'next/navigation';
import { exams, getExamBySlug } from '@/data/exams';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return exams.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) return { title: 'Exam Not Found' };
  return {
    title: `${exam.code} 2026 – ${exam.fullName} | CLATians`,
    description: exam.overview.slice(0, 155),
  };
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) notFound();

  const otherExams = exams.filter((e) => e.slug !== slug).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* ── Hero ───────────────────────────────────────── */}
        <div
          className="relative overflow-hidden py-14 md:py-20"
          style={{ background: `linear-gradient(135deg, #0D1837, #08BD80)` }}>
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: '#fff' }} />
          <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-5"
            style={{ background: '#fff' }} />

          <div className="max-w-7xl mx-auto px-4">
            <a href="/" className="inline-flex items-center gap-1.5 text-white/50 text-sm mb-6 hover:text-white transition-colors">
              ← Back to Home
            </a>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{exam.icon}</span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 text-white border border-white/30">
                    {exam.code} 2026
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  {exam.fullName}
                </h1>
                <p className="text-white/70 mt-3 text-base md:text-lg">{exam.tagline}</p>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                  {[
                    { label: 'Total Seats', value: exam.seats, icon: '🪑' },
                    { label: 'Colleges', value: exam.colleges, icon: '🏛️' },
                    { label: 'Questions', value: String(exam.questions), icon: '❓' },
                    { label: 'Duration', value: exam.duration, icon: '⏱️' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3 text-center">
                      <div className="text-xl mb-0.5">{s.icon}</div>
                      <div className="text-white font-black text-lg leading-none">{s.value}</div>
                      <div className="text-white/50 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <a href="/courses/offline"
                    className="px-6 py-3 rounded-xl font-bold text-white text-sm bg-white/20 hover:bg-white/30 transition-colors border border-white/30">
                    Enroll Now →
                  </a>
                  <a href="#pattern"
                    className="px-6 py-3 rounded-xl font-semibold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors">
                    Exam Pattern ↓
                  </a>
                </div>
              </div>

              {/* Right: Info Card */}
              <div className="w-full md:w-64 bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-5 flex-shrink-0">
                <h3 className="text-white font-bold text-sm mb-3 opacity-70 uppercase tracking-wide">Exam Info</h3>
                {[
                  { label: 'Total Marks', value: String(exam.marks), icon: '📊' },
                  { label: 'Negative Marking', value: `-${exam.negativeMark}`, icon: '⚠️' },
                  { label: 'Mode', value: exam.mode, icon: '💻' },
                  { label: 'Conducted By', value: exam.conductedBy, icon: '🏢' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                    <span className="text-white/60 text-xs flex items-center gap-1.5">{item.icon} {item.label}</span>
                    <span className="text-white font-semibold text-xs text-right max-w-[110px] leading-tight">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Latest Updates Banner ────────────────────── */}
        {exam.latestUpdates && exam.latestUpdates.length > 0 && (
          <div className="py-3 overflow-hidden" style={{ background: '#E6FAF4', borderBottom: '1px solid #D1FAE5' }}>
            <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
              <span className="text-xs font-black px-2.5 py-1 rounded-full text-white flex-shrink-0"
                style={{ background: exam.color }}>
                🔔 LATEST
              </span>
              <div className="flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap text-sm text-gray-600">
                {exam.latestUpdates.map((u, i) => (
                  <span key={i} className="flex-shrink-0">
                    <span className="font-bold" style={{ color: '#08BD80' }}>{u.date}:</span> {u.update}
                    {i < exam.latestUpdates!.length - 1 && <span className="mx-3 text-gray-300">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-8">

            {/* ── Main Content ──────────────────────────── */}
            <div className="md:col-span-2 space-y-12">

              {/* Overview */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                    style={{ background: exam.color }}>📋</span>
                  <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Overview</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">{exam.overview}</p>
              </section>

              {/* Eligibility */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                    style={{ background: exam.color }}>✅</span>
                  <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Eligibility Criteria</h2>
                </div>
                <div className="grid gap-3">
                  {exam.eligibility.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ background: exam.color }}>
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">{e}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Exam Pattern Table */}
              <section id="pattern">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                    style={{ background: exam.color }}>📊</span>
                  <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Exam Pattern</h2>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: exam.color }}>
                        <th className="text-left px-5 py-3.5 font-bold text-white">#</th>
                        <th className="text-left px-5 py-3.5 font-bold text-white">Section</th>
                        <th className="text-center px-5 py-3.5 font-bold text-white">Questions</th>
                        <th className="text-center px-5 py-3.5 font-bold text-white">Marks</th>
                        <th className="text-center px-5 py-3.5 font-bold text-white hidden md:table-cell">% Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exam.examPattern.map((row, i) => (
                        <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="px-5 py-4 text-gray-400 font-bold text-xs">{String(i + 1).padStart(2, '0')}</td>
                          <td className="px-5 py-4 font-semibold text-gray-800">{row.section}</td>
                          <td className="px-5 py-4 text-center">
                            <span className="font-black text-base" style={{ color: exam.color }}>{row.questions}</span>
                          </td>
                          <td className="px-5 py-4 text-center font-semibold text-gray-700">{row.marks}</td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-500"
                                  style={{ width: `${Math.round((row.marks / exam.marks) * 100)}%`, background: exam.color }} />
                              </div>
                              <span className="text-xs font-bold text-gray-500 w-9 text-right">
                                {Math.round((row.marks / exam.marks) * 100)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr style={{ background: exam.color + '12' }} className="border-t-2 border-gray-200">
                        <td className="px-5 py-4" />
                        <td className="px-5 py-4 font-black text-gray-900">Total</td>
                        <td className="px-5 py-4 text-center font-black text-xl" style={{ color: exam.color }}>{exam.questions}</td>
                        <td className="px-5 py-4 text-center font-black text-gray-900">{exam.marks}</td>
                        <td className="px-5 py-4 hidden md:table-cell text-center text-xs font-bold text-gray-500">100%</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Negative marking note */}
                  <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-2 bg-orange-50">
                    <span className="text-orange-500 text-sm">⚠️</span>
                    <span className="text-xs text-orange-700 font-medium">
                      {exam.negativeMark === '0'
                        ? 'No negative marking — attempt all questions!'
                        : `Negative marking: −${exam.negativeMark} marks per wrong answer`}
                    </span>
                  </div>
                </div>
              </section>

              {/* Syllabus */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                    style={{ background: exam.color }}>📚</span>
                  <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Syllabus</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {exam.syllabus.map((s, si) => (
                    <div key={s.subject} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="px-5 py-3 font-bold text-sm text-white flex items-center gap-2"
                        style={{ background: exam.color }}>
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                          {si + 1}
                        </span>
                        {s.subject}
                      </div>
                      <div className="p-4 space-y-2">
                        {s.topics.map((t) => (
                          <div key={t} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: exam.color }} />
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Important Dates */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                    style={{ background: exam.color }}>📅</span>
                  <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Important Dates</h2>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: exam.color + '12' }}>
                        <th className="text-left px-5 py-3.5 font-bold text-gray-700">Event</th>
                        <th className="text-right px-5 py-3.5 font-bold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exam.importantDates.map((d, i) => (
                        <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: exam.color }} />
                              <span className="font-medium text-gray-800">{d.event}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="font-bold text-sm px-3 py-1 rounded-full"
                              style={{ background: exam.color + '15', color: exam.color }}>
                              {d.date}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Application Fee */}
              {exam.applicationFee && exam.applicationFee.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                      style={{ background: exam.color }}>💳</span>
                    <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Application Fee</h2>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: exam.color }}>
                          <th className="text-left px-5 py-3.5 font-bold text-white">Category</th>
                          <th className="text-right px-5 py-3.5 font-bold text-white">Application Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.applicationFee.map((row, i) => (
                          <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                            <td className="px-5 py-4 text-gray-700 font-medium">{row.category}</td>
                            <td className="px-5 py-4 text-right">
                              <span className="font-black text-xl" style={{ color: exam.color }}>{row.fee}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Application Process */}
              {exam.applicationProcess && exam.applicationProcess.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                      style={{ background: exam.color }}>📝</span>
                    <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>How to Apply</h2>
                  </div>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 hidden md:block"
                      style={{ background: `linear-gradient(to bottom, ${exam.color}, ${exam.color}33)` }} />
                    <div className="space-y-4">
                      {exam.applicationProcess.map((step, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-md"
                            style={{ background: exam.color }}>
                            {i + 1}
                          </span>
                          <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                            <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* NLU List */}
              {exam.nluList && exam.nluList.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                      style={{ background: exam.color }}>🏛️</span>
                    <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>
                      Participating Universities ({exam.nluList.length})
                    </h2>
                  </div>
                  <p className="text-gray-500 text-sm mb-5 ml-11">
                    {exam.nluList.length} {exam.nluList.length === 1 ? 'institution' : 'institutions'} accepting {exam.code} scores for 2026 admission
                  </p>
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: exam.color }}>
                          <th className="text-left px-5 py-3.5 font-bold text-white">#</th>
                          <th className="text-left px-5 py-3.5 font-bold text-white">University Name</th>
                          <th className="text-left px-5 py-3.5 font-bold text-white hidden md:table-cell">Location</th>
                          <th className="text-center px-5 py-3.5 font-bold text-white hidden md:table-cell">Est.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.nluList.map((nlu, i) => (
                          <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                            <td className="px-5 py-3.5 text-gray-400 font-bold text-xs">{String(i + 1).padStart(2, '0')}</td>
                            <td className="px-5 py-3.5 font-semibold text-gray-800 leading-snug">
                              {nlu.name}
                              <div className="text-xs text-gray-400 font-normal md:hidden mt-0.5">📍 {nlu.location} · Est. {nlu.established}</div>
                            </td>
                            <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell text-xs">📍 {nlu.location}</td>
                            <td className="px-5 py-3.5 text-center hidden md:table-cell">
                              <span className="font-bold text-xs px-2 py-0.5 rounded-full"
                                style={{ background: exam.color + '15', color: exam.color }}>
                                {nlu.established}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Preparation Tips */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                    style={{ background: exam.color }}>🎯</span>
                  <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>
                    CLATians Preparation Tips
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {exam.preparationTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-shadow">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                        style={{ background: exam.color }}>
                        {i + 1}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Latest Updates Timeline */}
              {exam.latestUpdates && exam.latestUpdates.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                      style={{ background: exam.color }}>🔔</span>
                    <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>Latest Updates</h2>
                  </div>
                  <div className="relative pl-4 border-l-2" style={{ borderColor: exam.color }}>
                    {exam.latestUpdates.map((u, i) => (
                      <div key={i} className="relative mb-4 pl-5">
                        <span className="absolute -left-[21px] top-3 w-4 h-4 rounded-full border-2 border-white shadow"
                          style={{ background: exam.color }} />
                        <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white mb-2 inline-block"
                            style={{ background: exam.color }}>{u.date}</span>
                          <p className="text-gray-700 text-sm mt-1.5 leading-relaxed">{u.update}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                    style={{ background: exam.color }}>💬</span>
                  <h2 className="text-2xl font-black" style={{ color: '#0D1837' }}>
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {exam.faqs.map((faq, i) => (
                    <details key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden group hover:shadow-sm transition-shadow">
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm select-none">
                        <span className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: exam.color + '33', color: exam.color }}>
                            Q
                          </span>
                          {faq.q}
                        </span>
                        <span className="ml-3 text-gray-400 text-xl flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3 ml-9">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* CTA Banner */}
              <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5"
                style={{ background: `linear-gradient(135deg, #0D1837, #08BD80)` }}>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-white font-black text-xl mb-1">Ready to Crack {exam.code} 2026?</h3>
                  <p className="text-white/70 text-sm">Join 15,000+ students who trusted CLATians for their law entrance preparation.</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <a href="/courses/offline"
                    className="px-5 py-2.5 rounded-xl font-bold text-white text-sm bg-white/20 hover:bg-white/30 transition-colors border border-white/30 whitespace-nowrap">
                    Offline Course →
                  </a>
                  <a href="/courses/online"
                    className="px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap"
                    style={{ background: '#fff', color: '#08BD80' }}>
                    Online Course →
                  </a>
                </div>
              </div>
            </div>

            {/* ── Sidebar ──────────────────────────────── */}
            <aside className="space-y-5">
              <div className="sticky top-20 space-y-4">

                {/* Enroll CTA */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-lg mb-1" style={{ color: '#0D1837' }}>
                    Crack {exam.code} 2026
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Expert guidance for {exam.code} preparation by India&apos;s top CLAT institute.
                  </p>
                  <a href="/courses/offline"
                    className="block text-center py-3 rounded-xl font-bold text-white text-sm mb-2"
                    style={{ background: exam.color }}>
                    Enroll in Offline Course
                  </a>
                  <a href="/courses/online"
                    className="block text-center py-3 rounded-xl font-bold text-sm border-2 hover:opacity-80 transition-opacity"
                    style={{ borderColor: exam.color, color: exam.color }}>
                    Join Online Course
                  </a>
                  <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                    <a href="tel:8507700177" className="text-sm font-bold flex items-center justify-center gap-1.5" style={{ color: '#0D1837' }}>
                      📞 8507700177
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">Free counselling available</p>
                  </div>
                </div>

                {/* Exam at a Glance */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#0D1837' }}>⚡ Quick Facts</h3>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Total Questions', value: String(exam.questions) },
                      { label: 'Total Marks', value: String(exam.marks) },
                      { label: 'Duration', value: exam.duration },
                      { label: 'Negative Marking', value: exam.negativeMark === '0' ? 'None ✅' : `-${exam.negativeMark}` },
                      { label: 'Mode', value: exam.mode },
                      { label: 'Conducted By', value: exam.conductedBy },
                    ].map(f => (
                      <div key={f.label} className="flex justify-between items-start gap-2 text-xs py-1.5 border-b border-gray-50 last:border-0">
                        <span className="text-gray-500">{f.label}</span>
                        <span className="font-bold text-gray-800 text-right max-w-[120px]">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Exams */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#0D1837' }}>Other Exams</h3>
                  <div className="space-y-2">
                    {otherExams.map((e) => (
                      <a key={e.slug} href={`/exams/${e.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="text-xl">{e.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs text-gray-900">{e.code}</div>
                          <div className="text-[10px] text-gray-400 truncate">{e.fullName}</div>
                        </div>
                        <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* College Predictor */}
                <div className="rounded-2xl p-5"
                  style={{ background: `linear-gradient(135deg, #0D1837, #08BD80)` }}>
                  <div className="text-3xl mb-2">🔮</div>
                  <h3 className="font-bold text-white text-sm mb-1">College Predictor</h3>
                  <p className="text-white/60 text-xs mb-3">Check your chances for all NLUs based on your {exam.code} rank.</p>
                  <a href="/college-predictor"
                    className="block text-center py-2.5 rounded-xl font-bold text-sm"
                    style={{ background: '#fff', color: '#08BD80' }}>
                    Try Free Predictor
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
