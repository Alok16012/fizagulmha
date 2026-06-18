export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getCourses, getBatches, getCourseCategories } from '@/lib/getData';
import CourseTabsAdmin from './CourseTabsAdmin';

export default async function AdminCourses() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const [courses, batches, categories] = await Promise.all([getCourses(), getBatches(), getCourseCategories()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-0.5">{courses.length} courses across {categories.length} categories</p>
      </div>
      <CourseTabsAdmin courses={courses} batches={batches} initialCategories={categories} />
    </div>
  );
}
