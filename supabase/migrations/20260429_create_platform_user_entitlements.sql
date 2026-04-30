create schema if not exists platform;

create table if not exists platform.user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  product_key text not null,
  tenant_id uuid null,
  role text not null default 'member',
  status text not null default 'active' check (status in ('active', 'trialing', 'inactive')),
  priority int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_entitlements_user_status_idx
  on platform.user_entitlements (user_id, status, priority, created_at);

create unique index if not exists user_entitlements_unique_active_product
  on platform.user_entitlements (user_id, product_key, coalesce(tenant_id, '00000000-0000-0000-0000-000000000000'::uuid));

create or replace function platform.set_user_entitlements_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_platform_user_entitlements_updated_at on platform.user_entitlements;
create trigger trg_platform_user_entitlements_updated_at
before update on platform.user_entitlements
for each row
execute procedure platform.set_user_entitlements_updated_at();

alter table platform.user_entitlements enable row level security;

drop policy if exists "Users can read own entitlements" on platform.user_entitlements;
create policy "Users can read own entitlements"
on platform.user_entitlements
for select
to authenticated
using (auth.uid() = user_id);
