import Link from "next/link";

import {
  QualifierAtmosphere,
  QUALIFIER_PAGE,
  Q_BODY,
  Q_CARD,
  Q_CTA_SECONDARY,
  Q_EYEBROW,
  Q_HEADLINE,
} from "@/components/qualifier/qualifier-theme";

export const metadata = {
  title: "Thank You | StudioFlows",
  description:
    "StudioFlows OPS Drag Audit onboarding is currently limited to US-based businesses.",
};

export default function QualifierUsOnlyPage() {
  return (
    <main className={QUALIFIER_PAGE}>
      <QualifierAtmosphere />
      <header className="relative z-10 border-b border-black/10">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" aria-label="StudioFlows home">
            <img
              src="/StudioFlows logo (1200 x 675 px) (1).png"
              alt="StudioFlows"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>
          <Link href="/" className="text-sm text-[#6B6557] transition hover:text-[#0B0B0C]">
            ← Home
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-[720px] px-5 pb-24 pt-12 sm:px-8 lg:px-10">
        <div className={`${Q_CARD} p-6 sm:p-10`}>
          <p className={Q_EYEBROW}>Thank you</p>
          <h1 className={`mt-4 text-2xl sm:text-3xl ${Q_HEADLINE}`}>
            Thank you for your interest in StudioFlows.
          </h1>
          <div className={`mt-5 space-y-4 ${Q_BODY}`}>
            <p>
              At this time, we&apos;re only onboarding <strong className="font-semibold text-[#100F0C]">US-based businesses</strong>{" "}
              through the OPS Drag Audit qualifier.
            </p>
            <p>
              If you operate a US-based company and want to explore fit, reach us at{" "}
              <a
                href="mailto:support@studioflows.co"
                className="font-medium text-[#6B5212] underline decoration-[#D4A853]/60 underline-offset-2 transition hover:text-[#100F0C]"
              >
                support@studioflows.co
              </a>
              .
            </p>
          </div>
          <div className="mt-8">
            <Link href="/" className={Q_CTA_SECONDARY}>
              Return to StudioFlows
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
