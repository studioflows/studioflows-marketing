import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getProductDestination, sanitizeProductKey, validateRelativeNext, validateReturnTo } from "../../../lib/auth/config";
import {
  getActiveEntitlements,
  getAuthenticatedUserFromCookies,
  provisionStarterEntitlementStub,
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

  const user = await getAuthenticatedUserFromCookies(cookies());
  if (!user) {
    const loginUrl = new URL("/login", requestUrl.origin);
    if (product) loginUrl.searchParams.set("product", product);
    if (returnTo) loginUrl.searchParams.set("return_to", returnTo);
    if (next) loginUrl.searchParams.set("next", next);
    return NextResponse.redirect(loginUrl);
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
    return externalRedirectOrInternal(provisioned?.destination || fallback, requestUrl);
  }

  return externalRedirectOrInternal(resolution.destination, requestUrl);
}
