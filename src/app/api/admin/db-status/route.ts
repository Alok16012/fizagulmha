import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function tableExists(table: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin().from(table).select('*').limit(1);
    // If error code is 42P01 (undefined_table) or schema cache miss → doesn't exist
    if (error && (error.code === '42P01' || error.message.includes('schema cache'))) return false;
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthenticatedRequest(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ supabase: false, tables: {} });
  }

  const [blogs, courses, batches, categories] = await Promise.all([
    tableExists('blogs'),
    tableExists('courses'),
    tableExists('batches'),
    tableExists('blog_categories'),
  ]);

  return NextResponse.json({
    supabase: true,
    tables: { blogs, courses, batches, blog_categories: categories },
  });
}
