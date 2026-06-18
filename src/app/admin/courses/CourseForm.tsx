'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/data/courses';
import type { CourseCategory } from '@/data/courseCategories';
import { adminFetch } from '@/lib/adminFetch';
import {
  FieldGroup, TextInput, TextareaInput,
  SectionCard, FormActions, Toast, StringArrayEditor,
} from '@/components/admin/AdminFormHelpers';

export default function CourseEditForm({ course, isNew, categories }: { course: Course; isNew: boolean; categories: CourseCategory[] }) {
  const router = useRouter();
  const [data, setData] = useState<Course>({ ...course });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const isMentorship = data.category === 'mentorship';
  const isMock = data.category === 'mock';
  const categoryNote = isMentorship || isMock
    ? 'This category uses the same user-side course detail style as Offline/Online. Update the text below, then add its packages from Admin > Batches.'
    : '';
  const featureLabel = isMock
    ? 'Feature List for mock test course'
    : isMentorship
    ? 'Feature List for mentorship course'
    : 'Feature List';
  const audiencePlaceholder = isMock
    ? 'e.g. Aspirants who want exam-like CLAT practice'
    : isMentorship
    ? 'e.g. Self-study aspirants who need accountability'
    : 'e.g. Students preparing for CLAT';
  const includeLabelPlaceholder = isMock ? 'Mocks' : isMentorship ? 'Mentor Access' : 'Live Classes';
  const includeValuePlaceholder = isMock ? '20 Tests' : isMentorship ? 'Dedicated Mentor' : 'Daily Sessions';
  const modulePlaceholder = isMock ? 'e.g. CLAT Mock Test Series' : isMentorship ? 'e.g. Phase 1: Diagnostic Assessment' : 'e.g. Legal Reasoning';

  function set<K extends keyof Course>(key: K, val: Course[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  function updateInclude(index: number, key: 'label' | 'value' | 'icon', value: string) {
    const next = [...(data.includes || [])];
    next[index] = { ...next[index], [key]: value };
    set('includes', next);
  }

  function addInclude() {
    set('includes', [...(data.includes || []), { label: '', value: '', icon: '✓' }]);
  }

  function removeInclude(index: number) {
    set('includes', (data.includes || []).filter((_, i) => i !== index));
  }

  function updateCurriculum(index: number, key: 'module' | 'topics', value: string | string[]) {
    const next = [...(data.curriculum || [])];
    next[index] = { ...next[index], [key]: value };
    set('curriculum', next);
  }

  function addCurriculum() {
    set('curriculum', [...(data.curriculum || []), { module: '', topics: [''] }]);
  }

  function removeCurriculum(index: number) {
    set('curriculum', (data.curriculum || []).filter((_, i) => i !== index));
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
      const res = await adminFetch(url, {
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
    await adminFetch(`/api/admin/courses/${course.slug}`, { method: 'DELETE' });
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
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>{category.icon} {category.label}</option>
                ))}
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

        <SectionCard title="Course Details">
          {categoryNote && (
            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
              {categoryNote}
            </div>
          )}
          <div className="grid md:grid-cols-4 gap-4">
            <FieldGroup label="Duration">
              <TextInput value={data.duration} onChange={(v) => set('duration', v)} placeholder="e.g. Till CLAT Examination" />
            </FieldGroup>
            <FieldGroup label="Batch Size / Seats">
              <TextInput value={data.batchSize} onChange={(v) => set('batchSize', v)} placeholder="e.g. Limited Intake" />
            </FieldGroup>
            <FieldGroup label="Fee">
              <TextInput value={data.fee} onChange={(v) => set('fee', v)} placeholder="e.g. Call for Fee" />
            </FieldGroup>
            <FieldGroup label="EMI">
              <TextInput value={data.emi} onChange={(v) => set('emi', v)} placeholder="e.g. ₹2,500/month" />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Features">
          <StringArrayEditor
            label={featureLabel}
            items={data.features || []}
            onChange={(items) => set('features', items)}
            placeholder={isMock ? 'e.g. Section-wise performance report' : isMentorship ? 'e.g. Weekly Strategy Sessions' : 'e.g. Daily live classes'}
          />
        </SectionCard>

        <SectionCard title="Who This Course Is For">
          <StringArrayEditor
            label="Audience / eligibility points"
            items={data.whoFor || []}
            onChange={(items) => set('whoFor', items)}
            placeholder={audiencePlaceholder}
          />
        </SectionCard>

        <SectionCard title="What Is Included">
          <div className="space-y-3">
            {(data.includes || []).map((item, index) => (
              <div key={index} className="grid md:grid-cols-[80px_1fr_1fr_auto] gap-3 items-end rounded-xl border border-gray-100 p-3">
                <FieldGroup label="Icon">
                  <TextInput value={item.icon} onChange={(v) => updateInclude(index, 'icon', v)} placeholder="✓" />
                </FieldGroup>
                <FieldGroup label="Label">
                  <TextInput value={item.label} onChange={(v) => updateInclude(index, 'label', v)} placeholder={includeLabelPlaceholder} />
                </FieldGroup>
                <FieldGroup label="Value">
                  <TextInput value={item.value} onChange={(v) => updateInclude(index, 'value', v)} placeholder={includeValuePlaceholder} />
                </FieldGroup>
                <button type="button" onClick={() => removeInclude(index)}
                  className="h-10 px-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addInclude}
            className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed transition-colors"
            style={{ borderColor: '#08BD80', color: '#08BD80' }}>
            + Add Detail
          </button>
        </SectionCard>

        <SectionCard title="Curriculum">
          <div className="space-y-4">
            {(data.curriculum || []).map((item, index) => (
              <div key={index} className="rounded-xl border border-gray-100 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <FieldGroup label="Module / Stage Title">
                      <TextInput value={item.module} onChange={(v) => updateCurriculum(index, 'module', v)} placeholder={modulePlaceholder} />
                    </FieldGroup>
                  </div>
                  <button type="button" onClick={() => removeCurriculum(index)}
                    className="mt-6 h-10 px-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50">
                    Remove
                  </button>
                </div>
                <FieldGroup label="Topics / Points (one per line)">
                  <TextareaInput
                    value={(item.topics || []).join('\n')}
                    onChange={(v) => updateCurriculum(index, 'topics', v.split('\n'))}
                    placeholder={isMock ? 'Full-length mock\nDetailed solutions\nPerformance report' : 'Preparation audit\nGoal setting\nWeakness identification'}
                    rows={4}
                  />
                </FieldGroup>
              </div>
            ))}
          </div>
          <button type="button" onClick={addCurriculum}
            className="text-sm font-semibold px-3 py-2 rounded-lg border-2 border-dashed transition-colors"
            style={{ borderColor: '#08BD80', color: '#08BD80' }}>
            + Add Module
          </button>
        </SectionCard>

        <SectionCard title="Student Success Story / Testimonial">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Name">
              <TextInput value={data.testimonial?.name || ''} onChange={(v) => set('testimonial', { ...data.testimonial, name: v })} placeholder="Student name" />
            </FieldGroup>
            <FieldGroup label="Avatar Initials">
              <TextInput value={data.testimonial?.avatar || ''} onChange={(v) => set('testimonial', { ...data.testimonial, avatar: v })} placeholder="AK" />
            </FieldGroup>
            <FieldGroup label="Rank / Result">
              <TextInput value={data.testimonial?.rank || ''} onChange={(v) => set('testimonial', { ...data.testimonial, rank: v })} placeholder="AIR 23" />
            </FieldGroup>
            <FieldGroup label="College">
              <TextInput value={data.testimonial?.college || ''} onChange={(v) => set('testimonial', { ...data.testimonial, college: v })} placeholder="NLSIU Bengaluru" />
            </FieldGroup>
          </div>
          <FieldGroup label="Quote">
            <TextareaInput value={data.testimonial?.quote || ''} onChange={(v) => set('testimonial', { ...data.testimonial, quote: v })} placeholder="Student quote..." rows={4} />
          </FieldGroup>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin/courses')} saveLabel={isNew ? 'Create Course' : 'Save Changes'} />
      </form>
    </div>
  );
}
