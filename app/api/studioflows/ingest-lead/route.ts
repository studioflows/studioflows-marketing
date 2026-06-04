import { NextRequest, NextResponse } from "next/server";

import {
  buildDisqualifiedLeadRow,
  buildQualifiedLeadRow,
  evaluateQualification,
  getMarketingBucket,
  getOutreachNextSteps,
  splitName,
  tierFromBudget,
} from "@/lib/qualify-custom-ops-hub";
import { createMarketingSupabaseServerClient } from "@/lib/supabase-server";

function pickAttribution(body: Record<string, unknown>) {
  const pqScore =
    typeof body.pq_score === "string" || typeof body.pq_score === "number"
      ? String(body.pq_score)
      : null;

  return {
    src: typeof body.src === "string" ? body.src : null,
    pq_score: pqScore,
    pq_qualified: typeof body.pq_qualified === "string" ? body.pq_qualified : null,
    pq_band: typeof body.pq_band === "string" ? body.pq_band : null,
    utm_source: typeof body.utm_source === "string" ? body.utm_source : null,
    utm_medium: typeof body.utm_medium === "string" ? body.utm_medium : null,
    utm_campaign: typeof body.utm_campaign === "string" ? body.utm_campaign : null,
    utm_term: typeof body.utm_term === "string" ? body.utm_term : null,
    utm_content: typeof body.utm_content === "string" ? body.utm_content : null,
    referrer: typeof body.referrer === "string" ? body.referrer : null,
    landing_path: typeof body.landing_path === "string" ? body.landing_path : "/services/custom-ops-hub",
  };
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body?.consent) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  const raw = (body.form_payload ?? body) as Record<string, unknown>;
  const { score, reasons, qualified } = evaluateQualification(raw);
  const tier = tierFromBudget(raw.budgetRange);
  const attribution = pickAttribution(body);

  if (!qualified) {
    const marketingBucket = getMarketingBucket({ score, reasons });
    const outreachNextSteps = getOutreachNextSteps(marketingBucket);
    const supabase = createMarketingSupabaseServerClient();

    if (!supabase) {
      return NextResponse.json({ error: "Lead storage not configured" }, { status: 500 });
    }

    const row = buildDisqualifiedLeadRow(raw, { score, reasons, qualified }, marketingBucket, outreachNextSteps);
    row.metadata = {
      ...row.metadata,
      ...attribution,
    };

    const { error } = await supabase.from("custom_ops_hub_leads").insert([row]);
    if (error) {
      return NextResponse.json({ error: error.message || "Unable to save lead" }, { status: 500 });
    }

    return NextResponse.json({
      qualified: false,
      score,
      reasons,
      marketing_bucket: marketingBucket,
      outreach_next_steps: outreachNextSteps,
      recommended_tier: tier,
    });
  }

  // Qualified leads must always land in the marketing Supabase leads table,
  // regardless of whether the OS ingest forward is configured.
  const supabase = createMarketingSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Lead storage not configured" }, { status: 500 });
  }

  const supabaseLeadId = crypto.randomUUID();
  const qualifiedBase = buildQualifiedLeadRow(raw, { score, reasons, qualified }, tier);
  const qualifiedRow = {
    ...qualifiedBase,
    id: supabaseLeadId,
    metadata: {
      ...qualifiedBase.metadata,
      ...attribution,
    },
  };

  // Do not chain .select() here: anon RLS allows INSERT but has no SELECT policy,
  // so RETURNING id fails with "new row violates row-level security policy".
  const { error: insertError } = await supabase.from("custom_ops_hub_leads").insert([qualifiedRow]);

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message || "Unable to save lead" },
      { status: 500 }
    );
  }

  const { first_name, last_name } = splitName(raw.fullName);
  const email = typeof raw.workEmail === "string" ? raw.workEmail.trim().toLowerCase() : null;

  // Best-effort forward into the StudioFlows OS tenant ingest. If env is not
  // configured or the call fails, the lead is already persisted in Supabase, so
  // we still complete the funnel instead of erroring out.
  const ingestUrl = process.env.STUDIOFLOWS_INGEST_URL?.replace(/\/$/, "");
  const tenantSlug = process.env.STUDIOFLOWS_TENANT_SLUG ?? "app";
  const token = process.env.STUDIOFLOWS_INGEST_TOKEN;
  const apikey = process.env.SUPABASE_ANON_KEY;

  let osLeadId: string | undefined;
  if (ingestUrl && token && apikey) {
    try {
      const ingestRes = await fetch(`${ingestUrl}/consulting-ingest-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey,
          "x-studioflows-tenant-slug": tenantSlug,
          "x-studioflows-ingest-token": token,
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          source: "studioflows.co/custom-ops-hub",
          landing_path: attribution.landing_path,
          consent: true,
          form_name: "custom_ops_hub_qualifier",
          form_payload: raw,
          metadata: {
            path: "/services/custom-ops-hub",
            qualification_score: score,
            qualification_reasons: reasons,
            qualification_version: "v1",
            recommended_tier: tier,
            supabase_lead_id: supabaseLeadId,
            ...attribution,
          },
        }),
      });

      const ingestBody = (await ingestRes.json().catch(() => ({}))) as Record<string, unknown>;
      if (ingestRes.ok) {
        osLeadId = ingestBody.lead_id as string | undefined;
      }
    } catch {
      // Swallow: the lead is safely stored in Supabase; OS forward is optional.
    }
  }

  const leadId = osLeadId ?? supabaseLeadId;
  const consultingBase = (
    process.env.STUDIOFLOWS_CONSULTING_SELL_URL ?? "https://consulting.studioflows.co/s/app"
  ).trim();

  const params = new URLSearchParams();
  if (leadId) params.set("lead_id", leadId);
  if (email) params.set("email", email);
  if (tier) params.set("tier", tier);
  params.set("from", "custom-ops-hub");
  const redirectUrl = `${consultingBase}?${params.toString()}`;

  return NextResponse.json({
    qualified: true,
    score,
    reasons,
    lead_id: leadId,
    redirect_url: redirectUrl,
    recommended_tier: tier,
  });
}
