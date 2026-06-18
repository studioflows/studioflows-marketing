"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import OpsTeardownSheetView from "@/components/ops-teardown/OpsTeardownSheetView";
import { buildOpsAuditBookUrl } from "@/lib/ops-audit-handoff";
import {
  buildTeardownPdfDownloadUrl,
  buildTeardownReferralMailto,
  buildTeardownReferralUrl,
  buildTeardownShareUrl,
} from "@/lib/ops-teardown/teardown-share";
import {
  QualifierAtmosphere,
  QUALIFIER_PAGE,
  Q_BODY,
  Q_CARD,
  Q_CTA_PRIMARY,
  Q_CTA_SECONDARY,
  Q_EYEBROW,
  Q_HEADLINE,
} from "@/components/qualifier/qualifier-theme";

function readSearchParam(search, key) {
  if (!search) return null;
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const value = params.get(key);
  return value?.trim() ? value.trim() : null;
}

export default function OpsTeardownThankYouClient({ initialSearch = "" }) {
  const leadId = useMemo(() => readSearchParam(initialSearch, "lead_id"), [initialSearch]);
  const email = useMemo(() => readSearchParam(initialSearch, "email"), [initialSearch]);
  const from = useMemo(
    () => readSearchParam(initialSearch, "from") ?? "homepage-ops-check-qualified",
    [initialSearch]
  );

  const [sheet, setSheet] = useState(null);
  const [sheetState, setSheetState] = useState("idle");
  const [sheetError, setSheetError] = useState("");
  const [emailState, setEmailState] = useState("idle");
  const [emailMessage, setEmailMessage] = useState("");
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (!leadId && !email) {
      setSheetState("missing");
      return;
    }

    const params = new URLSearchParams();
    if (leadId) params.set("lead_id", leadId);
    if (email) params.set("email", email);

    setSheetState("loading");
    setSheetError("");

    fetch(`/api/studioflows/ops-teardown?${params.toString()}`)
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(body.error || "Unable to generate your Ops Teardown right now.");
        }
        return body.sheet;
      })
      .then((nextSheet) => {
        setSheet(nextSheet);
        setSheetState("ready");
      })
      .catch((error) => {
        setSheet(null);
        setSheetState("error");
        setSheetError(error instanceof Error ? error.message : "Unable to generate your Ops Teardown.");
      });
  }, [leadId, email]);

  const siteOrigin = typeof window !== "undefined" ? window.location.origin : undefined;

  const bookCallUrl = leadId
    ? buildOpsAuditBookUrl({
        leadId,
        email,
        from,
        platformRoot:
          process.env.NEXT_PUBLIC_STUDIOFLOWS_PLATFORM_URL ?? "https://os.studioflows.co",
      })
    : null;

  const pdfDownloadUrl =
    sheetState === "ready" && (leadId || email)
      ? buildTeardownPdfDownloadUrl({ leadId, email, siteOrigin })
      : null;

  const shareUrl =
    sheetState === "ready" && leadId
      ? buildTeardownShareUrl({ leadId, email, from, siteOrigin })
      : null;

  const referralUrl = buildTeardownReferralUrl(siteOrigin);
  const referralMailto = buildTeardownReferralMailto({
    companyName: sheet?.company_name,
    siteOrigin,
  });

  const handleEmailShare = async () => {
    if (!leadId && !email) return;
    setEmailState("sending");
    setEmailMessage("");

    try {
      const response = await fetch("/api/studioflows/ops-teardown/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          email,
          to_email: email,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body.error || "Unable to email your teardown right now.");
      }
      setEmailState("sent");
      setEmailMessage(body.share_url ? `Sent to ${email}.` : "Teardown email sent.");
    } catch (error) {
      setEmailState("error");
      setEmailMessage(error instanceof Error ? error.message : "Unable to email your teardown.");
    }
  };

  const handleCopyShareLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("error");
    }
  };

  return (
    <main className={QUALIFIER_PAGE}>
      <QualifierAtmosphere />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
        <div className={`${Q_CARD} p-6 sm:p-8`}>
          <p className={Q_EYEBROW}>Ops Teardown</p>
          <h1 className={`mt-3 text-2xl sm:text-3xl ${Q_HEADLINE}`}>
            {sheet?.company_name
              ? `${sheet.company_name} — Ops Teardown`
              : "Your Ops Teardown is ready."}
          </h1>
          <p className={`mt-3 text-sm leading-7 ${Q_BODY}`}>
            Built from your homepage pre-qualifier and full qualifier answers. Download the watermarked PDF,
            email it to yourself, or share the link with a stakeholder.
          </p>

          {sheetState === "loading" ? (
            <p className="mt-4 text-sm text-[#4E483D]">Generating your teardown sheet…</p>
          ) : null}
          {sheetState === "error" ? (
            <p className="mt-4 text-sm text-amber-900">{sheetError}</p>
          ) : null}
          {sheetState === "missing" ? (
            <p className="mt-4 text-sm text-amber-900">
              Missing lead reference. Return to the qualifier to restart your handoff.
            </p>
          ) : null}

          {sheetState === "ready" ? (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {pdfDownloadUrl ? (
                <a href={pdfDownloadUrl} className={Q_CTA_PRIMARY}>
                  Download PDF
                </a>
              ) : null}
              {email ? (
                <button
                  type="button"
                  onClick={handleEmailShare}
                  disabled={emailState === "sending"}
                  className={Q_CTA_SECONDARY}
                >
                  {emailState === "sending" ? "Sending…" : "Email PDF to me"}
                </button>
              ) : null}
              {shareUrl ? (
                <button type="button" onClick={handleCopyShareLink} className={Q_CTA_SECONDARY}>
                  {copyState === "copied" ? "Link copied" : "Copy share link"}
                </button>
              ) : null}
            </div>
          ) : null}

          {emailMessage ? <p className="mt-3 text-sm text-[#4E483D]">{emailMessage}</p> : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {bookCallUrl ? (
              <a href={bookCallUrl} className={Q_CTA_SECONDARY}>
                Book Your Ops Audit
              </a>
            ) : (
              <Link href="/services/custom-ops-hub" className={Q_CTA_SECONDARY}>
                Return to Qualifier
              </Link>
            )}
            <a href={referralMailto} className={Q_CTA_SECONDARY}>
              Know someone with ops drag?
            </a>
          </div>

          <p className="mt-4 text-xs leading-6 text-[#4E483D]">
            Referral link: <a href={referralUrl} className="underline underline-offset-2">{referralUrl}</a>
          </p>
          <p className="mt-2 text-xs leading-6 text-[#4E483D]">
            Calendar embed lands in Gate D on this same page.
          </p>
        </div>

        {sheetState === "ready" && sheet ? <OpsTeardownSheetView sheet={sheet} /> : null}
      </div>
    </main>
  );
}
