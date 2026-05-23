export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BatchForm from '../BatchForm';
import type { Batch } from '@/data/batches';

const emptyBatch: Batch = {
  slug: '',
  courseSlug: 'clat',
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
};

export default async function NewBatchPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <BatchForm batch={emptyBatch} isNew={true} />;
}
