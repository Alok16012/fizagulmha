'use client';
import type { Lead } from './LeadsClient';

export default function LeadsExport({ leads }: { leads: Lead[] }) {
  function handleExport() {
    if (leads.length === 0) return;

    const headers = ['ID', 'Source', 'Name', 'Phone', 'Email', 'Program', 'Exam', 'Message', 'Time'];
    const rows = leads.map((l) => [
      l.id,
      `"${(l.source || 'contact').replace(/"/g, '""')}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.program || '').replace(/"/g, '""')}"`,
      `"${(l.exam || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      new Date(l.timestamp).toLocaleString('en-IN'),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clatians-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      disabled={leads.length === 0}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity"
      style={{
        background: leads.length === 0 ? '#e5e7eb' : '#08BD80',
        color: leads.length === 0 ? '#9ca3af' : 'white',
        cursor: leads.length === 0 ? 'not-allowed' : 'pointer',
      }}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 10L3.5 6H5.5V1H9.5V6H11.5L7.5 10ZM2 12H13V13.5H2V12Z" fill="currentColor" />
      </svg>
      Export CSV
    </button>
  );
}
