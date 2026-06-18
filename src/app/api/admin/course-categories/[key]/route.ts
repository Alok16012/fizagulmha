import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: 'Database is not configured.' }, { status: 500 });

  const { key } = await params;
  const { count, error: countError } = await supabaseAdmin()
    .from('courses')
    .select('slug', { count: 'exact', head: true })
    .eq('category', key);
  if (countError) return NextResponse.json({ error: countError.message }, { status: 500 });
  if ((count || 0) > 0) {
    return NextResponse.json(
      { error: `This category contains ${count} course${count === 1 ? '' : 's'}. Move or delete them first.` },
      { status: 409 }
    );
  }

  const { error } = await supabaseAdmin().from('course_categories').delete().eq('key', key);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
