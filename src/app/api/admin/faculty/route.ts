import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/dataStore';
import { readFaculty, writeFaculty } from '@/lib/facultyStore';
import type { FacultyMember } from '@/data/faculty';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await readFaculty());
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const data = await readFaculty();
  if (!body.slug) body.slug = generateSlug(body.name);
  if (!body.slug) return NextResponse.json({ error: 'Please enter a faculty name or slug.' }, { status: 400 });
  if (data.some((f) => f.slug === body.slug)) {
    return NextResponse.json({ error: `A faculty member with slug "${body.slug}" already exists.` }, { status: 409 });
  }

  try {
    data.push(body as FacultyMember);
    await writeFaculty(data);
    return NextResponse.json(body, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
