"use client";

import Link from "next/link";

export default function FinalOSPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-[#F5F7FA]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B3BDC9]">StudioFlows OS (Candidate)</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Custom Business Operating Systems for Companies That Have Outgrown Patchwork Tools
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#B3BDC9]">
            Most growing companies do not have a strategy problem. They have an operating system problem.
          </p>
          <p className="mt-4 text-[#B3BDC9]">
            The work is usually scattered across CRMs, spreadsheets, calendars, inboxes, Stripe, Slack, PDFs, client
            portals, and someone&apos;s memory.
          </p>
          <p className="mt-4 text-white">StudioFlows OS fixes that.</p>
        </header>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">What StudioFlows OS Does</h2>
          <p className="mt-4 text-[#B3BDC9]">
            We design and build a connected internal operating portal around how your business actually works.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B3BDC9]">
            <li>internal admin and operations dashboards</li>
            <li>job, booking, and delivery workflows</li>
            <li>staff scheduling and assignment surfaces</li>
            <li>customer/company/account records</li>
            <li>orders, billing, products, receipts, invoices</li>
            <li>client-facing status and portal pages</li>
            <li>role-based access and modular controls</li>
          </ul>
          <p className="mt-6 text-white">Your business gets one place to operate from.</p>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">Built Around How Your Business Actually Runs</h2>
          <p className="mt-4 text-[#B3BDC9]">
            Off-the-shelf software forces your business into someone else&apos;s workflow. StudioFlows OS works the other
            way around.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B3BDC9]">
            <li>Service companies: bookings, assignments, delivery tracking</li>
            <li>Agencies: approvals, milestones, retainers, billing visibility</li>
            <li>Consultancies: diagnostics, decision logs, risk registers, outcomes</li>
            <li>SaaS: onboarding, entitlements, success health, renewal signals</li>
          </ul>
          <p className="mt-6 text-white">Different business models. Same principle: make the operation executable.</p>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">Core Capabilities</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-white/15 p-4">
              <h3 className="font-medium text-white">Multi-Tenant Portal Architecture</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">Tenant-scoped data, role-gated access, and clean boundaries.</p>
            </div>
            <div className="rounded-lg border border-white/15 p-4">
              <h3 className="font-medium text-white">Founder + Ops Dashboards</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">KPIs, risk surfaces, exceptions, action queues, status snapshots.</p>
            </div>
            <div className="rounded-lg border border-white/15 p-4">
              <h3 className="font-medium text-white">Jobs, Schedules, and Teams</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">Lifecycle visibility from booking to delivery with clear ownership.</p>
            </div>
            <div className="rounded-lg border border-white/15 p-4">
              <h3 className="font-medium text-white">Billing + Products + Receipts</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">Commercial workflows connected to operational execution.</p>
            </div>
            <div className="rounded-lg border border-white/15 p-4">
              <h3 className="font-medium text-white">Modular Automation Layer</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">
                Reusable modules for PDFs, storage, email, counters, confirmations, and invoicing.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">Who It Is Built For</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B3BDC9]">
            <li>service businesses with complex jobs, teams, schedules, and delivery workflows</li>
            <li>agencies managing clients, retainers, approvals, and production</li>
            <li>consultancies turning expertise into repeatable delivery systems</li>
            <li>SaaS companies managing customer lifecycle operations</li>
            <li>founder-led teams that need leverage without unnecessary headcount</li>
          </ul>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">Why Companies Need This</h2>
          <p className="mt-4 text-[#B3BDC9]">
            As businesses grow, every tool owns one slice of truth. CRM has customer data. Stripe has payment data.
            Calendar has bookings. Slack has conversation context. Founder has the real picture.
          </p>
          <p className="mt-4 text-[#B3BDC9]">
            StudioFlows OS becomes the connective tissue so work can move with less confusion and stronger
            accountability.
          </p>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-semibold">The Outcome</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B3BDC9]">
            <li>fewer manual handoffs</li>
            <li>clearer ownership</li>
            <li>cleaner scheduling</li>
            <li>stronger visibility and accountability</li>
            <li>faster execution and less founder dependency</li>
          </ul>
          <p className="mt-6 text-white">This is not software for the sake of software. This is operating leverage.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/apply" className="rounded-lg bg-[#D5DEED] px-5 py-3 text-sm font-medium text-black">
              Build Your StudioFlows OS
            </Link>
            <Link href="/apply" className="rounded-lg border border-white/20 px-5 py-3 text-sm text-white">
              Book an Operating System Walkthrough
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
