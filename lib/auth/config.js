export const PRODUCT_DESTINATIONS = {
  consulting: "https://consulting.studioflows.co/portal",
  vessa: "https://vessa.studioflows.co/app",
  axiom: "https://axiom.studioflows.co/",
};

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
