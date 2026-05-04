"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const SCENARIOS = [
  {
    id: "client-delivery-risk",
    label: "Client delivery risk",
    signal:
      "Two client projects are within 24 hours of deadline. One key asset is still pending review and the owner is offline.",
    recommendation:
      "Reassign review ownership, send a revised client update, and lock a 2-hour QA checkpoint before delivery.",
    outcomes: {
      approve: [
        "Vessa reassigns review to the fallback owner.",
        "Vessa sends the approved client status update.",
        "Vessa opens a time-boxed QA checkpoint and tracks completion."
      ],
      adjust: [
        "Vessa keeps original owner but escalates to a manager.",
        "Vessa prepares a softer client update for your approval.",
        "Vessa schedules a shorter QA pass with manual sign-off."
      ],
      hold: [
        "No reassignment occurs and the deadline risk remains open.",
        "Vessa logs the risk and requests a manual owner decision.",
        "Execution stays paused until leadership decides."
      ]
    }
  },
  {
    id: "invoicing-bottleneck",
    label: "Invoicing bottleneck",
    signal:
      "12 invoices are pending, 5 are blocked by missing delivery confirmation, and cash collection is slowing this week.",
    recommendation:
      "Bundle completion evidence, route approvals by account priority, and release invoices in two controlled waves.",
    outcomes: {
      approve: [
        "Vessa compiles proof-of-delivery artifacts per account.",
        "Vessa routes high-priority approvals first.",
        "Vessa releases wave 1 invoices and schedules wave 2."
      ],
      adjust: [
        "Vessa lowers first-wave volume and extends due dates for selected accounts.",
        "Vessa creates a custom exception list for your sign-off.",
        "Vessa sends finance a revised release sequence."
      ],
      hold: [
        "Invoice queue remains blocked and collection delays continue.",
        "Vessa flags the accounts with highest exposure.",
        "Vessa holds release actions pending manual override."
      ]
    }
  },
  {
    id: "team-capacity-crunch",
    label: "Team capacity crunch",
    signal:
      "This week has a 34% workload spike, but two senior operators are at capacity and ticket response time is slipping.",
    recommendation:
      "Rebalance assignments, defer low-impact work, and open a temporary rapid-response lane for priority tickets.",
    outcomes: {
      approve: [
        "Vessa reassigns priority work to available operators.",
        "Vessa defers low-impact tasks to next sprint.",
        "Vessa activates a rapid-response lane with clear ownership."
      ],
      adjust: [
        "Vessa keeps assignment map mostly intact.",
        "Vessa defers fewer tasks and raises SLA warnings.",
        "Vessa asks for one additional approval before rapid-response activation."
      ],
      hold: [
        "Current workload plan remains and response lag is likely to grow.",
        "Vessa records capacity risk and alerts leadership.",
        "No routing changes are executed."
      ]
    }
  }
];

const DECISIONS = [
  { id: "approve", label: "Approve and execute" },
  { id: "adjust", label: "Adjust and continue" },
  { id: "hold", label: "Hold and escalate" }
];

export default function FinalVessaPage() {
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS[0].id);
  const [decisionByScenario, setDecisionByScenario] = useState(() =>
    SCENARIOS.reduce((acc, scenario) => ({ ...acc, [scenario.id]: "approve" }), {})
  );

  const activeScenario = useMemo(
    () => SCENARIOS.find((scenario) => scenario.id === activeScenarioId) ?? SCENARIOS[0],
    [activeScenarioId]
  );

  const activeDecision = decisionByScenario[activeScenario.id] ?? "approve";

  return (
    <main className="min-h-screen bg-[#07070B] text-[#F7F7FC]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="border-b border-[#27273A] pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9A9AB0]">Vessa (Candidate)</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            You bring the chaos.
            <br />
            I will bring the clean move.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#B9B9CC]">
            Meet Vessa, the autonomous AI COO that manages your Ops Hub, filters noise, surfaces decisions, and moves
            work forward with traceability.
          </p>
          <p className="mt-4 text-[#FF2FB3]">Chat is the interface. Execution is the product.</p>
          <div className="mt-8">
            <Link href="https://vessa.studioflows.co/vessa/login?intent=signup" className="rounded-lg bg-[#FF2FB3] px-5 py-3 text-sm font-medium text-black">
              Start with Vessa
            </Link>
          </div>
        </header>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Not a Chatbot. An Execution Interface.</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Most AI tools help you think. Vessa helps your business move.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>A chatbot waits for prompts. Vessa surfaces what needs attention.</li>
            <li>A chatbot generates text. Vessa prepares execution deliverables.</li>
            <li>A chatbot helps you think. Vessa helps your business operate.</li>
          </ul>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">The Operating Layer Between Decisions and Done</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Businesses usually do not break because nobody knows what is happening. They break because too much is
            happening at once. Vessa catches the signal, understands context, prepares the move, and routes it where it
            belongs.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>High-impact decisions appear on the Decide page.</li>
            <li>Lightweight approvals can happen inside chat.</li>
            <li>Completed actions move into the execution feed.</li>
            <li>Everything important is traceable.</li>
          </ul>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">How Vessa Works</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Observe</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Ingests operational signals, context, workflow state, and execution history.
              </p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Decide</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Identifies priority, risk, and the highest-value next move.
              </p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Prepare</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">Builds approval-ready operational deliverables.</p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Approve</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">Routes high-impact approvals to the right human checkpoint.</p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Execute</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Triggers tasks, ownership, status transitions, and communication workflows.
              </p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Learn</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Every decision, action, and outcome strengthens operating memory.
              </p>
            </div>
          </div>
          <p className="mt-6 text-[#FF2FB3]">Compounding execution intelligence.</p>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">MosaIQ Engine</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Signal Ingestion</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Vessa processes chaos, ingesting signals and filtering noise automatically.
              </p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">The Governor&apos;s Desk</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Identifies systemic failures like lost handoffs before they hit revenue.
              </p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Active Ops</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Flags blockers and forces command assignment so execution does not stall.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-[#27273A] bg-[#10101A] p-4">
            <h3 className="font-medium text-white">MosaIQ Gateway</h3>
            <p className="mt-1 text-sm text-[#B9B9CC]">
              Universal inter-product gateway that lets Vessa coordinate and govern execution across systems.
            </p>
          </div>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">The Decide Page: Where Operations Stop Drifting</h2>
          <p className="mt-4 text-[#B9B9CC]">No noise. No raw logs. Just decisions that require judgment.</p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>what Vessa is proposing</li>
            <li>why it matters</li>
            <li>risk, confidence, and expected impact</li>
            <li>approval action and execution trace</li>
          </ul>
          <p className="mt-6 text-[#B9B9CC]">Leadership leverage comes from approving what matters, not reviewing everything.</p>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Execution Deliverables, Not AI Answers</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Vessa creates business-ready operational objects that can be reviewed, approved, executed, and tracked.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>SLA control decisions</li>
            <li>QA enforcement decisions</li>
            <li>workload balancing proposals</li>
            <li>delivery package previews</li>
            <li>exception response plans</li>
            <li>execution contracts</li>
            <li>bottleneck resolution outputs</li>
            <li>internal communication approvals</li>
          </ul>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Controlled Autonomy, Not Chaos</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Vessa does not blindly automate meaningful business actions. She knows when approval is required, where to
            ask, and how to record the decision.
          </p>
          <p className="mt-4 text-[#B9B9CC]">
            High-impact decisions route through Decide. Lower-friction communication approvals can happen in chat.
          </p>
          <p className="mt-4 text-[#FF2FB3]">You stay in control. The business moves faster.</p>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Try a Vessa Simulation</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Pick a real operational scenario. Make a decision. See how Vessa turns that decision into execution.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {SCENARIOS.map((scenario) => {
              const isActive = scenario.id === activeScenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className={`rounded-lg border p-3 text-left text-sm transition ${
                    isActive
                      ? "border-[#FF2FB3] bg-[#1A1020] text-white"
                      : "border-[#27273A] bg-[#10101A] text-[#B9B9CC] hover:border-[#6D2B59]"
                  }`}
                >
                  {scenario.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-[#27273A] bg-[#10101A] p-5">
            <h3 className="text-lg font-semibold text-white">What Vessa sees</h3>
            <p className="mt-2 text-sm leading-7 text-[#B9B9CC]">{activeScenario.signal}</p>

            <h3 className="mt-5 text-lg font-semibold text-white">What Vessa recommends</h3>
            <p className="mt-2 text-sm leading-7 text-[#B9B9CC]">{activeScenario.recommendation}</p>

            <h3 className="mt-5 text-lg font-semibold text-white">Make the call</h3>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              {DECISIONS.map((decision) => {
                const isSelected = decision.id === activeDecision;
                return (
                  <button
                    key={decision.id}
                    type="button"
                    onClick={() =>
                      setDecisionByScenario((prev) => ({
                        ...prev,
                        [activeScenario.id]: decision.id
                      }))
                    }
                    className={`rounded-lg border px-4 py-2 text-sm transition ${
                      isSelected
                        ? "border-[#FF2FB3] bg-[#29142D] text-white"
                        : "border-[#27273A] text-[#B9B9CC] hover:border-[#6D2B59]"
                    }`}
                  >
                    {decision.label}
                  </button>
                );
              })}
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">What happens next</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#B9B9CC]">
              {activeScenario.outcomes[activeDecision].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#FF2FB3]">
              Simulated execution trace generated by Vessa logic
            </p>
          </div>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Powered by Axiom</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Vessa is powered by Axiom, the intelligence and execution engine that structures decisions, playbooks,
            validations, approvals, and traceable outcomes underneath every workflow.
          </p>
          <p className="mt-4 text-[#FF2FB3]">Business intelligence that moves work forward.</p>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-semibold">The Real Outcome</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>fewer dropped decisions</li>
            <li>fewer missed follow-ups</li>
            <li>clearer ownership</li>
            <li>faster approval cycles</li>
            <li>stronger execution visibility</li>
            <li>less founder dependency</li>
            <li>more work moving without more meetings</li>
          </ul>
          <h3 className="mt-8 text-xl font-semibold">The Simple Version</h3>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>Vessa watches the business.</li>
            <li>Vessa prepares the work.</li>
            <li>Vessa asks when judgment is needed.</li>
            <li>Vessa executes after approval.</li>
            <li>Vessa tracks what happened.</li>
          </ul>
          <p className="mt-6 text-[#B9B9CC]">Not another chatbot. Not another dashboard. The interface where business work moves.</p>
          <div className="mt-8">
            <Link href="https://vessa.studioflows.co/vessa/login?intent=signup" className="rounded-lg bg-[#FF2FB3] px-5 py-3 text-sm font-medium text-black">
              Start with Vessa
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
