import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'blog-images';

/** Ensure the bucket exists and is public. Creates it on first use. */
async function ensureBucket() {
  const sb = supabaseAdmin();
  const { data: buckets } = await sb.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    await sb.storage.createBucket(BUCKET, { public: true });
  }
}

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await ensureBucket();
    const { data, error } = await supabaseAdmin().storage.from(BUCKET).list('', { limit: 200 });
    if (error) throw error;
    const sb = supabaseAdmin();
    const files = (data ?? []).map((f) => ({
      name: f.name,
      url: sb.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
    }));
    return NextResponse.json(files);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
  }

  try {
    await ensureBucket();

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

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name } = await request.json();
    if (!name || name.includes('..')) return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    const { error } = await supabaseAdmin().storage.from(BUCKET).remove([name]);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
