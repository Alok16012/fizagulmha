import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MediaManager from './MediaManager';

export default async function AdminMedia() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <MediaManager />;
}
