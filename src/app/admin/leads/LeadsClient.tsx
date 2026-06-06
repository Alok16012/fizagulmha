'use client';
import { useState } from 'react';
import { adminFetch } from '@/lib/adminFetch';

export interface Lead {
  id: number;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  exam: string;
  message: string;
  source: string;
}

const SOURCE_CONFIG: Record<string, { label: string; icon: string; bg: string; color: string; border: string }> = {
  contact: {
    label: 'Contact Form',
    icon: '📞',
    bg: 'rgba(99,102,241,0.10)',
    color: '#6366f1',
    border: 'rgba(99,102,241,0.25)',
  },
  admission: {
    label: 'Admission Form',
    icon: '📝',
    bg: 'rgba(249,115,22,0.10)',
    color: '#f97316',
    border: 'rgba(249,115,22,0.25)',
  },
};

function getSource(s: string) {
  return SOURCE_CONFIG[s] ?? {
    label: s || 'Unknown',
    icon: '📋',
    bg: 'rgba(107,114,128,0.10)',
    color: '#6b7280',
    border: 'rgba(107,114,128,0.20)',
  };
}

/* ── Message Modal ─────────────────────────────────────────── */
function MessageModal({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl leading-none"
        >
          ×
        </button>
        <h3 className="font-black text-gray-900 text-lg mb-4">Full Message</h3>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message || '—'}
        </p>
      </div>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────── */
export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm('Delete this lead permanently?')) return;
    setDeletingId(id);
    try {
      const res = await adminFetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch {
      alert('Failed to delete lead.');
    }
    setDeletingId(null);
  }

  // Group by source for section headers
  const contactLeads = leads.filter((l) => (l.source || 'contact') === 'contact');
  const admissionLeads = leads.filter((l) => l.source === 'admission');
  const otherLeads = leads.filter((l) => l.source && l.source !== 'contact' && l.source !== 'admission');

  const sections = [
    { key: 'admission', sourceLeads: admissionLeads },
    { key: 'contact', sourceLeads: contactLeads },
    ...(otherLeads.length ? [{ key: 'other', sourceLeads: otherLeads }] : []),
  ].filter((s) => s.sourceLeads.length > 0);

  return (
    <>
      {modalMsg !== null && (
        <MessageModal message={modalMsg} onClose={() => setModalMsg(null)} />
      )}

      {leads.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: '#f8fafc', border: '2px dashed #e5e7eb' }}>
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-lg font-bold text-gray-700 mb-1">No leads yet</h2>
          <p className="text-sm text-gray-400">Share your contact page to start capturing leads!</p>
          <a href="/contact" target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-block px-5 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#08BD80' }}>
            View Contact Page →
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map(({ key, sourceLeads }) => {
            const src = getSource(key === 'other' ? (sourceLeads[0]?.source ?? '') : key);
            return (
              <div key={key} className="rounded-2xl overflow-hidden"
                style={{ border: `1.5px solid ${src.border}`, background: '#fff' }}>
                {/* Section header */}
                <div className="px-5 py-3 flex items-center gap-3"
                  style={{ background: src.bg, borderBottom: `1.5px solid ${src.border}` }}>
                  <span className="text-lg">{src.icon}</span>
                  <span className="font-black text-sm" style={{ color: src.color }}>{src.label}</span>
                  <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: src.color, color: '#fff' }}>
                    {sourceLeads.length}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e5e7eb' }}>
                        {['Name', 'Phone', 'Email', 'Program', 'Exam', 'Message', 'Time', ''].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                            style={{ color: h ? src.color : '#6b7280' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sourceLeads.map((lead, idx) => (
                        <tr key={lead.id}
                          style={{
                            borderBottom: idx < sourceLeads.length - 1 ? '1px solid #f0f0f0' : 'none',
                            background: idx % 2 === 0 ? '#fff' : '#fafafa',
                          }}>
                          <td className="px-4 py-3">
                            <span className="font-bold" style={{ color: '#0D1837' }}>{lead.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <a href={`tel:${lead.phone}`} className="font-mono font-semibold" style={{ color: '#08BD80' }}>
                              {lead.phone}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {lead.email || <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-4 py-3">
                            {lead.program ? (
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                style={{ background: 'rgba(8,189,128,0.10)', color: '#08BD80' }}>
                                {lead.program}
                              </span>
                            ) : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-4 py-3">
                            {lead.exam ? (
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                style={{ background: 'rgba(13,24,55,0.08)', color: '#0D1837' }}>
                                {lead.exam}
                              </span>
                            ) : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-500 max-w-xs">
                            {lead.message ? (
                              <button
                                onClick={() => setModalMsg(lead.message)}
                                className="block truncate text-left hover:underline cursor-pointer"
                                style={{ maxWidth: 160, color: '#374151' }}
                                title="Click to view full message"
                              >
                                {lead.message}
                              </button>
                            ) : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                            {new Date(lead.timestamp).toLocaleString('en-IN', {
                              day: '2-digit', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit',
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDelete(lead.id)}
                              disabled={deletingId === lead.id}
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors"
                              style={{ borderColor: '#fecaca', color: '#dc2626', background: '#fff5f5' }}
                            >
                              {deletingId === lead.id ? '…' : '🗑'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <div className="text-xs text-gray-400 text-right">
            Total: <strong style={{ color: '#0D1837' }}>{leads.length}</strong> leads
          </div>
        </div>
      )}
    </>
  );
}
