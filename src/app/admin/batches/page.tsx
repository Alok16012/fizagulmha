export const dynamic = "force-dynamic";
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { readJSON } from '@/lib/dataStore';
import { batches as defaultBatches } from '@/data/batches';

export default async function AdminBatches() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const batches = readJSON('batches.json', defaultBatches) as typeof defaultBatches;

  const statusColors: Record<string, { bg: string; color: string; label: string }> = {
    'ongoing': { bg: '#dcfce7', color: '#166534', label: '✅ Open' },
    'filling-fast': { bg: '#fef3c7', color: '#92400e', label: '🔥 Filling Fast' },
    'upcoming': { bg: '#e0f2fe', color: '#0369a1', label: '🕐 Upcoming' },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Batches</h1>
          <p className="text-gray-500 text-sm mt-0.5">{batches.length} batches total</p>
        </div>
        <Link href="/admin/batches/new"
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
          style={{ background: '#08BD80' }}>
          + New Batch
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : '#08BD80' }} />
                    </div>
                  </td>
                  <td className="px-4 py-4 font-bold" style={{ color: '#08BD80' }}>{b.fee}</td>
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
                        style={{ background: '#E6FAF4', color: '#08BD80' }}>
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
