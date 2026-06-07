import { NextResponse } from 'next/server';
import { getBatches } from '@/lib/getData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getBatches());
}
