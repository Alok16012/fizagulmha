'use client';
import React from 'react';

// ── Field wrappers ─────────────────────────────────────────────────────────

export function FieldGroup({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

export function TextInput({
  value, onChange, placeholder, required, type = 'text',
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
      onFocus={(e) => { e.target.style.borderColor = '#08BD80'; e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)'; }}
      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

export function NumberInput({
  value, onChange, placeholder, min,
}: {
  value: number; onChange: (v: number) => void; placeholder?: string; min?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
      min={min}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all"
      onFocus={(e) => { e.target.style.borderColor = '#08BD80'; e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)'; }}
      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

export function TextareaInput({
  value, onChange, placeholder, rows = 4,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all resize-y"
      onFocus={(e) => { e.target.style.borderColor = '#08BD80'; e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)'; }}
      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

export function SelectInput({
  value, onChange, options,
}: {
  value: string; onChange: (v: string) => void; options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all bg-white"
      onFocus={(e) => { e.target.style.borderColor = '#08BD80'; e.target.style.boxShadow = '0 0 0 3px rgba(8,189,128,0.12)'; }}
      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// ── String array editor ────────────────────────────────────────────────────

export function StringArrayEditor({
  label, items, onChange, placeholder,
}: {
  label: string; items: string[]; onChange: (items: string[]) => void; placeholder?: string;
}) {
  function update(i: number, val: string) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...items, '']);
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder || 'Enter value...'}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none"
              onFocus={(e) => { e.target.style.borderColor = '#08BD80'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; }}
            />
            <button type="button" onClick={() => remove(i)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-50 transition-colors text-lg font-bold flex-shrink-0">
              ×
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add}
        className="mt-2 text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed transition-colors"
        style={{ borderColor: '#08BD80', color: '#08BD80' }}>
        + Add Item
      </button>
    </div>
  );
}

// ── Section card ────────────────────────────────────────────────────────────

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="font-black text-gray-900">{title}</h2>
      </div>
      <div className="px-6 py-5 space-y-4">
        {children}
      </div>
    </div>
  );
}

// ── Form action buttons ────────────────────────────────────────────────────

export function FormActions({ loading, onCancel, saveLabel = 'Save Changes' }: { loading: boolean; onCancel: () => void; saveLabel?: string }) {
  return (
    <div className="flex gap-3 justify-end">
      <button type="button" onClick={onCancel}
        className="px-6 py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
        Cancel
      </button>
      <button type="submit" disabled={loading}
        className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-opacity disabled:opacity-60"
        style={{ background: '#08BD80' }}>
        {loading ? 'Saving...' : saveLabel}
      </button>
    </div>
  );
}

// ── Toast notification ─────────────────────────────────────────────────────

export function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-semibold text-sm ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {type === 'success' ? '✓ ' : '✗ '}{message}
    </div>
  );
}
