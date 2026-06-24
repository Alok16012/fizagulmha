'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      // Persist token in localStorage so adminFetch() can include it as
      // X-Admin-Token header — works even when Netlify doesn't forward cookies.
      try {
        const body = await res.json().catch(() => ({}));
        if (body.token) localStorage.setItem('admin_token', body.token);
      } catch { /* ignore */ }
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #060d1f, #0D1837)' }}>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="CLATians" className="h-12 mx-auto mb-4 object-contain" />
            <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#f77420' } as React.CSSProperties}
                onFocus={(e) => { e.target.style.borderColor = '#f77420'; e.target.style.boxShadow = '0 0 0 3px rgba(247,116,32,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-opacity disabled:opacity-60"
              style={{ background: '#f77420' }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            CLATians Admin — Secure Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
