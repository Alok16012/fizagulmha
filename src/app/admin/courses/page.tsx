export const dynamic = "force-dynamic";
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { readJSON } from '@/lib/dataStore';
import { courses as defaultCourses } from '@/data/courses';

export default async function AdminCourses() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const courses = readJSON('courses.json', defaultCourses) as typeof defaultCourses;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-0.5">{courses.length} courses total</p>
        </div>
        <Link href="/admin/courses/new"
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
          style={{ background: '#08BD80' }}>
          + New Course
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {courses.map((c) => (
            <div key={c.slug} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <span className="text-3xl">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900">{c.title}</div>
                <div className="text-sm text-gray-400 mt-0.5">{c.tagline}</div>
                <div className="flex gap-3 mt-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.duration}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.mode}</span>
                  <span className="text-xs font-bold" style={{ color: '#08BD80' }}>{c.fee}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/courses/${c.slug}`} target="_blank"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
                  View
                </Link>
                <Link href={`/admin/courses/${c.slug}`}
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
