const STORAGE_KEY = "sf_rem_lead_attribution";

export const REM_LANDING_PATH = "/real-estate-media";
export const REM_SCORE_PATH = "/real-estate-media/score";

export function parseRemAttributionFromSearch(search) {
  const params =
    search instanceof URLSearchParams
      ? search
      : new URLSearchParams(typeof search === "string" ? search : "");

  return {
    cta_id: params.get("cta_id") || null,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    referrer: null,
    landing_path: null,
  };
}

export function saveRemLeadAttribution(attribution) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable
  }
}

export function loadRemLeadAttribution() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function mergeRemAttribution(urlAttribution, storedAttribution) {
  const url = urlAttribution ?? {};
  const stored = storedAttribution ?? {};

  return {
    cta_id: url.cta_id ?? stored.cta_id ?? null,
    utm_source: url.utm_source ?? stored.utm_source ?? null,
    utm_medium: url.utm_medium ?? stored.utm_medium ?? null,
    utm_campaign: url.utm_campaign ?? stored.utm_campaign ?? null,
    utm_term: url.utm_term ?? stored.utm_term ?? null,
    utm_content: url.utm_content ?? stored.utm_content ?? null,
    referrer:
      (typeof document !== "undefined" ? document.referrer || null : null) ??
      stored.referrer ??
      null,
    landing_path: stored.landing_path ?? url.landing_path ?? REM_SCORE_PATH,
  };
}

export function captureRemAttributionForPath(path) {
  if (typeof window === "undefined") return null;

  const urlAttribution = parseRemAttributionFromSearch(window.location.search);
  const stored = loadRemLeadAttribution();
  const referrer = typeof document !== "undefined" ? document.referrer || null : null;

  const landingPath =
    stored?.landing_path ??
    (path === REM_LANDING_PATH ? REM_LANDING_PATH : REM_SCORE_PATH);

  const merged = mergeRemAttribution(
    {
      ...urlAttribution,
      landing_path: landingPath,
      referrer,
    },
    stored
  );

  saveRemLeadAttribution(merged);
  return merged;
}

export function getRemAttributionForHandoff() {
  if (typeof window === "undefined") return null;

  const urlAttribution = parseRemAttributionFromSearch(window.location.search);
  const stored = loadRemLeadAttribution();
  return mergeRemAttribution(urlAttribution, stored);
}

export function buildRemScoreHref(ctaId) {
  const base = REM_SCORE_PATH;
  if (!ctaId) return base;
  return `${base}?cta_id=${encodeURIComponent(ctaId)}`;
}
