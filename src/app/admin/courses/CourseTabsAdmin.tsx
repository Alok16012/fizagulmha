'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Course } from '@/data/courses';
import type { Batch } from '@/data/batches';
import type { CourseCategory } from '@/data/courseCategories';
import { adminFetch } from '@/lib/adminFetch';

export default function CourseTabsAdmin({
  courses: initialCourses,
  batches,
  initialCategories,
}: {
  courses: Course[];
  batches: Batch[];
  initialCategories: CourseCategory[];
}) {
  const [categories, setCategories] = useState<CourseCategory[]>(initialCategories);
  const [active, setActive] = useState(initialCategories[0]?.key || '');
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ label: '', icon: '📚', color: '#0D1837', accent: '#f77420', bg: '#fff1e8' });
  const [savingCategory, setSavingCategory] = useState(false);
  const cat = categories.find(c => c.key === active) || categories[0];
  const filtered = courses.filter(c => c.category === active);

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This will also affect linked batches.`)) return;
    setDeletingSlug(slug);
    try {
      const res = await adminFetch(`/api/admin/courses/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      if (res.ok) setCourses(prev => prev.filter(c => c.slug !== slug));
      else alert('Delete failed. Please try again.');
    } catch { alert('Delete failed — network error.'); }
    setDeletingSlug(null);
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    setSavingCategory(true);
    const res = await adminFetch('/api/admin/course-categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryForm),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) alert(body.error || 'Could not add category.');
    else {
      setCategories((prev) => [...prev, body]);
      setActive(body.key);
      setCategoryForm({ label: '', icon: '📚', color: '#0D1837', accent: '#f77420', bg: '#fff1e8' });
      setShowCategoryForm(false);
    }
    setSavingCategory(false);
  }

  async function handleDeleteCategory(key: string, label: string) {
    if (!confirm(`Delete category "${label}"?`)) return;
    setDeletingCategory(key);
    const res = await adminFetch(`/api/admin/course-categories/${encodeURIComponent(key)}`, { method: 'DELETE' });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) alert(body.error || 'Could not delete category.');
    else {
      const next = categories.filter((category) => category.key !== key);
      setCategories(next);
      if (active === key) setActive(next[0]?.key || '');
    }
    setDeletingCategory(null);
  }

  return (
    <div>
      <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-black text-gray-900">Course Categories</h2>
            <p className="text-xs text-gray-400 mt-0.5">Add a new course tab or remove an empty category.</p>
          </div>
          <button type="button" onClick={() => setShowCategoryForm((value) => !value)}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: '#f77420' }}>
            {showCategoryForm ? 'Cancel' : '+ Add Category'}
          </button>
        </div>
        {showCategoryForm && (
          <form onSubmit={handleAddCategory} className="mt-4 grid gap-3 md:grid-cols-[1fr_90px_64px_64px_auto] items-end">
            <label className="text-xs font-semibold text-gray-600">
              Category Name
              <input value={categoryForm.label} onChange={(e) => setCategoryForm((v) => ({ ...v, label: e.target.value }))}
                required placeholder="e.g. Test Series" className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Icon
              <input value={categoryForm.icon} onChange={(e) => setCategoryForm((v) => ({ ...v, icon: e.target.value }))}
                className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Main
              <input type="color" value={categoryForm.color} onChange={(e) => setCategoryForm((v) => ({ ...v, color: e.target.value }))}
                className="mt-1 h-10 w-full rounded-lg border border-gray-200" />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Accent
              <input type="color" value={categoryForm.accent} onChange={(e) => setCategoryForm((v) => ({ ...v, accent: e.target.value }))}
                className="mt-1 h-10 w-full rounded-lg border border-gray-200" />
            </label>
            <button disabled={savingCategory} className="h-10 px-5 rounded-xl text-sm font-bold text-white disabled:opacity-50" style={{ background: '#0D1837' }}>
              {savingCategory ? 'Adding...' : 'Add'}
            </button>
          </form>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(c => {
          const count = courses.filter(x => x.category === c.key).length;
          const isActive = c.key === active;
          return (
            <div key={c.key} className="flex items-stretch">
              <button onClick={() => setActive(c.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-l-xl font-bold text-sm transition-all"
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
              <button type="button" onClick={() => handleDeleteCategory(c.key, c.label)}
                disabled={deletingCategory === c.key}
                className="px-2.5 rounded-r-xl border border-l-0 border-red-200 bg-red-50 text-xs font-bold text-red-500 disabled:opacity-50"
                title={`Delete ${c.label}`}>
                {deletingCategory === c.key ? '...' : '×'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Course Button */}
      {!cat ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          Add a category to start creating courses.
        </div>
      ) : (
      <>
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
                      <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#f77420' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
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
                    ✏️ Edit
                  </Link>
                  <Link href={`/admin/batches/new?courseSlug=${c.slug}`}
                    className="flex-1 text-center text-xs font-bold py-2 rounded-xl transition-colors"
                    style={{ background: '#fff7ed', color: '#f77420', border: '1.5px solid #ffd4ba' }}>
                    + Batch
                  </Link>
                  <button
                    onClick={() => handleDelete(c.slug, c.title)}
                    disabled={deletingSlug === c.slug}
                    className="text-xs font-bold px-3 py-2 rounded-xl border transition-colors disabled:opacity-50"
                    style={{ borderColor: '#fecaca', color: '#dc2626', background: '#fff5f5' }}
                    title="Delete course"
                  >
                    {deletingSlug === c.slug ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </>
      )}
    </div>
  );
}
