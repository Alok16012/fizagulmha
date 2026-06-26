import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/auth';
import { readJSON, writeJSON } from '@/lib/dataStore';
import { getHomeContent, mergeHomeContent } from '@/lib/getData';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';
import { defaultHomeContent, type HomeContent } from '@/data/homeContent';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getHomeContent());
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = mergeHomeContent(await request.json());

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin()
        .from('home_content')
        .upsert({ id: 'main', content: body, updated_at: new Date().toISOString() }, { onConflict: 'id' })
        .select('content')
        .single();
      if (error) {
        const missingTable = error.code === 'PGRST205' || /home_content|schema cache|does not exist/i.test(error.message);
        return NextResponse.json({
          error: missingTable
            ? 'Home page table is missing in Supabase. Run the home_content SQL migration, then save again.'
            : error.message,
          code: error.code,
        }, { status: missingTable ? 424 : 500 });
      }
      return NextResponse.json((data?.content as HomeContent) || body);
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  try {
    writeJSON('home-content.json', body);
    return NextResponse.json(readJSON<HomeContent>('home-content.json', defaultHomeContent));
  } catch {
    return NextResponse.json({ error: 'Home page content could not be saved because no database is configured and the filesystem is read-only.' }, { status: 500 });
  }
}
