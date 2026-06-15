import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured, EXAM_COLUMNS, examToRow } from '@/lib/supabase';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { exams as defaultExams } from '@/data/exams';
import type { Exam } from '@/data/exams';

export const dynamic = 'force-dynamic';

function mergeExamsWithDefaults(dbExams: Exam[]): Exam[] {
  const merged = new Map<string, Exam>();
  for (const exam of defaultExams) merged.set(exam.slug, exam);
  for (const exam of dbExams) merged.set(exam.slug, exam);
  return Array.from(merged.values());
}

function getData(): Exam[] {
  return readJSON<Exam[]>('exams.json', defaultExams);
}

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin().from('exams').select(EXAM_COLUMNS).order('created_at', { ascending: true });
      if (!error && data) return NextResponse.json(mergeExamsWithDefaults(data as unknown as Exam[]));
    } catch {}
  }
  return NextResponse.json(getData());
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  if (!body.slug) body.slug = generateSlug(body.name);
  if (!body.slug) {
    return NextResponse.json({ error: 'Please enter an Exam Name or Slug before saving.' }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    try {
      const row = examToRow(body);
      const { data, error } = await supabaseAdmin().from('exams').insert(row).select(EXAM_COLUMNS).single();
      if (error) {
        if (error.code === '23505' || /duplicate key/i.test(error.message)) {
          return NextResponse.json({ error: `An exam with slug "${body.slug}" already exists.` }, { status: 409 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data, { status: 201 });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  const data = getData();
  if (data.some((e) => e.slug === body.slug)) {
    return NextResponse.json({ error: `An exam with slug "${body.slug}" already exists.` }, { status: 409 });
  }
  data.push(body as Exam);
  writeJSON('exams.json', data);
  return NextResponse.json(body, { status: 201 });
}
