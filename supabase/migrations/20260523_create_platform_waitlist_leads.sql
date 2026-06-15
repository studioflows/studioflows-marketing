create extension if not exists pgcrypto;

create table if not exists public.platform_waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'waitlist' check (status in ('waitlist', 'invited', 'disqualified')),
  full_name text not null,
  work_email text not null check (position('@' in work_email) > 1),
  company_name text,
  vertical_mold text,
  source_page text not null default 'platform',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists platform_waitlist_leads_status_created_idx
  on public.platform_waitlist_leads (status, created_at desc);

create index if not exists platform_waitlist_leads_email_idx
  on public.platform_waitlist_leads (work_email);

alter table public.platform_waitlist_leads enable row level security;

drop policy if exists "Allow platform waitlist inserts" on public.platform_waitlist_leads;
create policy "Allow platform waitlist inserts"
on public.platform_waitlist_leads
for insert
to anon, authenticated
with check (true);
