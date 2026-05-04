import { createClient } from "@supabase/supabase-js";
import { getProductDestination, getProductOnboardingDestination, sanitizeProductKey, validateRelativeNext, validateReturnTo } from "./config";

export const AUTH_COOKIE_ACCESS = "sf_access_token";
export const AUTH_COOKIE_REFRESH = "sf_refresh_token";

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export function createAnonServerClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}

export function createServiceServerClient() {
  return createClient(getSupabaseUrl(), getSupabaseServiceKey() || getSupabaseAnonKey());
}

export async function getAuthenticatedUserFromCookies(cookieStore) {
  const accessToken = cookieStore.get(AUTH_COOKIE_ACCESS)?.value;
  if (!accessToken) return null;

  const anonClient = createAnonServerClient();
  const { data, error } = await anonClient.auth.getUser(accessToken);
  if (error || !data?.user) return null;

  return data.user;
}

export async function refreshSessionFromRefreshToken(refreshToken) {
  if (!refreshToken) return null;
  const anonClient = createAnonServerClient();
  const { data, error } = await anonClient.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data?.session || !data?.user) return null;
  return data;
}

export async function getActiveEntitlements(userId) {
  const admin = createServiceServerClient();

  const { data, error } = await admin.rpc("get_user_entitlements", { p_user_id: userId });

  if (error) {
    console.error("AUTH_RESOLVE_ENTITLEMENTS_ERROR", { message: error.message, userId });
    return [];
  }

  return data || [];
}

export async function getBestEntitlement(userId, requestedProduct) {
  const entitlements = await getActiveEntitlements(userId);
  const requested = sanitizeProductKey(requestedProduct);

  if (requested) {
    const exact = entitlements.find((item) => item.product_key === requested);
    if (exact) return exact;
  }

  return entitlements[0] || null;
}

export async function provisionStarterEntitlementStub(userId, productKey) {
  const product = sanitizeProductKey(productKey);
  if (!product) return null;

  console.info("AUTH_PROVISION_STARTER_ENTITLEMENT_STUB", { userId, product });
  return {
    product_key: product,
    destination: getProductOnboardingDestination(product),
  };
}

export function resolveAuthDestination({ requestedProduct, intent, returnTo, next, entitlements }) {
  const validatedReturnTo = validateReturnTo(returnTo);
  const validatedNext = validateRelativeNext(next);
  const requested = sanitizeProductKey(requestedProduct);

  if (requested) {
    const entitlement = entitlements.find((item) => item.product_key === requested);
    if (entitlement) {
      return {
        type: "product-match",
        destination: validatedReturnTo || getProductDestination(requested),
        product: requested,
      };
    }
  }

  if (entitlements.length === 1) {
    const one = entitlements[0];
    return {
      type: "single-entitlement",
      destination: validatedReturnTo || getProductDestination(one.product_key),
      product: one.product_key,
    };
  }

  if (entitlements.length > 1) {
    return {
      type: "multi-entitlement",
      destination: getProductDestination("vessa"),
      product: "vessa",
    };
  }

  if (intent === "signup" && requested) {
    return {
      type: "provision-required",
      destination: getProductOnboardingDestination(requested),
      product: requested,
    };
  }

  return {
    type: "no-access",
    destination: validatedNext || getProductDestination("vessa"),
    product: "vessa",
  };
}
