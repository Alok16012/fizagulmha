import { NextResponse } from 'next/server';
import { getCourseCategories } from '@/lib/getData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getCourseCategories());
}
