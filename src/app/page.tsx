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
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
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
