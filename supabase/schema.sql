-- ==============================================================================
-- FINCORE CONSULTANCY SERVICES - Supabase Database Schema
-- Table: consultation_enquiries
-- ==============================================================================

create table if not exists public.consultation_enquiries (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  client_type text not null check (client_type in ('individual', 'business')),
  full_name text not null,
  email text not null,
  phone text not null,
  business_name text,
  service_required text not null,
  description text not null,
  preferred_contact text not null check (preferred_contact in ('phone', 'whatsapp', 'email')),
  consent_given boolean not null default true,
  status text not null default 'new' check (status in ('new', 'in_review', 'contacted', 'closed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for speedy queries by status and creation date
create index if not exists idx_consultation_status on public.consultation_enquiries (status);
create index if not exists idx_consultation_created_at on public.consultation_enquiries (created_at desc);

-- Row Level Security (RLS) Policy
alter table public.consultation_enquiries enable row level security;

-- Only service role can read/insert/update by default
create policy "Allow service_role full access" on public.consultation_enquiries
  for all
  using (auth.role() = 'service_role');
