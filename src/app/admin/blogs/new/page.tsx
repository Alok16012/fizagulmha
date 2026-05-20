import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BlogForm from '../BlogForm';
import type { Blog } from '@/data/blogs';

const emptyBlog: Blog = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: 'CLAT Prep',
  categoryColor: '#08BD80',
  author: 'A.K. Singh',
  authorAvatar: 'AK',
  date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  readTime: '5 min read',
  tags: [''],
};

export default async function NewBlogPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <BlogForm blog={emptyBlog} isNew={true} />;
}
