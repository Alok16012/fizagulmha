'use client';
import { useState, useEffect } from 'react';
import { adminFetch } from '@/lib/adminFetch';

const MIGRATION_SQL = `-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/blnvhtfqpsqiyevxcuvf/sql

-- ── Courses table ─────────────────────────────────────────────
create table if not exists courses (
  slug text primary key,
  title text not null default '',
  category text not null default 'offline',
  icon text default '📚',
  color text default '#08BD80',
  bg text default '#E6FAF4',
  tagline text default '',
  overview text default '',
  duration text default '',
  batch_size text default '',
  mode text default '',
  fee text default '',
  emi text default '',
  features jsonb default '[]',
  includes jsonb default '[]',
  curriculum jsonb default '[]',
  who_for jsonb default '[]',
  testimonial jsonb default '{}',
  created_at timestamptz default now()
);

-- ── Batches table ─────────────────────────────────────────────
create table if not exists batches (
  slug text primary key,
  course_slug text default '',
  category text default 'offline',
  name text not null default '',
  exam text default '',
  batch_code text default '',
  start_date text default '',
  end_date text default '',
  duration text default '',
  schedule text default '',
  mode text default '',
  seats integer default 30,
  filled integer default 0,
  fee text default '',
  original_fee text,
  emi text default '',
  offer text,
  color text default '#08BD80',
  bg text default '#e8eeff',
  status text default 'upcoming',
  language text default 'Hinglish',
  batch_type text default '',
  chips jsonb default '[]',
  faculty jsonb default '[]',
  highlights jsonb default '[]',
  syllabus jsonb default '[]',
  description text default '',
  created_at timestamptz default now()
);`;

interface Status {
  supabase: boolean;
  tables: { blogs: boolean; courses: boolean; batches: boolean; blog_categories: boolean };
}

export default function SetupClient() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  async function fetchStatus() {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/db-status');
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus(null);
    }
    setLoading(false);
  }

  useEffect(() => { fetchStatus(); }, []);

  function copySQL() {
    navigator.clipboard.writeText(MIGRATION_SQL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const allGood = status?.supabase && status.tables.courses && status.tables.batches;

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Database Setup</h1>
        <p className="text-gray-500 text-sm mt-0.5">Check Supabase table status and run migrations</p>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-gray-800">Table Status</h2>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {loading ? '⟳ Checking…' : '🔄 Re-check'}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-gray-400 text-sm py-4">
            <div className="w-4 h-4 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin" />
            Checking Supabase connection…
          </div>
        ) : !status ? (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
            ✗ Could not reach the API. Make sure you are logged in.
          </div>
        ) : !status.supabase ? (
          <div className="bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded-xl border border-amber-100">
            ⚠ Supabase environment variables not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify.
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(status.tables).map(([table, exists]) => (
              <div key={table} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${exists ? 'bg-green-500' : 'bg-red-400'}`} />
                  <span className="font-mono text-sm text-gray-700">{table}</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${exists ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {exists ? '✓ Exists' : '✗ Missing'}
                </span>
              </div>
            ))}
          </div>
        )}

        {allGood && (
          <div className="mt-4 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-200 font-semibold">
            ✅ All tables ready — courses and batches will save to Supabase!
          </div>
        )}
      </div>

      {/* Migration SQL */}
      {status && !allGood && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-black text-gray-800">Run Migration SQL</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Open the{' '}
                <a
                  href="https://supabase.com/dashboard/project/blnvhtfqpsqiyevxcuvf/sql/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: '#08BD80' }}
                >
                  Supabase SQL Editor ↗
                </a>
                , paste this SQL and click Run.
              </p>
            </div>
            <button
              onClick={copySQL}
              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: copied ? '#16a34a' : '#08BD80' }}
            >
              {copied ? '✓ Copied!' : '📋 Copy SQL'}
            </button>
          </div>

          <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-4 overflow-auto max-h-96 font-mono leading-relaxed whitespace-pre">
            {MIGRATION_SQL}
          </pre>

          <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-700">
            <strong>Steps:</strong>
            <ol className="list-decimal ml-4 mt-1 space-y-1">
              <li>Click <strong>Copy SQL</strong> above</li>
              <li>Open <a href="https://supabase.com/dashboard/project/blnvhtfqpsqiyevxcuvf/sql/new" target="_blank" className="font-semibold underline">Supabase SQL Editor</a></li>
              <li>Paste the SQL and click <strong>Run</strong></li>
              <li>Come back here and click <strong>Re-check</strong></li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
