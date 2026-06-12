export const dynamic = "force-dynamic";
import { isAuthenticated } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getFaculty } from '@/lib/getData';
import FacultyForm from '../FacultyForm';

export default async function EditFacultyPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const faculty = await getFaculty();
  const member = faculty.find((f) => f.slug === slug);
  if (!member) notFound();
  return <FacultyForm member={member} isNew={false} />;
}
