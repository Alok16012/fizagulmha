import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, LEAD_COLUMNS } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, program, exam, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin()
      .from('leads')
      .insert({
        name,
        phone,
        email: email || '',
        program: program || '',
        exam: exam || '',
        message: message || '',
      })
      .select(LEAD_COLUMNS)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, lead: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from('leads')
      .select(LEAD_COLUMNS)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ leads: data ?? [] });
  } catch {
    return NextResponse.json({ error: 'Failed to read leads' }, { status: 500 });
  }
}
