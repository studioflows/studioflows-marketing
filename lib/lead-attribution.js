const STORAGE_KEY = "sf_lead_attribution";
const OPS_HUB_PATH = "/services/custom-ops-hub";

export function getPreQualBand(score) {
  if (score >= 13) return "high";
  if (score >= 8) return "moderate";
  return "low";
}

export function parseLeadAttribution(search) {
  const params =
    search instanceof URLSearchParams
      ? search
      : new URLSearchParams(typeof search === "string" ? search : "");

  const pqScoreRaw = params.get("pq_score");
  const pqScoreParsed = pqScoreRaw != null && pqScoreRaw !== "" ? Number(pqScoreRaw) : null;

  return {
    src: params.get("src") || null,
    pq_score: Number.isFinite(pqScoreParsed) ? pqScoreParsed : null,
    pq_qualified: params.get("pq_qualified") || null,
    pq_band: params.get("pq_band") || null,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    referrer: null,
    landing_path: OPS_HUB_PATH,
  };
}

export function parseUtmFromWindow() {
  if (typeof window === "undefined") {
    return {};
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };
}

/**
 * @param {{
 *   source?: string;
 *   pqScore?: number | string;
 *   pqQualified?: boolean | string;
 *   pqBand?: string;
 *   utm?: Record<string, string | null | undefined>;
 *   referrer?: string | null;
 * }} [options]
 */
export function buildOpsHubUrl({
  source,
  pqScore,
  pqQualified,
  pqBand,
  utm = {},
  referrer,
} = {}) {
  const params = new URLSearchParams();

  if (source) params.set("src", source);
  if (pqScore != null && pqScore !== "") params.set("pq_score", String(pqScore));
  if (pqQualified != null && pqQualified !== "") params.set("pq_qualified", String(pqQualified));
  if (pqBand) params.set("pq_band", pqBand);

  const utmEntries = {
    utm_source: utm.utm_source ?? utm.source,
    utm_medium: utm.utm_medium ?? utm.medium,
    utm_campaign: utm.utm_campaign ?? utm.campaign,
    utm_term: utm.utm_term ?? utm.term,
    utm_content: utm.utm_content ?? utm.content,
  };

  for (const [key, value] of Object.entries(utmEntries)) {
    if (value) params.set(key, value);
  }

  const query = params.toString();
  const path = query ? `${OPS_HUB_PATH}?${query}` : OPS_HUB_PATH;

  if (typeof window !== "undefined") {
    saveLeadAttribution({
      src: source ?? null,
      pq_score: pqScore ?? null,
      pq_qualified: pqQualified != null ? String(pqQualified) : null,
      pq_band: pqBand ?? null,
      ...utmEntries,
      referrer: referrer ?? (typeof document !== "undefined" ? document.referrer || null : null),
      landing_path: OPS_HUB_PATH,
    });
  }

  return path;
}

export function saveLeadAttribution(attribution) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable
  }
}

export function loadLeadAttribution() {
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

export function mergeLeadAttribution(urlAttribution, storedAttribution) {
  const url = urlAttribution ?? {};
  const stored = storedAttribution ?? {};

  return {
    src: url.src ?? stored.src ?? null,
    pq_score: url.pq_score ?? stored.pq_score ?? null,
    pq_qualified: url.pq_qualified ?? stored.pq_qualified ?? null,
    pq_band: url.pq_band ?? stored.pq_band ?? null,
    utm_source: url.utm_source ?? stored.utm_source ?? null,
    utm_medium: url.utm_medium ?? stored.utm_medium ?? null,
    utm_campaign: url.utm_campaign ?? stored.utm_campaign ?? null,
    utm_term: url.utm_term ?? stored.utm_term ?? null,
    utm_content: url.utm_content ?? stored.utm_content ?? null,
    referrer:
      (typeof document !== "undefined" ? document.referrer || null : null) ??
      stored.referrer ??
      null,
    landing_path: OPS_HUB_PATH,
  };
}

export function toIngestAttribution(merged) {
  return {
    src: merged.src,
    pq_score: merged.pq_score != null ? String(merged.pq_score) : null,
    pq_qualified: merged.pq_qualified,
    pq_band: merged.pq_band,
    utm_source: merged.utm_source,
    utm_medium: merged.utm_medium,
    utm_campaign: merged.utm_campaign,
    utm_term: merged.utm_term,
    utm_content: merged.utm_content,
    referrer: merged.referrer,
    landing_path: merged.landing_path,
  };
}
