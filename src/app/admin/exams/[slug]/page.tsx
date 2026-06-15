export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getExamBySlug } from '@/lib/getData';
import ExamForm from '../ExamForm';

export default async function EditExamPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const exam = await getExamBySlug(slug);
  if (!exam) notFound();
  return <ExamForm exam={exam} isNew={false} />;
}
