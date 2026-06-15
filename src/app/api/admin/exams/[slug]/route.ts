import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured, EXAM_COLUMNS, examToRow } from '@/lib/supabase';
import { readJSON, writeJSON } from '@/lib/dataStore';
import { exams as defaultExams } from '@/data/exams';
import type { Exam } from '@/data/exams';

export const dynamic = 'force-dynamic';

function getData(): Exam[] {
  return readJSON<Exam[]>('exams.json', defaultExams);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin().from('exams').select(EXAM_COLUMNS).eq('slug', slug).single();
      if (!error && data) return NextResponse.json(data);
    } catch {}
  }
  const item = getData().find((e) => e.slug === slug);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const body = await request.json();
  if (isSupabaseConfigured()) {
    try {
      const row = examToRow(body);
      let { data, error } = await supabaseAdmin().from('exams').update(row).eq('slug', slug).select(EXAM_COLUMNS).single();
      if (error && (error.code === 'PGRST116' || /0 rows|JSON object requested|not found/i.test(error.message))) {
        const inserted = await supabaseAdmin().from('exams').insert(row).select(EXAM_COLUMNS).single();
        data = inserted.data;
        error = inserted.error;
      }
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = getData();
  const idx = data.findIndex((e) => e.slug === slug);
  if (idx === -1) {
    data.push(body as Exam);
    writeJSON('exams.json', data);
    return NextResponse.json(body);
  }
  data[idx] = { ...data[idx], ...body };
  writeJSON('exams.json', data);
  return NextResponse.json(data[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabaseAdmin().from('exams').delete().eq('slug', slug);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = getData().filter((e) => e.slug !== slug);
  writeJSON('exams.json', data);
  return NextResponse.json({ success: true });
}
