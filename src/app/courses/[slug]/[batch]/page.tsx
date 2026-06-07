import { notFound } from 'next/navigation';
import { courses as staticCourses } from '@/data/courses';
import { batches as staticBatches } from '@/data/batches';
import { getCourseBySlug, getBatchBySlug, getBatchesByCourse } from '@/lib/getData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return staticBatches.map((b) => ({ slug: b.courseSlug, batch: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; batch: string }> }): Promise<Metadata> {
  const { batch: batchSlug } = await params;
  const batch = await getBatchBySlug(batchSlug);
  if (!batch) return { title: 'Batch Not Found' };
  return {
    title: `${batch.name} – CLATians`,
    description: batch.description.slice(0, 155),
  };
}

const cardPalettes: Record<string, { from: string; to: string; accent: string }> = {
  'Target Batch':     { from: '#0f3460', to: '#1a6b5c', accent: '#08BD80' },
  'Foundation Batch': { from: '#1e3a5f', to: '#1d4ed8', accent: '#3b82f6' },
  'Dream Batch':      { from: '#3b1f6b', to: '#7c3aed', accent: '#8b5cf6' },
  'Crash Course':     { from: '#7c1d1d', to: '#c2410c', accent: '#f97316' },
  'Starter Pack':     { from: '#134e2c', to: '#15803d', accent: '#22c55e' },
  'Pro Pack':         { from: '#1e3a8a', to: '#1d4ed8', accent: '#3b82f6' },
  'Ultimate Pack':    { from: '#78350f', to: '#b45309', accent: '#f59e0b' },
};

const batchTypeColors: Record<string, { bg: string; color: string }> = {
  'Target Batch':     { bg: '#ccfbf1', color: '#0f766e' },
  'Foundation Batch': { bg: '#dbeafe', color: '#1d4ed8' },
  'Dream Batch':      { bg: '#ede9fe', color: '#6d28d9' },
  'Crash Course':     { bg: '#ffedd5', color: '#c2410c' },
  'Starter Pack':     { bg: '#dcfce7', color: '#15803d' },
  'Pro Pack':         { bg: '#dbeafe', color: '#1d4ed8' },
  'Ultimate Pack':    { bg: '#fef3c7', color: '#b45309' },
};

const statusConfig = {
  'filling-fast': { label: '🔥 Filling Fast', bg: '#fef3c7', color: '#92400e' },
  'ongoing':      { label: '✅ Enrolling Now', bg: '#dcfce7', color: '#166534' },
  'upcoming':     { label: '🕐 Upcoming Batch', bg: '#e0f2fe', color: '#0369a1' },
};

export default async function BatchPage({ params }: { params: Promise<{ slug: string; batch: string }> }) {
  const { slug, batch: batchSlug } = await params;
  const course = await getCourseBySlug(slug);
  const batch  = await getBatchBySlug(batchSlug);
  if (!course || !batch) notFound();

  const allBatches   = await getBatchesByCourse(slug);
  const otherBatches = allBatches.filter((b) => b.slug !== batchSlug);
  const seatsLeft    = batch.seats - batch.filled;
  const pct          = Math.round((batch.filled / batch.seats) * 100);
  const st           = statusConfig[batch.status];
  const palette      = cardPalettes[batch.batchType] || { from: '#060d1f', to: '#0D1837', accent: '#08BD80' };
  const typeStyle    = batchTypeColors[batch.batchType] || { bg: '#f3f4f6', color: '#374151' };

  const reviews = [
    { name: 'Sumit Kumar',  badge: 'AIR 34',  avatar: 'SK', color: '#6366f1', text: 'This batch completely transformed my preparation. Small batch size means A.K. Sir knows every student personally. Highly recommend!' },
    { name: 'Pooja Singh',  badge: 'AIR 78',  avatar: 'PS', color: '#ec4899', text: 'The schedule is intense but absolutely worth it. Mock tests every week kept me sharp. Cleared in the first attempt.' },
    { name: 'Rahul Jha',    badge: 'AIR 112', avatar: 'RJ', color: '#f59e0b', text: 'Faculty is extremely supportive. Doubt sessions are very productive. Materials are comprehensive and exam-focused.' },
    { name: 'Ananya Das',   badge: 'AIR 55',  avatar: 'AD', color: '#14b8a6', text: 'I traveled from Kolkata for offline classes — worth every bit. The peer group is amazing, we all cleared together.' },
  ];

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0" style={{ background: '#F8FAFC' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <div className="relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)` }}>
          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ background: palette.accent }} />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-5 blur-2xl"
            style={{ background: 'white' }} />

          <div className="relative max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-14">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/50 text-xs mb-6 flex-wrap">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>›</span>
              <a href="/courses" className="hover:text-white transition-colors">Courses</a>
              <span>›</span>
              <a href={`/courses?cat=${course.category}`} className="hover:text-white transition-colors">{course.title}</a>
              <span>›</span>
              <span className="text-white/80">{batch.name}</span>
            </div>

            <div className="grid md:grid-cols-5 gap-8 items-start">
              {/* Left — 3 cols */}
              <div className="md:col-span-3">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                    {batch.language}
                  </span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: typeStyle.bg, color: typeStyle.color }}>
                    {batch.batchType}
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2">
                  {batch.name}
                </h1>
                <p className="text-white/60 text-sm md:text-base mb-6">
                  {batch.exam} · {batch.mode}
                </p>

                {/* Key info grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { icon: '📅', label: 'Starts', val: batch.startDate },
                    { icon: '🏁', label: 'Ends', val: batch.endDate },
                    { icon: '⏱️', label: 'Duration', val: batch.duration.split('(')[0].trim() },
                    { icon: '🪑', label: 'Seats Left', val: batch.seats >= 999 ? 'Open' : `${seatsLeft} / ${batch.seats}` },
                  ].map((d) => (
                    <div key={d.label}
                      className="rounded-xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="text-white/50 text-[10px] mb-0.5">{d.icon} {d.label}</div>
                      <div className="text-white font-black text-sm">{d.val}</div>
                    </div>
                  ))}
                </div>

                {/* Seat fill bar */}
                {batch.seats < 999 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <span>{seatsLeft} seats remaining</span>
                      <span>{pct}% filled</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : pct > 50 ? '#f59e0b' : palette.accent }} />
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex gap-3 flex-wrap">
                  <a href="tel:8507700177"
                    className="px-7 py-3.5 rounded-xl font-black text-white text-sm hover:opacity-90 transition-opacity"
                    style={{ background: palette.accent }}>
                    📞 Enroll Now — {batch.fee}
                  </a>
                  <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl font-bold text-white text-sm transition-colors"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    💬 Free Counselling
                  </a>
                </div>
              </div>

              {/* Right — 2 cols — highlights */}
              <div className="hidden md:block md:col-span-2">
                <div className="rounded-2xl p-5 space-y-2.5"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">What&apos;s Included</p>
                  {batch.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0 mt-0.5"
                        style={{ background: palette.accent }}>✓</span>
                      <span className="text-white/85 text-sm leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-8">
          <div className="grid md:grid-cols-3 gap-5">

            {/* ── Main Content ── */}
            <div className="md:col-span-2 space-y-4">

              {/* About + Faculty combined */}
              <div className="bg-white rounded-2xl p-5"
                style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <p className="text-base text-gray-600 leading-relaxed mb-4">{batch.description}</p>
                <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: '#F3F4F6' }}>
                  <span className="text-sm font-bold mr-1" style={{ color: '#9CA3AF' }}>Faculty:</span>
                  {batch.faculty.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ background: '#F0FDF9', border: '1px solid #C6F3E4' }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
                        style={{ background: palette.accent }}>
                        {f.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold" style={{ color: '#0f766e' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes + Syllabus side by side */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Includes */}
                <div className="bg-white rounded-2xl p-5"
                  style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <h2 className="text-sm font-black mb-3 uppercase tracking-wide" style={{ color: '#9CA3AF' }}>Batch Includes</h2>
                  <div className="space-y-2">
                    {batch.chips.map((chip) => (
                      <div key={chip} className="flex items-center gap-2.5 py-2 px-3 rounded-xl"
                        style={{ background: '#F0FDF9', border: '1px solid #C6F3E4' }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
                          style={{ background: palette.accent }}>✓</span>
                        <span className="text-base font-semibold" style={{ color: '#0f766e' }}>{chip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus */}
                <div className="bg-white rounded-2xl p-5"
                  style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <h2 className="text-sm font-black mb-3 uppercase tracking-wide" style={{ color: '#9CA3AF' }}>Syllabus</h2>
                  <div className="space-y-2">
                    {batch.syllabus.map((s, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2 px-3 rounded-xl"
                        style={{ background: '#F8FAFC', border: '1px solid #E9EEF2' }}>
                        <span className="w-5 h-5 rounded-lg flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                          style={{ background: palette.accent }}>{i + 1}</span>
                        <span className="text-base text-gray-700 font-medium leading-tight">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Batch Details Table — compact */}
              <div className="bg-white rounded-2xl overflow-hidden"
                style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div className="px-5 py-3 flex items-center justify-between"
                  style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
                  <h2 className="text-sm font-black text-white">Batch Details</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white/70"
                    style={{ background: 'rgba(255,255,255,0.15)' }}>{batch.batchCode}</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: 'Exam Targeted', val: batch.exam },
                    { label: 'Start Date',    val: batch.startDate },
                    { label: 'End Date',      val: batch.endDate },
                    { label: 'Duration',      val: batch.duration },
                    { label: 'Schedule',      val: batch.schedule },
                    { label: 'Mode',          val: batch.mode },
                    { label: 'Language',      val: batch.language },
                    { label: 'Seats',         val: batch.seats >= 999 ? 'Open Enrollment' : `${batch.seats - batch.filled} left of ${batch.seats}` },
                    { label: 'Fee',           val: batch.fee },
                    { label: 'EMI',           val: batch.emi },
                  ].map((row, i) => (
                    <div key={row.label}
                      className="flex items-center justify-between px-5 py-3 text-sm"
                      style={{ background: i % 2 === 0 ? '#FAFAFA' : 'white' }}>
                      <span className="font-medium text-base" style={{ color: '#6B7280' }}>{row.label}</span>
                      <span className="font-bold text-base text-right max-w-[55%]" style={{ color: '#0D1837' }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Reviews — 2 col compact */}
              <div>
                <h2 className="text-lg font-black mb-3" style={{ color: '#0D1837' }}>Student Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {reviews.map((r) => (
                    <div key={r.name} className="bg-white rounded-2xl p-4"
                      style={{ border: '1.5px solid #E9EEF2' }}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                          style={{ background: r.color }}>{r.avatar}</div>
                        <div>
                          <p className="font-bold text-base leading-tight" style={{ color: '#0D1837' }}>{r.name}</p>
                          <p className="text-sm font-bold" style={{ color: '#08BD80' }}>{r.badge} · CLAT</p>
                        </div>
                        <span className="ml-auto text-sm" style={{ color: '#f59e0b' }}>⭐⭐⭐⭐⭐</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Banner */}
              <div className="rounded-2xl p-5 md:p-6"
                style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black text-white text-lg mb-1">Ready to Join This Batch?</h3>
                    <p className="text-white/60 text-sm">
                      {batch.seats < 999 ? `Only ${seatsLeft} seats left.` : 'Enrollment open.'} Secure your spot now.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a href="tel:8507700177"
                      className="px-5 py-2.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                      style={{ background: palette.accent }}>
                      📞 Call Now
                    </a>
                    <a href="/admission"
                      className="px-5 py-2.5 rounded-xl font-bold text-white text-sm hover:bg-white/10 transition-colors"
                      style={{ border: '1px solid rgba(255,255,255,0.25)' }}>
                      Apply Online
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Sticky Sidebar ── */}
            <aside className="hidden md:block">
              <div className="sticky top-20 space-y-4">

                {/* Enroll Card */}
                <div className="bg-white rounded-2xl overflow-hidden"
                  style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <div className="px-5 pt-5 pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: st.bg, color: st.color }}>{st.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-3xl font-black" style={{ color: '#0D1837' }}>{batch.fee}</span>
                      {batch.originalFee && (
                        <span className="text-sm line-through" style={{ color: '#9CA3AF' }}>{batch.originalFee}</span>
                      )}
                    </div>
                    {batch.offer && (
                      <p className="text-xs font-bold mb-2" style={{ color: '#08BD80' }}>🎉 {batch.offer}</p>
                    )}
                    <p className="text-xs mb-3" style={{ color: '#9CA3AF' }}>EMI: {batch.emi}</p>

                    {batch.seats < 999 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1" style={{ color: '#9CA3AF' }}>
                          <span>{seatsLeft} seats left</span>
                          <span>{pct}% filled</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full"
                            style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : pct > 50 ? '#f59e0b' : palette.accent }} />
                        </div>
                      </div>
                    )}

                    <a href="tel:8507700177"
                      className="block text-center py-3 rounded-xl font-black text-white text-sm mb-2 hover:opacity-90 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
                      📞 Enroll Now
                    </a>
                    <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
                      className="block text-center py-3 rounded-xl font-bold text-sm mb-2 hover:opacity-90 transition-opacity"
                      style={{ background: '#25D366', color: 'white' }}>
                      💬 WhatsApp Us
                    </a>
                    <a href="/admission"
                      className="block text-center py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-gray-50 transition-colors"
                      style={{ borderColor: '#E9EEF2', color: '#6B7280' }}>
                      Fill Admission Form
                    </a>
                  </div>

                  {/* Quick info */}
                  <div className="px-5 py-4 space-y-2.5 border-t" style={{ borderColor: '#F3F4F6', background: '#FAFAFA' }}>
                    {[
                      { icon: '📅', label: 'Starts', val: batch.startDate },
                      { icon: '🏁', label: 'Ends', val: batch.endDate },
                      { icon: '⏱️', label: 'Duration', val: batch.duration.split('(')[0].trim() },
                      { icon: '🕐', label: 'Schedule', val: batch.schedule.split('·')[0].trim() },
                      { icon: '💻', label: 'Mode', val: batch.mode.split('(')[0].trim() },
                    ].map((d) => (
                      <div key={d.label} className="flex items-center justify-between text-xs">
                        <span style={{ color: '#9CA3AF' }}>{d.icon} {d.label}</span>
                        <span className="font-bold text-right" style={{ color: '#0D1837', maxWidth: '55%' }}>{d.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related batches from SAME course */}
                {otherBatches.length > 0 && (
                  <div className="bg-white rounded-2xl p-5"
                    style={{ border: '1.5px solid #E9EEF2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <h3 className="font-black text-sm mb-4" style={{ color: '#0D1837' }}>
                      Other {course.title} Batches
                    </h3>
                    <div className="space-y-3">
                      {otherBatches.map((b) => {
                        const bLeft = b.seats - b.filled;
                        const bSt   = statusConfig[b.status];
                        return (
                          <a key={b.slug}
                            href={`/courses/${slug}/${b.slug}`}
                            className="block p-3.5 rounded-xl transition-all hover:shadow-md hover:border-green-400"
                            style={{ border: '1.5px solid #E9EEF2', background: '#FAFAFA' }}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <p className="font-bold text-xs leading-snug" style={{ color: '#0D1837' }}>{b.name}</p>
                              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0"
                                style={{ background: bSt.bg, color: bSt.color }}>
                                {b.status === 'upcoming' ? 'NEW' : b.status === 'filling-fast' ? '🔥' : '✅'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[11px] font-bold" style={{ color: '#08BD80' }}>{b.fee}</p>
                                {b.originalFee && <p className="text-[10px] line-through" style={{ color: '#9CA3AF' }}>{b.originalFee}</p>}
                              </div>
                              <div className="text-right">
                                <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{b.startDate}</p>
                                {b.seats < 999 && <p className="text-[10px] font-semibold" style={{ color: bLeft <= 5 ? '#ef4444' : '#6B7280' }}>{bLeft} seats left</p>}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Back to courses */}
                <a href={`/courses?cat=${course.category}`}
                  className="flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border transition-colors hover:bg-white"
                  style={{ color: '#6B7280', borderColor: '#E9EEF2' }}>
                  ← All {course.title} Batches
                </a>
              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* ── Mobile Sticky Bar ──────────────────────────────── */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <div className="rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-white font-black text-lg leading-none">{batch.fee}</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {batch.seats < 999 ? `${seatsLeft} seats left · ` : ''}{batch.emi}
              </div>
            </div>
            <a href="https://wa.me/918507700177" target="_blank" rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
              💬
            </a>
            <a href="tel:8507700177"
              className="px-5 py-2.5 rounded-xl text-sm font-black text-white"
              style={{ background: palette.accent }}>
              Enroll →
            </a>
          </div>
          {batch.seats < 999 && (
            <div className="h-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full" style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : pct > 50 ? '#f59e0b' : palette.accent }} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
