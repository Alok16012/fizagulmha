/**
 * Server-side data getters that read from JSON db (admin changes)
 * and fall back to TypeScript defaults.
 * Only usable in Server Components / API routes (uses fs).
 */
import { readJSON } from './dataStore';
import { readFaculty } from './facultyStore';
import { supabaseAdmin, BLOG_COLUMNS, COURSE_COLUMNS, BATCH_COLUMNS, EXAM_COLUMNS, COURSE_CATEGORY_COLUMNS, isSupabaseConfigured } from './supabase';
import { courses as defaultCourses } from '@/data/courses';
import { batches as defaultBatches } from '@/data/batches';
import { exams as defaultExams } from '@/data/exams';
import { blogs as defaultBlogs } from '@/data/blogs';
import { defaultCourseCategories } from '@/data/courseCategories';
import { defaultHomeContent } from '@/data/homeContent';

import type { Course } from '@/data/courses';
import type { Batch } from '@/data/batches';
import type { Exam } from '@/data/exams';
import type { FacultyMember } from '@/data/faculty';
import type { Blog } from '@/data/blogs';
import type { CourseCategory } from '@/data/courseCategories';
import type { HomeContent } from '@/data/homeContent';

export async function getCourseCategories(): Promise<CourseCategory[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin()
        .from('course_categories')
        .select(COURSE_CATEGORY_COLUMNS)
        .order('created_at', { ascending: true });
      if (error) throw error;
      if (data !== null) return data as CourseCategory[];
    } catch {}
  }
  return defaultCourseCategories;
}

export async function getCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured()) return withDefaultMockCourse(readJSON<Course[]>('courses.json', defaultCourses));
  try {
    const { data, error } = await supabaseAdmin()
      .from('courses')
      .select(COURSE_COLUMNS)
      .order('created_at', { ascending: true });
    if (error) throw error;
    if (data !== null && data.length > 0) return withDefaultMockCourse(data as unknown as Course[]);
  } catch {}
  return withDefaultMockCourse(readJSON<Course[]>('courses.json', defaultCourses));
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const all = await getCourses();
  return all.find((c) => c.slug === slug);
}

export async function getBatches(): Promise<Batch[]> {
  let batches: Batch[];
  if (!isSupabaseConfigured()) {
    batches = readJSON<Batch[]>('batches.json', defaultBatches);
    return withDefaultMentorshipBatch(batches);
  }
  try {
    const { data, error } = await supabaseAdmin()
      .from('batches')
      .select(BATCH_COLUMNS)
      .order('created_at', { ascending: true });
    if (error) throw error;
    if (data !== null) return data as unknown as Batch[];
  } catch {}
  batches = readJSON<Batch[]>('batches.json', defaultBatches);
  return withDefaultMentorshipBatch(batches);
}

export async function getBatchesByCourse(courseSlug: string): Promise<Batch[]> {
  const all = await getBatches();
  return all.filter((b) => b.courseSlug === courseSlug);
}

export async function getBatchBySlug(slug: string): Promise<Batch | undefined> {
  const all = await getBatches();
  return all.find((b) => b.slug === slug);
}

async function withDefaultMentorshipBatch(batchList: Batch[]): Promise<Batch[]> {
  const withMocks = withDefaultMockBatches(batchList);
  if (withMocks.some((b) => b.slug === 'clat-navigator')) return withMocks;
  const courses = await getCourses();
  const course = courses.find((c) => c.slug === 'clat-mentorship-program')
    ?? courses.find((c) => c.category === 'mentorship' && /ecosystem|navigator|clat mentorship/i.test(c.title))
    ?? courses.find((c) => c.category === 'mentorship');
  if (!course) return withMocks;
  return [...withMocks, createDefaultClatNavigatorBatch(course.slug)];
}

function withDefaultMockCourse(courseList: Course[]): Course[] {
  if (courseList.some((c) => c.slug === 'mock-tests')) return courseList;
  const mockCourse = defaultCourses.find((c) => c.slug === 'mock-tests');
  return mockCourse ? [...courseList, mockCourse] : courseList;
}

function withDefaultMockBatches(batchList: Batch[]): Batch[] {
  const mockBatches = defaultBatches.filter((b) => b.courseSlug === 'mock-tests');
  const missing = mockBatches.filter((mock) => !batchList.some((b) => b.slug === mock.slug));
  return missing.length > 0 ? [...batchList, ...missing] : batchList;
}

function createDefaultClatNavigatorBatch(courseSlug: string): Batch {
  return {
    slug: 'clat-navigator',
    courseSlug,
    category: 'mentorship',
    name: 'CLAT Navigator™',
    exam: 'CLAT',
    batchCode: 'MENTOR-CLAT-NAV',
    startDate: 'Open',
    endDate: 'Till CLAT Examination',
    duration: 'Till CLAT Examination',
    schedule: 'Weekly strategy sessions · Monthly one-to-one reviews',
    mode: 'Online + Offline',
    seats: 999,
    filled: 0,
    fee: 'Call for Fee',
    emi: '',
    color: '#f77420',
    bg: '#fff1e8',
    status: 'ongoing',
    language: 'Hinglish',
    batchType: 'Personal Mentorship',
    chips: ['Dedicated Mentor', 'Mock Analysis', 'Study Planner', 'Parent Updates'],
    faculty: ['CLATians Mentor Team'],
    highlights: [
      'Dedicated Personal Mentor',
      'Weekly Strategy Sessions',
      'Monthly One-to-One Reviews',
      'AI-Powered Progress Tracking',
      'Mock Test Analysis',
      'Daily Study Planning',
      'WhatsApp Support',
      'Parent Progress Reports',
      'Goal Monitoring System',
      'NLU Alumni Guidance Sessions',
    ],
    syllabus: [
      'Personal Study Planning',
      'Mock Test Analysis',
      'Performance Tracking',
      'Revision Strategy',
      'Parent Updates',
    ],
    description: 'Preparing for CLAT without proper guidance often leads to confusion, inconsistency, and unnecessary stress. CLAT Navigator™ ensures that you always have an experienced mentor to guide your preparation, monitor your progress, and help you make the right decisions at the right time.',
    details: {
      aboutDuration: 'Till CLAT Examination',
      aboutStrategy: 'Diagnostic Assessment → Strategic Planning → Consistent Execution → Performance Optimisation → Final Push',
      aboutFeaturesLabel: 'Personalised Mentorship Benefits',
      aboutFeatures: [
        { title: 'Dedicated Personal Mentor', subtitle: 'One mentor who understands your preparation journey.' },
        { title: 'Weekly Strategy Sessions', subtitle: 'Structured guidance to optimise preparation.' },
        { title: 'Monthly One-to-One Reviews', subtitle: 'Detailed discussions on progress and improvements.' },
        { title: 'Personal Study Planner', subtitle: 'Targets aligned with your strengths and weaknesses.' },
        { title: 'Mock Test Analysis', subtitle: 'Identify recurring mistakes and improvement opportunities.' },
        { title: 'AI-Powered Dashboard', subtitle: 'Track preparation trends and performance growth.' },
        { title: 'WhatsApp Guidance', subtitle: 'Quick support and updates whenever required.' },
        { title: 'Parent Updates', subtitle: 'Monthly communication regarding progress and goals.' },
        { title: 'Motivation & Accountability', subtitle: 'Helping you stay disciplined throughout preparation.' },
      ],
      strategySections: [
        {
          title: 'Phase 1: Diagnostic Assessment',
          subtitle: 'Weeks 1-2',
          items: ['Preparation audit', 'Goal setting', 'Strength analysis', 'Weakness identification'],
        },
        {
          title: 'Phase 2: Strategic Planning',
          subtitle: 'Month 1',
          items: ['Study roadmap creation', 'Time management planning', 'Resource optimisation'],
        },
        {
          title: 'Phase 3: Consistent Execution',
          subtitle: 'Months 2-6',
          items: ['Weekly targets', 'Mentor reviews', 'Habit development', 'Performance monitoring'],
        },
        {
          title: 'Phase 4: Performance Optimisation',
          subtitle: 'Months 7-9',
          items: ['Advanced mock analysis', 'Revision refinement', 'Accuracy improvement'],
        },
        {
          title: 'Phase 5: Final Push',
          subtitle: 'Last 60-90 Days',
          items: ['Rank improvement strategy', 'Stress management', 'Exam temperament building', 'Last-minute planning'],
        },
      ],
      moreDetails: [
        'AI-supported performance trends, subject-wise analysis, weakness detection, revision recommendations, improvement tracking, goal monitoring, and rank forecasting.',
        'Structured parent updates so families understand progress, strengths, weaknesses, support areas, and realistic expectations.',
        'Built for Class 12 students, self-study aspirants, serious aspirants, and students struggling with consistency, mock performance, or planning.',
      ],
      faqs: [
        { question: 'Who can join CLAT Navigator™?', answer: 'Class 12 students, droppers, and self-study aspirants preparing for CLAT.' },
        { question: 'Is this different from classroom coaching?', answer: 'Yes. Navigator focuses specifically on guidance, accountability, planning, and strategic support.' },
        { question: 'Do I get a dedicated mentor?', answer: 'Yes. Students receive personalised mentorship support.' },
        { question: 'How often are mentor sessions conducted?', answer: 'Weekly strategy sessions and monthly one-to-one reviews are included.' },
        { question: 'Is WhatsApp support available?', answer: 'Yes. Students can seek guidance through designated support channels.' },
        { question: 'Will parents receive updates?', answer: 'Yes. Monthly progress updates are shared with parents.' },
        { question: 'Is this available online?', answer: 'Yes. Support is available in both online and offline formats.' },
      ],
      reviews: [],
    },
  };
}

function mergeExamsWithDefaults(dbExams: Exam[]): Exam[] {
  const merged = new Map<string, Exam>();
  for (const exam of defaultExams) merged.set(exam.slug, exam);
  for (const exam of dbExams) merged.set(exam.slug, exam);
  return Array.from(merged.values());
}

export async function getExams(): Promise<Exam[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin()
        .from('exams')
        .select(EXAM_COLUMNS)
        .order('created_at', { ascending: true });
      if (error) throw error;
      if (data) return mergeExamsWithDefaults(data as unknown as Exam[]);
    } catch {
      // table missing or unreachable — fall back to local/default data
    }
  }
  return readJSON<Exam[]>('exams.json', defaultExams);
}

export async function getExamBySlug(slug: string): Promise<Exam | undefined> {
  const exams = await getExams();
  return exams.find((e) => e.slug === slug);
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

function mergeHomeContent(content: Partial<HomeContent> | null | undefined): HomeContent {
  if (!content) return defaultHomeContent;
  return {
    ...defaultHomeContent,
    ...content,
    site: { ...defaultHomeContent.site, ...(content.site || {}) },
    hero: { ...defaultHomeContent.hero, ...(content.hero || {}) },
    courses: { ...defaultHomeContent.courses, ...(content.courses || {}) },
    testimonials: { ...defaultHomeContent.testimonials, ...(content.testimonials || {}) },
    faq: { ...defaultHomeContent.faq, ...(content.faq || {}) },
    predictor: { ...defaultHomeContent.predictor, ...(content.predictor || {}) },
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin()
        .from('home_content')
        .select('content')
        .eq('id', 'main')
        .maybeSingle();
      if (error) throw error;
      if (data?.content) return mergeHomeContent(data.content as Partial<HomeContent>);
    } catch {
      // table missing or unreachable — fall back to local/default data
    }
  }
  return mergeHomeContent(readJSON<Partial<HomeContent>>('home-content.json', defaultHomeContent));
}

export { mergeHomeContent };

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const decoded = decodeURIComponent(slug);
  const all = await getBlogs();
  return all.find((b) => b.slug === decoded || b.slug === slug);
}
