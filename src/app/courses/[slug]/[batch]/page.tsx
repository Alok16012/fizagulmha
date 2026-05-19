import { notFound } from 'next/navigation';
import { getCourseBySlug, courses } from '@/data/courses';
import { getBatch, getBatchesByCourse, batches } from '@/data/batches';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return batches.map((b) => ({ slug: b.courseSlug, batch: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; batch: string }> }): Promise<Metadata> {
  const { slug, batch: batchSlug } = await params;
  const batch = getBatch(slug, batchSlug);
  if (!batch) return { title: 'Batch Not Found' };
  return {
    title: `${batch.name} – CLATians`,
    description: batch.description.slice(0, 155),
  };
}

export default async function BatchPage({ params }: { params: Promise<{ slug: string; batch: string }> }) {
  const { slug, batch: batchSlug } = await params;
  const course = getCourseBySlug(slug);
  const batch = getBatch(slug, batchSlug);
  if (!course || !batch) notFound();

  const allBatches = getBatchesByCourse(slug);
  const otherBatches = allBatches.filter((b) => b.slug !== batchSlug);
  const seatsLeft = batch.seats - batch.filled;
  const pct = Math.round((batch.filled / batch.seats) * 100);

  const statusConfig = {
    'filling-fast': { label: '🔥 Filling Fast', bg: '#fef3c7', color: '#92400e' },
    'ongoing': { label: '✅ Enrolling Now', bg: '#dcfce7', color: '#166534' },
    'upcoming': { label: '🕐 Upcoming Batch', bg: '#e0f2fe', color: '#0369a1' },
  };
  const st = statusConfig[batch.status];

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* ── Hero ───────────────────────────────── */}
        <div className="relative overflow-hidden py-12 md:py-16"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
            style={{ background: batch.color }} />
          <div className="max-w-7xl mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/50 text-xs mb-5 flex-wrap">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>›</span>
              <a href={`/courses/${slug}`} className="hover:text-white transition-colors">{course.title}</a>
              <span>›</span>
              <span className="text-white/80">{batch.name}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                {/* Status + Batch code */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                  <span className="text-white/40 text-xs font-mono">{batch.batchCode}</span>
                </div>

                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{batch.name}</h1>
                <p className="text-white/60 mt-2 text-sm md:text-base">{batch.exam} · {batch.mode}</p>

                {/* Key info chips */}
                <div className="flex flex-wrap gap-3 mt-5">
                  {[
                    { icon: '📅', label: 'Starts', val: batch.startDate },
                    { icon: '⏱️', label: 'Duration', val: batch.duration },
                    { icon: '🕐', label: 'Schedule', val: batch.schedule },
                    { icon: '🪑', label: 'Seats Left', val: `${seatsLeft} of ${batch.seats}` },
                  ].map((d) => (
                    <div key={d.label} className="bg-white/10 rounded-xl px-4 py-2.5 min-w-[130px]">
                      <div className="text-white/50 text-[10px] flex items-center gap-1">{d.icon} {d.label}</div>
                      <div className="text-white font-bold text-sm mt-0.5">{d.val}</div>
                    </div>
                  ))}
                </div>

                {/* Seat progress */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-white/50 mb-1.5">
                    <span>{seatsLeft} seats remaining</span>
                    <span>{pct}% filled</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : pct > 50 ? '#f59e0b' : batch.color }} />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 flex-wrap">
                  <a href="tel:8507700177"
                    className="px-7 py-3.5 rounded-xl font-bold text-white text-sm"
                    style={{ background: batch.color }}>
                    📞 Enroll Now — {batch.fee}
                  </a>
                  <a href="tel:8507700177"
                    className="px-6 py-3.5 rounded-xl font-semibold text-white border border-white/20 text-sm hover:bg-white/10 transition-colors">
                    Free Counselling
                  </a>
                </div>
              </div>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 gap-2.5">
                {batch.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                      style={{ background: batch.color }}>
                      ✓
                    </span>
                    <span className="text-white/90 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ───────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-8">

            {/* ── Main Content ─────────────────── */}
            <div className="md:col-span-2 space-y-10">

              {/* About batch */}
              <section>
                <h2 className="text-2xl font-black mb-3" style={{ color: '#0D1837' }}>About This Batch</h2>
                <p className="text-gray-600 leading-relaxed">{batch.description}</p>
              </section>

              {/* Faculty */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Faculty</h2>
                <div className="flex flex-wrap gap-3">
                  {batch.faculty.map((f) => (
                    <div key={f} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
                        style={{ background: batch.color }}>
                        {f.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-semibold text-sm text-gray-800">{f}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* What's covered */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Syllabus Covered</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {batch.syllabus.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                        style={{ background: batch.color }}>
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700 font-medium">{s}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Batch details table */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Batch Details</h2>
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                  {[
                    { label: 'Batch Name', val: batch.name },
                    { label: 'Batch Code', val: batch.batchCode },
                    { label: 'Exam Targeted', val: batch.exam },
                    { label: 'Start Date', val: batch.startDate },
                    { label: 'Duration', val: batch.duration },
                    { label: 'Schedule', val: batch.schedule },
                    { label: 'Mode', val: batch.mode },
                    { label: 'Total Seats', val: `${batch.seats}` },
                    { label: 'Seats Filled', val: `${batch.filled} (${pct}%)` },
                    { label: 'Fee', val: batch.fee },
                    { label: 'EMI Option', val: batch.emi },
                  ].map((row, i) => (
                    <div key={row.label}
                      className={`flex items-center justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <span className="text-gray-500 font-medium">{row.label}</span>
                      <span className="font-bold text-gray-900 text-right">{row.val}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA banner */}
              <div className="rounded-2xl p-6 md:p-8"
                style={{ background: 'linear-gradient(135deg, #0D1837, #1f3160)' }}>
                <h3 className="font-black text-white text-xl mb-1">Ready to Join This Batch?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Only {seatsLeft} seats left. Call now or visit our Patna center to secure your seat.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a href="tel:8507700177"
                    className="px-6 py-3 rounded-xl font-bold text-white text-sm inline-block"
                    style={{ background: batch.color }}>
                    📞 Call: 8507700177
                  </a>
                  <a href="/admission"
                    className="px-6 py-3 rounded-xl font-bold text-white border border-white/20 text-sm inline-block hover:bg-white/10 transition-colors">
                    Fill Admission Form
                  </a>
                </div>
              </div>
            </div>

            {/* ── Sidebar ────────────────────────── */}
            <aside>
              <div className="sticky top-20 space-y-5">

                {/* Enroll box */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <div className="text-3xl font-black" style={{ color: batch.color }}>{batch.fee}</div>
                  <p className="text-xs text-gray-400 mt-0.5">EMI: {batch.emi}</p>

                  <div className="mt-3 mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{seatsLeft} seats left</span><span>{pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : pct > 50 ? '#f59e0b' : batch.color }} />
                    </div>
                  </div>

                  <a href="tel:8507700177"
                    className="block text-center py-3 rounded-xl font-bold text-white text-sm mt-4"
                    style={{ background: batch.color }}>
                    📞 Enroll Now
                  </a>
                  <a href="/admission"
                    className="block text-center py-3 rounded-xl font-bold text-sm border-2 mt-2"
                    style={{ borderColor: batch.color, color: batch.color }}>
                    Apply Online
                  </a>

                  <div className="mt-4 pt-4 border-t border-gray-50 space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">📅 Starts: <span className="font-bold text-gray-800">{batch.startDate}</span></div>
                    <div className="flex items-center gap-2">⏱️ Duration: <span className="font-bold text-gray-800">{batch.duration}</span></div>
                    <div className="flex items-center gap-2">🕐 Schedule: <span className="font-bold text-gray-800">{batch.schedule}</span></div>
                    <div className="flex items-center gap-2">💻 Mode: <span className="font-bold text-gray-800">{batch.mode}</span></div>
                  </div>
                </div>

                {/* Other batches of same course */}
                {otherBatches.length > 0 && (
                  <div className="bg-white border border-gray-100 rounded-2xl p-5">
                    <h3 className="font-black text-sm mb-3" style={{ color: '#0D1837' }}>
                      More {course.title} Batches
                    </h3>
                    <div className="space-y-2">
                      {otherBatches.map((b) => (
                        <a key={b.slug} href={`/courses/${slug}/${b.slug}`}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: b.color }} />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs text-gray-900 leading-tight">{b.name}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{b.startDate} · {b.fee}</div>
                          </div>
                          <svg className="w-3 h-3 text-gray-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to course */}
                <a href={`/courses/${slug}`}
                  className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border transition-colors hover:bg-gray-50"
                  style={{ color: '#0D1837', borderColor: '#E9EEF2' }}>
                  ← Back to {course.title}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
