export const dynamic = "force-dynamic";
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { readJSON } from '@/lib/dataStore';
import { blogs as defaultBlogs } from '@/data/blogs';

export default async function AdminBlogs() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const blogs = readJSON('blogs.json', defaultBlogs) as typeof defaultBlogs;

  const categoryColors: Record<string, string> = {
    'CLAT Prep': '#08BD80',
    'Study Tips': '#6366f1',
    'Legal GK': '#f59e0b',
    'NLU Guide': '#ec4899',
    'Exam Strategy': '#14b8a6',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blogs</h1>
          <p className="text-gray-500 text-sm mt-0.5">{blogs.length} articles</p>
        </div>
        <Link href="/admin/blogs/new"
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
          style={{ background: '#08BD80' }}>
          + New Blog
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {blogs.map((blog) => (
            <div key={blog.slug} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${categoryColors[blog.category] || '#08BD80'}20`, color: categoryColors[blog.category] || '#08BD80' }}>
                    {blog.category}
                  </span>
                  <span className="text-xs text-gray-400">{blog.readTime}</span>
                </div>
                <div className="font-semibold text-gray-900 truncate">{blog.title}</div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">{blog.excerpt}</div>
                <div className="text-xs text-gray-400 mt-1">By {blog.author} · {blog.date}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/blogs/${blog.slug}`} target="_blank"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
                  View
                </Link>
                <Link href={`/admin/blogs/${blog.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: '#E6FAF4', color: '#08BD80' }}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
