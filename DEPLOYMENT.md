# AnimKart Deployment

## Current status

The app builds successfully and is ready to deploy, but deployment requires account credentials for each hosted service.

## Vercel

1. Create or open a Vercel account.
2. Generate a token from Vercel account settings.
3. Run:

```bash
npx vercel@latest --prod --yes --token YOUR_VERCEL_TOKEN
```

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Render

This repo includes `render.yaml`. Connect the repo in Render as a Blueprint or create a Web Service manually:

```bash
npm install && npm run build
npm run start
```

## Supabase

This repo includes the initial database migration in:

```text
supabase/migrations/202606100001_initial_marketplace_schema.sql
```

Apply it from the Supabase SQL editor or with the Supabase CLI after login:

```bash
supabase db push
```
