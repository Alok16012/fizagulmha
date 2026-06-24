export const dynamic = "force-dynamic";
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getExams } from '@/lib/getData';

export default async function AdminExams() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const exams = await getExams();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Exams</h1>
          <p className="text-gray-500 text-sm mt-0.5">{exams.length} exams</p>
        </div>
        <Link href="/admin/exams/new"
          className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
          style={{ background: '#f77420' }}>
          + New Exam
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <div key={exam.slug} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-3xl">{exam.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-gray-900">{exam.code}</div>
                  <div className="text-xs text-gray-400 truncate">{exam.fullName}</div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href={`/exams/${exam.slug}`} target="_blank"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
                  View
                </Link>
                <Link href={`/admin/exams/${exam.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: '#fff1e8', color: '#f77420' }}>
                  Edit
                </Link>
              </div>
            </div>
            <div className="flex gap-3 mt-4 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{exam.seats} seats</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{exam.colleges}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{exam.duration}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{exam.questions} Qs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
