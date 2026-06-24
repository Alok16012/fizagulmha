'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Batch } from '@/data/batches';
import { adminFetch } from '@/lib/adminFetch';

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  'ongoing':      { bg: '#fff1e8', color: '#c95516', label: '✅ Open' },
  'filling-fast': { bg: '#fef3c7', color: '#92400e', label: '🔥 Filling Fast' },
  'upcoming':     { bg: '#e0f2fe', color: '#0369a1', label: '🕐 Upcoming' },
};

export default function CourseBatchesPanel({
  courseSlug,
  courseTitle,
  batches,
}: {
  courseSlug: string;
  courseTitle: string;
  batches: Batch[];
}) {
  const [items, setItems] = useState<Batch[]>(batches);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function handleDelete(slug: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeletingSlug(slug);
    try {
      const res = await adminFetch(`/api/admin/batches/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      if (res.ok) setItems((prev) => prev.filter((batch) => batch.slug !== slug));
      else alert('Delete failed. Please try again.');
    } catch {
      alert('Delete failed — network error.');
    }
    setDeletingSlug(null);
  }

  return (
    <div id="batches" className="mt-10 max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-black text-gray-900">Batches for this Course</h2>
          <p className="text-sm text-gray-400 mt-0.5">{items.length} batch{items.length !== 1 ? 'es' : ''} under {courseTitle}</p>
        </div>
        <Link
          href={`/admin/batches/new?courseSlug=${courseSlug}`}
          className="px-4 py-2 rounded-xl font-bold text-white text-sm flex items-center gap-1.5"
          style={{ background: '#f77420' }}>
          + Add Batch
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
          <div className="text-3xl mb-2">📦</div>
          <div className="font-bold text-gray-400 mb-1">No batches yet</div>
          <Link href={`/admin/batches/new?courseSlug=${courseSlug}`}
            className="text-sm font-semibold" style={{ color: '#f77420' }}>
            + Create the first batch
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Batch</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Start Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Seats</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(b => {
                const pct = Math.round((b.filled / b.seats) * 100);
                const st = statusConfig[b.status] || statusConfig.upcoming;
                return (
                  <tr key={b.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900">{b.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{b.batchCode} · {b.mode}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-600 hidden md:table-cell text-sm">{b.startDate}</td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">{b.filled}/{b.seats}</div>
                      <div className="h-1.5 bg-gray-100 rounded-full mt-1 w-20">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: pct > 80 ? '#ef4444' : '#f77420' }} />
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/batches/${b.slug}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                          style={{ background: '#fff1e8', color: '#f77420' }}>
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(b.slug, b.name)}
                          disabled={deletingSlug === b.slug}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50"
                          style={{ borderColor: '#fecaca', color: '#dc2626', background: '#fff5f5' }}
                        >
                          {deletingSlug === b.slug ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
