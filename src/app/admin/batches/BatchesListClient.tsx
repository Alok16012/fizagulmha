'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Batch } from '@/data/batches';
import { adminFetch } from '@/lib/adminFetch';

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  'ongoing':      { bg: '#fff1e8', color: '#c95516', label: '✅ Open' },
  'filling-fast': { bg: '#fef3c7', color: '#92400e', label: '🔥 Filling Fast' },
  'upcoming':     { bg: '#e0f2fe', color: '#0369a1', label: '🕐 Upcoming' },
};

export default function BatchesListClient({ initialBatches }: { initialBatches: Batch[] }) {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function handleDelete(slug: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeletingSlug(slug);
    try {
      const res = await adminFetch(`/api/admin/batches/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      if (res.ok) setBatches(prev => prev.filter(b => b.slug !== slug));
      else alert('Delete failed. Please try again.');
    } catch { alert('Delete failed — network error.'); }
    setDeletingSlug(null);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {batches.length === 0 ? (
        <div className="py-16 text-center text-gray-400 text-sm">No batches yet.</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Batch</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Start Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Seats</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Fee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {batches.map((b) => {
              const pct = Math.round((b.filled / b.seats) * 100);
              const st = statusColors[b.status] || statusColors.upcoming;
              return (
                <tr key={b.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{b.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{b.courseSlug} · {b.mode}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-600 hidden md:table-cell">{b.startDate}</td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="text-gray-600">{b.filled}/{b.seats}</div>
                    <div className="h-1 bg-gray-100 rounded-full mt-1 w-16">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : '#f77420' }} />
                    </div>
                  </td>
                  <td className="px-4 py-4 font-bold" style={{ color: '#f77420' }}>{b.fee}</td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/courses/${b.courseSlug}/${b.slug}`} target="_blank"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
                        View
                      </Link>
                      <Link href={`/admin/batches/${b.slug}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                        style={{ background: '#fff1e8', color: '#f77420' }}>
                        Edit
                      </Link>
                      <Link href={`/admin/batches/new?from=${encodeURIComponent(b.slug)}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors"
                        title="Duplicate this batch">
                        Duplicate
                      </Link>
                      <button
                        onClick={() => handleDelete(b.slug, b.name)}
                        disabled={deletingSlug === b.slug}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50"
                        style={{ borderColor: '#fecaca', color: '#dc2626', background: '#fff5f5' }}
                        title="Delete batch"
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
      )}
    </div>
  );
}
