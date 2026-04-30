"use client";

import Link from "next/link";

export default function AxiomPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272727] text-[#F7F7F7]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between py-4 sm:py-5">
          <img
            src="/StudioFlows logo white (1200 x 675 px).png"
            alt="StudioFlows"
            className="h-12 w-auto object-contain opacity-90 sm:h-14"
          />
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-1.5 py-1.5 md:flex">
            {[
              ["StudioFlows", "/"],
              ["Axiom", "/axiom"],
              ["Products", "/products"],
              ["Enterprise", "/enterprise"],
              ["Apply", "/apply"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/[0.07] hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <section className="py-14 text-center lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#D7C48A]">Axiom</p>
          <h1 className="mx-auto mt-6 max-w-[980px] text-balance text-[2.3rem] font-semibold leading-[0.96] tracking-[-0.03em] sm:text-[3rem] lg:text-[5.2rem]">
            AI doesn&apos;t fail because it&apos;s weak.
            <br />
            <span className="text-white/58">It fails because it&apos;s uncontrolled.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[860px] text-balance text-[1.05rem] leading-8 text-white/75 sm:text-[1.15rem]">
            Axiom is execution infrastructure for AI-powered systems. It ensures that every action, decision, and
            output is structured, validated, and safe to run in production.
          </p>
          <p className="mt-4 text-[12px] uppercase tracking-[0.24em] text-[#D7C48A]/85">
            Built for companies where failure is not an option. Legal. Finance. Healthcare. High-stakes SaaS.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/apply"
              className="rounded-xl bg-[#BC9A2D] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105"
            >
              Apply for Access
            </Link>
            <Link
              href="/enterprise"
              className="rounded-xl border border-white/20 bg-transparent px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white/85 transition hover:bg-white/[0.04]"
            >
              Request Enterprise Demo
            </Link>
          </div>
        </section>

        <div className="space-y-10 pb-16">
          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Most AI systems break quietly.</p>
            <div className="mt-6 space-y-2 text-white/72">
              <p>- Outputs become inconsistent</p>
              <p>- Workflows degrade</p>
              <p>- Validation is skipped</p>
              <p>- No visibility into execution</p>
            </div>
            <p className="mt-8 text-white/75">This is not an intelligence problem.</p>
            <p className="mt-1 text-xl font-medium text-[#F1E2B6]">It&apos;s an execution problem.</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AI is easy to demo.
              <br />
              <span className="text-white/58">It&apos;s hard to run in production.</span>
            </p>
            <p className="mt-6 text-white/72">Because production requires:</p>
            <div className="mt-3 space-y-2 text-white/72">
              <p>- structure</p>
              <p>- control</p>
              <p>- validation</p>
              <p>- traceability</p>
            </div>
            <p className="mt-6 text-[#F1E2B6]">Axiom is that layer.</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">What Axiom Is</p>
            <p className="mt-5 text-white/75">Axiom is controlled execution infrastructure.</p>
            <p className="mt-2 text-white/75">It sits behind AI-powered workflows.</p>
            <p className="mt-2 text-white/75">It does not generate output.</p>
            <p className="mt-2 text-white/75">It governs what happens after.</p>
            <div className="mt-7 space-y-2 text-white/72">
              <p>- structured before execution</p>
              <p>- validated during execution</p>
              <p>- verified before completion</p>
            </div>
            <p className="mt-7 text-white/75">Nothing runs unchecked.</p>
            <p className="text-[#F1E2B6]">Nothing completes without proof.</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">What It Enables</p>
            <p className="mt-5 text-white/75">For B2B SaaS: Axiom becomes the production layer for AI.</p>
            <div className="mt-6 space-y-2 text-white/72">
              <p>- custom AI workflows inside your product</p>
              <p>- controlled execution paths</p>
              <p>- safe, auditable outputs</p>
              <p>- scalable systems without degradation</p>
            </div>
            <p className="mt-7 text-[#F1E2B6]">This is how AI moves from feature to infrastructure.</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Control Flow</p>
            <p className="mt-5 text-lg text-white/82">
              Intent → Structured Plan → Validation → Execution → Evidence → Verified Outcome
            </p>
            <p className="mt-6 text-white/75">If a condition fails: the system stops.</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Why It Matters</p>
            <p className="mt-5 text-white/75">Without control:</p>
            <div className="mt-3 space-y-2 text-white/72">
              <p>- systems drift</p>
              <p>- outputs become unreliable</p>
              <p>- trust breaks</p>
            </div>
            <p className="mt-7 text-white/75">With Axiom:</p>
            <div className="mt-3 space-y-2 text-[#F1E2B6]">
              <p>- execution is predictable</p>
              <p>- systems stay aligned</p>
              <p>- behavior holds under scale</p>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Invisible Layer</p>
            <p className="mt-5 text-white/75">Axiom is not a dashboard.</p>
            <p className="mt-2 text-white/75">It&apos;s not a tool.</p>
            <p className="mt-2 text-white/75">It operates behind your system.</p>
            <p className="mt-2 text-white/75">You don&apos;t interact with it.</p>
            <p className="mt-2 text-[#F1E2B6]">You rely on it.</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-12">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Enterprise Positioning</p>
            <p className="mt-5 text-white/75">Designed for:</p>
            <div className="mt-3 space-y-2 text-white/72">
              <p>- regulated industries</p>
              <p>- complex workflows</p>
              <p>- high-risk environments</p>
            </div>
            <p className="mt-7 text-white/75">Built to be:</p>
            <div className="mt-3 space-y-2 text-[#F1E2B6]">
              <p>- deterministic</p>
              <p>- auditable</p>
              <p>- controlled</p>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 text-center sm:p-10 lg:p-12">
            <p className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Most companies are adding AI.
              <br />
              <span className="text-white/60">Very few are building the infrastructure required to run it.</span>
            </p>
            <p className="mt-6 text-white/75">That&apos;s the gap.</p>
            <p className="mt-1 text-xl text-[#F1E2B6]">Axiom closes it.</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 text-center sm:p-10 lg:p-12">
            <Link
              href="/enterprise"
              className="inline-flex rounded-xl bg-[#BC9A2D] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105"
            >
              Request Enterprise Demo
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
