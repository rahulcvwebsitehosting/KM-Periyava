-- =========================================================================
-- KM Periyava Sannadhi - Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- =========================================================================

-- 1. EVENTS TABLE ---------------------------------------------------------
create table if not exists public.events (
  id          text primary key,
  title       text not null default 'ANUSHAM POOJA',
  date        text not null,
  description text not null default '',
  programs    text[] not null default '{}',
  donors      text[] not null default '{}',
  status      text,
  media_url   text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Helpful index for chronological sorting
create index if not exists events_date_idx on public.events (date);

-- Auto-update `updated_at` on every row change
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- 2. SEED INITIAL DATA (optional - remove if you want a clean sheet) -------
-- The frontend will use these as the live data once inserted.
insert into public.events (id, title, date, description, programs, donors, media_url) values
  ('anusham-jul-2026','ANUSHAM POOJA','July 24, 2026','Anusham pooja for Sri Mahaperiyava held on 24th July, 2026.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mr. Krishnan (Chennai)'],'https://photos.app.goo.gl/kVMPwZCuhwTvKcCS6'),
  ('anusham-mar-2026','ANUSHAM POOJA','March 10, 2026','Anusham pooja for Sri Mahaperiyava held on 10th March, 2026.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Ms. S. Subhashini Suresh (Chennai)','Mr. Anand (Chennai)'],'https://photos.app.goo.gl/AtSgJjYM7Bx9sS9A9'),
  ('anusham-feb-2026','ANUSHAM POOJA','February 11, 2026','Anusham pooja for Sri Mahaperiyava held on 11th February, 2026.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mr. K. Thiyagarajan (Chennai)'],'https://photos.app.goo.gl/12poBaHSArGLe9Bu9'),
  ('anusham-jan-2026','ANUSHAM POOJA','January 14, 2026','Anusham pooja for Sri Mahaperiyava held on 14th January, 2026.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mr. Shyam Sundar, West Mambalam (Chennai)','Mr. Mahalingam (Chennai)','Mr. Subash Chand (Chennai)','Mr. Suresh (Chennai)'],'https://photos.app.goo.gl/CeiJqFRaERLWLt1h6'),
  ('anusham-dec-2025','ANUSHAM POOJA','December 18, 2025','Anusham pooja for Sri Mahaperiyava held on 18th December, 2025.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mr. Uma maheswaran (Bangalore)','Mrs. Brindha (Chennai)'],'https://photos.app.goo.gl/dtHmpTDvb1fJVrRW7'),
  ('anusham-oct-2025','ANUSHAM POOJA','October 24, 2025','Anusham pooja for Sri Mahaperiyava held on 24th October, 2025. Due to rain, evening there was no Maha Periyava temple car purappadu, so vaidhighas recited vedha parayanam in Mahaperiyava sannadhi.',
    array['Avahanthi Homam','Uthagashanthi parayanam','Annadhanam'],
    array['Mr. T.S. Subramaniyan (Chennai)'],'https://photos.app.goo.gl/whDB6M7vxwYTgEKU9'),
  ('anusham-feb-2025','ANUSHAM POOJA','February 21, 2025','Anusham pooja for Sri Mahaperiyava celebrated on 21st February 2025.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mrs. Subashini Vijayaraghavan (Chennai)','Mr. Thyagarajan (Chennai)'],'https://photos.app.goo.gl/n1i8rNowxitoN3UW8'),
  ('bhairavar-feb-2025','ASHTAMI BHAIRAVAR POOJA','February 20, 2025','Theipirai Ashtami pooja for Bhairavar was done on 20th February, 2025 in Sri Soundaranayagi sametha Sri Kailasanathar temple, Kandhamangalam.',
    array[]::text[],
    array['Mr. Ramalingam (Chennai)','Mrs. Lakshmi Priya (Chennai)','Mrs. Poongodi Senthilkumar (Finland)'],'https://photos.app.goo.gl/h6CGfLYwP5fKHZSP9'),
  ('anusham-oct-2024','ANUSHAM POOJA','October 7, 2024','Anusham pooja for Sri Mahaperiyava held on 7th October, 2024.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mr. T.S. Subramaniyam (Chennai)'],'https://photos.app.goo.gl/cczwUqfUmxd4jKkQ7'),
  ('vinayagar-2024','VINAYAGAR CHATHURTHI','September 7, 2024','Vinayagar chathurthi was celebrated in Kandhamangalam Sri Prasanna Maha Ganapathi temple on 7th September, 2024 in a grand manner.',
    array[]::text[],array[]::text[],'https://photos.app.goo.gl/2dP1KdMKSyQxeNvK9'),
  ('shivaratri-2024','MAHA SIVARATHRI','March 8, 2024','Maha Shivaratri is a Hindu festival that honours God Shiva, also called ''The Night of Shiva''. In Sri Soundaranayagi samedha Sri Kailasanathar temple, Kandhamangalam, Maha Sivarathri was celebrated throughout the night.',
    array[]::text[],array[]::text[],'https://photos.app.goo.gl/w9bsKYktqJeRHZhTA'),
  ('anusham-mar-2024','ANUSHAM POOJA','March 3, 2024','Anusham pooja for Sri Mahaperiyava held on 3rd March, 2024.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mr. Suresh (Chennai)'],'https://photos.app.goo.gl/MuzUyzq3KfnkBBi77'),
  ('anusham-feb-2024','ANUSHAM POOJA','February 4, 2024','Anusham pooja for Sri Mahaperiyava held on 4th February, 2024.',
    array['Avahanthi Homam','Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam','Annadhanam'],
    array['Mr. Thyagarajan (Chennai)'],'https://photos.app.goo.gl/dPLXQy3nCkQ83RqcA')
on conflict (id) do nothing;

-- 3. ROW LEVEL SECURITY (RLS) --------------------------------------------
-- Public can read events. We gate writes via the admin password on the
-- frontend, which is sufficient for this small site. For production,
-- consider enabling Supabase Auth.

alter table public.events enable row level security;
drop policy if exists "events_public_read" on public.events;
create policy "events_public_read"
  on public.events for select
  to anon, authenticated
  using (true);

drop policy if exists "events_anon_write" on public.events;
create policy "events_anon_write"
  on public.events for all
  to anon, authenticated
  using (true) with check (true);

-- =========================================================================
-- For existing tables: add status column if missing
-- =========================================================================
alter table public.events add column if not exists status text;

-- =========================================================================
-- DONE. After running this, your Supabase project is ready.
-- Set the following env vars on Vercel (or in your local .env):
--   VITE_SUPABASE_URL=https://pavycvvocbmmybmkkhub.supabase.co
--   VITE_SUPABASE_ANON_KEY=<your anon key>
-- =========================================================================