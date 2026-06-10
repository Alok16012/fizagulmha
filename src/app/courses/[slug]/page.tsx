import { notFound } from 'next/navigation';
import { getCourses, getCourseBySlug, getBatchesByCourse } from '@/lib/getData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// Always render fresh so admin edits to courses/batches show immediately.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.title} – CLAT Coaching | CLATians`,
    description: course.overview.slice(0, 155),
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const allCourses = await getCourses();
  const otherCourses = allCourses.filter((c) => c.slug !== slug);
  const courseBatches = await getBatchesByCourse(slug);

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* ── Hero ──────────────────────────────────── */}
        <div className="relative overflow-hidden py-14 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: course.color }} />
          <div className="max-w-7xl mx-auto px-4">
            <a href="/" className="inline-flex items-center gap-1 text-white/50 text-sm mb-5 hover:text-white transition-colors">
              ← Back to Home
            </a>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: course.bg }}>
                  {course.icon}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{course.title}</h1>
                <p className="text-white/60 mt-3 text-base md:text-lg">{course.tagline}</p>

                <div className="flex flex-wrap gap-4 mt-6 text-sm">
                  {[
                    { label: 'Duration', value: course.duration },
                    { label: 'Mode', value: course.mode },
                    { label: 'Batch Size', value: course.batchSize },
                  ].map((d) => (
                    <div key={d.label} className="bg-white/10 rounded-xl px-4 py-2">
                      <div className="text-white/50 text-xs">{d.label}</div>
                      <div className="text-white font-bold">{d.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-8 flex-wrap">
                  <a href="#enroll"
                    className="px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                    style={{ background: course.color }}>
                    Enroll Now — {course.fee}
                  </a>
                  <a href="tel:8507700177"
                    className="px-6 py-3.5 rounded-xl font-semibold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors">
                    📞 Free Counselling
                  </a>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-3">
                {course.includes.map((item) => (
                  <div key={item.label}
                    className="bg-white/10 border border-white/15 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-black text-white text-lg">{item.value}</span>
                    <span className="text-white/50 text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-8">

            {/* ── Main Content ──────────────────────── */}
            <div className="md:col-span-2 space-y-10">

              {/* Overview */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Course Overview</h2>
                <p className="text-gray-600 leading-relaxed">{course.overview}</p>
              </section>

              {/* Features */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>What You Get</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5"
                        style={{ background: course.color }}>
                        ✓
                      </span>
                      <span className="text-sm text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curriculum */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((mod, i) => (
                    <details key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden group" open={i === 0}>
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                            style={{ background: course.color }}>
                            {i + 1}
                          </span>
                          <span className="font-bold text-gray-900 text-sm">{mod.module}</span>
                        </div>
                        <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl flex-shrink-0">+</span>
                      </summary>
                      <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {mod.topics.map((t) => (
                            <div key={t} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: course.color }} />
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Who is this for */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Who Is This For?</h2>
                <div className="space-y-2">
                  {course.whoFor.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                      <span className="text-lg">✅</span>
                      <span className="text-sm text-gray-700">{w}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Student Testimonial */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Student Success Story</h2>
                <div className="rounded-2xl p-6 md:p-8"
                  style={{ background: `linear-gradient(135deg, #0D1837, #1f3160)` }}>
                  <p className="text-white text-lg md:text-xl font-semibold leading-relaxed">
                    &ldquo;{course.testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black"
                      style={{ background: course.color }}>
                      {course.testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{course.testimonial.name}</div>
                      <div className="text-white/60 text-xs">{course.testimonial.rank} · {course.testimonial.college}</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ── Sidebar ──────────────────────────── */}
            <aside>
              <div className="sticky top-20 space-y-5">

                {/* Batches card */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between"
                    style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
                    <div>
                      <h3 className="font-black text-white text-base">Available Batches</h3>
                      <p className="text-white/60 text-xs mt-0.5">{courseBatches.length} batches · {course.title}</p>
                    </div>
                    <span className="text-2xl">📅</span>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {courseBatches.map((batch) => {
                      const seatsLeft = batch.seats - batch.filled;
                      const pct = Math.round((batch.filled / batch.seats) * 100);
                      return (
                        <a key={batch.slug} href={`/courses/${slug}/${batch.slug}`}
                          className="flex flex-col gap-2 p-4 hover:bg-gray-50 transition-colors group">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-sm text-gray-900 group-hover:text-green-700 transition-colors leading-tight">
                                {batch.name}
                              </div>
                              <div className="text-[11px] text-gray-400 mt-0.5">{batch.schedule}</div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                              style={
                                batch.status === 'filling-fast'
                                  ? { background: '#fef3c7', color: '#92400e' }
                                  : batch.status === 'ongoing'
                                  ? { background: '#dcfce7', color: '#166534' }
                                  : { background: '#e0f2fe', color: '#0369a1' }
                              }>
                              {batch.status === 'filling-fast' ? '🔥 Filling Fast' : batch.status === 'ongoing' ? '✅ Open' : '🕐 Upcoming'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-500">📅 {batch.startDate}</span>
                            <span className="font-bold" style={{ color: course.color }}>{batch.fee}</span>
                          </div>

                          {/* Seat fill bar */}
                          <div>
                            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                              <span>{seatsLeft} seats left</span>
                              <span>{pct}% filled</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all"
                                style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : pct > 50 ? '#f59e0b' : course.color }} />
                            </div>
                          </div>

                          <div className="text-[10px] font-semibold flex items-center gap-1" style={{ color: course.color }}>
                            View Batch Details →
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className="p-4 border-t border-gray-50">
                    <a href="tel:8507700177"
                      className="block text-center py-2.5 rounded-xl font-bold text-white text-sm"
                      style={{ background: course.color }}>
                      📞 Call to Enroll
                    </a>
                  </div>
                </div>

                {/* Other Courses */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#0D1837' }}>Other Programs</h3>
                  <div className="space-y-2">
                    {otherCourses.map((c) => (
                      <a key={c.slug} href={`/courses/${c.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="text-xl">{c.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-xs text-gray-900">{c.title}</div>
                          <div className="text-[10px] text-gray-400">{c.fee} · {c.duration}</div>
                        </div>
                        <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ── Mobile Sticky Enroll Bar ──────────────── */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <div className="rounded-2xl shadow-2xl overflow-hidden flex items-center gap-3 px-4 py-3"
          style={{ background: '#0D1837', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex-1 min-w-0">
            <div className="text-white font-black text-base leading-none">{course.fee}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>EMI: {course.emi}</div>
          </div>
          <a href="tel:8507700177"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </a>
          <a href="#enroll"
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: '#08BD80' }}>
            Enroll Now →
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
