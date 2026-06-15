import { NextResponse } from "next/server";

const ALLOWED_COUNTRIES = new Set(["US", "CO"]);
const GEO_BLOCKED_REDIRECT_PATH = "/qualifier/us-only";

export function middleware(request) {
  const hostname = request.nextUrl.hostname;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  const country =
    request.geo?.country ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  if (isLocalhost) {
    return NextResponse.next();
  }

  if (country && !ALLOWED_COUNTRIES.has(country)) {
    const redirectUrl = new URL(GEO_BLOCKED_REDIRECT_PATH, request.url);
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/services/custom-ops-hub/:path*"],
};
