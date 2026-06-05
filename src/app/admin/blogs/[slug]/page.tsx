export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { getBlogBySlug } from '@/lib/getData';
import { redirect, notFound } from 'next/navigation';
import BlogForm from '../BlogForm';

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const blog = await getBlogBySlug(decodeURIComponent(slug));
  if (!blog) notFound();
  return <BlogForm blog={blog} isNew={false} />;
}
