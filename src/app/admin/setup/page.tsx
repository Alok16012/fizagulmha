import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SetupClient from './SetupClient';

export const dynamic = 'force-dynamic';

export default async function SetupPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <SetupClient />;
}
