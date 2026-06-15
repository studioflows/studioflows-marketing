const VOLUME_CODE_MAP = {
  "Under 10": "under_10",
  "10–25": "10-25",
  "26–50": "26-50",
  "51–100": "51-100",
  "100+": "100_plus",
};

const PEOPLE_TEAM_SIZE_MAP = {
  "Just me": "1",
  "Me plus one helper": "2",
  Photographers: "3-5",
  "Photographers and editors": "5-10",
  "Field team and post team": "10+",
};

const OWNER_PEOPLE = new Set(["Just me", "Me plus one helper"]);

export const SFP_SCORE_INTAKE_URL = "/api/real-estate-media/score";

export function normalizeVolumeCode(volume) {
  return VOLUME_CODE_MAP[volume] ?? "";
}

export function deriveTeamSizeCode(people) {
  return PEOPLE_TEAM_SIZE_MAP[people] ?? "";
}

export function deriveImplementationOwner(people) {
  return OWNER_PEOPLE.has(people) ? "owner" : "team_lead";
}

export function splitFullName(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) {
    return { first_name: "", last_name: "" };
  }

  const spaceIdx = trimmed.indexOf(" ");
  if (spaceIdx === -1) {
    return { first_name: trimmed, last_name: "" };
  }

  return {
    first_name: trimmed.slice(0, spaceIdx),
    last_name: trimmed.slice(spaceIdx + 1).trim(),
  };
}

/**
 * @param {{
 *   lead: { name: string; company: string; email: string; website?: string };
 *   volume: string;
 *   people: string;
 *   services: string[];
 *   unclear: string[];
 *   ownerDrag: string[];
 *   messyAnswer: string;
 *   scoreSessionId: string;
 *   attribution?: Record<string, string | null> | null;
 *   consent: boolean;
 * }} input
 */
export function buildScoreHandoffPayload({
  lead,
  volume,
  people,
  services,
  unclear,
  ownerDrag,
  messyAnswer,
  scoreSessionId,
  attribution,
  consent,
}) {
  const { first_name, last_name } = splitFullName(lead.name);
  const monthlyShootVolume = normalizeVolumeCode(volume);
  const teamSize = deriveTeamSizeCode(people);
  const primaryBottleneck = unclear[0] ?? ownerDrag[0] ?? "";
  const implementationOwner = deriveImplementationOwner(people);

  return {
    email: lead.email.trim(),
    first_name,
    last_name,
    phone: null,
    source: "studioflows.co/real-estate-media",
    landing_path: "/real-estate-media/score",
    consent: consent === true,
    form_name: "real_estate_media_ops_score",
    utm_source: attribution?.utm_source ?? null,
    utm_medium: attribution?.utm_medium ?? null,
    utm_campaign: attribution?.utm_campaign ?? null,
    utm_content: attribution?.utm_content ?? null,
    utm_term: attribution?.utm_term ?? null,
    referrer: attribution?.referrer ?? null,
    form_payload: {
      companyName: lead.company.trim(),
      companyWebsite: lead.website?.trim() || null,
      market: "real_estate_media",
      monthlyShootVolume,
      teamSize,
      currentTools: [],
      primaryBottleneck,
      urgencyWindow: "",
      implementationOwner,
      scoreAnswers: {
        monthlyJobVolume: volume,
        monthlyJobVolumeCode: monthlyShootVolume,
        peopleInvolved: people,
        teamSizeCode: teamSize,
        servicesSold: services,
        whereWorkGetsUnclear: unclear,
        ownerDragItems: ownerDrag,
        optionalMessyAnswer: messyAnswer.trim() || null,
      },
    },
    metadata: {
      handoff_from: "real-estate-media",
      sfm_path: "/real-estate-media/score",
      sfm_cta_id: attribution?.cta_id ?? null,
      sfm_variant: "default",
      score_version: "media_ops_score_v1",
      score_session_id: scoreSessionId,
      score_total: null,
      score_band: "pending_scoring",
      recommended_next_step: "view_results",
      pipeline_status: "new",
    },
  };
}
