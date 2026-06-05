import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { generateSlug } from '@/lib/dataStore';
import { supabaseAdmin, BLOG_COLUMNS, blogToRow } from '@/lib/supabase';

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin()
    .from('blogs')
    .select(BLOG_COLUMNS)
    .order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  if (!body.slug) body.slug = generateSlug(body.title);
  if (!body.date) body.date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const { data, error } = await supabaseAdmin()
    .from('blogs')
    .insert(blogToRow(body))
    .select(BLOG_COLUMNS)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
