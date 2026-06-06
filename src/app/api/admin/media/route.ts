import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'blog-images';

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { data, error } = await supabaseAdmin().storage.from(BUCKET).list('', { limit: 200 });
    if (error) throw error;
    const files = (data ?? []).map((f) => ({
      name: f.name,
      url: supabaseAdmin().storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
    }));
    return NextResponse.json(files);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
  }

  try {
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabaseAdmin()
      .storage
      .from(BUCKET)
      .upload(safeName, buffer, { contentType: file.type, upsert: false });

    if (error) throw error;

    const { data: urlData } = supabaseAdmin().storage.from(BUCKET).getPublicUrl(safeName);
    return NextResponse.json({ url: urlData.publicUrl, name: safeName }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name } = await req.json();
    if (!name || name.includes('..')) return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    const { error } = await supabaseAdmin().storage.from(BUCKET).remove([name]);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
