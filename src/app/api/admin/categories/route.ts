import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, CATEGORY_COLUMNS } from '@/lib/supabase';

const FALLBACK = [
  { id: 1, name: 'Legal', color: '#6366f1' },
  { id: 2, name: 'Current Affairs', color: '#f97316' },
  { id: 3, name: 'Law Preparation', color: '#f77420' },
];

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from('blog_categories')
      .select(CATEGORY_COLUMNS)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data && data.length ? data : FALLBACK);
  } catch {
    return NextResponse.json(FALLBACK);
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, color } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  const { data, error } = await supabaseAdmin()
    .from('blog_categories')
    .insert({ name: name.trim(), color: color || '#f77420' })
    .select(CATEGORY_COLUMNS)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
