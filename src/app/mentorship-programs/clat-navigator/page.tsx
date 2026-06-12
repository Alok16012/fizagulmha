import type { Metadata } from 'next';
import ClatNavigatorPageContent, { clatNavigatorFaqSchema } from '@/components/ClatNavigatorPageContent';

export const metadata: Metadata = {
  title: 'CLAT Navigator™ Mentorship Program 2027 | Personal CLAT Guidance & Strategy | CLATians',
  description: 'Get expert guidance through CLAT Navigator™ by CLATians. Personal mentor, mock analysis, AI-powered tracking, study planning, and strategic support till CLAT examination.',
  keywords: [
    'CLAT Mentorship Program',
    'Personal CLAT Mentor',
    'CLAT Guidance Program',
    'CLAT Strategy Program',
    'CLAT Preparation Mentorship',
    'CLAT Personal Guidance',
    'CLAT Coaching with Mentorship',
  ],
};

export default function ClatNavigatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clatNavigatorFaqSchema) }} />
      <ClatNavigatorPageContent />
    </>
  );
}
