'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Blog } from '@/data/blogs';
import { adminFetch } from '@/lib/adminFetch';
import {
  FieldGroup, TextInput, TextareaInput, SelectInput,
  StringArrayEditor, SectionCard, FormActions, Toast,
} from '@/components/admin/AdminFormHelpers';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { BLOG_CATEGORY_COLORS as STATIC_COLORS } from '@/data/blogCategories';

interface Category { id: number; name: string; color: string; }

export default function BlogForm({ blog, isNew }: { blog: Blog; isNew: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<Blog>({ ...blog });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [preview, setPreview] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  // For new posts: slug auto-fills from title until user unlocks it
  const [slugLocked, setSlugLocked] = useState(isNew);

  useEffect(() => {
    adminFetch('/api/admin/categories')
      .then((r) => r.json())
      .then((d: Category[]) => { if (Array.isArray(d)) setCategories(d); })
      .catch(() => {});
  }, []);

  const CATEGORY_COLORS: Record<string, string> = {
    ...STATIC_COLORS,
    ...Object.fromEntries(categories.map((c) => [c.name, c.color])),
  };
  const CATEGORIES = categories.length
    ? categories.map((c) => ({ value: c.name, label: c.name }))
    : [{ value: data.category, label: data.category }].filter((c) => c.value);

  function sanitizeSlug(raw: string): string {
    return raw
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')   // strip special chars
      .trim()
      .replace(/\s+/g, '-')            // spaces → hyphens
      .replace(/-+/g, '-');            // collapse multiple hyphens
  }

  function calcReadTime(html: string): string {
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = text ? text.split(' ').length : 0;
    const mins = Math.max(1, Math.ceil(wordCount / 200));
    return `${mins} min read`;
  }

  function set<K extends keyof Blog>(key: K, val: Blog[K]) {
    // When title changes on a new blog with locked slug, auto-fill slug
    if (key === 'title') {
      setData((d) => ({
        ...d,
        title: val as string,
        ...(slugLocked ? { slug: sanitizeSlug(val as string) } : {}),
      }));
      return;
    }
    // When slug is manually edited, sanitize it
    if (key === 'slug') {
      setData((d) => ({ ...d, slug: sanitizeSlug(val as string) }));
      return;
    }
    // Auto-calculate read time from content
    if (key === 'content') {
      const rt = calcReadTime(val as string);
      setData((d) => ({ ...d, content: val as string, readTime: rt }));
      return;
    }
    setData((d) => ({ ...d, [key]: val }));
  }

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Auto-set category color
    const updatedData = { ...data, categoryColor: CATEGORY_COLORS[data.category] || '#08BD80' };
    try {
      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${encodeURIComponent(blog.slug)}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await adminFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedData) });
      if (!res.ok) throw new Error('Failed');
      showToast(isNew ? 'Blog published!' : 'Blog saved!', 'success');
      setTimeout(() => router.push('/admin/blogs'), 1000);
    } catch {
      showToast('Error saving blog', 'error');
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await adminFetch(`/api/admin/blogs/${encodeURIComponent(blog.slug)}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || 'Delete failed', 'error');
        return;
      }
      router.push('/admin/blogs');
    } catch {
      showToast('Delete failed — check connection', 'error');
    }
  }

  // Content from the rich editor is already HTML. Old posts may still be markdown.
  function renderPreview(content: string) {
    if (/<(p|h2|h3|ul|ol|li|img|strong|em|blockquote|a|br)\b/i.test(content)) return content;
    return content
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-black text-gray-900 mt-6 mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-gray-800 mt-5 mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-700">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
      .replace(/^(?!<[h|l])(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>');
  }

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700">← Back</button>
        <h1 className="text-2xl font-black text-gray-900">{isNew ? 'New Blog Post' : 'Edit Blog'}</h1>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setPreview(!preview)}
            className="text-sm font-semibold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            {preview ? '✏️ Edit' : '👁 Preview'}
          </button>
          {!isNew && (
            <button onClick={handleDelete} className="text-sm font-semibold px-4 py-2 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
              🗑 Delete
            </button>
          )}
        </div>
      </div>

      {preview ? (
        <div className="max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${CATEGORY_COLORS[data.category] || '#08BD80'}20`, color: CATEGORY_COLORS[data.category] || '#08BD80' }}>
                {data.category}
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mt-4 mb-3">{data.title || 'Untitled Post'}</h1>
            <p className="text-gray-500 text-lg mb-4">{data.excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
              <span>By {data.author}</span>
              <span>·</span>
              <span>{data.date}</span>
              <span>·</span>
              <span>{data.readTime}</span>
            </div>
            <div className="blog-content max-w-none" dangerouslySetInnerHTML={{ __html: renderPreview(data.content) }} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          <SectionCard title="Post Details">
            <FieldGroup label="Title">
              <TextInput value={data.title} onChange={(v) => set('title', v)} placeholder="e.g. CLAT 2026: Complete Guide..." required />
            </FieldGroup>
            {/* Slug — auto-generated from title; always editable */}
            <FieldGroup label="Slug (URL)">
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={data.slug}
                    onChange={(e) => set('slug', e.target.value as Blog['slug'])}
                    placeholder="auto-generated from title"
                    readOnly={slugLocked}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm font-mono outline-none transition-colors"
                    style={{ background: slugLocked ? '#f9fafb' : '#fff', color: '#374151', cursor: slugLocked ? 'default' : 'text' }}
                  />
                </div>
                {slugLocked ? (
                  <button
                    type="button"
                    onClick={() => setSlugLocked(false)}
                    className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                    title="Edit slug manually"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => { set('slug', sanitizeSlug(data.title) as Blog['slug']); if (isNew) setSlugLocked(true); }}
                    className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                    title="Reset to auto-generated slug"
                  >
                    🔄 Reset
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                URL: /blogs/<span className="font-mono text-gray-600">{data.slug || '…'}</span>
                {slugLocked && isNew && <span className="ml-2 text-gray-400">(auto · click ✏️ Edit to customise)</span>}
              </p>
            </FieldGroup>
            <FieldGroup label="Excerpt">
              <TextareaInput value={data.excerpt} onChange={(v) => set('excerpt', v)} rows={2} placeholder="Short summary shown in blog listing..." />
            </FieldGroup>
            <div className="grid md:grid-cols-3 gap-4">
              <FieldGroup label="Category">
                <SelectInput value={data.category} onChange={(v) => set('category', v)} options={CATEGORIES} />
              </FieldGroup>
              <FieldGroup label="Author">
                <TextInput value={data.author} onChange={(v) => set('author', v)} placeholder="e.g. A.K. Singh" />
              </FieldGroup>
              <FieldGroup label="Read Time (auto)">
                <TextInput value={data.readTime} onChange={(v) => set('readTime', v)} placeholder="auto-calculated from content" />
              </FieldGroup>
            </div>
          </SectionCard>

          {/* Content card — intentionally no overflow-hidden so sticky toolbar works */}
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="font-black text-gray-900">Content</h2>
            </div>
            <div className="px-6 py-5">
              <div className="text-xs text-gray-400 mb-2">
                Use the toolbar to format — headings, bold, bullet/numbered lists, quotes, links and inline images.
              </div>
              <RichTextEditor value={data.content} onChange={(html) => set('content', html)} />
            </div>
          </div>

          <SectionCard title="Tags">
            <StringArrayEditor label="" items={data.tags} onChange={(v) => set('tags', v)} placeholder="e.g. CLAT 2026" />
          </SectionCard>

          <FormActions loading={loading} onCancel={() => router.push('/admin/blogs')} saveLabel={isNew ? 'Publish Post' : 'Save Changes'} />
        </form>
      )}
    </div>
  );
}
