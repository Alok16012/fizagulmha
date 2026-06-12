/**
 * Server-side data getters that read from JSON db (admin changes)
 * and fall back to TypeScript defaults.
 * Only usable in Server Components / API routes (uses fs).
 */
import { readJSON } from './dataStore';
import { readFaculty } from './facultyStore';
import { supabaseAdmin, BLOG_COLUMNS, COURSE_COLUMNS, BATCH_COLUMNS, isSupabaseConfigured } from './supabase';
import { courses as defaultCourses } from '@/data/courses';
import { batches as defaultBatches } from '@/data/batches';
import { exams as defaultExams } from '@/data/exams';
import { blogs as defaultBlogs } from '@/data/blogs';

import type { Course } from '@/data/courses';
import type { Batch } from '@/data/batches';
import type { Exam } from '@/data/exams';
import type { FacultyMember } from '@/data/faculty';
import type { Blog } from '@/data/blogs';

export async function getCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured()) return readJSON<Course[]>('courses.json', defaultCourses);
  try {
    const { data, error } = await supabaseAdmin()
      .from('courses')
      .select(COURSE_COLUMNS)
      .order('created_at', { ascending: true });
    if (error) throw error;
    if (data !== null && data.length > 0) return data as unknown as Course[];
  } catch {}
  return readJSON<Course[]>('courses.json', defaultCourses);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const all = await getCourses();
  return all.find((c) => c.slug === slug);
}

export async function getBatches(): Promise<Batch[]> {
  if (!isSupabaseConfigured()) return readJSON<Batch[]>('batches.json', defaultBatches);
  try {
    const { data, error } = await supabaseAdmin()
      .from('batches')
      .select(BATCH_COLUMNS)
      .order('created_at', { ascending: true });
    if (error) throw error;
    if (data !== null && data.length > 0) return data as unknown as Batch[];
  } catch {}
  return readJSON<Batch[]>('batches.json', defaultBatches);
}

export async function getBatchesByCourse(courseSlug: string): Promise<Batch[]> {
  const all = await getBatches();
  return all.filter((b) => b.courseSlug === courseSlug);
}

export async function getBatchBySlug(slug: string): Promise<Batch | undefined> {
  const all = await getBatches();
  return all.find((b) => b.slug === slug);
}

export function getExams(): Exam[] {
  return readJSON<Exam[]>('exams.json', defaultExams);
}

export function getExamBySlug(slug: string): Exam | undefined {
  return getExams().find((e) => e.slug === slug);
}

export async function getFaculty(): Promise<FacultyMember[]> {
  return readFaculty();
}

export async function getFacultyBySlug(slug: string): Promise<FacultyMember | undefined> {
  const faculty = await getFaculty();
  return faculty.find((f) => f.slug === slug);
}

export async function getBlogs(): Promise<Blog[]> {
  if (!isSupabaseConfigured()) return defaultBlogs;
  try {
    const { data, error } = await supabaseAdmin()
      .from('blogs')
      .select(BLOG_COLUMNS)
      .order('created_at', { ascending: true });
    if (error) throw error;
    // Return Supabase data even if empty — only fall back if query itself failed
    if (data !== null) return data as Blog[];
  } catch {
    // table missing or unreachable — fall back to bundled defaults
  }
  return defaultBlogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const decoded = decodeURIComponent(slug);
  const all = await getBlogs();
  return all.find((b) => b.slug === decoded || b.slug === slug);
}
