'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Blog } from '@/data/blogs';
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

  useEffect(() => {
    fetch('/api/admin/categories')
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

  function set<K extends keyof Blog>(key: K, val: Blog[K]) {
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
      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${blog.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedData) });
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
    await fetch(`/api/admin/blogs/${blog.slug}`, { method: 'DELETE' });
    router.push('/admin/blogs');
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
            <FieldGroup label="Slug">
              <TextInput value={data.slug} onChange={(v) => set('slug', v)} placeholder="e.g. clat-2026-complete-guide" required />
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
              <FieldGroup label="Read Time">
                <TextInput value={data.readTime} onChange={(v) => set('readTime', v)} placeholder="e.g. 8 min read" />
              </FieldGroup>
            </div>
          </SectionCard>

          <SectionCard title="Content">
            <div className="text-xs text-gray-400 mb-2">
              Use the toolbar to format — headings, bold, bullet/numbered lists, quotes, links and inline images.
            </div>
            <RichTextEditor value={data.content} onChange={(html) => set('content', html)} />
          </SectionCard>

          <SectionCard title="Tags">
            <StringArrayEditor label="" items={data.tags} onChange={(v) => set('tags', v)} placeholder="e.g. CLAT 2026" />
          </SectionCard>

          <FormActions loading={loading} onCancel={() => router.push('/admin/blogs')} saveLabel={isNew ? 'Publish Post' : 'Save Changes'} />
        </form>
      )}
    </div>
  );
}
