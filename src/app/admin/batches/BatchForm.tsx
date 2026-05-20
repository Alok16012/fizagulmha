'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Batch } from '@/data/batches';
import {
  FieldGroup, TextInput, NumberInput, TextareaInput, SelectInput,
  StringArrayEditor, SectionCard, FormActions, Toast,
} from '@/components/admin/AdminFormHelpers';

export default function BatchForm({ batch, isNew }: { batch: Batch; isNew: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<Batch>({ ...batch });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  function set<K extends keyof Batch>(key: K, val: Batch[K]) {
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
      const url = isNew ? '/api/admin/batches' : `/api/admin/batches/${batch.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      showToast(isNew ? 'Batch created!' : 'Batch saved!', 'success');
      setTimeout(() => router.push('/admin/batches'), 1000);
    } catch {
      showToast('Error saving batch', 'error');
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this batch?')) return;
    setLoading(true);
    await fetch(`/api/admin/batches/${batch.slug}`, { method: 'DELETE' });
    router.push('/admin/batches');
  }

  const courseOptions = [
    { value: 'offline', label: 'Offline Course' },
    { value: 'online', label: 'Online Course' },
    { value: 'mentorship', label: 'OLET Program' },
    { value: 'mock-tests', label: 'Mock Tests' },
  ];

  const statusOptions = [
    { value: 'upcoming', label: '🕐 Upcoming' },
    { value: 'ongoing', label: '✅ Open' },
    { value: 'filling-fast', label: '🔥 Filling Fast' },
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
          </div>
        </SectionCard>

        <SectionCard title="Schedule & Mode">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Start Date">
              <TextInput value={data.startDate} onChange={(v) => set('startDate', v)} placeholder="e.g. 02 May, 2025" />
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
            <FieldGroup label="EMI">
              <TextInput value={data.emi} onChange={(v) => set('emi', v)} placeholder="e.g. ₹10,500/month" />
            </FieldGroup>
          </div>
        </SectionCard>

        <SectionCard title="Content">
          <FieldGroup label="Description">
            <TextareaInput value={data.description} onChange={(v) => set('description', v)} rows={4} placeholder="Batch description..." />
          </FieldGroup>
          <StringArrayEditor label="Highlights" items={data.highlights} onChange={(v) => set('highlights', v)} placeholder="e.g. Daily classroom sessions" />
          <StringArrayEditor label="Syllabus" items={data.syllabus} onChange={(v) => set('syllabus', v)} placeholder="e.g. English Language" />
          <StringArrayEditor label="Faculty" items={data.faculty} onChange={(v) => set('faculty', v)} placeholder="e.g. A.K. Singh" />
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin/batches')} saveLabel={isNew ? 'Create Batch' : 'Save Changes'} />
      </form>
    </div>
  );
}
