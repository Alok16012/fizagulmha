import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readJSON, writeJSON, generateSlug } from '@/lib/dataStore';
import { blogs as defaultBlogs } from '@/data/blogs';
import type { Blog } from '@/data/blogs';

function getData(): Blog[] {
  return readJSON<Blog[]>('blogs.json', defaultBlogs);
}

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getData());
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const data = getData();
  if (!body.slug) body.slug = generateSlug(body.title);
  if (!body.date) body.date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  data.push(body as Blog);
  writeJSON('blogs.json', data);
  return NextResponse.json(body, { status: 201 });
}
