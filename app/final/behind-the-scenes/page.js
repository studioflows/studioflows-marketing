"use client";

import Link from "next/link";

export default function BehindTheScenesPage() {
  return (
    <main className="min-h-screen bg-[#101318] text-[#F5F7FA]">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[#B3BDC9]">Behind the Scenes</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Axiom: The Intelligence Engine Behind Autonomous Business Execution
        </h1>
        <p className="mt-6 text-base leading-8 text-[#B3BDC9]">
          Axiom is the core intelligence layer powering StudioFlows. It turns business signals into structured
          decisions, execution contracts, approvals, actions, and traceable outcomes.
        </p>
        <p className="mt-4 text-base leading-8 text-[#B3BDC9]">
          Unlike traditional dashboards that simply show what happened, Axiom determines what needs to happen next.
          It ingests operational data, evaluates risk and priority, generates execution-ready playbooks, routes
          decisions for approval, and tracks every action through completion.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">A Governed Execution Loop</h2>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B3BDC9]">
          <li>Orchestrator: plans the work and creates execution contracts.</li>
          <li>Executor: carries out work inside explicit constraints.</li>
          <li>Validator: verifies acceptance criteria and blocks weak output.</li>
          <li>Learner: turns failures into stronger future contracts and rules.</li>
          <li>Supervisor: handles escalations and high-risk exceptions.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">In Plain English</h2>
        <p className="mt-4 text-[#B3BDC9]">Axiom does not just analyze your business. It helps run it.</p>

        <div className="mt-8">
          <Link href="/final" className="text-sm text-[#D5DEED] underline underline-offset-4">
            Back to StudioFlows (candidate homepage)
          </Link>
        </div>
      </div>
    </main>
  );
}
