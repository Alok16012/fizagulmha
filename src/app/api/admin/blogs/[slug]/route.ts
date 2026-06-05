import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { generateSlug } from '@/lib/dataStore';
import { supabaseAdmin, BLOG_COLUMNS, blogToRow } from '@/lib/supabase';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const { data, error } = await supabaseAdmin()
    .from('blogs')
    .select(BLOG_COLUMNS)
    .eq('slug', decodedSlug)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const body = await request.json();
  // Always sanitize the new slug
  const newSlug = generateSlug(body.slug ?? decodedSlug);
  const row = blogToRow({ ...body, slug: newSlug });

  const { data, error } = await supabaseAdmin()
    .from('blogs')
    .update(row)
    .eq('slug', decodedSlug)
    .select(BLOG_COLUMNS)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const { error } = await supabaseAdmin().from('blogs').delete().eq('slug', decodedSlug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
