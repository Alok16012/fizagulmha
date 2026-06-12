import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { readFaculty, writeFaculty } from '@/lib/facultyStore';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const item = (await readFaculty()).find((f) => f.slug === slug);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const body = await request.json();
  const data = await readFaculty();
  const idx = data.findIndex((f) => f.slug === slug);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  try {
    await writeFaculty(data);
    return NextResponse.json(data[idx]);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const data = (await readFaculty()).filter((f) => f.slug !== slug);
  try {
    await writeFaculty(data);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
