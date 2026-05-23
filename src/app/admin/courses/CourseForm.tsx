'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/data/courses';
import {
  FieldGroup, TextInput, TextareaInput, StringArrayEditor,
  SectionCard, FormActions, Toast,
} from '@/components/admin/AdminFormHelpers';

export default function CourseEditForm({ course, isNew }: { course: Course; isNew: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<Course>({ ...course });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  function set<K extends keyof Course>(key: K, val: Course[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isNew ? '/api/admin/courses' : `/api/admin/courses/${course.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save');
      showToast(isNew ? 'Course created!' : 'Course saved!', 'success');
      setTimeout(() => router.push('/admin/courses'), 1000);
    } catch {
      showToast('Error saving course', 'error');
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this course? This cannot be undone.')) return;
    setLoading(true);
    await fetch(`/api/admin/courses/${course.slug}`, { method: 'DELETE' });
    router.push('/admin/courses');
  }

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 transition-colors">
          ← Back
        </button>
        <h1 className="text-2xl font-black text-gray-900">{isNew ? 'New Course' : `Edit: ${course.title}`}</h1>
        {!isNew && (
          <button onClick={handleDelete} className="ml-auto text-sm font-semibold px-4 py-2 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
            🗑 Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Info */}
        <SectionCard title="Basic Information">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Course Title">
              <TextInput value={data.title} onChange={(v) => set('title', v)} placeholder="e.g. Offline CLAT Course" required />
            </FieldGroup>
            <FieldGroup label="Slug (URL key)">
              <TextInput value={data.slug} onChange={(v) => set('slug', v)} placeholder="e.g. clat-offline" required />
            </FieldGroup>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Category">
              <select
                value={data.category}
                onChange={(e) => set('category', e.target.value as Course['category'])}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400"
              >
                <option value="offline">🏫 Offline</option>
                <option value="online">💻 Online</option>
                <option value="mentorship">🎯 Mentorship</option>
                <option value="mock">📝 Mock Tests</option>
              </select>
            </FieldGroup>
            <FieldGroup label="Mode">
              <TextInput value={data.mode} onChange={(v) => set('mode', v)} placeholder="e.g. In-person at Patna Center" />
            </FieldGroup>
          </div>
          <FieldGroup label="Tagline">
            <TextInput value={data.tagline} onChange={(v) => set('tagline', v)} placeholder="Short one-line description" />
          </FieldGroup>
          <FieldGroup label="Overview">
            <TextareaInput value={data.overview} onChange={(v) => set('overview', v)} placeholder="Full description..." rows={5} />
          </FieldGroup>
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Icon (emoji)">
              <TextInput value={data.icon} onChange={(v) => set('icon', v)} placeholder="📚" />
            </FieldGroup>
            <FieldGroup label="Accent Color">
              <div className="flex gap-2 items-center">
                <input type="color" value={data.color} onChange={(e) => set('color', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0" />
                <TextInput value={data.color} onChange={(v) => set('color', v)} placeholder="#08BD80" />
              </div>
            </FieldGroup>
            <FieldGroup label="Card Background Color">
              <div className="flex gap-2 items-center">
                <input type="color" value={data.bg} onChange={(e) => set('bg', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0" />
                <TextInput value={data.bg} onChange={(v) => set('bg', v)} placeholder="#E6FAF4" />
              </div>
            </FieldGroup>
          </div>
        </SectionCard>

        {/* Pricing & Details */}
        <SectionCard title="Pricing & Details">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Duration">
              <TextInput value={data.duration} onChange={(v) => set('duration', v)} placeholder="e.g. 12–24 Months" />
            </FieldGroup>
            <FieldGroup label="Batch Size">
              <TextInput value={data.batchSize} onChange={(v) => set('batchSize', v)} placeholder="e.g. 20–30 Students" />
            </FieldGroup>
            <FieldGroup label="Fee">
              <TextInput value={data.fee} onChange={(v) => set('fee', v)} placeholder="e.g. ₹95,000" />
            </FieldGroup>
            <FieldGroup label="EMI">
              <TextInput value={data.emi} onChange={(v) => set('emi', v)} placeholder="e.g. ₹8,000/month" />
            </FieldGroup>
          </div>
        </SectionCard>

        {/* Features */}
        <SectionCard title="Features (What You Get)">
          <StringArrayEditor
            label="Feature list"
            items={data.features}
            onChange={(v) => set('features', v)}
            placeholder="e.g. Daily live classroom sessions"
          />
        </SectionCard>

        {/* Course Includes */}
        <SectionCard title="Course Includes (Stats Cards)">
          <div className="space-y-3">
            {data.includes.map((inc, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 items-center">
                <input value={inc.icon} onChange={(e) => {
                  const next = [...data.includes]; next[i] = { ...next[i], icon: e.target.value }; set('includes', next);
                }} placeholder="Icon" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none" />
                <input value={inc.value} onChange={(e) => {
                  const next = [...data.includes]; next[i] = { ...next[i], value: e.target.value }; set('includes', next);
                }} placeholder="Value" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none" />
                <input value={inc.label} onChange={(e) => {
                  const next = [...data.includes]; next[i] = { ...next[i], label: e.target.value }; set('includes', next);
                }} placeholder="Label" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none" />
                <button type="button" onClick={() => set('includes', data.includes.filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-600 font-bold text-xl">×</button>
              </div>
            ))}
            <button type="button"
              onClick={() => set('includes', [...data.includes, { icon: '', value: '', label: '' }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#08BD80', color: '#08BD80' }}>
              + Add Include
            </button>
          </div>
        </SectionCard>

        {/* Curriculum */}
        <SectionCard title="Curriculum">
          <div className="space-y-4">
            {data.curriculum.map((mod, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex gap-2 mb-3">
                  <input value={mod.module} onChange={(e) => {
                    const next = [...data.curriculum]; next[i] = { ...next[i], module: e.target.value }; set('curriculum', next);
                  }} placeholder="Module name" className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold" />
                  <button type="button" onClick={() => set('curriculum', data.curriculum.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-600 font-bold text-xl px-2">×</button>
                </div>
                <div className="space-y-2 pl-3">
                  {mod.topics.map((t, j) => (
                    <div key={j} className="flex gap-2">
                      <input value={t} onChange={(e) => {
                        const next = [...data.curriculum];
                        const topics = [...next[i].topics]; topics[j] = e.target.value;
                        next[i] = { ...next[i], topics }; set('curriculum', next);
                      }} placeholder="Topic" className="flex-1 px-3 py-1.5 border border-gray-100 rounded-lg text-sm" />
                      <button type="button" onClick={() => {
                        const next = [...data.curriculum];
                        next[i] = { ...next[i], topics: mod.topics.filter((_, ti) => ti !== j) };
                        set('curriculum', next);
                      }} className="text-red-300 hover:text-red-500 font-bold">×</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => {
                    const next = [...data.curriculum];
                    next[i] = { ...next[i], topics: [...mod.topics, ''] }; set('curriculum', next);
                  }} className="text-xs font-semibold" style={{ color: '#08BD80' }}>+ Add topic</button>
                </div>
              </div>
            ))}
            <button type="button"
              onClick={() => set('curriculum', [...data.curriculum, { module: '', topics: [''] }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#08BD80', color: '#08BD80' }}>
              + Add Module
            </button>
          </div>
        </SectionCard>

        {/* Who Is This For */}
        <SectionCard title="Who Is This For?">
          <StringArrayEditor
            label=""
            items={data.whoFor}
            onChange={(v) => set('whoFor', v)}
            placeholder="e.g. Students targeting top NLUs"
          />
        </SectionCard>

        {/* Testimonial */}
        <SectionCard title="Student Testimonial">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Student Name">
              <TextInput value={data.testimonial.name} onChange={(v) => set('testimonial', { ...data.testimonial, name: v })} placeholder="e.g. Aman Deep Singh" />
            </FieldGroup>
            <FieldGroup label="Rank / Achievement">
              <TextInput value={data.testimonial.rank} onChange={(v) => set('testimonial', { ...data.testimonial, rank: v })} placeholder="e.g. AIR 23, CLAT 2024" />
            </FieldGroup>
            <FieldGroup label="College">
              <TextInput value={data.testimonial.college} onChange={(v) => set('testimonial', { ...data.testimonial, college: v })} placeholder="e.g. NLU Delhi" />
            </FieldGroup>
            <FieldGroup label="Avatar (initials)">
              <TextInput value={data.testimonial.avatar} onChange={(v) => set('testimonial', { ...data.testimonial, avatar: v })} placeholder="e.g. AD" />
            </FieldGroup>
          </div>
          <FieldGroup label="Quote">
            <TextareaInput value={data.testimonial.quote} onChange={(v) => set('testimonial', { ...data.testimonial, quote: v })} placeholder="Student's testimonial quote..." rows={3} />
          </FieldGroup>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin/courses')} saveLabel={isNew ? 'Create Course' : 'Save Changes'} />
      </form>
    </div>
  );
}
