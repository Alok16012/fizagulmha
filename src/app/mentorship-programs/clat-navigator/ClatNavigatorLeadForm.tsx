'use client';

import { useState } from 'react';

const classes = ['Class 11', 'Class 12', 'Dropper'];
const prepModes = ['Self-study', 'CLATians student', 'Other coaching', 'Just starting'];
const years = ['CLAT 2027', 'CLAT 2028', 'CLAT 2029'];
const modes = ['Online', 'Offline', 'Hybrid'];

export default function ClatNavigatorLeadForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      program: 'CLAT Navigator Mentorship',
      exam: String(form.get('targetYear') || 'CLAT'),
      source: 'clat-navigator',
      message: [
        `Class: ${form.get('classLevel') || ''}`,
        `Current preparation: ${form.get('prepMode') || ''}`,
        `Preferred mode: ${form.get('preferredMode') || ''}`,
        `City: ${form.get('city') || ''}`,
      ].join('\n'),
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      e.currentTarget.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
      <div>
        <h2 className="font-black text-xl" style={{ color: '#0D1837' }}>Book My Mentorship Session</h2>
        <p className="text-sm text-gray-500 mt-1">Share your details and our mentor team will call you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <input name="name" required placeholder="Student Name" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500" />
        <input name="phone" required placeholder="Mobile Number" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500" />
        <input name="email" type="email" placeholder="Email Address" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500" />
        <input name="city" placeholder="City" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500" />
        <select name="classLevel" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 bg-white">
          {classes.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select name="prepMode" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 bg-white">
          {prepModes.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select name="targetYear" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 bg-white">
          {years.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select name="preferredMode" className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 bg-white">
          {modes.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-black text-white text-sm disabled:opacity-60"
        style={{ background: '#08BD80' }}
      >
        {loading ? 'Submitting...' : 'Book My Mentorship Session'}
      </button>

      {status === 'success' && <p className="text-sm font-semibold text-green-700">Request received. Our team will contact you shortly.</p>}
      {status === 'error' && <p className="text-sm font-semibold text-red-600">Could not submit right now. Please call 8507700177.</p>}
    </form>
  );
}
