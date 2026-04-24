-- Adds service-selection fields to the leads table so the website intake form
-- can capture which creative package the lead picked, whether they also want
-- media buying, and (if yes) which monthly ad-spend band they sit in.
--
-- Run this in the Supabase SQL editor after 001_leads.sql.

alter table public.leads
  add column if not exists creative_package text,
  add column if not exists media_buying text,
  add column if not exists media_buying_tier text;

-- Helpful for segmenting inbound leads by intent
create index if not exists leads_creative_package_idx
  on public.leads (creative_package);

create index if not exists leads_media_buying_idx
  on public.leads (media_buying);
