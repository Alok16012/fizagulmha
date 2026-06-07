export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getCourses, getBatches } from '@/lib/getData';
import CourseEditForm from '../CourseForm';
import CourseBatchesPanel from './CourseBatchesPanel';

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const courses = await getCourses();
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();
  const allBatches = await getBatches();
  const courseBatches = allBatches.filter(b => b.courseSlug === slug);

  return (
    <div>
      <CourseEditForm course={course} isNew={false} />
      <CourseBatchesPanel courseSlug={slug} courseTitle={course.title} batches={courseBatches} />
    </div>
  );
}
