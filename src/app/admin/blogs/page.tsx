export const dynamic = 'force-dynamic';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getBlogs } from '@/lib/getData';
import { supabaseAdmin, CATEGORY_COLUMNS } from '@/lib/supabase';
import BlogsAdminClient from './BlogsAdminClient';

const FALLBACK_CATEGORIES = [
  { id: 1, name: 'Legal', color: '#6366f1' },
  { id: 2, name: 'Current Affairs', color: '#f97316' },
  { id: 3, name: 'Law Preparation', color: '#08BD80' },
];

export default async function AdminBlogs() {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const blogs = await getBlogs();

  let categories = FALLBACK_CATEGORIES;
  try {
    const { data } = await supabaseAdmin()
      .from('blog_categories')
      .select(CATEGORY_COLUMNS)
      .order('created_at', { ascending: true });
    if (data && data.length) categories = data;
  } catch { /* fallback */ }

  return <BlogsAdminClient initialBlogs={blogs} initialCategories={categories} />;
}
