export const dynamic = "force-dynamic";
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getBatches } from '@/lib/getData';
import BatchesListClient from './BatchesListClient';

export default async function AdminBatches() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const batches = await getBatches();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Batches</h1>
          <p className="text-gray-500 text-sm mt-0.5">{batches.length} batches total</p>
        </div>
        <Link href="/admin/batches/new"
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
          style={{ background: '#f77420' }}>
          + New Batch
        </Link>
      </div>
      <BatchesListClient initialBatches={batches} />
    </div>
  );
}
