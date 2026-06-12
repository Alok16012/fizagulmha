import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFaculty, getFacultyBySlug } from '@/lib/getData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFacultyBySlug(slug);
  if (!f) return { title: 'Faculty Not Found' };
  return {
    title: `${f.name} – ${f.subject} Expert | CLATians Faculty`,
    description: f.bio.slice(0, 155),
  };
}

export default async function FacultyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = await getFacultyBySlug(slug);
  if (!f) notFound();

  const faculty = await getFaculty();
  const otherFaculty = faculty.filter((m) => m.slug !== slug).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">

        {/* ── Hero ──────────────────────────────────── */}
        <div className="relative overflow-hidden py-10 md:py-20"
          style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: f.color }} />
          <div className="max-w-7xl mx-auto px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-white/50 text-sm mb-6 hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Avatar */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-white font-black text-4xl md:text-5xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}aa)`, overflow: 'hidden' }}>
                {f.photo ? (
                  <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
                ) : (
                  f.avatar
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {f.tags.map((t) => (
                    <span key={t} className="text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: f.color + '33', border: `1px solid ${f.color}55` }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white">{f.name}</h1>
                <p className="text-white/70 mt-1">{f.subject} · {f.specialization}</p>
                <div className="flex flex-wrap items-center gap-5 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{'★'.repeat(Math.floor(f.rating))}</div>
                    <div className="text-white/50 text-xs">{f.rating} Rating</div>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{f.students}</div>
                    <div className="text-white/50 text-xs">Students Trained</div>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{f.experience}</div>
                    <div className="text-white/50 text-xs">Experience</div>
                  </div>
                </div>
              </div>
              <a href="tel:8507700177"
                className="px-6 py-3 rounded-xl font-bold text-white flex-shrink-0 text-sm"
                style={{ background: f.color }}>
                Book a Session →
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: quick-action strip + other faculty scroll */}
        <div className="md:hidden px-4 py-4" style={{ background: '#F8FAFC', borderBottom: '1px solid #E9EEF2' }}>
          <div className="flex gap-3 mb-3">
            <a href="tel:8507700177"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px 0', borderRadius: '16px', fontWeight: 800, fontSize: '13px', color: 'white', textDecoration: 'none', background: f.color }}>
              📞 Book Session
            </a>
            <Link href="/courses/mentorship"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px 0', borderRadius: '16px', fontWeight: 800, fontSize: '13px', color: f.color, textDecoration: 'none', background: 'white', border: `1.5px solid ${f.color}` }}>
              Mentorship →
            </Link>
          </div>
          {otherFaculty.length > 0 && (
            <div style={{ overflowX: 'auto', display: 'flex', gap: '10px', paddingBottom: '2px' }} className="scrollbar-none">
              {otherFaculty.map((m) => (
                <a key={m.slug} href={`/faculty/${m.slug}`}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '99px', background: 'white', border: '1.5px solid #E9EEF2', textDecoration: 'none' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 800, overflow: 'hidden' }}>
                    {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : m.avatar}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#0D1837', whiteSpace: 'nowrap' }}>{m.name.split(' ').slice(-1)[0]}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 md:py-14">
          <div className="grid md:grid-cols-3 gap-8">

            {/* ── Main ─────────────────────────────── */}
            <div className="md:col-span-2 space-y-10">

              {/* Bio */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>About {f.name}</h2>
                <p className="text-gray-600 leading-relaxed">{f.bio}</p>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Education</h2>
                <div className="space-y-3">
                  {f.education.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                      <span className="text-xl">🎓</span>
                      <span className="text-sm text-gray-700">{e}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Expertise */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Areas of Expertise</h2>
                <div className="space-y-4">
                  {f.expertise.map((e) => (
                    <div key={e.area} className="bg-white border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-gray-800">{e.area}</span>
                        <span className="font-black text-sm" style={{ color: f.color }}>{e.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${e.level}%`, background: `linear-gradient(90deg, ${f.color}aa, ${f.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Achievements */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Key Achievements</h2>
                <div className="space-y-3">
                  {f.achievements.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                        style={{ background: f.color }}>
                        🏆
                      </span>
                      <span className="text-sm text-gray-700">{a}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Courses */}
              <section>
                <h2 className="text-2xl font-black mb-4" style={{ color: '#0D1837' }}>Teaches In</h2>
                <div className="flex flex-wrap gap-3">
                  {f.courses.map((c) => (
                    <a key={c} href={`/courses/${c.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                      className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                      style={{ background: f.bg, color: f.color }}>
                      {c} →
                    </a>
                  ))}
                </div>
              </section>
            </div>

            {/* ── Sidebar — desktop only ───────────── */}
            <aside className="hidden md:block">
              <div className="sticky top-20 space-y-5">

                {/* Book Session */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl mb-4"
                    style={{ background: f.color, overflow: 'hidden' }}>
                    {f.photo ? <img src={f.photo} alt={f.name} className="w-full h-full object-cover" /> : f.avatar}
                  </div>
                  <h3 className="font-black text-base" style={{ color: '#0D1837' }}>Book a Session</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    Get personalized guidance from {f.name}.
                  </p>
                  <a href="tel:8507700177"
                    className="block text-center py-3 rounded-xl font-bold text-white text-sm mb-2"
                    style={{ background: f.color }}>
                    📞 Call to Book
                  </a>
                  <Link href="/courses/mentorship"
                    className="block text-center py-3 rounded-xl font-bold text-sm border-2"
                    style={{ borderColor: f.color, color: f.color }}>
                    Mentorship Program
                  </Link>
                </div>

                {/* Stats */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  {[
                    { label: 'Rating', value: `${f.rating} ★`, icon: '⭐' },
                    { label: 'Students Trained', value: f.students, icon: '👥' },
                    { label: 'Experience', value: f.experience, icon: '📅' },
                    { label: 'Designation', value: f.designation, icon: '🏷️' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500">{s.icon} {s.label}</span>
                      <span className="font-bold text-sm text-gray-800">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Other Faculty */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#0D1837' }}>Other Faculty</h3>
                  <div className="space-y-3">
                    {otherFaculty.map((m) => (
                      <a key={m.slug} href={`/faculty/${m.slug}`}
                        className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-colors">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                          style={{ background: m.color, overflow: 'hidden' }}>
                          {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : m.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs text-gray-900 truncate">{m.name}</div>
                          <div className="text-[10px] text-gray-400">{m.subject}</div>
                        </div>
                        <span className="text-[10px] font-bold" style={{ color: m.color }}>{m.rating}★</span>
                      </a>
                    ))}
                  </div>
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
