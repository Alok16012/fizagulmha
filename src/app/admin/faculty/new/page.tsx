import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FacultyForm from '../FacultyForm';
import type { FacultyMember } from '@/data/faculty';

const emptyMember: FacultyMember = {
  slug: '', name: '', designation: '', subject: '', specialization: '',
  rating: 4.5, students: '', experience: '', avatar: '', color: '#08BD80',
  bg: '#E6FAF4', tags: [''], bio: '', education: [''], achievements: [''],
  courses: [''], expertise: [{ area: '', level: 80 }],
};

export default async function NewFacultyPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <FacultyForm member={emptyMember} isNew={true} />;
}
