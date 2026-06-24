import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

// Server-only client using the service-role key. Never import this into
// client components — the service key bypasses row-level security.
export function supabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Supabase is not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

// `source` may not yet exist if the DB migration hasn't been run — handled in the API.
export const LEAD_COLUMNS = 'id, timestamp:created_at, name, phone, email, program, exam, message, source';
export const LEAD_COLUMNS_BASE = 'id, timestamp:created_at, name, phone, email, program, exam, message';

export const CATEGORY_COLUMNS = 'id, name, color';
export const COURSE_CATEGORY_COLUMNS = 'key, label, icon, color, accent, bg';

export const BLOG_COLUMNS =
  'slug, title, excerpt, content, category, categoryColor:category_color, author, authorAvatar:author_avatar, date, readTime:read_time, tags';

// Maps the app's camelCase Blog shape to the snake_case blogs table columns.
export function blogToRow(b: Record<string, unknown>) {
  return {
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt ?? '',
    content: b.content ?? '',
    category: b.category ?? '',
    category_color: b.categoryColor ?? '#f77420',
    author: b.author ?? '',
    author_avatar: b.authorAvatar ?? '',
    date: b.date ?? '',
    read_time: b.readTime ?? '',
    tags: b.tags ?? [],
  };
}

// True when Supabase env is present. Lets callers fall back to static data.
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export const COURSE_COLUMNS = 'slug, title, category, icon, color, bg, tagline, overview, duration, batchSize:batch_size, mode, fee, emi, features, includes, curriculum, whoFor:who_for, testimonial';

export const BATCH_COLUMNS = 'slug, courseSlug:course_slug, category, name, exam, batchCode:batch_code, startDate:start_date, endDate:end_date, duration, schedule, mode, seats, filled, fee, originalFee:original_fee, emi, offer, color, bg, status, language, batchType:batch_type, chips, faculty, highlights, syllabus, description, details';

export const EXAM_COLUMNS = 'slug, code, name, fullName:full_name, tagline, icon, color, bg, seats, colleges, duration, questions, marks, negativeMark:negative_mark, conductedBy:conducted_by, mode, overview, eligibility, examPattern:exam_pattern, syllabus, importantDates:important_dates, preparationTips:preparation_tips, faqs, applicationFee:application_fee, nluList:nlu_list, latestUpdates:latest_updates, applicationProcess:application_process';

export function courseToRow(c: Record<string, unknown>) {
  return {
    slug: c.slug,
    title: c.title,
    category: c.category ?? 'offline',
    icon: c.icon ?? '📚',
    color: c.color ?? '#f77420',
    bg: c.bg ?? '#fff1e8',
    tagline: c.tagline ?? '',
    overview: c.overview ?? '',
    duration: c.duration ?? '',
    batch_size: c.batchSize ?? '',
    mode: c.mode ?? '',
    fee: c.fee ?? '',
    emi: c.emi ?? '',
    features: c.features ?? [],
    includes: c.includes ?? [],
    curriculum: c.curriculum ?? [],
    who_for: c.whoFor ?? [],
    testimonial: c.testimonial ?? {},
  };
}

export function batchToRow(b: Record<string, unknown>) {
  return {
    slug: b.slug,
    course_slug: b.courseSlug ?? '',
    category: b.category ?? 'offline',
    name: b.name,
    exam: b.exam ?? '',
    batch_code: b.batchCode ?? '',
    start_date: b.startDate ?? '',
    end_date: b.endDate ?? '',
    duration: b.duration ?? '',
    schedule: b.schedule ?? '',
    mode: b.mode ?? '',
    seats: b.seats ?? 30,
    filled: b.filled ?? 0,
    fee: b.fee ?? '',
    original_fee: b.originalFee ?? null,
    emi: b.emi ?? '',
    offer: b.offer ?? null,
    color: b.color ?? '#f77420',
    bg: b.bg ?? '#e8eeff',
    status: b.status ?? 'upcoming',
    language: b.language ?? 'Hinglish',
    batch_type: b.batchType ?? '',
    chips: b.chips ?? [],
    faculty: b.faculty ?? [],
    highlights: b.highlights ?? [],
    syllabus: b.syllabus ?? [],
    description: b.description ?? '',
    details: b.details ?? {},
  };
}

export function examToRow(e: Record<string, unknown>) {
  return {
    slug: e.slug,
    code: e.code ?? '',
    name: e.name ?? '',
    full_name: e.fullName ?? '',
    tagline: e.tagline ?? '',
    icon: e.icon ?? '🏛️',
    color: e.color ?? '#f77420',
    bg: e.bg ?? '#fff1e8',
    seats: e.seats ?? '',
    colleges: e.colleges ?? '',
    duration: e.duration ?? '',
    questions: e.questions ?? 0,
    marks: e.marks ?? 0,
    negative_mark: e.negativeMark ?? '',
    conducted_by: e.conductedBy ?? '',
    mode: e.mode ?? '',
    overview: e.overview ?? '',
    eligibility: e.eligibility ?? [],
    exam_pattern: e.examPattern ?? [],
    syllabus: e.syllabus ?? [],
    important_dates: e.importantDates ?? [],
    preparation_tips: e.preparationTips ?? [],
    faqs: e.faqs ?? [],
    application_fee: e.applicationFee ?? [],
    nlu_list: e.nluList ?? [],
    latest_updates: e.latestUpdates ?? [],
    application_process: e.applicationProcess ?? [],
  };
}
