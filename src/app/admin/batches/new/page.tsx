export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getCourses, getBatchBySlug } from '@/lib/getData';
import BatchForm from '../BatchForm';
import type { Batch } from '@/data/batches';

const emptyBatch: Batch = {
  slug: '',
  courseSlug: '',
  category: 'offline',
  name: '',
  exam: 'CLAT',
  batchCode: '',
  startDate: '',
  endDate: '',
  duration: '',
  schedule: '',
  mode: 'Offline (Patna Center)',
  seats: 30,
  filled: 0,
  fee: '',
  emi: '',
  color: '#08BD80',
  bg: '#E6FAF4',
  status: 'upcoming',
  language: 'Hinglish',
  batchType: 'Target Batch',
  chips: [''],
  faculty: ['A.K. Singh'],
  highlights: [''],
  syllabus: [''],
  description: '',
  details: {
    plans: [],
    aboutDuration: '',
    aboutStrategy: '',
    aboutFeaturesLabel: '',
    aboutFeatures: [],
    strategySections: [],
    moreDetails: [],
    faqs: [],
  },
};

export default async function NewBatchPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const courses = await getCourses();
  const courseOptions = courses.map((c) => ({ slug: c.slug, title: c.title, category: c.category }));

  // "Duplicate" flow: /admin/batches/new?from=<slug> pre-fills the form from an
  // existing batch so the admin can tweak and save it as a brand-new batch.
  // The slug and enrollment are reset so nothing collides with the source batch.
  const { from } = await searchParams;
  let initial: Batch = { ...emptyBatch, courseSlug: courseOptions[0]?.slug ?? '' };
  if (from) {
    const source = await getBatchBySlug(from);
    if (source) {
      initial = {
        ...source,
        slug: `${source.slug}-copy`,
        name: `${source.name} (Copy)`,
        filled: 0,
      };
    }
  }

  return <BatchForm batch={initial} isNew={true} courses={courseOptions} />;
}
