import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, LEAD_COLUMNS, LEAD_COLUMNS_BASE } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, program, exam, message, source } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const row = {
      name,
      phone,
      email: email || '',
      program: program || '',
      exam: exam || '',
      message: message || '',
      source: source || 'contact',
    };

    // Try inserting with source; if column doesn't exist yet, retry without it.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: { data: any; error: any } = await supabaseAdmin().from('leads').insert(row).select(LEAD_COLUMNS).single();

    if (result.error && (result.error.code === '42703' || result.error.message?.includes('source'))) {
      const { source: _s, ...rowWithoutSource } = row;
      result = await supabaseAdmin().from('leads').insert(rowWithoutSource).select(LEAD_COLUMNS_BASE).single();
    }

    if (result.error) throw result.error;

    return NextResponse.json({ success: true, lead: result.data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: { data: any; error: any } = await supabaseAdmin()
      .from('leads')
      .select(LEAD_COLUMNS)
      .order('created_at', { ascending: false });

    // Fallback if source column doesn't exist yet
    if (result.error && (result.error.code === '42703' || result.error.message?.includes('source'))) {
      result = await supabaseAdmin()
        .from('leads')
        .select(LEAD_COLUMNS_BASE)
        .order('created_at', { ascending: false });
    }

    if (result.error) throw result.error;
    return NextResponse.json({ leads: result.data ?? [] });
  } catch {
    return NextResponse.json({ error: 'Failed to read leads' }, { status: 500 });
  }
}
