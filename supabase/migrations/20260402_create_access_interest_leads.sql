create extension if not exists pgcrypto;

create table if not exists public.access_interest_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'reviewing', 'qualified', 'disqualified', 'waitlist')),
  full_name text not null,
  work_email text not null check (position('@' in work_email) > 1),
  role_title text not null,
  company_name text not null,
  company_website text,
  industry text not null,
  company_size_band text not null,
  annual_revenue_band text,
  implementation_budget_band text not null,
  urgency_window text not null,
  decision_authority text not null,
  primary_use_case text not null,
  current_systems text,
  critical_breakdown text not null,
  compliance_scope text[] not null default '{}'::text[],
  notes text,
  source_page text not null default 'home',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists access_interest_leads_status_created_idx
  on public.access_interest_leads (status, created_at desc);

create index if not exists access_interest_leads_industry_idx
  on public.access_interest_leads (industry);

create index if not exists access_interest_leads_urgency_idx
  on public.access_interest_leads (urgency_window);

create or replace function public.set_access_interest_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_access_interest_updated_at on public.access_interest_leads;
create trigger trg_set_access_interest_updated_at
before update on public.access_interest_leads
for each row
execute procedure public.set_access_interest_updated_at();

alter table public.access_interest_leads enable row level security;

drop policy if exists "Allow access interest inserts" on public.access_interest_leads;
create policy "Allow access interest inserts"
on public.access_interest_leads
for insert
to anon, authenticated
with check (true);
