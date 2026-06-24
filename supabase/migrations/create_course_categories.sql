create table if not exists public.course_categories (
  key text primary key,
  label text not null,
  icon text not null default '📚',
  color text not null default '#0D1837',
  accent text not null default '#f77420',
  bg text not null default '#fff1e8',
  created_at timestamptz not null default now()
);

insert into public.course_categories (key, label, icon, color, accent, bg) values
  ('offline', 'Offline Course', '🏫', '#0f3460', '#f77420', '#fff1e8'),
  ('online', 'Online Course', '💻', '#6d28d9', '#8b5cf6', '#ede9fe'),
  ('mentorship', 'Mentorship', '🎯', '#7a3412', '#ffad75', '#ffd4ba'),
  ('mock', 'Mock Tests', '📝', '#92400e', '#f59e0b', '#fef3c7')
on conflict (key) do nothing;

alter table public.course_categories enable row level security;
