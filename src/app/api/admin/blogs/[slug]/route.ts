import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readJSON, writeJSON } from '@/lib/dataStore';
import { blogs as defaultBlogs } from '@/data/blogs';
import type { Blog } from '@/data/blogs';

function getData(): Blog[] {
  return readJSON<Blog[]>('blogs.json', defaultBlogs);
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const item = getData().find((b) => b.slug === slug);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const body = await request.json();
  const data = getData();
  const idx = data.findIndex((b) => b.slug === slug);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  writeJSON('blogs.json', data);
  return NextResponse.json(data[idx]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const data = getData().filter((b) => b.slug !== slug);
  writeJSON('blogs.json', data);
  return NextResponse.json({ success: true });
}
