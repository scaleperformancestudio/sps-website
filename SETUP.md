# SPS Website — setup

## Local run

```bash
cd sps-website
npm install
cp .env.example .env.local
# Fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from your Supabase project
npm run dev
```

Visit http://localhost:3000

## Supabase

1. In your existing SPS Supabase project, open the SQL editor.
2. Run `supabase/migrations/001_leads.sql` once. This creates the `leads` table.
3. In Project Settings → API, copy the **service_role** key (NOT the anon key) into `.env.local`.
   The service role key is only used server-side by `/api/leads` and must never be exposed to the client.

## Deploy (Vercel)

1. Create a new repo on GitHub, push this folder.
2. In Vercel → New Project → Import the repo.
3. Add the environment variables from `.env.example` in Vercel project settings.
4. Point your domain (`scaleperformancestudio.com`) at the Vercel project once you get it transferred.

## What's here

- `/` — Home
- `/work` — Case studies (placeholder — fill with real brands)
- `/process` — How we work
- `/about` — About
- `/start` — Intake form (mirrors the dashboard client intake)
- `/api/leads` — POST endpoint that validates and writes to Supabase

## What's NOT here yet

- Visual polish / brand direction — waiting on agency inspiration from Vito
- Case study content — fill with VYTA / Blackforge numbers
- SEO / analytics — add once deployed
- Contact form alternative to full intake (optional shorter form)
