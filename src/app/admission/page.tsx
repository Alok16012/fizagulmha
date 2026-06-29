import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdmissionPage from '@/components/AdmissionPage';
import ManagedPageBanner from '@/components/ManagedPageBanner';
import type { Metadata } from 'next';
import { getHomeContent } from '@/lib/getData';

export const metadata: Metadata = {
  title: 'Admission 2026 – Enroll in CLATians CLAT Coaching',
  description: 'Apply for CLATians 2026 batch. Offline, Online, Mentorship programs. Limited seats. Call 8507700177.',
};

export const dynamic = 'force-dynamic';

export default async function Admission() {
  const homeContent = await getHomeContent();

  return (
    <>
      <Navbar />
      <ManagedPageBanner pageKey="admission" />
      <AdmissionPage content={homeContent.admission} />
      <Footer />
    </>
  );
}
