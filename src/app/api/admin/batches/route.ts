import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { batches as defaultBatches } from '@/data/batches';
import type { Batch } from '@/data/batches';

function getData(): Batch[] {
  return readJSON<Batch[]>('batches.json', defaultBatches);
}

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getData());
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const data = getData();
  if (!body.slug) body.slug = generateSlug(body.name);
  data.push(body as Batch);
  writeJSON('batches.json', data);
  return NextResponse.json(body, { status: 201 });
}
