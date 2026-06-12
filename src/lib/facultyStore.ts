import { readJSON, writeJSON } from './dataStore';
import { isSupabaseConfigured, supabaseAdmin } from './supabase';
import type { FacultyMember } from '@/data/faculty';

const FACULTY_BUCKET = 'blog-images';
const FACULTY_PATH = 'data/faculty.json';

export async function readFaculty(): Promise<FacultyMember[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin().storage.from(FACULTY_BUCKET).download(FACULTY_PATH);
      if (!error && data) return JSON.parse(await data.text()) as FacultyMember[];
    } catch {
      // Fall back to the local JSON seed below.
    }
  }

  return readJSON<FacultyMember[]>('faculty.json', []);
}

export async function writeFaculty(data: FacultyMember[]): Promise<void> {
  if (isSupabaseConfigured()) {
    const buffer = Buffer.from(JSON.stringify(data, null, 2), 'utf-8');
    const { error } = await supabaseAdmin()
      .storage
      .from(FACULTY_BUCKET)
      .upload(FACULTY_PATH, buffer, {
        contentType: 'application/json',
        upsert: true,
      });

    if (error) throw error;
    return;
  }

  writeJSON('faculty.json', data);
}
