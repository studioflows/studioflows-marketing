# Global Auth Handoff

StudioFlows now supports centralized auth at `auth.studioflows.co` (this repo/deployment).

## What Was Built (Current Architecture)

- Global auth entry pages:
  - `https://auth.studioflows.co/login`
  - `https://auth.studioflows.co/signup`
- Auth providers currently wired:
  - email + password
  - Google OAuth
  - magic link
- Auth callback + resolver pipeline:
  - `/auth/callback` exchanges Supabase auth payload for a session and sets server cookies
  - `/auth/resolve` chooses destination based on product context + user entitlements
- Server session cookies:
  - `sf_access_token`
  - `sf_refresh_token`
- Entitlement source of truth:
  - `platform.user_entitlements` in Supabase

## Redirect Contract (Required by Product Apps)

When a product app detects an unauthenticated user, redirect to:

- Login: `https://auth.studioflows.co/login`
- Signup: `https://auth.studioflows.co/signup`

With query params:

- `product` (required in practice): `vessa` | `consulting` | `axiom`
- `intent`: `login` or `signup`
- `return_to`: absolute URL back into the product app
- `next`: relative fallback path (only used by auth app)

Example:

`https://auth.studioflows.co/login?product=consulting&intent=login&return_to=https%3A%2F%2Fconsulting.studioflows.co%2Fportal`

## SOP for Product Teams

Follow these steps exactly for each product (Vessa, StudioFlows OS, etc.).

### Step 1) Enforce the Redirect on Unauthenticated Access

1. If user is unauthenticated, redirect to global auth with product context.
2. Include canonical `return_to` target to prevent wrong-app routing.
3. Do not attempt local fallback auth pages once this flow is enabled.

### Step 2) Always Send These Query Params

- `product`: one of `vessa`, `consulting`, `axiom`
- `intent`: `login` or `signup`
- `return_to`: fully-qualified URL for the destination inside that product
- `next` (optional): local auth-app fallback only

If `product` is missing or invalid, routing quality drops and users may land in `/apps`.

### Step 3) Use Middleware (or Gatekeeper) in Each Product

If the product uses Next.js, use this pattern:

```ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const isAuthed = false; // replace with your session check

  if (isAuthed) return NextResponse.next();

  const authUrl = new URL("https://auth.studioflows.co/login");
  authUrl.searchParams.set("product", "consulting");
  authUrl.searchParams.set("intent", "login");
  authUrl.searchParams.set("return_to", "https://consulting.studioflows.co/portal");

  return NextResponse.redirect(authUrl);
}
```

### Step 4) Configure Entitlements at Signup/Provisioning Time

The resolver routes users from `platform.user_entitlements`:

- table: `platform.user_entitlements`
- required columns used by resolver:
  - `user_id`
  - `product_key`
  - `status` (`active` or `trialing` are considered valid access)
  - `priority`

Expected behavior:

- Existing entitled user + matching `product` -> direct to that product
- One active entitlement total -> auto-route there
- Multiple active entitlements -> send to `/apps`
- Signup with requested product and no entitlement yet -> provisioning/onboarding destination
- No entitlement and no valid provisioning path -> `/apps?state=no-access`

### Step 5) Verify Google OAuth + Magic Link Redirect URLs

Supabase/Auth provider redirect URLs must include the auth callback on the auth host:

- `https://auth.studioflows.co/auth/callback`

Do not use product preview URLs as OAuth callback targets.

### Step 6) Product Launch Checklist (Copy/Paste)

- [ ] Product redirects unauthenticated users to global auth
- [ ] `product` param is correct and stable
- [ ] `return_to` points to the product canonical destination
- [ ] `return_to` host is allowlisted for resolver validation
- [ ] Product provisioning creates/updates entitlement row
- [ ] OAuth redirect URL is `https://auth.studioflows.co/auth/callback`
- [ ] Login flow lands in correct product
- [ ] Signup flow lands in onboarding (or product home) correctly
- [ ] No-access users land on `/apps?state=no-access`

## Resolver Guardrails and Fallback Behavior

- If `return_to` is invalid or not allowlisted, auth resolver ignores it.
- Resolver then uses product destination map.
- If user has one entitlement, they are auto-routed.
- If multiple entitlements, user is sent to `/apps`.
- If no entitlement, resolver sends to no-access support path (`/apps?state=no-access`) unless signup provisioning hook applies.

## Current Product Destination Map (Auth App)

- `vessa` -> `https://vessa.studioflows.co/app`
- `consulting` -> `https://consulting.studioflows.co/portal`
- `axiom` -> `https://axiom.studioflows.co/`
