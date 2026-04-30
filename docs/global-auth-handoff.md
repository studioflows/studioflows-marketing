# Global Auth Handoff

StudioFlows now supports centralized auth at `auth.studioflows.co` (this repo/deployment).

## Product Repo Redirect Contract

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

## Required Behavior in Product Apps

1. If user is unauthenticated, redirect to global auth with product context.
2. Include canonical `return_to` target to prevent wrong-app routing.
3. Do not attempt local fallback auth pages once this flow is enabled.

## Sample Middleware Redirect (Next.js)

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

## Fallback Behavior

- If `return_to` is invalid or not allowlisted, auth resolver ignores it.
- Resolver then uses product destination map.
- If user has one entitlement, they are auto-routed.
- If multiple entitlements, user is sent to `/apps`.
- If no entitlement, resolver sends to no-access support path (`/apps?state=no-access`) unless signup provisioning hook applies.
