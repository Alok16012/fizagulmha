import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { writeFile, readdir, unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureUploadDir();
  const files = await readdir(UPLOAD_DIR);
  const fileList = files.map((f) => ({
    name: f,
    url: `/uploads/${f}`,
  }));
  return NextResponse.json(fileList);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureUploadDir();

  const formData = await request.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // Sanitize filename
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
  }

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, safeName), buffer);

  return NextResponse.json({ url: `/uploads/${safeName}`, name: safeName }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name } = await request.json();
  if (!name || name.includes('..')) return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  await unlink(path.join(UPLOAD_DIR, name));
  return NextResponse.json({ success: true });
}
