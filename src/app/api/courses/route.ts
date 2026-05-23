import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/getData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getCourses());
}
