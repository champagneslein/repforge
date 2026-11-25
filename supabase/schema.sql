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

-- Daily usage counters, so AI and voice costs can never run away.
create table if not exists public.api_usage (
  key text not null,
  day date not null default current_date,
  count integer not null default 0,
  primary key (key, day)
);
alter table public.api_usage enable row level security;

-- Counts one use for this user and for everyone; returns true if both are
-- still within today's limits. Only the server (service role) may call it.
create or replace function public.use_quota(p_user uuid, p_bucket text, p_user_limit int, p_total_limit int)
returns boolean language plpgsql security definer set search_path = public as $$
declare u int; t int;
begin
  insert into api_usage (key, day, count) values (p_bucket || ':' || p_user, current_date, 1)
    on conflict (key, day) do update set count = api_usage.count + 1 returning count into u;
  insert into api_usage (key, day, count) values (p_bucket || ':total', current_date, 1)
    on conflict (key, day) do update set count = api_usage.count + 1 returning count into t;
  return u <= p_user_limit and t <= p_total_limit;
end $$;
revoke execute on function public.use_quota(uuid, text, int, int) from public, anon, authenticated;
grant execute on function public.use_quota(uuid, text, int, int) to service_role;
