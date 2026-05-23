export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { readJSON } from '@/lib/dataStore';
import { redirect, notFound } from 'next/navigation';
import { exams as defaultExams } from '@/data/exams';
import ExamForm from '../ExamForm';

export default async function EditExamPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const exams = readJSON('exams.json', defaultExams) as typeof defaultExams;
  const exam = exams.find((e) => e.slug === slug);
  if (!exam) notFound();
  return <ExamForm exam={exam} isNew={false} />;
}
