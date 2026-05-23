'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Course } from '@/data/courses';
import type { Batch } from '@/data/batches';

const catConfig = [
  { key: 'offline',    label: 'Offline',    icon: '🏛️', color: '#0f3460', accent: '#08BD80', bg: '#E6FAF4' },
  { key: 'online',     label: 'Online',     icon: '💻', color: '#6d28d9', accent: '#8b5cf6', bg: '#ede9fe' },
  { key: 'mentorship', label: 'Mentorship', icon: '🎯', color: '#065f46', accent: '#34d399', bg: '#d1fae5' },
  { key: 'mock',       label: 'Mock Tests', icon: '📝', color: '#92400e', accent: '#f59e0b', bg: '#fef3c7' },
] as const;
type CatKey = typeof catConfig[number]['key'];

export default function CourseTabsAdmin({ courses, batches }: { courses: Course[]; batches: Batch[] }) {
  const [active, setActive] = useState<CatKey>('offline');
  const cat = catConfig.find(c => c.key === active)!;
  const filtered = courses.filter(c => c.category === active);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {catConfig.map(c => {
          const count = courses.filter(x => x.category === c.key).length;
          const isActive = c.key === active;
          return (
            <button key={c.key} onClick={() => setActive(c.key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
              style={{
                background: isActive ? `linear-gradient(135deg,${c.color},${c.accent})` : 'white',
                color: isActive ? 'white' : '#374151',
                boxShadow: isActive ? `0 4px 14px ${c.color}44` : '0 1px 4px rgba(0,0,0,0.08)',
                border: isActive ? 'none' : '1.5px solid #E9EEF2',
              }}>
              <span>{c.icon}</span>
              <span>{c.label}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: isActive ? 'rgba(255,255,255,0.25)' : '#F3F4F6', color: isActive ? 'white' : '#6B7280' }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Add Course Button */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{filtered.length} course{filtered.length !== 1 ? 's' : ''} in {cat.label}</p>
        <Link href={`/admin/courses/new?category=${active}`}
          className="px-4 py-2 rounded-xl font-bold text-white text-sm flex items-center gap-1.5"
          style={{ background: `linear-gradient(135deg,${cat.color},${cat.accent})` }}>
          + Add {cat.label} Course
        </Link>
      </div>

      {/* Course Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">{cat.icon}</div>
          <div className="font-bold text-gray-400 mb-1">No {cat.label} courses yet</div>
          <Link href={`/admin/courses/new?category=${active}`}
            className="text-sm font-semibold mt-2 inline-block"
            style={{ color: cat.accent }}>
            + Create the first one
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(c => {
            const courseBatches = batches.filter(b => b.courseSlug === c.slug);
            const openBatches = courseBatches.filter(b => b.status !== 'upcoming');
            return (
              <div key={c.slug} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-5" style={{ background: `linear-gradient(135deg,${cat.color}15,${cat.accent}15)`, borderBottom: `2px solid ${cat.color}22` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{c.icon}</span>
                      <div>
                        <div className="font-black text-gray-900 text-sm leading-tight">{c.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{c.tagline}</div>
                      </div>
                    </div>
                    {courseBatches.length > 0 && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                        style={{ background: cat.bg, color: cat.color }}>
                        {courseBatches.length} batch{courseBatches.length !== 1 ? 'es' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats row */}
                <div className="px-5 py-3 flex items-center gap-4 border-b border-gray-50">
                  <div className="text-xs text-gray-500">
                    <span className="font-bold text-gray-800">{c.fee}</span> starting
                  </div>
                  <div className="text-xs text-gray-400">·</div>
                  <div className="text-xs text-gray-500">{c.duration}</div>
                  {openBatches.length > 0 && (
                    <>
                      <div className="text-xs text-gray-400">·</div>
                      <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#16a34a' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        {openBatches.length} open
                      </div>
                    </>
                  )}
                </div>

                {/* Batch pills */}
                {courseBatches.length > 0 && (
                  <div className="px-5 py-3 flex flex-wrap gap-1.5">
                    {courseBatches.slice(0, 3).map(b => (
                      <Link key={b.slug} href={`/admin/batches/${b.slug}`}
                        className="text-xs font-medium px-2.5 py-1 rounded-full border transition-colors hover:border-gray-300"
                        style={{ borderColor: '#E9EEF2', color: '#6B7280' }}>
                        {b.name}
                      </Link>
                    ))}
                    {courseBatches.length > 3 && (
                      <Link href={`/admin/courses/${c.slug}#batches`}
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: '#F3F4F6', color: '#9CA3AF' }}>
                        +{courseBatches.length - 3} more
                      </Link>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="px-5 py-3 flex items-center gap-2">
                  <Link href={`/admin/courses/${c.slug}`}
                    className="flex-1 text-center text-xs font-bold py-2 rounded-xl transition-colors"
                    style={{ background: cat.bg, color: cat.color }}>
                    ✏️ Edit Course
                  </Link>
                  <Link href={`/admin/batches/new?courseSlug=${c.slug}`}
                    className="flex-1 text-center text-xs font-bold py-2 rounded-xl transition-colors"
                    style={{ background: '#F0FDF4', color: '#16a34a', border: '1.5px solid #bbf7d0' }}>
                    + Add Batch
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
