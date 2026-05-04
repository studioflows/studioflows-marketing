"use client";

import Link from "next/link";

export default function FinalHomePage() {
  return (
    <main className="min-h-screen bg-[#0C1110] text-[#F3F7F4]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B3BDC9]">StudioFlows (Candidate)</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            AI should not just chat.
            <br />
            It should execute.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#B3BDC9] sm:text-lg">
            StudioFlows builds AI business intelligence and execution systems for companies that are done running
            operations from scattered tools and memory.
          </p>
          <p className="mt-3 text-sm text-[#C7D2CD]">
            High-stakes software and service companies, agencies, consultancies, and service-based businesses.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/final/os" className="rounded-lg bg-[#9FE7C3] px-5 py-3 text-sm font-medium text-black">
              Explore StudioFlows OS
            </Link>
            <Link href="/apply" className="rounded-lg border border-white/20 px-5 py-3 text-sm text-white">
              Book a Strategy Walkthrough
            </Link>
          </div>
        </header>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">Most Companies Do Not Have a Strategy Problem</h2>
          <p className="mt-4 text-[#B3BDC9]">They have an operating system problem.</p>
          <p className="mt-4 text-[#B3BDC9]">
            Work is spread across Slack, docs, calendars, inboxes, spreadsheets, dashboards, and someone&apos;s head.
            That works until it does not.
          </p>
          <p className="mt-4 text-[#B3BDC9]">
            StudioFlows connects intelligence to action so decisions stop dying in handoffs.
          </p>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">How the StudioFlows Stack Works</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-[#B3BDC9]">
            <li>
              <strong className="text-white">StudioFlows OS:</strong> your custom internal operating system for jobs,
              teams, customers, schedules, billing, and delivery workflows.
            </li>
            <li>
              <strong className="text-white">Axiom:</strong> the intelligence engine that turns business signals into
              decisions, execution contracts, approval flows, and traceable outcomes.
            </li>
            <li>
              <strong className="text-white">Vessa:</strong> the AI COO interface where teams review what matters,
              approve action, and move work forward.
            </li>
          </ul>
          <p className="mt-6 text-white">
            Not just dashboards. Not just automation. Not just AI chat.
            <br />
            A connected execution system for companies that need to run sharper.
          </p>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">The StudioFlows Philosophy</h2>
          <p className="mt-4 text-[#B3BDC9]">
            Visibility is not enough. You can know what happened and still miss what needs to happen next.
          </p>
          <p className="mt-4 text-[#B3BDC9]">StudioFlows creates a governed execution loop:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[#B3BDC9]">
            <li>signals become decisions</li>
            <li>decisions become deliverables</li>
            <li>deliverables become approvals</li>
            <li>approvals become actions</li>
            <li>actions become traceable outcomes</li>
          </ul>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">Axiom: The Intelligence Engine Behind Execution</h2>
          <p className="mt-4 text-[#B3BDC9]">
            Axiom turns business signals into structured decisions, execution contracts, approvals, actions, and
            traceable outcomes.
          </p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-lg font-medium text-white">Axiom</dt>
              <dd className="mt-1 text-[#B3BDC9]">
                The core intelligence infrastructure behind StudioFlows.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-white">Execution Intelligence</dt>
              <dd className="mt-1 text-[#B3BDC9]">
                AI that does not just predict. It completes workflows end-to-end with control.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-white">Compounding Intelligence</dt>
              <dd className="mt-1 text-[#B3BDC9]">
                Systems that learn from failures and improve execution quality over time.
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-[#B3BDC9]">
            Most software shows what happened. Axiom helps decide what should happen next, then moves it forward.
          </p>
          <div className="mt-6">
            <Link href="/final/behind-the-scenes" className="text-sm text-[#D5DEED] underline underline-offset-4">
              Go deeper: Behind the Scenes (Axiom)
            </Link>
          </div>
        </section>

        <section className="border-b border-white/10 py-10">
          <h2 className="text-2xl font-semibold">Ecosystem Directory</h2>
          <div className="mt-6 space-y-3">
            <Link href="/final/vessa" className="block rounded-lg border border-white/15 p-4">
              <h3 className="text-lg font-medium">Vessa (AI COO)</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">The interface where business work moves.</p>
            </Link>
            <Link href="/products" className="block rounded-lg border border-white/15 p-4">
              <h3 className="text-lg font-medium">StudioFlows Systems</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">How our products and layers connect.</p>
            </Link>
            <a href="#" className="block rounded-lg border border-white/15 p-4">
              <h3 className="text-lg font-medium">StudioFlows Life / Kits</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">Playbooks and practical operating kits.</p>
            </a>
            <Link href="/final/os" className="block rounded-lg border border-white/15 p-4">
              <h3 className="text-lg font-medium">StudioFlows OS (Consulting)</h3>
              <p className="mt-1 text-sm text-[#B3BDC9]">
                Custom operating systems for companies that outgrew patchwork tools.
              </p>
            </Link>
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-semibold">The Result</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B3BDC9]">
            <li>reduce operational drag</li>
            <li>fewer dropped handoffs</li>
            <li>clearer ownership</li>
            <li>move faster from decision to execution</li>
            <li>reduce founder dependency</li>
            <li>create repeatable, traceable workflows</li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/final/os" className="rounded-lg bg-[#9FE7C3] px-5 py-3 text-sm font-medium text-black">
              Build Your StudioFlows OS
            </Link>
            <Link href="/apply" className="rounded-lg border border-white/20 px-5 py-3 text-sm text-white">
              Book a Strategy Walkthrough
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
