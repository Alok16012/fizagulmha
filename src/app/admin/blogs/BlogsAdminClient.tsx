'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Blog } from '@/data/blogs';
import { adminFetch } from '@/lib/adminFetch';

interface Category { id: number; name: string; color: string; }

const COLORS = ['#f77420','#6366f1','#f97316','#ec4899','#14b8a6','#f59e0b','#ef4444','#8b5cf6','#0ea5e9','#f77420'];

export default function BlogsAdminClient({
  initialBlogs,
  initialCategories,
}: {
  initialBlogs: Blog[];
  initialCategories: Category[];
}) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [showCats, setShowCats] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#f77420');
  const [addingCat, setAddingCat] = useState(false);
  const [deletingCatId, setDeletingCatId] = useState<number | null>(null);

  /* ── Blog delete ─────────────────────────── */
  async function handleDeleteBlog(slug: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeletingSlug(slug);
    try {
      const res = await adminFetch(`/api/admin/blogs/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Delete failed (${res.status}): ${err.error || 'Unknown error'}`);
      } else {
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      }
    } catch (e) {
      alert(`Delete failed: ${e instanceof Error ? e.message : 'Network error'}`);
    }
    setDeletingSlug(null);
  }

  /* ── Category add ────────────────────────── */
  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setAddingCat(true);
    try {
      const res = await adminFetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim(), color: newCatColor }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Failed to add category (${res.status}): ${err.error || 'Unknown error'}`);
        setAddingCat(false);
        return;
      }
      const cat = await res.json();
      setCategories((prev) => [...prev, cat]);
      setNewCatName('');
    } catch (e) {
      alert(`Failed to add category: ${e instanceof Error ? e.message : 'Network error'}`);
    }
    setAddingCat(false);
  }

  /* ── Category delete ─────────────────────── */
  async function handleDeleteCategory(id: number, name: string) {
    if (!confirm(`Remove category "${name}"? Blogs using it won't be deleted.`)) return;
    setDeletingCatId(id);
    try {
      const res = await adminFetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert('Failed to delete category.');
    }
    setDeletingCatId(null);
  }

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blogs</h1>
          <p className="text-gray-500 text-sm mt-0.5">{blogs.length} articles</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCats(!showCats)}
            className="px-4 py-2.5 rounded-xl font-bold text-sm border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors"
          >
            🏷 Categories {showCats ? '▲' : '▼'}
          </button>
          <Link href="/admin/blogs/new"
            className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
            style={{ background: '#f77420' }}>
            + New Blog
          </Link>
        </div>
      </div>

      {/* ── Categories Panel ── */}
      {showCats && (
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-black text-gray-800 text-sm mb-4">Manage Categories</h2>

          {/* Existing categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <div key={cat.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: `${cat.color}18`, border: `1.5px solid ${cat.color}40`, color: cat.color }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                {cat.name}
                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  disabled={deletingCatId === cat.id}
                  className="ml-1 text-red-400 hover:text-red-600 font-bold leading-none"
                  title="Remove category"
                >
                  {deletingCatId === cat.id ? '…' : '×'}
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-xs text-gray-400">No categories yet.</p>
            )}
          </div>

          {/* Add new category */}
          <form onSubmit={handleAddCategory} className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="New category name…"
              className="flex-1 min-w-36 text-sm px-3 py-2 rounded-xl border border-gray-200 outline-none"
              style={{ minWidth: 160 }}
            />
            {/* Color swatches */}
            <div className="flex gap-1">
              {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => setNewCatColor(c)}
                  className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    background: c,
                    borderColor: newCatColor === c ? '#0D1837' : 'transparent',
                    boxShadow: newCatColor === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none',
                  }}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={addingCat || !newCatName.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: addingCat || !newCatName.trim() ? '#9ca3af' : '#f77420' }}
            >
              {addingCat ? 'Adding…' : '+ Add'}
            </button>
          </form>
        </div>
      )}

      {/* ── Blog list ── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {blogs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No blog posts yet.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {blogs.map((blog) => {
              const cat = categories.find((c) => c.name === blog.category);
              const color = cat?.color || blog.categoryColor || '#f77420';
              return (
                <div key={blog.slug}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${color}20`, color }}>
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-400">{blog.readTime}</span>
                    </div>
                    <div className="font-semibold text-gray-900 truncate">{blog.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">{blog.excerpt}</div>
                    <div className="text-xs text-gray-400 mt-1">By {blog.author} · {blog.date}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link href={`/blogs/${encodeURIComponent(blog.slug)}`} target="_blank"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
                      View
                    </Link>
                    <Link href={`/admin/blogs/${encodeURIComponent(blog.slug)}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                      style={{ background: '#fff1e8', color: '#f77420' }}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteBlog(blog.slug, blog.title)}
                      disabled={deletingSlug === blog.slug}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors"
                      style={{ borderColor: '#fecaca', color: '#dc2626', background: '#fff5f5' }}
                    >
                      {deletingSlug === blog.slug ? '…' : '🗑'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
