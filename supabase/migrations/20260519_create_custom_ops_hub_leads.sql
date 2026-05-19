create extension if not exists pgcrypto;

create table if not exists public.custom_ops_hub_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'reviewing', 'qualified', 'disqualified')),
  full_name text not null,
  work_email text not null check (position('@' in work_email) > 1),
  company_name text not null,
  company_website text,
  business_model text not null,
  company_stage text not null,
  primary_pain_area text not null,
  highest_cost_bottleneck text not null,
  highest_cost_bottleneck_other text,
  workflow_management text[] not null default '{}'::text[],
  frequent_breakdown text not null,
  frequent_breakdown_detail text not null,
  urgency_window text not null,
  quarter_risk text not null,
  implementation_ownership text not null,
  budget_range text not null,
  approval_involvement text not null,
  source_page text not null default 'services/custom-ops-hub',
  raw_answers jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists custom_ops_hub_leads_status_created_idx
  on public.custom_ops_hub_leads (status, created_at desc);

create index if not exists custom_ops_hub_leads_urgency_idx
  on public.custom_ops_hub_leads (urgency_window);

create index if not exists custom_ops_hub_leads_budget_idx
  on public.custom_ops_hub_leads (budget_range);

create index if not exists custom_ops_hub_leads_stage_idx
  on public.custom_ops_hub_leads (company_stage);

create or replace function public.set_custom_ops_hub_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_custom_ops_hub_leads_updated_at on public.custom_ops_hub_leads;
create trigger trg_set_custom_ops_hub_leads_updated_at
before update on public.custom_ops_hub_leads
for each row
execute procedure public.set_custom_ops_hub_leads_updated_at();

alter table public.custom_ops_hub_leads enable row level security;

drop policy if exists "Allow custom ops hub lead inserts" on public.custom_ops_hub_leads;
create policy "Allow custom ops hub lead inserts"
on public.custom_ops_hub_leads
for insert
to anon, authenticated
with check (true);
