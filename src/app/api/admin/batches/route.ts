import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured, BATCH_COLUMNS, batchToRow } from '@/lib/supabase';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { batches as defaultBatches } from '@/data/batches';
import type { Batch } from '@/data/batches';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin().from('batches').select(BATCH_COLUMNS).order('created_at', { ascending: true });
      if (!error && data) return NextResponse.json(data);
    } catch {}
  }
  return NextResponse.json(readJSON<Batch[]>('batches.json', defaultBatches));
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  if (!body.slug) body.slug = generateSlug(body.name);
  if (isSupabaseConfigured()) {
    try {
      const row = batchToRow(body);
      const { data, error } = await supabaseAdmin().from('batches').insert(row).select(BATCH_COLUMNS).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data, { status: 201 });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }
  const data = readJSON<Batch[]>('batches.json', defaultBatches);
  data.push(body as Batch);
  writeJSON('batches.json', data);
  return NextResponse.json(body, { status: 201 });
}
