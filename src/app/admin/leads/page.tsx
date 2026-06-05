import { isAuthenticated } from '@/lib/auth';
import { supabaseAdmin, LEAD_COLUMNS, LEAD_COLUMNS_BASE } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import LeadsExport from './LeadsExport';
import LeadsClient, { type Lead } from './LeadsClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: { data: any; error: any } = await supabaseAdmin()
    .from('leads')
    .select(LEAD_COLUMNS)
    .order('created_at', { ascending: false });

  // Graceful fallback if source column doesn't exist yet
  if (result.error && (result.error.code === '42703' || result.error.message?.includes('source'))) {
    result = await supabaseAdmin()
      .from('leads')
      .select(LEAD_COLUMNS_BASE)
      .order('created_at', { ascending: false });
  }

  const leads: Lead[] = (result.data ?? []) as Lead[];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black" style={{ color: '#0D1837' }}>Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {leads.length} {leads.length === 1 ? 'lead' : 'leads'} captured
          </p>
        </div>
        <LeadsExport leads={leads} />
      </div>
      <LeadsClient initialLeads={leads} />
    </div>
  );
}
