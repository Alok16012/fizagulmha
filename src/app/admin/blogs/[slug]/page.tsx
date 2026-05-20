import { isAuthenticated } from '@/lib/auth';
import { readJSON } from '@/lib/dataStore';
import { redirect, notFound } from 'next/navigation';
import { blogs as defaultBlogs } from '@/data/blogs';
import BlogForm from '../BlogForm';

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const blogs = readJSON('blogs.json', defaultBlogs) as typeof defaultBlogs;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();
  return <BlogForm blog={blog} isNew={false} />;
}
