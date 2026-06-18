export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getCourses, getBatches, getCourseCategories } from '@/lib/getData';
import CourseEditForm from '../CourseForm';
import CourseBatchesPanel from './CourseBatchesPanel';

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const [courses, allBatches, categories] = await Promise.all([getCourses(), getBatches(), getCourseCategories()]);
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();
  const courseBatches = allBatches.filter(b => b.courseSlug === slug);

  return (
    <div>
      <CourseEditForm course={course} isNew={false} categories={categories} />
      <CourseBatchesPanel courseSlug={slug} courseTitle={course.title} batches={courseBatches} />
    </div>
  );
}
