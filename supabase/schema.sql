-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Creates the tables used by the site. Safe to re-run (IF NOT EXISTS).

-- Lead captures (contact form + admission form) → admin Leads page.
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null default '',
  program text not null default '',
  exam text not null default '',
  message text not null default '',
  source text not null default 'contact'
);

-- Blog posts (managed from admin → /blogs and home).
create table if not exists public.blogs (
  slug text primary key,
  created_at timestamptz not null default now(),
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default '',
  category_color text not null default '#08BD80',
  author text not null default '',
  author_avatar text not null default '',
  date text not null default '',
  read_time text not null default '',
  tags text[] not null default '{}'
);

-- Blog categories (manageable from admin → Blogs page).
create table if not exists public.blog_categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  color text not null default '#08BD80',
  created_at timestamptz not null default now()
);

-- The server talks to these tables with the service-role key, which bypasses
-- RLS. Enabling RLS with no public policies keeps the anon key locked out.
alter table public.leads enable row level security;
alter table public.blogs enable row level security;
alter table public.blog_categories enable row level security;

-- ── Migrations (safe to re-run) ──────────────────────────────────────────────
-- Track which form submitted the lead (contact / admission).
alter table public.leads add column if not exists source text not null default 'contact';

-- Seed default blog categories (skip if already exist).
insert into public.blog_categories (name, color) values
  ('Legal',           '#6366f1'),
  ('Current Affairs', '#f97316'),
  ('Law Preparation', '#08BD80')
on conflict (name) do nothing;
