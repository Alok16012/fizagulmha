export interface CourseCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
  accent: string;
  bg: string;
}

export const defaultCourseCategories: CourseCategory[] = [
  { key: 'offline', label: 'Offline Course', icon: '🏫', color: '#0f3460', accent: '#f77420', bg: '#fff1e8' },
  { key: 'online', label: 'Online Course', icon: '💻', color: '#6d28d9', accent: '#8b5cf6', bg: '#ede9fe' },
  { key: 'mentorship', label: 'Mentorship', icon: '🎯', color: '#7a3412', accent: '#ffad75', bg: '#ffd4ba' },
  { key: 'mock', label: 'Mock Tests', icon: '📝', color: '#92400e', accent: '#f59e0b', bg: '#fef3c7' },
];
