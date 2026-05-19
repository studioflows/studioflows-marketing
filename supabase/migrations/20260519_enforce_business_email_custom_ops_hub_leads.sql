alter table public.custom_ops_hub_leads
drop constraint if exists custom_ops_hub_leads_work_email_business_domain_check;

alter table public.custom_ops_hub_leads
add constraint custom_ops_hub_leads_work_email_business_domain_check
check (
  split_part(lower(work_email), '@', 2) not in (
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'me.com',
    'mac.com',
    'proton.me',
    'protonmail.com',
    'pm.me',
    'gmx.com',
    'yandex.com',
    'zoho.com'
  )
);
