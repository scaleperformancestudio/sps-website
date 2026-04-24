-- Leads table for the SPS website intake form.
-- Run this in the Supabase SQL editor once.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Basics
  company text not null,
  name text not null,
  email text not null,
  website text not null,
  business_type text not null,
  product_description text not null,
  target_audience text,
  monthly_budget text,
  platforms text[] not null default '{}',

  -- Brand / niche
  sub_niche text,
  usp text,
  brand_voice text,
  brand_colors text,
  brand_fonts text,

  -- Product feed
  productfeed_url text,
  productfeed_type text,

  -- Competitors
  competitors text,

  -- Performance baseline
  baseline_roas text,
  baseline_cpa text,
  baseline_notes text,

  -- Constraints
  restrictions text,

  -- Client hypotheses
  client_hypotheses text,

  -- Free text
  notes text,

  -- Lifecycle
  status text not null default 'new', -- new | contacted | qualified | converted | rejected
  source text not null default 'website'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- RLS: only service role (API route) can read/write. No anon access.
alter table public.leads enable row level security;
