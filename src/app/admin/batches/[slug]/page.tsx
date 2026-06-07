export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getBatches } from '@/lib/getData';
import BatchForm from '../BatchForm';

export default async function EditBatchPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const batches = await getBatches();
  const batch = batches.find((b) => b.slug === slug);
  if (!batch) notFound();
  return <BatchForm batch={batch} isNew={false} />;
}
