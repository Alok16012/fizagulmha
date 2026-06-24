'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Exam } from '@/data/exams';
import { adminFetch } from '@/lib/adminFetch';
import {
  FieldGroup, TextInput, NumberInput, TextareaInput,
  StringArrayEditor, SectionCard, FormActions, Toast,
} from '@/components/admin/AdminFormHelpers';

export default function ExamForm({ exam, isNew }: { exam: Exam; isNew: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<Exam>({ ...exam });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  function set<K extends keyof Exam>(key: K, val: Exam[K]) {
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
      const url = isNew ? '/api/admin/exams' : `/api/admin/exams/${exam.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await adminFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed');
      showToast(isNew ? 'Exam created!' : 'Exam saved!', 'success');
      setTimeout(() => router.push('/admin/exams'), 1000);
    } catch {
      showToast('Error saving exam', 'error');
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this exam?')) return;
    await adminFetch(`/api/admin/exams/${exam.slug}`, { method: 'DELETE' });
    router.push('/admin/exams');
  }

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700">← Back</button>
        <h1 className="text-2xl font-black text-gray-900">{isNew ? 'New Exam' : `Edit: ${exam.code}`}</h1>
        {!isNew && (
          <button onClick={handleDelete} className="ml-auto text-sm font-semibold px-4 py-2 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
            🗑 Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <SectionCard title="Basic Info">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Exam Code">
              <TextInput value={data.code} onChange={(v) => set('code', v)} placeholder="e.g. CLAT" required />
            </FieldGroup>
            <FieldGroup label="Short Name">
              <TextInput value={data.name} onChange={(v) => set('name', v)} placeholder="e.g. CLAT" required />
            </FieldGroup>
            <FieldGroup label="Full Name">
              <TextInput value={data.fullName} onChange={(v) => set('fullName', v)} placeholder="e.g. Common Law Admission Test" required />
            </FieldGroup>
            <FieldGroup label="Slug">
              <TextInput value={data.slug} onChange={(v) => set('slug', v)} placeholder="e.g. clat" required />
            </FieldGroup>
            <FieldGroup label="Icon (emoji)">
              <TextInput value={data.icon} onChange={(v) => set('icon', v)} placeholder="🏛️" />
            </FieldGroup>
            <FieldGroup label="Tagline">
              <TextInput value={data.tagline} onChange={(v) => set('tagline', v)} placeholder="Short description..." />
            </FieldGroup>
          </div>
          <FieldGroup label="Overview">
            <TextareaInput value={data.overview} onChange={(v) => set('overview', v)} rows={5} placeholder="Detailed description..." />
          </FieldGroup>
        </SectionCard>

        <SectionCard title="Key Stats">
          <div className="grid md:grid-cols-3 gap-4">
            <FieldGroup label="Total Seats">
              <TextInput value={data.seats} onChange={(v) => set('seats', v)} placeholder="e.g. 2700+" />
            </FieldGroup>
            <FieldGroup label="Colleges">
              <TextInput value={data.colleges} onChange={(v) => set('colleges', v)} placeholder="e.g. 23 NLUs" />
            </FieldGroup>
            <FieldGroup label="Duration">
              <TextInput value={data.duration} onChange={(v) => set('duration', v)} placeholder="e.g. 2 Hours" />
            </FieldGroup>
            <FieldGroup label="Questions">
              <NumberInput value={data.questions} onChange={(v) => set('questions', v)} />
            </FieldGroup>
            <FieldGroup label="Marks">
              <NumberInput value={data.marks} onChange={(v) => set('marks', v)} />
            </FieldGroup>
            <FieldGroup label="Negative Mark">
              <TextInput value={data.negativeMark} onChange={(v) => set('negativeMark', v)} placeholder="e.g. 0.25" />
            </FieldGroup>
            <FieldGroup label="Conducted By">
              <TextInput value={data.conductedBy} onChange={(v) => set('conductedBy', v)} placeholder="e.g. Consortium of NLUs" />
            </FieldGroup>
            <FieldGroup label="Mode">
              <TextInput value={data.mode} onChange={(v) => set('mode', v)} placeholder="e.g. Computer Based Test" />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Eligibility">
          <StringArrayEditor label="" items={data.eligibility} onChange={(v) => set('eligibility', v)} placeholder="e.g. Completed Class 12" />
        </SectionCard>

        <SectionCard title="Exam Pattern">
          <div className="space-y-3">
            {data.examPattern.map((row, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 items-center">
                <input value={row.section} onChange={(e) => {
                  const next = [...data.examPattern]; next[i] = { ...next[i], section: e.target.value }; set('examPattern', next);
                }} placeholder="Section" className="col-span-2 px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                <input type="number" value={row.questions} onChange={(e) => {
                  const next = [...data.examPattern]; next[i] = { ...next[i], questions: Number(e.target.value), marks: Number(e.target.value) }; set('examPattern', next);
                }} placeholder="Questions" className="px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                <button type="button" onClick={() => set('examPattern', data.examPattern.filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-600 font-bold text-xl text-center">×</button>
              </div>
            ))}
            <button type="button"
              onClick={() => set('examPattern', [...data.examPattern, { section: '', questions: 0, marks: 0 }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#f77420', color: '#f77420' }}>
              + Add Section
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Important Dates">
          <div className="space-y-3">
            {(data.importantDates || []).map((d, i) => (
              <div key={i} className="grid grid-cols-5 gap-2 items-center">
                <input value={d.event} onChange={(e) => {
                  const next = [...(data.importantDates || [])]; next[i] = { ...next[i], event: e.target.value }; set('importantDates', next);
                }} placeholder="Event" className="col-span-3 px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                <input value={d.date} onChange={(e) => {
                  const next = [...(data.importantDates || [])]; next[i] = { ...next[i], date: e.target.value }; set('importantDates', next);
                }} placeholder="Date" className="px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                <button type="button" onClick={() => set('importantDates', (data.importantDates || []).filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-600 font-bold text-xl text-center">×</button>
              </div>
            ))}
            <button type="button"
              onClick={() => set('importantDates', [...(data.importantDates || []), { event: '', date: '' }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#f77420', color: '#f77420' }}>
              + Add Date
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Preparation Tips">
          <StringArrayEditor label="" items={data.preparationTips} onChange={(v) => set('preparationTips', v)} placeholder="e.g. Read newspaper daily" />
        </SectionCard>

        <SectionCard title="FAQs">
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex gap-2 mb-2">
                  <input value={faq.q} onChange={(e) => {
                    const next = [...data.faqs]; next[i] = { ...next[i], q: e.target.value }; set('faqs', next);
                  }} placeholder="Question" className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold" />
                  <button type="button" onClick={() => set('faqs', data.faqs.filter((_, idx) => idx !== i))}
                    className="text-red-400 hover:text-red-600 font-bold text-xl px-2">×</button>
                </div>
                <textarea value={faq.a} onChange={(e) => {
                  const next = [...data.faqs]; next[i] = { ...next[i], a: e.target.value }; set('faqs', next);
                }} placeholder="Answer" rows={2}
                  className="w-full px-3 py-2 border border-gray-100 rounded-xl text-sm resize-y" />
              </div>
            ))}
            <button type="button"
              onClick={() => set('faqs', [...data.faqs, { q: '', a: '' }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#f77420', color: '#f77420' }}>
              + Add FAQ
            </button>
          </div>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin/exams')} saveLabel={isNew ? 'Create Exam' : 'Save Changes'} />
      </form>
    </div>
  );
}
