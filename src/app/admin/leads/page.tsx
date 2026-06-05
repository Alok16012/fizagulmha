import { isAuthenticated } from '@/lib/auth';
import { supabaseAdmin, LEAD_COLUMNS } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import LeadsExport from './LeadsExport';

export const dynamic = 'force-dynamic';

interface Lead {
  id: number;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  exam: string;
  message: string;
}

export default async function AdminLeadsPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const { data } = await supabaseAdmin()
    .from('leads')
    .select(LEAD_COLUMNS)
    .order('created_at', { ascending: false });
  const leads = (data ?? []) as Lead[];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black" style={{ color: '#0D1837' }}>
            Leads
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {leads.length} {leads.length === 1 ? 'lead' : 'leads'} captured
          </p>
        </div>
        <LeadsExport leads={leads} />
      </div>

      {leads.length === 0 ? (
        /* Empty State */
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: '#f8fafc', border: '2px dashed #e5e7eb' }}
        >
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-lg font-bold text-gray-700 mb-1">No leads yet</h2>
          <p className="text-sm text-gray-400">Share your contact page to start capturing leads!</p>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-5 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#08BD80' }}
          >
            View Contact Page →
          </a>
        </div>
      ) : (
        /* Table */
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1.5px solid #e5e7eb', background: '#fff' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e5e7eb' }}>
                  {['Name', 'Phone', 'Email', 'Program', 'Exam', 'Message', 'Time'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                      style={{ color: '#6b7280' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom: idx < leads.length - 1 ? '1px solid #f0f0f0' : 'none',
                      background: idx % 2 === 0 ? '#fff' : '#fafafa',
                    }}
                  >
                    <td className="px-4 py-3">
                      <span className="font-bold" style={{ color: '#0D1837' }}>
                        {lead.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`tel:${lead.phone}`}
                        className="font-mono font-semibold"
                        style={{ color: '#08BD80' }}
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {lead.email || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {lead.program ? (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(8,189,128,0.1)', color: '#08BD80' }}
                        >
                          {lead.program}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {lead.exam ? (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(13,24,55,0.08)', color: '#0D1837' }}
                        >
                          {lead.exam}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs">
                      {lead.message ? (
                        <span
                          className="block truncate"
                          style={{ maxWidth: 200 }}
                          title={lead.message}
                        >
                          {lead.message}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(lead.timestamp).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          <div
            className="px-4 py-3 text-xs text-gray-400 text-right"
            style={{ borderTop: '1.5px solid #f0f0f0' }}
          >
            Total: <strong style={{ color: '#0D1837' }}>{leads.length}</strong> leads
          </div>
        </div>
      )}
    </div>
  );
}
