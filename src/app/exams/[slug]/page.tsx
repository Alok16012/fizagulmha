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
          style={{ background: `linear-gradient(135deg, var(--navy-dark), var(--navy))` }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: exam.color }} />
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Left */}
            <div className="flex-1">
              <a href="/" className="inline-flex items-center gap-1 text-white/50 text-sm mb-4 hover:text-white transition-colors">
                ← Back to Home
              </a>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{exam.icon}</span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ background: exam.color + '33', border: `1px solid ${exam.color}55` }}>
                  {exam.code}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {exam.fullName}
              </h1>
              <p className="text-white/60 mt-3 text-base md:text-lg">{exam.tagline}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="#courses"
                  className="px-6 py-3 rounded-xl font-bold text-white text-sm"
                  style={{ background: exam.color }}>
                  Enroll Now →
                </a>
                <a href="#pattern"
                  className="px-6 py-3 rounded-xl font-semibold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors">
                  Exam Pattern
                </a>
              </div>
            </div>

            {/* Right: Quick info card */}
            <div className="w-full md:w-72 bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-5 flex-shrink-0">
              {[
                { label: 'Total Seats', value: exam.seats, icon: '🪑' },
                { label: 'Colleges', value: exam.colleges, icon: '🏛️' },
                { label: 'Duration', value: exam.duration, icon: '⏱️' },
                { label: 'Total Questions', value: String(exam.questions), icon: '❓' },
                { label: 'Total Marks', value: String(exam.marks), icon: '📊' },
                { label: 'Negative Marking', value: exam.negativeMark, icon: '⚠️' },
                { label: 'Mode', value: exam.mode, icon: '💻' },
                { label: 'Conducted By', value: exam.conductedBy, icon: '🏢' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                  <span className="text-white/60 text-xs flex items-center gap-1.5">{item.icon} {item.label}</span>
                  <span className="text-white font-semibold text-xs text-right max-w-[130px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-8">

            {/* ── Main Content ──────────────────────────── */}
            <div className="md:col-span-2 space-y-10">

              {/* Overview */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>Overview</h2>
                <p className="text-gray-600 leading-relaxed">{exam.overview}</p>
              </section>

              {/* Eligibility */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>Eligibility Criteria</h2>
                <ul className="space-y-3">
                  {exam.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ background: exam.color }}>
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{e}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Exam Pattern */}
              <section id="pattern">
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>Exam Pattern</h2>
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: exam.color + '15' }}>
                        <th className="text-left p-4 font-bold text-gray-700">Section</th>
                        <th className="text-center p-4 font-bold text-gray-700">Questions</th>
                        <th className="text-center p-4 font-bold text-gray-700">Marks</th>
                        <th className="text-center p-4 font-bold text-gray-700 hidden md:table-cell">Weightage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exam.examPattern.map((row, i) => (
                        <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium text-gray-800">{row.section}</td>
                          <td className="p-4 text-center font-semibold" style={{ color: exam.color }}>{row.questions}</td>
                          <td className="p-4 text-center text-gray-600">{row.marks}</td>
                          <td className="p-4 text-center hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full"
                                  style={{ width: `${(row.marks / exam.marks) * 100}%`, background: exam.color }} />
                              </div>
                              <span className="text-xs text-gray-500 w-8">{Math.round((row.marks / exam.marks) * 100)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-200" style={{ background: exam.color + '10' }}>
                        <td className="p-4 font-black text-gray-800">Total</td>
                        <td className="p-4 text-center font-black" style={{ color: exam.color }}>{exam.questions}</td>
                        <td className="p-4 text-center font-black text-gray-800">{exam.marks}</td>
                        <td className="p-4 hidden md:table-cell" />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Syllabus */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>Syllabus</h2>
                <div className="space-y-4">
                  {exam.syllabus.map((s) => (
                    <div key={s.subject} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                      <div className="px-5 py-3 font-bold text-sm text-white flex items-center gap-2"
                        style={{ background: exam.color }}>
                        {s.subject}
                      </div>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {s.topics.map((t) => (
                          <div key={t} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exam.color }} />
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
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>Important Dates</h2>
                <div className="relative pl-4 border-l-2" style={{ borderColor: exam.color }}>
                  {exam.importantDates.map((d, i) => (
                    <div key={i} className="relative mb-5 pl-5">
                      <span className="absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-white"
                        style={{ background: exam.color }} />
                      <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                        <span className="font-medium text-gray-800 text-sm">{d.event}</span>
                        <span className="font-bold text-sm flex-shrink-0 ml-4" style={{ color: exam.color }}>{d.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Preparation Tips */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>
                  CLATians Preparation Tips
                </h2>
                <div className="space-y-3">
                  {exam.preparationTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-white">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                        style={{ background: exam.color }}>
                        {i + 1}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--navy)' }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {exam.faqs.map((faq, i) => (
                    <details key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden group">
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 text-sm select-none">
                        {faq.q}
                        <span className="ml-3 text-gray-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* ── Sidebar ──────────────────────────────── */}
            <aside className="space-y-5">

              {/* Enroll CTA */}
              <div className="sticky top-20">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-lg mb-1" style={{ color: 'var(--navy)' }}>
                    Crack {exam.code} 2026
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Join CLATians and get expert guidance for {exam.code} preparation.
                  </p>
                  <a href="/courses/offline"
                    className="block text-center py-3 rounded-xl font-bold text-white text-sm mb-2"
                    style={{ background: exam.color }}>
                    Enroll in Offline Course
                  </a>
                  <a href="/courses/online"
                    className="block text-center py-3 rounded-xl font-bold text-sm border-2"
                    style={{ borderColor: exam.color, color: exam.color }}>
                    Join Online Course
                  </a>
                  <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                    <a href="tel:8507700177" className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                      📞 Call: 8507700177
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">Free counselling available</p>
                  </div>
                </div>

                {/* Other Exams */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 mt-5">
                  <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--navy)' }}>Other Exams</h3>
                  <div className="space-y-2">
                    {otherExams.map((e) => (
                      <a key={e.slug} href={`/exams/${e.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="text-xl">{e.icon}</span>
                        <div>
                          <div className="font-semibold text-xs text-gray-900">{e.code}</div>
                          <div className="text-[10px] text-gray-400">{e.seats} seats</div>
                        </div>
                        <svg className="w-3 h-3 text-gray-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* College Predictor */}
                <div className="rounded-2xl p-5 mt-5"
                  style={{ background: `linear-gradient(135deg, var(--navy), var(--navy-light))` }}>
                  <div className="text-2xl mb-2">🔮</div>
                  <h3 className="font-bold text-white text-sm mb-1">College Predictor</h3>
                  <p className="text-white/60 text-xs mb-3">Check your chances for all NLUs based on your {exam.code} rank.</p>
                  <a href="/college-predictor"
                    className="block text-center py-2.5 rounded-xl font-bold text-white text-xs"
                    style={{ background: 'var(--cyan)' }}>
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
