import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured, COURSE_COLUMNS, courseToRow } from '@/lib/supabase';
import { readJSON, writeJSON } from '@/lib/dataStore';
import { courses as defaultCourses } from '@/data/courses';
import type { Course } from '@/data/courses';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin().from('courses').select(COURSE_COLUMNS).eq('slug', slug).single();
      if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(data);
    } catch {}
  }
  const item = readJSON<Course[]>('courses.json', defaultCourses).find((c) => c.slug === slug);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const body = await request.json();
  if (isSupabaseConfigured()) {
    try {
      const row = courseToRow(body);
      const { data, error } = await supabaseAdmin().from('courses').update(row).eq('slug', slug).select(COURSE_COLUMNS).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = readJSON<Course[]>('courses.json', defaultCourses);
  const idx = data.findIndex((c) => c.slug === slug);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  writeJSON('courses.json', data);
  return NextResponse.json(data[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabaseAdmin().from('courses').delete().eq('slug', slug);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = readJSON<Course[]>('courses.json', defaultCourses).filter((c) => c.slug !== slug);
  writeJSON('courses.json', data);
  return NextResponse.json({ success: true });
}
