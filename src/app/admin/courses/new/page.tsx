export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CourseEditForm from '../CourseForm';
import type { Course } from '@/data/courses';
import { getCourseCategories } from '@/lib/getData';

const emptyCourse: Course = {
  slug: '',
  title: '',
  category: 'offline',
  icon: '📚',
  color: '#08BD80',
  bg: '#E6FAF4',
  tagline: '',
  overview: '',
  duration: '',
  batchSize: '',
  mode: '',
  fee: '',
  emi: '',
  features: [''],
  includes: [{ label: '', value: '', icon: '' }],
  curriculum: [{ module: '', topics: [''] }],
  whoFor: [''],
  testimonial: { name: '', rank: '', college: '', quote: '', avatar: '' },
};

export default async function NewCoursePage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const [categories, params] = await Promise.all([getCourseCategories(), searchParams]);
  const category = categories.some((item) => item.key === params.category) ? params.category! : categories[0]?.key || 'offline';
  return <CourseEditForm course={{ ...emptyCourse, category }} isNew={true} categories={categories} />;
}
