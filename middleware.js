import { NextResponse } from "next/server";

const ALLOWED_COUNTRIES = new Set(["US"]);

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
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/services/custom-ops-hub/:path*"],
};
