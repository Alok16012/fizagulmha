import Link from 'next/link';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import CourseTabsSection from '@/components/CourseTabsSection';
import ExamsSection from '@/components/ExamsSection';
import BlogsScrollSection from '@/components/BlogsScrollSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FacultySection from '@/components/FacultySection';
import FAQSection from '@/components/FAQSection';
import CollegePredictorSection from '@/components/CollegePredictorSection';
import Footer from '@/components/Footer';
import { getFaculty } from '@/lib/getData';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const faculty = await getFaculty();

  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />

      {/* Courses section */}
      <section style={{ background: '#F8FAFC' }} className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto">

          {/* Desktop header */}
          <div className="hidden md:block text-center mb-7 px-10">
            <span style={{ background: '#fff1e8', color: '#f77420', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '10px' }}>
              OUR PROGRAMS
            </span>
            <h2 style={{ color: '#0D1837', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '8px' }}>
              Courses for Every Aspirant
            </h2>
            <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
              Offline, Online, Mentorship, or Mock Tests — find the right program for your CLAT journey.
            </p>
          </div>

          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between px-4 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#f77420' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f77420' }}>Our Programs</span>
              </div>
              <h2 className="font-black" style={{ color: '#0D1837', fontSize: '20px', lineHeight: 1.2 }}>Courses for You</h2>
            </div>
            <Link href="/courses" className="text-xs font-bold" style={{ color: '#f77420' }}>See All →</Link>
          </div>

          <div className="md:px-10">
            <CourseTabsSection />
          </div>
        </div>
      </section>

      <ExamsSection />
      <BlogsScrollSection />
      <TestimonialsSection />

      {/* Faculty section */}
      <FacultySection faculty={faculty} />

      <FAQSection />
      <CollegePredictorSection />
      <Footer />
    </main>
  );
}
