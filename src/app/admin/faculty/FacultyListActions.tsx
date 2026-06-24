'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminFetch } from '@/lib/adminFetch';

export default function FacultyListActions({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete ${name}?`)) return;

    setDeleting(true);
    const res = await adminFetch(`/api/admin/faculty/${slug}`, { method: 'DELETE' });
    setDeleting(false);

    if (!res.ok) {
      alert('Could not delete faculty member.');
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex gap-2 flex-shrink-0">
      <Link href={`/faculty/${slug}`} target="_blank"
        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
        View
      </Link>
      <Link href={`/admin/faculty/${slug}`}
        className="text-xs font-semibold px-3 py-1.5 rounded-lg"
        style={{ background: '#fff1e8', color: '#f77420' }}>
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-60 transition-colors"
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
