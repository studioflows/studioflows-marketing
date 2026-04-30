export const PRODUCT_DESTINATIONS = {
  consulting: "https://consulting.studioflows.co/portal",
  vessa: "https://vessa.studioflows.co/app",
  axiom: "https://axiom.studioflows.co/",
};

export const AUTH_ORIGIN = process.env.NEXT_PUBLIC_AUTH_ORIGIN || "https://auth.studioflows.co";

const DEFAULT_ALLOWED_HOSTS = new Set([
  "studioflows.co",
  "www.studioflows.co",
  "auth.studioflows.co",
  "vessa.studioflows.co",
  "consulting.studioflows.co",
  "axiom.studioflows.co",
  "localhost",
  "127.0.0.1",
]);

const EXTRA_ALLOWED_HOSTS = (process.env.AUTH_RETURN_TO_ALLOWLIST || "")
  .split(",")
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);

for (const host of EXTRA_ALLOWED_HOSTS) {
  DEFAULT_ALLOWED_HOSTS.add(host);
}

export function sanitizeProductKey(value) {
  if (!value || typeof value !== "string") return null;
  const key = value.trim().toLowerCase();
  return PRODUCT_DESTINATIONS[key] ? key : null;
}

export function validateRelativeNext(nextValue) {
  if (!nextValue || typeof nextValue !== "string") return null;
  if (!nextValue.startsWith("/")) return null;
  if (nextValue.startsWith("//")) return null;
  return nextValue;
}

export function validateReturnTo(returnTo) {
  if (!returnTo || typeof returnTo !== "string") return null;

  try {
    const parsed = new URL(returnTo);
    const hostname = parsed.hostname.toLowerCase();

    if (!["https:", "http:"].includes(parsed.protocol)) return null;
    if (!DEFAULT_ALLOWED_HOSTS.has(hostname)) return null;
    if ((hostname === "localhost" || hostname === "127.0.0.1") && parsed.protocol !== "http:") return null;
    if (!(hostname === "localhost" || hostname === "127.0.0.1") && parsed.protocol !== "https:") return null;

    return parsed.toString();
  } catch {
    return null;
  }
}

export function getProductDestination(productKey) {
  return PRODUCT_DESTINATIONS[productKey] || null;
}

export function getProductOnboardingDestination(productKey) {
  const base = PRODUCT_DESTINATIONS[productKey];
  if (!base) return null;

  try {
    const parsed = new URL(base);
    parsed.pathname = `${parsed.pathname.replace(/\/$/, "")}/onboarding`;
    return parsed.toString();
  } catch {
    return base;
  }
}

export function buildAuthContextFromSearchParams(searchParamsLike) {
  const get = (key) => {
    if (!searchParamsLike) return null;
    if (typeof searchParamsLike.get === "function") return searchParamsLike.get(key);
    if (typeof searchParamsLike[key] === "string") return searchParamsLike[key];
    return null;
  };

  return {
    product: sanitizeProductKey(get("product")),
    intent: get("intent") === "signup" ? "signup" : "login",
    returnTo: validateReturnTo(get("return_to")),
    next: validateRelativeNext(get("next")),
  };
}

export function authContextToQuery(context) {
  const params = new URLSearchParams();
  if (context?.product) params.set("product", context.product);
  if (context?.intent) params.set("intent", context.intent);
  if (context?.returnTo) params.set("return_to", context.returnTo);
  if (context?.next) params.set("next", context.next);
  return params.toString();
}

export function buildAuthCallbackUrl(context) {
  const callbackUrl = new URL("/auth/callback", AUTH_ORIGIN);
  const query = authContextToQuery(context);
  if (!query) return callbackUrl;

  const params = new URLSearchParams(query);
  for (const [key, value] of params.entries()) {
    callbackUrl.searchParams.set(key, value);
  }

  return callbackUrl;
}
