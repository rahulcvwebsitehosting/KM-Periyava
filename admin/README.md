# Admin Panel — Supabase Setup

The admin panel uses **Supabase** (free Postgres + Storage) so admin edits, new events, and image uploads are instantly visible to every visitor. No servers to run.

## One-time setup (about 5 minutes)

### 1. Run the SQL schema

1. Open your Supabase dashboard → **SQL Editor** → **New query**.
2. Open the file `admin/schema.sql` from this repo, copy its entire contents, paste into the editor.
3. Click **Run**. This creates:
   - `public.events` table (with all your existing anusham events pre-seeded)
   - `event-images` storage bucket (public, for image uploads)
   - Row-Level Security policies allowing public read + write

> If you'd rather start with an empty events table, delete the `INSERT INTO ... VALUES (...)` block before running.

### 2. Set the env vars

In your Vercel project (or local `.env`):

```
VITE_SUPABASE_URL=https://pavycvvocbmmybmkkhub.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...   # your anon key
```

> The URL is already in `.env.example`. Just paste your anon key (the one starting with `eyJ...`).

### 3. Redeploy the site

Vercel will pick up the new env vars and the build will bundle the Supabase URL.

## Daily usage

1. Open the site → scroll to footer → click **Admin**.
2. Enter the password: `JayaJayaSankara123` (change in `admin/auth.ts` to customize).
3. Click an existing event to edit, or **+ New Anusham Event** to create one.
4. Fill the form:
   - **Date** (date picker)
   - **Description** (defaults to "Anusham pooja for Sri Mahaperiyava held on [date].")
   - **Media URL** (your existing Google Photos album link)
   - **Cover Image** (upload from your computer — stored in Supabase Storage)
   - **Programs Scheduled** (add / edit / remove the 3 default programs)
   - **Donor Names** (add / edit / remove donors)
   - **Gallery Images** (upload multiple — appears on the event detail page)
5. Click **Save Changes** (or **Create Event** for new ones). **Delete** removes an event.

All visitors see your changes on their next page load (cached for 60s max).

## Image uploads

- Images are uploaded to the `event-images` bucket in your Supabase Storage.
- Public URLs are stored on the event row (`cover_image`, `gallery[]`).
- Deleting an event also deletes its images from storage.
- Supported types: any image format (`image/*`). Max ~50 MB per file.

## Changing the admin password

Edit `admin/auth.ts` → `ADMIN_PASSWORD` (line 9). Rebuild and redeploy.

> For stronger security, switch from a hardcoded password to **Supabase Auth**
> (email + password login handled by Supabase) — see the Supabase docs. The
> current setup is fine for a small site where only a few trusted people know
> the password.

## Troubleshooting

- **"Setup Required" message on admin page** → `VITE_SUPABASE_URL` or
  `VITE_SUPABASE_ANON_KEY` is missing. Set them on Vercel and redeploy.
- **"permission denied" / RLS error on save** → re-run the SQL schema; the RLS
  policies might have been reset.
- **Image upload fails with 403** → make sure the `event-images` bucket is set
  to **public** (the SQL schema does this; if you skipped it, toggle it in
  Storage → Buckets → `event-images` → **Public**).
- **Changes don't appear on the public site** → hard refresh (Ctrl+Shift+R);
  in-memory cache expires after 60 seconds.

## Files

- `admin/schema.sql` — run this in the Supabase SQL editor (one time)
- `admin/auth.ts` — Supabase client + admin password + CRUD functions
- `pages/AdminPage.tsx` — admin dashboard UI
- `pages/AdminLoginPage.tsx` — password gate
- `data/events.ts` — fetches live data from Supabase, falls back to hardcoded
