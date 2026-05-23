export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { readJSON } from '@/lib/dataStore';
import { redirect, notFound } from 'next/navigation';
import { batches as defaultBatches } from '@/data/batches';
import BatchForm from '../BatchForm';

export default async function EditBatchPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const batches = readJSON('batches.json', defaultBatches) as typeof defaultBatches;
  const batch = batches.find((b) => b.slug === slug);
  if (!batch) notFound();
  return <BatchForm batch={batch} isNew={false} />;
}
