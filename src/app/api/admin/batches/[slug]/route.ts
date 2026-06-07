import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured, BATCH_COLUMNS, batchToRow } from '@/lib/supabase';
import { readJSON, writeJSON } from '@/lib/dataStore';
import { batches as defaultBatches } from '@/data/batches';
import type { Batch } from '@/data/batches';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin().from('batches').select(BATCH_COLUMNS).eq('slug', slug).single();
      if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(data);
    } catch {}
  }
  const item = readJSON<Batch[]>('batches.json', defaultBatches).find((b) => b.slug === slug);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const body = await request.json();
  if (isSupabaseConfigured()) {
    try {
      const row = batchToRow(body);
      const { data, error } = await supabaseAdmin().from('batches').update(row).eq('slug', slug).select(BATCH_COLUMNS).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = readJSON<Batch[]>('batches.json', defaultBatches);
  const idx = data.findIndex((b) => b.slug === slug);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  writeJSON('batches.json', data);
  return NextResponse.json(data[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabaseAdmin().from('batches').delete().eq('slug', slug);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = readJSON<Batch[]>('batches.json', defaultBatches).filter((b) => b.slug !== slug);
  writeJSON('batches.json', data);
  return NextResponse.json({ success: true });
}
