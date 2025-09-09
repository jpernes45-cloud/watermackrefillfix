# WaterMack — 1‑Click Refill (FormSubmit Email Version)

## What this does
- First scan: customer fills **Name / Phone / Blk / House** → **Save Details** (localStorage)
- Next scans: **auto‑login** (no more typing)
- Customer sets gallons (±) then presses **REFILL NA**
- You receive an **email instantly** via FormSubmit (verify once on first submission)
- Stylized with **Framer Motion** animations + Tailwind CDN

## Deploy using GitHub → Netlify (no VS Code)

### A. Upload to GitHub (web UI)
1. Unzip this folder locally.
2. Go to GitHub → **New repository** → name it `watermack-formsubmit` → Create.
3. Click **Upload files** → drag all files (not the zip, the contents).
4. **Commit changes**.

### B. Connect Netlify to GitHub
1. Netlify → **Add new site** → **Import an existing project** → choose **GitHub**, pick your repo.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy site.

### C. Test live
1. Open your Netlify URL.
2. First time, fill profile → Save Details.
3. Set gallons and click **REFILL NA**.
4. On first submission only, **FormSubmit** emails you a verification link — click it once to activate.
5. Next requests will email you immediately.

## Change brand colors / texts
- Tailwind classes in `src/App.jsx`.
- Emoji 💧 and labels can be edited there too.

## Optional redirect after submit
- In `src/App.jsx`, search for `_next` (commented). Set it to a full URL on your site, e.g. `https://YOUR-SITE.netlify.app/?ok=1`, then uncomment the line.

Enjoy! 💧
