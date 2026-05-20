import { isAuthenticated } from '@/lib/auth';
import { readJSON } from '@/lib/dataStore';
import { redirect, notFound } from 'next/navigation';
import { courses as defaultCourses } from '@/data/courses';
import CourseEditForm from '../CourseForm';

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const courses = readJSON('courses.json', defaultCourses) as typeof defaultCourses;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();
  return <CourseEditForm course={course} isNew={false} />;
}
