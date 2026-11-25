-- RepForge database. Paste into Supabase: SQL Editor > New query > Run.
-- Only the server (/api functions, using the service role key) reads and
-- writes these tables. Row level security is on with no policies, so the
-- public anon key cannot touch them from the browser.

create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.gold_standard (
  tenant_id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.persona_memory (
  user_id uuid not null references auth.users (id) on delete cascade,
  persona_id integer not null,
  events jsonb not null default '[]'::jsonb,
  summary text,
  updated_at timestamptz not null default now(),
  primary key (user_id, persona_id)
);

alter table public.progress enable row level security;
alter table public.gold_standard enable row level security;
alter table public.persona_memory enable row level security;
