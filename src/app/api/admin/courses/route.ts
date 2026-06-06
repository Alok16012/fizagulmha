import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { courses as defaultCourses } from '@/data/courses';
import type { Course } from '@/data/courses';

function getData(): Course[] {
  return readJSON<Course[]>('courses.json', defaultCourses);
}

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getData());
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const data = getData();
  if (!body.slug) body.slug = generateSlug(body.title);
  data.push(body as Course);
  writeJSON('courses.json', data);
  return NextResponse.json(body, { status: 201 });
}
