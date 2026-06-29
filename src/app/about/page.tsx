import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutPage from '@/components/AboutPage';
import ManagedPageBanner from '@/components/ManagedPageBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CLATians – Best CLAT Coaching Institute in Patna, Bihar',
  description: "CLATians is India's most trusted CLAT coaching institute. Founded by NLU alumni, 12+ years of excellence, 5000+ NLU selections. Know our story.",
};

export default function About() {
  return (
    <>
      <Navbar />
      <ManagedPageBanner pageKey="about" />
      <AboutPage />
      <Footer />
    </>
  );
}
