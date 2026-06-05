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
    category_color: b.categoryColor ?? '#08BD80',
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
