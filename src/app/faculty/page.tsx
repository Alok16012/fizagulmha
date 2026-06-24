import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFaculty } from '@/lib/getData';

export const dynamic = 'force-dynamic';

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default async function FacultyListPage() {
  const faculty = await getFaculty();

  return (
    <>
      <Navbar />
      <main style={{ background: '#F8FAFC' }}>
        <section className="py-10 md:py-16" style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-white/50 text-sm mb-6 hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ background: 'rgba(247,116,32,0.16)', color: '#5DE2B2', border: '1px solid rgba(93,226,178,0.24)' }}>
                Our Faculty
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-black text-white">Meet Our Expert Faculty</h1>
              <p className="text-white/65 mt-3 text-sm md:text-base">
                Advocates, NLU alumni and toppers who guide CLATians students across every law entrance track.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {faculty.map((f) => {
              const accent = f.color || '#f77420';
              const initials = f.avatar || getInitials(f.name);

              return (
                <Link
                  key={f.slug}
                  href={`/faculty/${f.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-5" style={{ background: f.bg || '#fff1e8' }}>
                    {f.photo ? (
                      <img
                        src={f.photo}
                        alt={f.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
                      >
                        {initials}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-black text-base leading-tight" style={{ color: '#0D1837' }}>{f.name}</h2>
                      <span className="text-xs font-bold" style={{ color: accent }}>{f.rating}★</span>
                    </div>
                    <p className="text-sm font-bold mt-1" style={{ color: accent }}>{f.designation}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.subject}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {f.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-full"
                          style={{ background: '#fff7ed', color: accent, border: '1px solid #ffd4ba' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 text-xs font-bold group-hover:translate-x-1 transition-transform" style={{ color: accent }}>
                      View Profile →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
