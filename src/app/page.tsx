import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ProgramsSection from '@/components/ProgramsSection';
import ExamsSection from '@/components/ExamsSection';
import FeaturedServices from '@/components/FeaturedServices';
import TestimonialsSection from '@/components/TestimonialsSection';
import FacultySection from '@/components/FacultySection';
import FAQSection from '@/components/FAQSection';
import CollegePredictorSection from '@/components/CollegePredictorSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* ── Mobile first fold: clipped to exactly one screen ── */}
      <div
        className="md:hidden overflow-hidden"
        style={{ maxHeight: 'calc(100svh - 60px - 56px)' }}
      >
        <HeroSection />
        <StatsSection />
        <ProgramsSection />
      </div>

      {/* ── Desktop: normal flow ── */}
      <div className="hidden md:block">
        <HeroSection />
        <StatsSection />
        <ProgramsSection />
      </div>

      <ExamsSection />
      <FeaturedServices />
      <TestimonialsSection />
      <FacultySection />
      <FAQSection />
      <CollegePredictorSection />
      <Footer />
    </main>
  );
}
