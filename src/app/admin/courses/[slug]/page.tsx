export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { readJSON } from '@/lib/dataStore';
import { redirect, notFound } from 'next/navigation';
import { courses as defaultCourses } from '@/data/courses';
import { batches as defaultBatches } from '@/data/batches';
import CourseEditForm from '../CourseForm';
import CourseBatchesPanel from './CourseBatchesPanel';

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const courses = readJSON('courses.json', defaultCourses) as typeof defaultCourses;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();
  const allBatches = readJSON('batches.json', defaultBatches) as typeof defaultBatches;
  const courseBatches = allBatches.filter(b => b.courseSlug === slug);

  return (
    <div>
      <CourseEditForm course={course} isNew={false} />
      <CourseBatchesPanel courseSlug={slug} courseTitle={course.title} batches={courseBatches} />
    </div>
  );
}
