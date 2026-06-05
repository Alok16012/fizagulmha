/**
 * Server-side data getters that read from JSON db (admin changes)
 * and fall back to TypeScript defaults.
 * Only usable in Server Components / API routes (uses fs).
 */
import { readJSON } from './dataStore';
import { supabaseAdmin, BLOG_COLUMNS, isSupabaseConfigured } from './supabase';
import { courses as defaultCourses } from '@/data/courses';
import { batches as defaultBatches } from '@/data/batches';
import { exams as defaultExams } from '@/data/exams';
import { facultyMembers as defaultFaculty } from '@/data/faculty';
import { blogs as defaultBlogs } from '@/data/blogs';

import type { Course } from '@/data/courses';
import type { Batch } from '@/data/batches';
import type { Exam } from '@/data/exams';
import type { FacultyMember } from '@/data/faculty';
import type { Blog } from '@/data/blogs';

export function getCourses(): Course[] {
  return readJSON<Course[]>('courses.json', defaultCourses);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getCourses().find((c) => c.slug === slug);
}

export function getBatches(): Batch[] {
  return readJSON<Batch[]>('batches.json', defaultBatches);
}

export function getBatchesByCourse(courseSlug: string): Batch[] {
  return getBatches().filter((b) => b.courseSlug === courseSlug);
}

export function getBatchBySlug(slug: string): Batch | undefined {
  return getBatches().find((b) => b.slug === slug);
}

export function getExams(): Exam[] {
  return readJSON<Exam[]>('exams.json', defaultExams);
}

export function getExamBySlug(slug: string): Exam | undefined {
  return getExams().find((e) => e.slug === slug);
}

export function getFaculty(): FacultyMember[] {
  return readJSON<FacultyMember[]>('faculty.json', defaultFaculty);
}

export function getFacultyBySlug(slug: string): FacultyMember | undefined {
  return getFaculty().find((f) => f.slug === slug);
}

export async function getBlogs(): Promise<Blog[]> {
  if (!isSupabaseConfigured()) return defaultBlogs;
  try {
    const { data, error } = await supabaseAdmin()
      .from('blogs')
      .select(BLOG_COLUMNS)
      .order('created_at', { ascending: true });
    if (error) throw error;
    if (data && data.length) return data as Blog[];
  } catch {
    // table missing or unreachable — fall back to bundled defaults
  }
  return defaultBlogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  return (await getBlogs()).find((b) => b.slug === slug);
}
