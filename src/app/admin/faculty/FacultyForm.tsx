'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FacultyMember } from '@/data/faculty';
import { adminFetch } from '@/lib/adminFetch';
import {
  FieldGroup, TextInput, TextareaInput,
  StringArrayEditor, SectionCard, FormActions, Toast,
} from '@/components/admin/AdminFormHelpers';

export default function FacultyForm({ member, isNew }: { member: FacultyMember; isNew: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<FacultyMember>({ ...member });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  function set<K extends keyof FacultyMember>(key: K, val: FacultyMember[K]) {
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
      const url = isNew ? '/api/admin/faculty' : `/api/admin/faculty/${member.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await adminFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed');
      showToast(isNew ? 'Faculty created!' : 'Faculty saved!', 'success');
      setTimeout(() => router.push('/admin/faculty'), 1000);
    } catch {
      showToast('Error saving faculty', 'error');
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this faculty member?')) return;
    await adminFetch(`/api/admin/faculty/${member.slug}`, { method: 'DELETE' });
    router.push('/admin/faculty');
  }

  return (
    <div>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700">← Back</button>
        <h1 className="text-2xl font-black text-gray-900">{isNew ? 'New Faculty' : `Edit: ${member.name}`}</h1>
        {!isNew && (
          <button onClick={handleDelete} className="ml-auto text-sm font-semibold px-4 py-2 rounded-xl text-red-500 border border-red-200 hover:bg-red-50 transition-colors">
            🗑 Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <SectionCard title="Profile">
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="Full Name">
              <TextInput value={data.name} onChange={(v) => set('name', v)} placeholder="e.g. A.K. Singh" required />
            </FieldGroup>
            <FieldGroup label="Slug">
              <TextInput value={data.slug} onChange={(v) => set('slug', v)} placeholder="e.g. ak-singh" required />
            </FieldGroup>
            <FieldGroup label="Designation">
              <TextInput value={data.designation} onChange={(v) => set('designation', v)} placeholder="e.g. Director, CLATians" />
            </FieldGroup>
            <FieldGroup label="Subject">
              <TextInput value={data.subject} onChange={(v) => set('subject', v)} placeholder="e.g. Legal Reasoning" />
            </FieldGroup>
            <FieldGroup label="Specialization">
              <TextInput value={data.specialization} onChange={(v) => set('specialization', v)} placeholder="e.g. CLAT & AILET" />
            </FieldGroup>
            <FieldGroup label="Avatar (initials)">
              <TextInput value={data.avatar} onChange={(v) => set('avatar', v)} placeholder="e.g. AK" />
            </FieldGroup>
            <FieldGroup label="Experience">
              <TextInput value={data.experience} onChange={(v) => set('experience', v)} placeholder="e.g. 15+ Years" />
            </FieldGroup>
            <FieldGroup label="Students">
              <TextInput value={data.students} onChange={(v) => set('students', v)} placeholder="e.g. 15,000+" />
            </FieldGroup>
            <FieldGroup label="Rating (out of 5)">
              <TextInput value={String(data.rating)} onChange={(v) => set('rating', parseFloat(v) || 0)} placeholder="e.g. 4.9" />
            </FieldGroup>
            <FieldGroup label="Color (hex)">
              <div className="flex gap-2 items-center">
                <input type="color" value={data.color} onChange={(e) => set('color', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                <TextInput value={data.color} onChange={(v) => set('color', v)} placeholder="#08BD80" />
              </div>
            </FieldGroup>
          </div>
          <FieldGroup label="Bio">
            <TextareaInput value={data.bio} onChange={(v) => set('bio', v)} rows={5} placeholder="Faculty biography..." />
          </FieldGroup>
        </SectionCard>

        <SectionCard title="Tags">
          <StringArrayEditor label="" items={data.tags} onChange={(v) => set('tags', v)} placeholder="e.g. Legal Reasoning" />
        </SectionCard>

        <SectionCard title="Education">
          <StringArrayEditor label="" items={data.education} onChange={(v) => set('education', v)} placeholder="e.g. LLB — Patna University" />
        </SectionCard>

        <SectionCard title="Achievements">
          <StringArrayEditor label="" items={data.achievements} onChange={(v) => set('achievements', v)} placeholder="e.g. 15,000+ students guided" />
        </SectionCard>

        <SectionCard title="Courses Taught">
          <StringArrayEditor label="" items={data.courses} onChange={(v) => set('courses', v)} placeholder="e.g. Offline CLAT Course" />
        </SectionCard>

        <SectionCard title="Expertise Areas">
          <div className="space-y-3">
            {data.expertise.map((exp, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 items-center">
                <input value={exp.area} onChange={(e) => {
                  const next = [...data.expertise]; next[i] = { ...next[i], area: e.target.value }; set('expertise', next);
                }} placeholder="Area" className="col-span-2 px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                <input type="number" min={0} max={100} value={exp.level} onChange={(e) => {
                  const next = [...data.expertise]; next[i] = { ...next[i], level: Number(e.target.value) }; set('expertise', next);
                }} placeholder="Level (0-100)" className="px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                <button type="button" onClick={() => set('expertise', data.expertise.filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-600 font-bold text-xl text-center">×</button>
              </div>
            ))}
            <button type="button"
              onClick={() => set('expertise', [...data.expertise, { area: '', level: 80 }])}
              className="text-sm font-semibold px-3 py-1.5 rounded-lg border-2 border-dashed"
              style={{ borderColor: '#08BD80', color: '#08BD80' }}>
              + Add Expertise
            </button>
          </div>
        </SectionCard>

        <FormActions loading={loading} onCancel={() => router.push('/admin/faculty')} saveLabel={isNew ? 'Create Faculty' : 'Save Changes'} />
      </form>
    </div>
  );
}
