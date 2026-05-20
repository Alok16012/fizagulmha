import { isAuthenticated } from '@/lib/auth';
import { readJSON } from '@/lib/dataStore';
import { redirect, notFound } from 'next/navigation';
import { facultyMembers as defaultFaculty } from '@/data/faculty';
import FacultyForm from '../FacultyForm';

export default async function EditFacultyPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');
  const { slug } = await params;
  const faculty = readJSON('faculty.json', defaultFaculty) as typeof defaultFaculty;
  const member = faculty.find((f) => f.slug === slug);
  if (!member) notFound();
  return <FacultyForm member={member} isNew={false} />;
}
