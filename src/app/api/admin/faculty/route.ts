import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { facultyMembers as defaultFaculty } from '@/data/faculty';
import type { FacultyMember } from '@/data/faculty';

function getData(): FacultyMember[] {
  return readJSON<FacultyMember[]>('faculty.json', defaultFaculty);
}

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getData());
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const data = getData();
  if (!body.slug) body.slug = generateSlug(body.name);
  data.push(body as FacultyMember);
  writeJSON('faculty.json', data);
  return NextResponse.json(body, { status: 201 });
}
