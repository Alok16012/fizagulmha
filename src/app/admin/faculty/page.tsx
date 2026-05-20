export const dynamic = "force-dynamic";
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { readJSON } from '@/lib/dataStore';
import { facultyMembers as defaultFaculty } from '@/data/faculty';

export default async function AdminFaculty() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const faculty = readJSON('faculty.json', defaultFaculty) as typeof defaultFaculty;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Faculty</h1>
          <p className="text-gray-500 text-sm mt-0.5">{faculty.length} faculty members</p>
        </div>
        <Link href="/admin/faculty/new"
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
          style={{ background: '#08BD80' }}>
          + New Faculty
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {faculty.map((f) => (
          <div key={f.slug} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                style={{ background: '#08BD80' }}>
                {f.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-gray-900">{f.name}</div>
                <div className="text-sm text-gray-500">{f.designation}</div>
                <div className="text-xs text-gray-400 mt-0.5">{f.subject}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href={`/faculty/${f.slug}`} target="_blank"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
                  View
                </Link>
                <Link href={`/admin/faculty/${f.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: '#E6FAF4', color: '#08BD80' }}>
                  Edit
                </Link>
              </div>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">⭐ {f.rating}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">👥 {f.students}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">📅 {f.experience}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
