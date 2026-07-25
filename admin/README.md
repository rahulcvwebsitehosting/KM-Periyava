# KM Periyava Sannadhi — Admin Panel & Google Sheets Backend

The admin panel lets you **add, edit, and delete Anusham Pooja events** and have those changes
visible to every visitor of the site. Behind the scenes it uses a **Google Sheet** as a tiny
database, exposed through a **Google Apps Script web app** — no servers, no accounts to create
beyond Google.

## How it works

```
[admin browser] --HTTP--> [Google Apps Script web app] <--> [Google Sheet]
                              |
                              v
                      public site readers
                      (read same data on next page load)
```

- Public visitors see the **hardcoded fallback data** in `data/events.ts` *plus* whatever the
  sheet returns (sheet entries win on id collision; new sheet-only events are also shown).
- When the admin logs in and creates/edits/deletes an event, it is written to the Google Sheet
  through the Apps Script web app.
- The cache on the public site refreshes every 60 seconds (or on hard reload).

## One-time setup (you only do this once)

### 1. Create a Google Sheet

1. Go to <https://sheets.new> to create a new blank Google Sheet.
2. Rename it to something like `KM Periyava Events`.
3. The first tab is fine — name it `Anusham` (or change `SHEET_NAME` in `admin/apps-script.gs`).
4. In row 1, add these exact column headers:
   ```
   id | title | date | description | programs | donors | mediaUrl
   ```
5. (Optional) Pre-fill the existing events as rows. `programs` and `donors` are pipe-separated,
   e.g. `Avahanthi Homam|Annadhanam`.

### 2. Deploy the Apps Script web app

1. Open <https://script.google.com/home> and click **New Project**.
2. Delete the placeholder `Code.gs` content and paste the entire contents of
   `admin/apps-script.gs` from this repo.
3. (Optional) Change `ADMIN_TOKEN` in that file to match the password you want for the admin
   panel (the frontend default is `JayaJayaSankara123` — change both sides if you change it).
4. Click **Deploy** → **New deployment**.
   - Click the gear icon → **Web app**.
   - **Execute as:** Me (your Google account).
   - **Who has access:** Anyone.
5. Click **Deploy** and copy the **Web app URL** (it looks like
   `https://script.google.com/macros/s/AKfycb.../exec`).
6. If asked, authorize the script to access the sheet.

### 3. Wire the URL into the frontend

1. Copy `.env.example` to `.env` in the project root.
2. Set `VITE_APPS_SCRIPT_URL` to the Web app URL from step 2:
   ```
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Run `npm run build` (or redeploy) so the URL gets baked into the production bundle.
4. Commit `.env` privately — for Vercel, add it as a project environment variable instead
   (do **not** commit `.env`).

## Daily use

1. Open the deployed site.
2. Scroll to the footer → click the small **Admin** link.
3. Enter the password (`JayaJayaSankara123` by default — change in `admin/auth.ts` and
   `admin/apps-script.gs`).
4. Either click an existing event to edit, or click **+ New Anusham Event**.
5. Fill the form (date picker, description, programs, donors, media URL) and click
   **Create Event** or **Save Changes**.
6. All public visitors will see the new/updated event on their next page load (cache
   expires after 60s, or sooner on hard reload).

## Changing the admin password

The password is set in **two** places — they must match:

- `admin/auth.ts` → `ADMIN_PASSWORD`
- `admin/apps-script.gs` → `ADMIN_TOKEN`

After changing, redeploy the Apps Script (`Deploy` → **Manage deployments** → pencil icon →
**New version**) and rebuild the frontend.

## Troubleshooting

- **"VITE_APPS_SCRIPT_URL is not set"** in the admin panel → set the env var and rebuild.
- **"Unauthorized"** in the admin panel → password mismatch between the frontend and the
  Apps Script.
- **"Event not found"** when editing → the sheet was edited manually and the id is wrong.
  Stick to editing through the admin panel.
- **CORS errors** → Apps Script redirects through Google's CORS endpoint. Make sure
  "Who has access" is set to **Anyone** in the deployment, and re-deploy if you change it.
- **Changes don't appear for visitors** → hard-refresh (Ctrl+Shift+R); the in-memory cache
  expires every 60 seconds.
