import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured, COURSE_COLUMNS, courseToRow } from '@/lib/supabase';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { courses as defaultCourses } from '@/data/courses';
import type { Course } from '@/data/courses';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin().from('courses').select(COURSE_COLUMNS).order('created_at', { ascending: true });
      if (!error && data) return NextResponse.json(data);
    } catch {}
  }
  return NextResponse.json(readJSON<Course[]>('courses.json', defaultCourses));
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  if (!body.slug) body.slug = generateSlug(body.title);
  if (isSupabaseConfigured()) {
    try {
      const row = courseToRow(body);
      const { data, error } = await supabaseAdmin().from('courses').insert(row).select(COURSE_COLUMNS).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data, { status: 201 });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = readJSON<Course[]>('courses.json', defaultCourses);
  data.push(body as Course);
  writeJSON('courses.json', data);
  return NextResponse.json(body, { status: 201 });
}
