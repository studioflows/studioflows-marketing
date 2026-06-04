# StudioFlows ingest environment (marketing site)

Server-only variables for `/api/studioflows/ingest-lead`. Do not commit secrets. Set these in Vercel for `studioflows-marketing` (Production and Preview as needed).

## Required for qualified redirect

| Variable | Example / notes |
|----------|-----------------|
| `STUDIOFLOWS_INGEST_URL` | `https://<project-ref>.supabase.co/functions/v1` (no trailing slash required) |
| `STUDIOFLOWS_TENANT_SLUG` | `app` |
| `STUDIOFLOWS_INGEST_TOKEN` | From payments-service seed / tenant provision |
| `SUPABASE_ANON_KEY` | Supabase anon key sent as `apikey` header to Edge Functions |

## Optional

| Variable | Default |
|----------|---------|
| `STUDIOFLOWS_CONSULTING_SELL_URL` | `https://consulting.studioflows.co/s/app` |

## Disqualified lead storage (marketing Supabase)

Used when score &lt; 8. Server client resolves URL/key in this order:

1. `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`
2. `SUPABASE_SERVICE_ROLE_KEY` (preferred — bypasses RLS for server inserts)
3. `SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` (fallback only)

Qualified inserts must **not** use `.select()` with the anon key: Axiom RLS allows INSERT but has no SELECT policy, so `insert().select('id')` fails with a row-level security error even when all field values are valid.

## Axiom Supabase (prod)

Production Axiom (`sbdibnmoehbxmjdtamvr`) must expose the `consulting` schema to the Data API. If ingest returns `Invalid schema: consulting`, run:

```sql
ALTER ROLE authenticator SET pgrst.db_schemas = 'public, studioflows_system, consulting';
NOTIFY pgrst, 'reload schema';
```

Staging (`xezlsmrpgsvzxoivnxzu`) already includes `consulting` in `pgrst.db_schemas`.

Provision a new ingest token via `consulting.ingest_tokens` (hash is SHA-256 of the plaintext token). Tokens are created in Vercel only; never commit plaintext tokens to the repo.

## Preview environment (Vercel CLI)

Production ingest env is configured. For **Preview** deployments (staging qualified E2E on preview URLs), add the same five server keys for the Preview environment:

- `STUDIOFLOWS_INGEST_URL`
- `STUDIOFLOWS_TENANT_SLUG`
- `STUDIOFLOWS_INGEST_TOKEN`
- `SUPABASE_ANON_KEY`
- Optional: `STUDIOFLOWS_CONSULTING_SELL_URL`

Use axiom-staging-v2 values documented in your internal runbook (not committed here).

```bash
# Example — CLI may prompt for scope; choose Preview when offered
npx vercel env add STUDIOFLOWS_INGEST_URL preview --value "https://<staging-ref>.supabase.co/functions/v1"
npx vercel env add STUDIOFLOWS_TENANT_SLUG preview --value "app"
npx vercel env add STUDIOFLOWS_INGEST_TOKEN preview
npx vercel env add SUPABASE_ANON_KEY preview
```

If `vercel env add` blocks non-interactive adds or rejects Preview scope, use **Vercel Dashboard → Project → Settings → Environment Variables** and assign each key to **Preview** (all preview branches). Redeploy preview after saving.

Preview without these keys still serves pages; qualified `POST /api/studioflows/ingest-lead` returns `{ "error": "Ingest not configured" }` until Preview env is set.

## Production checklist (required before qualified E2E)

Add to Vercel Production (and Preview for staging ingest):

- `STUDIOFLOWS_INGEST_URL`
- `STUDIOFLOWS_TENANT_SLUG` (`app`)
- `STUDIOFLOWS_INGEST_TOKEN`
- `SUPABASE_ANON_KEY` (Edge Function `apikey` header; can match marketing anon key)

Optional: `STUDIOFLOWS_CONSULTING_SELL_URL`

Client bundle may still use `NEXT_PUBLIC_SUPABASE_*` elsewhere; ingest token must **not** use `NEXT_PUBLIC_`.

## Local smoke test

```bash
npm run build
npm run start
```

```bash
curl -s -X POST http://localhost:3000/api/studioflows/ingest-lead \
  -H "Content-Type: application/json" \
  -d "{\"consent\":true,\"form_payload\":{\"fullName\":\"Test User\",\"workEmail\":\"test@example.com\",\"companyName\":\"Example Co\",\"companyWebsite\":\"https://example.com\",\"businessModel\":\"Agency\",\"companyStage\":\"Growing team\",\"primaryPainArea\":\"Client delivery\",\"highestCostBottleneck\":\"Handoffs\",\"workflowManagement\":[\"Spreadsheets\"],\"frequentBreakdown\":\"Missed deadlines\",\"frequentBreakdownDetail\":\"\",\"urgencyWindow\":\"Now (0-30 days)\",\"quarterRisk\":\"Revenue risk increases\",\"implementationOwnership\":\"Low involvement: I want StudioFlows to handle most of it\",\"budgetRange\":\"$12k-$18k\",\"approvalInvolvement\":\"Owner can approve immediately\"}}"
```

Qualified responses include `redirect_url` pointing at consulting `/s/app?lead_id=...`. Disqualified responses return `marketing_bucket` and `outreach_next_steps` without calling consulting ingest.

Missing consent → `400`. Missing ingest env on qualified path → `500` with `{ "error": "Ingest not configured" }`.
