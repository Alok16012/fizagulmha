import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/dataStore';
import { getCourseCategories } from '@/lib/getData';
import { COURSE_CATEGORY_COLUMNS, isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getCourseCategories());
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Database is not configured.' }, { status: 500 });

  const body = await request.json();
  const label = String(body.label || '').trim();
  const key = generateSlug(String(body.key || label));
  if (!label || !key) return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });

  const row = {
    key,
    label,
    icon: String(body.icon || '📚'),
    color: String(body.color || '#0D1837'),
    accent: String(body.accent || '#08BD80'),
    bg: String(body.bg || '#E6FAF4'),
  };
  const { data, error } = await supabaseAdmin()
    .from('course_categories')
    .insert(row)
    .select(COURSE_CATEGORY_COLUMNS)
    .single();
  if (error) {
    const status = error.code === '23505' ? 409 : 500;
    return NextResponse.json({ error: error.code === '23505' ? 'Category already exists.' : error.message }, { status });
  }
  return NextResponse.json(data, { status: 201 });
}
