export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CourseEditForm from '../CourseForm';
import type { Course } from '@/data/courses';

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

export default async function NewCoursePage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <CourseEditForm course={emptyCourse} isNew={true} />;
}
