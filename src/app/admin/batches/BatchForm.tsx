'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Batch, BatchDetails, BatchPlan, BatchStrategySection, BatchFeatureCard, BatchFaq } from '@/data/batches';
import { adminFetch } from '@/lib/adminFetch';
import {
  FieldGroup, TextInput, NumberInput, TextareaInput, SelectInput,
  StringArrayEditor, SectionCard, FormActions, Toast,
} from '@/components/admin/AdminFormHelpers';

type CourseOption = { slug: string; title: string; category: string };

export default function BatchForm({ batch, isNew, courses = [] }: { batch: Batch; isNew: boolean; courses?: CourseOption[] }) {
  const router = useRouter();
  const [data, setData] = useState<Batch>({ ...batch });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  function set<K extends keyof Batch>(key: K, val: Batch[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  // Rich content stored under data.details (jsonb column)
  const details: BatchDetails = data.details ?? {};
  function setDetail<K extends keyof BatchDetails>(key: K, val: BatchDetails[K]) {
    setData((d) => ({ ...d, details: { ...(d.details ?? {}), [key]: val } }));
  }

  const plans: BatchPlan[] = details.plans ?? [];
  const aboutFeatures: BatchFeatureCard[] = details.aboutFeatures ?? [];
  const strategySections: BatchStrategySection[] = details.strategySections ?? [];
  const faqs: BatchFaq[] = details.faqs ?? [];

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isNew ? '/api/admin/batches' : `/api/admin/batches/${batch.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await adminFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let msg = 'Error saving batch';
        try {
          const err = await res.json();
          if (err?.error) msg = err.error;
        } catch { /* non-JSON response */ }
        showToast(msg, 'error');
        setLoading(false);
        return;
      }
      showToast(isNew ? 'Batch created!' : 'Batch saved!', 'success');
      setTimeout(() => router.push('/admin/batches'), 1000);
    } catch {
      showToast('Network error — could not reach the server.', 'error');
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this batch?')) return;
    setLoading(true);
    await adminFetch(`/api/admin/batches/${batch.slug}`, { method: 'DELETE' });
    router.push('/admin/batches');
  }

  // Build the Course dropdown from the real courses in the DB so the batch's
  // courseSlug matches an actual course — that's what links it to the course
  // page (/courses/<courseSlug>/<batchSlug>). Falls back to whatever is already
  // saved on the batch so an existing value is never silently dropped.
  const courseOptions = (courses.length
    ? courses.map((c) => ({ value: c.slug, label: `${c.title} (${c.category})` }))
    : [{ value: data.courseSlug, label: data.courseSlug || '— no courses found —' }]
  );
  if (data.courseSlug && !courseOptions.some((o) => o.value === data.courseSlug)) {
    courseOptions.unshift({ value: data.courseSlug, label: `${data.courseSlug} (current)` });
  }

  const statusOptions = [
    { value: 'upcoming', label: '🕐 Upcoming' },
    { value: 'ongoing', label: '✅ Open' },
    { value: 'filling-fast', label: '🔥 Filling Fast' },
  ];

  const categoryOptions = [
    { value: 'offline', label: 'Offline' },
    { value: 'online', label: 'Online' },
    { value: 'mock', label: 'Mock Test' },
  ];

  const languageOptions = [
    { value: 'Hinglish', label: 'Hinglish' },
    { value: 'English', label: 'English' },
    { value: 'Bilingual', label: 'Bilingual' },
  ];

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 transition-colors">← Back</button>
        <h1 className="text-2xl font-black text-gray-900">{isNew ? 'New Batch' : `Edit: ${batch.name}`}</h1>
        {!isNew && (
          <button onClick={handleDelete} className="ml-auto text-sm font-semibold px-4 py-2 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
            🗑 Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <SectionCard title="Batch Identity">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Batch Name">
              <TextInput value={data.name} onChange={(v) => set('name', v)} placeholder="e.g. Foundation Batch for CLAT-2027" required />
            </FieldGroup>
            <FieldGroup label="Slug">
              <TextInput value={data.slug} onChange={(v) => set('slug', v)} placeholder="e.g. clat-2027-foundation" required />
            </FieldGroup>
            <FieldGroup label="Course">
              <SelectInput value={data.courseSlug} onChange={(v) => set('courseSlug', v)} options={courseOptions} />
            </FieldGroup>
            <FieldGroup label="Exam">
              <TextInput value={data.exam} onChange={(v) => set('exam', v)} placeholder="e.g. CLAT" />
            </FieldGroup>
            <FieldGroup label="Batch Code">
              <TextInput value={data.batchCode} onChange={(v) => set('batchCode', v)} placeholder="e.g. OFF-CLAT-F27" />
            </FieldGroup>
            <FieldGroup label="Status">
              <SelectInput value={data.status} onChange={(v) => set('status', v as Batch['status'])} options={statusOptions} />
            </FieldGroup>
            <FieldGroup label="Category">
              <SelectInput value={data.category} onChange={(v) => set('category', v as Batch['category'])} options={categoryOptions} />
            </FieldGroup>
            <FieldGroup label="Language">
              <SelectInput value={data.language} onChange={(v) => set('language', v as Batch['language'])} options={languageOptions} />
            </FieldGroup>
            <FieldGroup label="Batch Type (badge)">
              <TextInput value={data.batchType} onChange={(v) => set('batchType', v)} placeholder="e.g. Foundation / Target Batch / Crash Course" />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Schedule & Mode">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Start Date">
              <TextInput value={data.startDate} onChange={(v) => set('startDate', v)} placeholder="e.g. 02 May, 2025" />
            </FieldGroup>
            <FieldGroup label="End Date">
              <TextInput value={data.endDate} onChange={(v) => set('endDate', v)} placeholder="e.g. CLAT 2027 Exam" />
            </FieldGroup>
            <FieldGroup label="Duration">
              <TextInput value={data.duration} onChange={(v) => set('duration', v)} placeholder="e.g. 30 Months" />
            </FieldGroup>
            <FieldGroup label="Schedule">
              <TextInput value={data.schedule} onChange={(v) => set('schedule', v)} placeholder="e.g. Mon – Sat · Morning Batch" />
            </FieldGroup>
            <FieldGroup label="Mode">
              <TextInput value={data.mode} onChange={(v) => set('mode', v)} placeholder="e.g. Offline (Patna Center)" />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Seats & Pricing">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Total Seats">
              <NumberInput value={data.seats} onChange={(v) => set('seats', v)} min={1} />
            </FieldGroup>
            <FieldGroup label="Seats Filled">
              <NumberInput value={data.filled} onChange={(v) => set('filled', v)} min={0} />
            </FieldGroup>
            <FieldGroup label="Fee">
              <TextInput value={data.fee} onChange={(v) => set('fee', v)} placeholder="e.g. ₹1,26,000" />
            </FieldGroup>
            <FieldGroup label="Original Fee (struck-through)">
              <TextInput value={data.originalFee ?? ''} onChange={(v) => set('originalFee', v)} placeholder="e.g. ₹1,80,000" />
            </FieldGroup>
            <FieldGroup label="EMI">
              <TextInput value={data.emi} onChange={(v) => set('emi', v)} placeholder="e.g. ₹10,500/month" />
            </FieldGroup>
            <FieldGroup label="Offer (green tag)">
              <TextInput value={data.offer ?? ''} onChange={(v) => set('offer', v)} placeholder="e.g. Early-bird 20% off till 30 June" />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Content">
          <FieldGroup label="Description">
            <TextareaInput value={data.description} onChange={(v) => set('description', v)} rows={4} placeholder="Batch description..." />
          </FieldGroup>
          <StringArrayEditor label="Highlights (hero — What's Included)" items={data.highlights} onChange={(v) => set('highlights', v)} placeholder="e.g. Daily classroom sessions" />
          <StringArrayEditor label="Batch Includes (chips)" items={data.chips} onChange={(v) => set('chips', v)} placeholder="e.g. Offline Classes" />
          <StringArrayEditor label="Syllabus" items={data.syllabus} onChange={(v) => set('syllabus', v)} placeholder="e.g. English Language" />
          <StringArrayEditor label="Faculty" items={data.faculty} onChange={(v) => set('faculty', v)} placeholder="e.g. A.K. Singh" />
        </SectionCard>

        {/* About the Batch */}
        <SectionCard title="About the Batch">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Duration (about)">
              <TextInput value={details.aboutDuration ?? ''} onChange={(v) => setDetail('aboutDuration', v)} placeholder="e.g. From Admission – CLAT 2028 Exam" />
            </FieldGroup>
            <FieldGroup label="Strategy summary (one-line, inside About box)">
              <TextInput value={details.aboutStrategy ?? ''} onChange={(v) => setDetail('aboutStrategy', v)} placeholder="e.g. Basic Syllabus → Advance Syllabus → Mock Test Series" />
            </FieldGroup>
          </div>
          {/* About feature cards */}
          <div className="space-y-4">
            <FieldGroup label="Feature List Label (heading above the feature cards)">
              <TextInput value={details.aboutFeaturesLabel ?? ''} onChange={(v) => setDetail('aboutFeaturesLabel', v)} placeholder="e.g. Online Resources Access" />
            </FieldGroup>
            <label className="block text-sm font-semibold text-gray-700">Feature Cards (title + subtitle)</label>
            {aboutFeatures.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-2">
                <div className="flex gap-2">
                  <input
                    value={f.title}
                    onChange={(e) => setDetail('aboutFeatures', aboutFeatures.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))}
                    placeholder="Card title e.g. Monthly Magazine"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
                  />
                  <button type="button" onClick={() => setDetail('aboutFeatures', aboutFeatures.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-600 font-bold text-xl px-2">×</button>
                </div>
                <input
                  value={f.subtitle}
                  onChange={(e) => setDetail('aboutFeatures', aboutFeatures.map((x, idx) => idx === i ? { ...x, subtitle: e.target.value } : x))}
                  placeholder="Subtitle e.g. Current Affairs & Legal Affairs"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
            ))}
            <button type="button"
              onClick={() => setDetail('aboutFeatures', [...aboutFeatures, { title: '', subtitle: '' }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#08BD80', color: '#08BD80' }}>
              + Add Feature Card
            </button>
          </div>
        </SectionCard>

        {/* Batch Strategy (expandable cards) */}
        <SectionCard title="Batch Strategy (expandable cards)">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Batch Strategy Cards (heading + details)</label>
              <p className="text-xs text-gray-400 mt-0.5">Each card shows as an expandable accordion on the batch page — heading on top, detail points inside. Add as many as you need (e.g. Subject Covering, Mock Test Series).</p>
            </div>
            {strategySections.map((sec, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    value={sec.title}
                    onChange={(e) => setDetail('strategySections', strategySections.map((s, idx) => idx === i ? { ...s, title: e.target.value } : s))}
                    placeholder="Heading e.g. Subject Covering"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
                  />
                  <button type="button" onClick={() => setDetail('strategySections', strategySections.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-600 font-bold text-xl px-2">×</button>
                </div>
                <input
                  value={sec.subtitle ?? ''}
                  onChange={(e) => setDetail('strategySections', strategySections.map((s, idx) => idx === i ? { ...s, subtitle: e.target.value } : s))}
                  placeholder="Subtitle (optional) e.g. Till CLAT Examinations"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none"
                />
                <StringArrayEditor
                  label="Details (bullet points shown when expanded)"
                  items={sec.items}
                  onChange={(v) => setDetail('strategySections', strategySections.map((s, idx) => idx === i ? { ...s, items: v } : s))}
                  placeholder="e.g. Foundations of every section"
                />
              </div>
            ))}
            <button type="button"
              onClick={() => setDetail('strategySections', [...strategySections, { title: '', subtitle: '', items: [''] }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#08BD80', color: '#08BD80' }}>
              + Add Strategy Card
            </button>
          </div>
        </SectionCard>

        {/* Pricing Plans */}
        <SectionCard title="Pricing Plans (Choose Your Plan)">
          <div className="space-y-4">
            {plans.map((plan, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    value={plan.name}
                    onChange={(e) => setDetail('plans', plans.map((p, idx) => idx === i ? { ...p, name: e.target.value } : p))}
                    placeholder="Plan name e.g. Foundation Pro Batch"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
                  />
                  <button type="button" onClick={() => setDetail('plans', plans.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-600 font-bold text-xl px-2">×</button>
                </div>
                <input
                  value={plan.price}
                  onChange={(e) => setDetail('plans', plans.map((p, idx) => idx === i ? { ...p, price: e.target.value } : p))}
                  placeholder="Price e.g. ₹1,53,000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none"
                />
                <StringArrayEditor
                  label="Plan features"
                  items={plan.features}
                  onChange={(v) => setDetail('plans', plans.map((p, idx) => idx === i ? { ...p, features: v } : p))}
                  placeholder="e.g. Classroom Lectures"
                />
              </div>
            ))}
            <button type="button"
              onClick={() => setDetail('plans', [...plans, { name: '', price: '', features: [''] }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#08BD80', color: '#08BD80' }}>
              + Add Plan
            </button>
          </div>
        </SectionCard>

        {/* More Details */}
        <SectionCard title="More Details (numbered points)">
          <StringArrayEditor
            label="Detail points (shown as 01, 02, 03 …)"
            items={details.moreDetails ?? []}
            onChange={(v) => setDetail('moreDetails', v)}
            placeholder="e.g. Comprehensive Preparation Method & Syllabus Coverage"
          />
        </SectionCard>

        {/* FAQs */}
        <SectionCard title="FAQs">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    value={faq.question}
                    onChange={(e) => setDetail('faqs', faqs.map((f, idx) => idx === i ? { ...f, question: e.target.value } : f))}
                    placeholder="Question"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
                  />
                  <button type="button" onClick={() => setDetail('faqs', faqs.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-600 font-bold text-xl px-2">×</button>
                </div>
                <TextareaInput
                  value={faq.answer}
                  onChange={(v) => setDetail('faqs', faqs.map((f, idx) => idx === i ? { ...f, answer: v } : f))}
                  rows={3}
                  placeholder="Answer"
                />
              </div>
            ))}
            <button type="button"
              onClick={() => setDetail('faqs', [...faqs, { question: '', answer: '' }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#08BD80', color: '#08BD80' }}>
              + Add FAQ
            </button>
          </div>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin/batches')} saveLabel={isNew ? 'Create Batch' : 'Save Changes'} />
      </form>
    </div>
  );
}
