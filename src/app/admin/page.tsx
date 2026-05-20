export const dynamic = "force-dynamic";
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { readJSON } from '@/lib/dataStore';
import { courses as defaultCourses } from '@/data/courses';
import { batches as defaultBatches } from '@/data/batches';
import { exams as defaultExams } from '@/data/exams';
import { facultyMembers as defaultFaculty } from '@/data/faculty';
import { blogs as defaultBlogs } from '@/data/blogs';

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const courses = readJSON('courses.json', defaultCourses);
  const batches = readJSON('batches.json', defaultBatches);
  const exams = readJSON('exams.json', defaultExams);
  const faculty = readJSON('faculty.json', defaultFaculty);
  const blogs = readJSON('blogs.json', defaultBlogs);

  const stats = [
    { label: 'Courses', value: (courses as typeof defaultCourses).length, icon: '📚', href: '/admin/courses', color: '#08BD80' },
    { label: 'Batches', value: (batches as typeof defaultBatches).length, icon: '📅', href: '/admin/batches', color: '#6366f1' },
    { label: 'Exams', value: (exams as typeof defaultExams).length, icon: '🏛️', href: '/admin/exams', color: '#f59e0b' },
    { label: 'Faculty', value: (faculty as typeof defaultFaculty).length, icon: '👨‍🏫', href: '/admin/faculty', color: '#ec4899' },
    { label: 'Blogs', value: (blogs as typeof defaultBlogs).length, icon: '✍️', href: '/admin/blogs', color: '#14b8a6' },
  ];

  const quickLinks = [
    { label: 'New Course', href: '/admin/courses/new', icon: '📚', desc: 'Add a new course program' },
    { label: 'New Batch', href: '/admin/batches/new', icon: '📅', desc: 'Create a new batch' },
    { label: 'New Exam', href: '/admin/exams/new', icon: '🏛️', desc: 'Add exam information' },
    { label: 'New Faculty', href: '/admin/faculty/new', icon: '👨‍🏫', desc: 'Add faculty member' },
    { label: 'New Blog', href: '/admin/blogs/new', icon: '✍️', desc: 'Write a blog post' },
    { label: 'Upload Media', href: '/admin/media', icon: '🖼️', desc: 'Upload images & files' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Welcome back 👋</h1>
        <p className="text-gray-500 mt-1">Manage all CLATians website content from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="text-3xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-black text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group"
            >
              <span className="text-3xl mb-3 block">{q.icon}</span>
              <div className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors">{q.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{q.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Batches */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-black text-gray-900">Recent Batches</h2>
          <Link href="/admin/batches" className="text-sm font-semibold" style={{ color: '#08BD80' }}>View all →</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {(batches as typeof defaultBatches).slice(0, 5).map((b) => {
            const pct = Math.round((b.filled / b.seats) * 100);
            return (
              <div key={b.slug} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate">{b.name}</div>
                  <div className="text-xs text-gray-400">{b.startDate} · {b.mode}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold" style={{ color: '#08BD80' }}>{b.fee}</div>
                  <div className="text-xs text-gray-400">{b.filled}/{b.seats} seats</div>
                </div>
                <div className="w-16 hidden md:block">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 80 ? '#ef4444' : '#08BD80' }} />
                  </div>
                </div>
                <Link href={`/admin/batches/${b.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: '#E6FAF4', color: '#08BD80' }}>
                  Edit
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
