import { NextResponse } from "next/server";
import { AUTH_COOKIE_ACCESS, AUTH_COOKIE_REFRESH } from "../../../lib/auth/server";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const body = await request.json().catch(() => null);

  const accessToken = body?.access_token;
  const refreshToken = body?.refresh_token;
  const expiresIn = body?.expires_in;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ ok: false, error: "missing_tokens" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(AUTH_COOKIE_ACCESS, accessToken, {
    httpOnly: true,
    secure: requestUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: typeof expiresIn === "number" ? expiresIn : 3600,
  });

  response.cookies.set(AUTH_COOKIE_REFRESH, refreshToken, {
    httpOnly: true,
    secure: requestUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
