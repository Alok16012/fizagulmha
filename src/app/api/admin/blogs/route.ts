import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/dataStore';
import { supabaseAdmin, BLOG_COLUMNS, blogToRow } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin()
    .from('blogs')
    .select(BLOG_COLUMNS)
    .order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  // Always sanitize slug to be URL-safe
  body.slug = generateSlug(body.slug || body.title);
  if (!body.date) {
    const now = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    body.date = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  }

  const { data, error } = await supabaseAdmin()
    .from('blogs')
    .insert(blogToRow(body))
    .select(BLOG_COLUMNS)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
