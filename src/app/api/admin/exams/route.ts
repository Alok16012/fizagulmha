import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { exams as defaultExams } from '@/data/exams';
import type { Exam } from '@/data/exams';

function getData(): Exam[] {
  return readJSON<Exam[]>('exams.json', defaultExams);
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
  data.push(body as Exam);
  writeJSON('exams.json', data);
  return NextResponse.json(body, { status: 201 });
}
