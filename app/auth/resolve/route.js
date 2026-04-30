import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getProductDestination, sanitizeProductKey, validateRelativeNext, validateReturnTo } from "../../../lib/auth/config";
import {
  AUTH_COOKIE_ACCESS,
  AUTH_COOKIE_REFRESH,
  getActiveEntitlements,
  getAuthenticatedUserFromCookies,
  provisionStarterEntitlementStub,
  refreshSessionFromRefreshToken,
  resolveAuthDestination,
} from "../../../lib/auth/server";

function externalRedirectOrInternal(destination, requestUrl) {
  if (!destination) {
    return NextResponse.redirect(new URL("/apps?state=no-access", requestUrl.origin));
  }

  if (destination.startsWith("http://") || destination.startsWith("https://")) {
    return NextResponse.redirect(destination);
  }

  return NextResponse.redirect(new URL(destination, requestUrl.origin));
}

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const product = sanitizeProductKey(requestUrl.searchParams.get("product"));
  const intent = requestUrl.searchParams.get("intent") === "signup" ? "signup" : "login";
  const returnTo = validateReturnTo(requestUrl.searchParams.get("return_to"));
  const next = validateRelativeNext(requestUrl.searchParams.get("next"));

  const cookieStore = cookies();
  let user = await getAuthenticatedUserFromCookies(cookieStore);
  let refreshedSession = null;

  if (!user) {
    const refreshToken = cookieStore.get(AUTH_COOKIE_REFRESH)?.value;
    refreshedSession = await refreshSessionFromRefreshToken(refreshToken);
    if (refreshedSession?.user) {
      user = refreshedSession.user;
    }
  }

  if (!user) {
    return NextResponse.redirect(new URL("/apps?state=no-access", requestUrl.origin));
  }

  const entitlements = await getActiveEntitlements(user.id);
  const resolution = resolveAuthDestination({
    requestedProduct: product,
    intent,
    returnTo,
    next,
    entitlements,
  });

  console.info("AUTH_RESOLVE_DECISION", {
    userId: user.id,
    requestedProduct: product,
    entitlementCount: entitlements.length,
    outcome: resolution.type,
  });

  if (resolution.type === "provision-required") {
    const provisioned = await provisionStarterEntitlementStub(user.id, product);
    const fallback = getProductDestination(product);
    const response = externalRedirectOrInternal(provisioned?.destination || fallback, requestUrl);
    if (refreshedSession?.session) {
      response.cookies.set(AUTH_COOKIE_ACCESS, refreshedSession.session.access_token, {
        httpOnly: true,
        secure: requestUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        maxAge: refreshedSession.session.expires_in || 3600,
      });
      response.cookies.set(AUTH_COOKIE_REFRESH, refreshedSession.session.refresh_token, {
        httpOnly: true,
        secure: requestUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return response;
  }

  const response = externalRedirectOrInternal(resolution.destination, requestUrl);
  if (refreshedSession?.session) {
    response.cookies.set(AUTH_COOKIE_ACCESS, refreshedSession.session.access_token, {
      httpOnly: true,
      secure: requestUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: refreshedSession.session.expires_in || 3600,
    });
    response.cookies.set(AUTH_COOKIE_REFRESH, refreshedSession.session.refresh_token, {
      httpOnly: true,
      secure: requestUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}
