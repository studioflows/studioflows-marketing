"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { RemOwnerPhone } from "@/components/real-estate-media/rem-owner-phone";
import {
  buildRemScoreHref,
  captureRemAttributionForPath,
  REM_LANDING_PATH,
} from "@/lib/real-estate-media/remLeadAttribution";
import {
  VESSA_BG,
  VESSA_BODY,
  VESSA_BODY_SM,
  VESSA_CTA_BLOCK,
  VESSA_CTA_SECONDARY,
  VESSA_PANEL,
} from "@/components/vessa/vessa-tokens";

const SCORE_HREF = "/real-estate-media/score";

const HERO_JOBS = [
  {
    address: "124 Maple Ave",
    package: "Photo + Drone + Reel",
    status: "Shoot tomorrow",
    flag: "No photographer assigned",
    tone: "warn",
  },
  {
    address: "87 Pine Street",
    package: "Field complete",
    status: "Waiting on upload",
    flag: null,
    tone: "neutral",
  },
  {
    address: "19 Harbor Lane",
    package: "Editing",
    status: "Agent asked for update",
    flag: null,
    tone: "pressure",
  },
];

const NOTIFICATIONS = [
  { from: "Alex (photo)", text: "Gate code for 124 Maple?" },
  { from: "Editor", text: "Drone clips missing on 87 Pine" },
  { from: "Agent, Harbor", text: "Were the photos sent yet?" },
  { from: "Crew lead", text: "Who has tomorrow's shoot?" },
];

const KEEP_TOOLS = ["Booking", "Galleries", "Payments", "Delivery"];
const CLEAN_UP = ["Crew", "Files", "Editing", "Status", "Next moves"];

const SCORE_CARDS = [
  { title: "Jobs", body: "How many shoots or listings move each month." },
  { title: "People", body: "Who touches the work before delivery." },
  {
    title: "Services",
    body: "Photo, video, drone, floor plans, reels, 3D, twilight, staging.",
  },
  { title: "Status", body: "Where crew, files, or editing get unclear." },
  { title: "Tools", body: "Where job details live today." },
  { title: "Owner drag", body: "What still pings you before delivery." },
];

const FIT_LINES = [
  "Two or more photographers or crew leads running around",
  "Photo + video + drone + reels on the same job",
  "Editors regularly stuck waiting on files",
  "Agents texting while everything\u2019s still in-house",
  "Booking works fine but crew and status still scatter",
];

const PROOF_ITEMS = [
  "Who has tomorrow\u2019s shoot",
  "Did the upload actually land",
  "Has editing started",
  "Were the photos sent",
  "Who the hell owns this job right now",
];

const CATEGORY_PROOF_ITEMS = [
  "shoots",
  "crew",
  "uploads",
  "editing",
  "agent loops",
  "delivery",
];

const REM_H2 = "text-xl font-semibold leading-snug text-white lg:text-3xl lg:leading-tight";

function SectionShell({ id, children, className = "" }) {
  return (
    <section id={id} className={`border-t border-white/[0.06] py-10 lg:py-16 ${className}`}>
      {children}
    </section>
  );
}

function JobCard({ job }) {
  const border =
    job.tone === "warn"
      ? "border-[#D4A853]/35"
      : job.tone === "pressure"
        ? "border-[#DB2777]/30"
        : "border-white/10";

  return (
    <div className={`${VESSA_PANEL} border ${border} py-3.5`}>
      <p className="text-sm font-semibold text-white">{job.address}</p>
      <p className={`mt-1 ${VESSA_BODY_SM}`}>{job.package}</p>
      <p className="mt-2 text-xs text-white/62">{job.status}</p>
      {job.flag ? (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#D4A853]">
          {job.flag}
        </p>
      ) : null}
    </div>
  );
}

function ToolStack({ label, items, variant = "keep" }) {
  return (
    <div
      className={
        variant === "keep"
          ? `${VESSA_PANEL} border border-white/10 py-4`
          : "rounded-2xl border border-[#D4A853]/25 bg-[#D4A853]/[0.05] px-4 py-4"
      }
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-white/72">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PrimaryCta({ children, ctaId, className = "" }) {
  const href = ctaId ? buildRemScoreHref(ctaId) : SCORE_HREF;
  return (
    <Link
      href={href}
      className={`${VESSA_CTA_BLOCK} min-h-[52px] text-[11px] lg:w-auto lg:min-w-[280px] lg:px-8 ${className}`}
    >
      {children}
    </Link>
  );
}

export function RemHeroSection() {
  return (
    <section id="hero" className="pb-8 pt-6 lg:pb-12 lg:pt-10">
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-12 xl:gap-16">
        <div className="order-1 max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4A853]/85">
            Real estate media companies
          </p>
          <h1 className="mt-4 text-[1.65rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white lg:text-[3rem] lg:leading-[1.05]">
            You shouldn&apos;t still be the one getting pinged to figure out where a job actually
            stands.
          </h1>
          <div className={`mt-4 space-y-3 lg:mt-5 ${VESSA_BODY}`}>
            <p>
              Bookings roll in. Crew gets sent out. Files start coming back. Editing queue builds.
              Then the agent texts hit.
            </p>
            <p className="text-white/72">
              And somehow half that mess still ends up on your phone.
            </p>
          </div>

          <div className="mt-6 hidden lg:mt-8 lg:block">
            <PrimaryCta ctaId="hero_start_score">Get My Media Ops Score</PrimaryCta>
            <p className="mt-3 text-center text-xs leading-relaxed text-white/45 lg:text-left">
              Three minutes. Mostly taps. Demo workspace after.
            </p>
          </div>
        </div>

        <div
          className="order-2 mt-6 space-y-2.5 lg:order-none lg:mt-0 lg:rounded-2xl lg:border lg:border-white/10 lg:bg-black/30 lg:p-4 lg:shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
          aria-label="Sample job cards"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Today&apos;s Jobs
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4A853]/80">
              Media Ops
            </p>
          </div>
          {HERO_JOBS.map((job) => (
            <JobCard key={job.address} job={job} />
          ))}
        </div>

        <div className="order-3 mt-6 lg:hidden">
          <PrimaryCta ctaId="hero_start_score">Get My Media Ops Score</PrimaryCta>
          <p className="mt-3 text-center text-xs leading-relaxed text-white/45">
            Three minutes. Mostly taps. Demo workspace after.
          </p>
        </div>
      </div>
    </section>
  );
}

export function RemCategoryProofStrip() {
  return (
    <section
      id="category-proof"
      className="border-t border-white/[0.06] py-6 lg:border-t-0 lg:py-0 lg:pb-10"
      aria-label="Work categories StudioFlows supports"
    >
      <div className="lg:rounded-2xl lg:border lg:border-white/[0.08] lg:bg-white/[0.02] lg:px-6 lg:py-5">
        <h2 className="text-sm font-semibold text-white lg:text-base">
          Everything that happens after the booking
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2 lg:mt-5 lg:gap-2.5">
          {CATEGORY_PROOF_ITEMS.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-xs text-white/72 lg:text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RemRecognizeSection() {
  return (
    <section id="recognize" className="border-t border-white/[0.06] py-10 lg:py-16">
      <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>
            Job&apos;s in the app somewhere.
            <br />
            Questions still hit your phone.
          </h2>
          <div className={`mt-5 space-y-3 lg:max-w-xl ${VESSA_BODY}`}>
            <p>Photographer texting for the gate code on Maple Ave tomorrow.</p>
            <p>Editor saying drone clips from Pine Street never showed.</p>
            <p>Agent on Harbor Lane asking if the photos went out yet.</p>
            <p>Crew lead wondering who&apos;s even got tomorrow&apos;s schedule.</p>
            <p className="text-white/78">Thirty seconds here. Forty-five there.</p>
            <p className="font-medium text-white/85">You answer because it&apos;s faster than digging.</p>
            <p>
              And then the morning&apos;s already half gone and you haven&apos;t touched the stuff
              that actually pays next month.
            </p>
          </div>

          <div className="mt-8 hidden md:block">
            <Link href={SCORE_HREF} className={`${VESSA_CTA_SECONDARY} min-h-[52px] text-[11px]`}>
              Run the Media Ops Score
            </Link>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:flex lg:items-center lg:justify-center">
          <RemOwnerPhone notifications={NOTIFICATIONS} />
        </div>
      </div>
    </section>
  );
}

export function RemFrictionSection() {
  return (
    <section id="real-friction" className="border-t border-white/[0.06] py-10 lg:py-16">
      <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>
            Shoot&apos;s done. Job&apos;s still wide open.
          </h2>
          <div className={`mt-5 max-w-3xl space-y-3 ${VESSA_BODY}`}>
            <p>Photos are captured. Listing page still has holes.</p>
            <p>Drone files need to actually reach the editor.</p>
            <p>Editing has to start before the agent circles back again.</p>
            <p>Package details (photo only? drone? reel?) need confirming.</p>
            <p>Delivery window needs saying out loud.</p>
            <p>
              When all that lives in texts, random gallery notes, and whatever you remember at 9pm,
              you become the only person who can give a straight answer.
            </p>
            <p>Not because you want to. Just because nothing else holds it together.</p>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className={`${VESSA_PANEL} border border-white/10 py-4`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              One listing · open loops
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                <span className="text-sm text-white/78">Shoot</span>
                <span className="text-right text-xs text-white/50">Done · 87 Pine</span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                <span className="text-sm text-white/78">Upload</span>
                <span className="text-right text-xs text-[#D4A853]">Waiting on drone files</span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                <span className="text-sm text-white/78">Editing</span>
                <span className="text-right text-xs text-white/50">Not started</span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                <span className="text-sm text-white/78">Agent update</span>
                <span className="text-right text-xs text-[#DB2777]/90">Asked twice today</span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span className="text-sm text-white/78">Delivery</span>
                <span className="text-right text-xs text-white/50">Blocked until upload lands</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RemToolsSection() {
  return (
    <section id="existing-tools" className="border-t border-white/[0.06] py-10 lg:py-16">
      <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>
            Leave booking, galleries, payments, and final delivery where they are.
          </h2>
          <div className={`mt-5 space-y-4 lg:max-w-xl ${VESSA_BODY}`}>
            <p>Those pieces are already working. Fine.</p>
            <p>
              StudioFlows only steps in on the part that usually turns into a shitshow after the
              order books:
            </p>
            <ul className="space-y-2 text-white/68">
              <li>Who has the shoot today.</li>
              <li>Did the upload actually land.</li>
              <li>Has editing started.</li>
              <li>What changed since yesterday.</li>
              <li>What still needs touching before it goes to the agent.</li>
            </ul>
            <p>
              Back office stays quiet. Agents never notice the difference until things just&hellip;
              move faster.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 lg:mt-0">
          <ToolStack label="Keep in place" items={KEEP_TOOLS} variant="keep" />
          <ToolStack label="Take over" items={CLEAN_UP} variant="clean" />
        </div>
      </div>
    </section>
  );
}

export function RemScoreSection() {
  return (
    <SectionShell id="media-ops-score">
      <h2 className={REM_H2}>See what&apos;s still routing back to you.</h2>
      <div className={`mt-4 max-w-2xl space-y-3 ${VESSA_BODY}`}>
        <p>Six questions. How jobs actually move in your shop. No org charts. No pretty diagrams.</p>
        <p>
          It just surfaces the drag most of us feel every single week but don&apos;t say out loud.
        </p>
      </div>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {SCORE_CARDS.map((card) => (
          <div key={card.title} className={`${VESSA_PANEL} border border-white/10 py-3.5`}>
            <p className="text-sm font-semibold text-white">{card.title}</p>
            <p className={`mt-1 ${VESSA_BODY_SM}`}>{card.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 lg:max-w-sm">
        <PrimaryCta ctaId="score_section_start">Get My Media Ops Score</PrimaryCta>
      </div>
    </SectionShell>
  );
}

export function RemVoiceAnswerSection() {
  return (
    <SectionShell id="voice-answer-preview">
      <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <h2 className={REM_H2}>One messy example usually says enough.</h2>
          <div className={`mt-4 space-y-3 lg:max-w-xl ${VESSA_BODY}`}>
            <p>Rest of the score is taps.</p>
            <p>
              One question asks for a job that went off the rails. Type it or voice note it.
              Doesn&apos;t have to be clean.
            </p>
          </div>
        </div>
        <div className={`${VESSA_PANEL} mt-6 border border-white/10 py-4 lg:mt-0`}>
          <p className="mt-3 text-sm leading-relaxed text-white/72">
            &ldquo;Harbor Lane. Agent kept texting if photos were sent. Editor still waiting on
            drone. I ended up chasing both at 7:30 at night.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#D4A853]/25 bg-black/30 px-3 py-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#DB2777]" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              Tap to record or type
            </span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function RemResultPreviewSection() {
  return (
    <SectionShell id="result-preview">
      <h2 className={REM_H2}>Score shows what&apos;s actually stuck.</h2>
      <div className={`mt-4 max-w-2xl space-y-3 ${VESSA_BODY}`}>
        <p>Four jobs still pulling you in for updates.</p>
        <p>Pine Street sitting on drone upload. Harbor waiting on edits.</p>
        <p>
          Tomorrow&apos;s Maple Ave shoot needs locking before the gate code texts start again.
        </p>
        <p>
          You feel it when the noise quiets down even a little. That small pocket of space where
          your brain isn&apos;t automatically scanning for what&apos;s about to break.
        </p>
      </div>
    </SectionShell>
  );
}

export function RemDemoWorkspaceSection() {
  return (
    <SectionShell id="demo-workspace">
      <div className="lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
        <div>
          <h2 className={REM_H2}>Step into a sample operation first.</h2>
          <div className={`mt-4 space-y-3 lg:max-w-xl ${VESSA_BODY}`}>
            <p>After the score you get a live demo with listings already moving.</p>
            <p>
              Watch crew mark field complete from the truck. See uploads land. Edits kick off. Status
              updates without the group chat scramble.
            </p>
            <p>
              One job, one screen. The way it feels when the work doesn&apos;t need you holding it
              together every step.
            </p>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30 lg:mt-0">
          <div className="border-b border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Sample operation in motion
          </div>
          <div className="relative aspect-[4/3] w-full bg-[#07070A]">
            <Image
              src="/product/dashboard.png"
              alt="Sample media operations dashboard with active jobs"
              fill
              className="object-cover object-left-top"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function RemFieldFlowSection() {
  return (
    <SectionShell id="fieldflow-preview">
      <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>Crew updates straight from the field. You see it on the job.</h2>
          <div className={`mt-4 space-y-3 lg:max-w-xl ${VESSA_BODY}`}>
            <p>
              Photographer marks field complete or upload pending right on the record from their
              phone.
            </p>
            <p>No more group text archaeology to figure out what changed.</p>
          </div>
        </div>
        <div className="mt-6 space-y-2 lg:mt-0">
          <div className={`${VESSA_PANEL} border border-white/10 py-3.5`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Mobile view</p>
            <p className="mt-2 text-sm font-semibold text-white">87 Pine Street</p>
            <p className={`mt-1 ${VESSA_BODY_SM}`}>Field complete · Waiting on upload</p>
            <p className="mt-3 text-xs text-[#D4A853]">Updated by Alex · 2:14 PM</p>
          </div>
          <div className={`${VESSA_PANEL} border border-[#D4A853]/20 py-3`}>
            <p className="text-sm text-white/72">Owner side: same info. No chasing. Just there.</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function RemFitSection() {
  return (
    <SectionShell id="fit">
      <h2 className={REM_H2}>When this lands</h2>
      <div className={`mt-4 max-w-2xl ${VESSA_BODY}`}>
        <p>Multiple people touching each listing before the media actually reaches the agent.</p>
      </div>
      <ul className={`mt-6 grid gap-2.5 sm:grid-cols-2 ${VESSA_BODY}`}>
        {FIT_LINES.map((line) => (
          <li key={line} className={`${VESSA_PANEL} border border-white/10 py-3 text-white/68`}>
            {line}
          </li>
        ))}
      </ul>
      <p className={`mt-6 max-w-2xl ${VESSA_BODY}`}>
        If any of that sounds like your week, the score will probably feel a little too real.
      </p>
    </SectionShell>
  );
}

export function RemPricingPreviewSection() {
  return (
    <SectionShell id="pricing-preview">
      <div className="lg:max-w-2xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Founding Customer Pricing
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-[#D4A853] lg:text-4xl">
          $99 first month (then $199/mo locked)
        </p>
        <div className={`mt-4 space-y-3 ${VESSA_BODY}`}>
          <p>One workspace for the crew. No per-seat math right away.</p>
          <p>
            Run the score. Walk the demo. Only move forward once you see how much less pulls on you.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

export function RemProofStripSection() {
  return (
    <SectionShell id="proof-strip">
      <h2 className={REM_H2}>The questions that still hit your phone</h2>
      <div className={`mt-4 max-w-2xl ${VESSA_BODY}`}>
        <p>
          Score shows the exact status checks still coming back to you before you pay for anything.
        </p>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        {PROOF_ITEMS.map((item) => (
          <div
            key={item}
            className={`${VESSA_PANEL} border border-[#DB2777]/25 py-3.5`}
          >
            <p className="text-sm text-white/78">{item}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function RemFinalCtaSection() {
  return (
    <SectionShell id="final-cta" className="pb-28 lg:pb-20">
      <div className="lg:mx-auto lg:max-w-2xl lg:text-center">
        <h2 className={REM_H2}>Start with the score. No call. No bullshit.</h2>
        <div className={`mt-4 space-y-3 ${VESSA_BODY}`}>
          <p>Three minutes. Mostly taps. Demo workspace right after.</p>
          <p>
            See the gaps for what they are. Feel what it&apos;s like when some of that weight
            just&hellip; isn&apos;t there anymore.
          </p>
        </div>
        <div className="mt-8 lg:flex lg:justify-center">
          <PrimaryCta ctaId="final_cta_start">Get My Media Ops Score</PrimaryCta>
        </div>
      </div>
    </SectionShell>
  );
}

export function RemStickyMobileCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 px-4 pb-4 pt-6 md:hidden [background:linear-gradient(to_top,rgba(3,3,4,0.96)_55%,transparent)]">
      <Link
        href={buildRemScoreHref("final_cta_start")}
        className={`${VESSA_CTA_BLOCK} pointer-events-auto min-h-[52px] text-[11px] shadow-[0_-8px_32px_rgba(0,0,0,0.45)]`}
      >
        Get My Media Ops Score
      </Link>
    </div>
  );
}

export function RemPageShell({ children }) {
  useEffect(() => {
    captureRemAttributionForPath(REM_LANDING_PATH);
  }, []);

  return (
    <main className={`${VESSA_BG} min-h-screen`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] lg:[background-size:64px_64px]" />
      <div className="relative z-10 mx-auto w-full max-w-md overflow-x-hidden px-5 md:max-w-3xl md:px-8 lg:max-w-[1100px] lg:px-10">
        {children}
      </div>
      <RemStickyMobileCta />
    </main>
  );
}
