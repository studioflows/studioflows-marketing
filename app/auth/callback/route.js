import { NextResponse } from "next/server";
import { AUTH_COOKIE_ACCESS, AUTH_COOKIE_REFRESH, createAnonServerClient } from "../../../lib/auth/server";
import { sanitizeProductKey, validateRelativeNext, validateReturnTo } from "../../../lib/auth/config";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const tokenType = requestUrl.searchParams.get("type");
  const product = sanitizeProductKey(requestUrl.searchParams.get("product"));
  const intent = requestUrl.searchParams.get("intent") === "signup" ? "signup" : "login";
  const returnTo = validateReturnTo(requestUrl.searchParams.get("return_to"));
  const next = validateRelativeNext(requestUrl.searchParams.get("next"));
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (errorDescription) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorDescription)}`, requestUrl.origin));
  }

  const supabase = createAnonServerClient();
  let data = null;
  let error = null;

  if (code) {
    const result = await supabase.auth.exchangeCodeForSession(code);
    data = result.data;
    error = result.error;
  } else if (tokenHash && tokenType) {
    const result = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: tokenType,
    });
    data = result.data;
    error = result.error;
  } else {
    return NextResponse.redirect(new URL("/login?error=missing_auth_payload", requestUrl.origin));
  }

  if (error || !data?.session) {
    const reason = encodeURIComponent(error?.message || "session_exchange_failed");
    return NextResponse.redirect(new URL(`/login?error=${reason}`, requestUrl.origin));
  }

  const resolveUrl = new URL("/auth/resolve", requestUrl.origin);
  resolveUrl.searchParams.set("intent", intent);
  if (product) resolveUrl.searchParams.set("product", product);
  if (returnTo) resolveUrl.searchParams.set("return_to", returnTo);
  if (next) resolveUrl.searchParams.set("next", next);

  const response = NextResponse.redirect(resolveUrl);

  response.cookies.set(AUTH_COOKIE_ACCESS, data.session.access_token, {
    httpOnly: true,
    secure: requestUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: data.session.expires_in || 3600,
  });

  response.cookies.set(AUTH_COOKIE_REFRESH, data.session.refresh_token, {
    httpOnly: true,
    secure: requestUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
