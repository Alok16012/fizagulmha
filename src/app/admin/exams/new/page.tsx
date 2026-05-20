import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ExamForm from '../ExamForm';
import type { Exam } from '@/data/exams';

const emptyExam: Exam = {
  slug: '', code: '', name: '', fullName: '', tagline: '', icon: '🏛️',
  color: '#08BD80', bg: '#E6FAF4', seats: '', colleges: '', duration: '2 Hours',
  questions: 0, marks: 0, negativeMark: '0.25', conductedBy: '', mode: 'Computer Based Test (CBT)',
  overview: '', eligibility: [''], examPattern: [],
  syllabus: [], importantDates: [], preparationTips: [''], faqs: [],
};

export default async function NewExamPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <ExamForm exam={emptyExam} isNew={true} />;
}
