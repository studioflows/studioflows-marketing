"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const SCENARIOS = [
  {
    id: "client-delivery-risk",
    label: "Client delivery risk",
    lane: "action",
    laneLabel: "Lane 1: Action approval",
    signal:
      "Two client projects are within 24 hours of deadline. One key asset is still pending review and the owner is offline.",
    vessaMove:
      "Vessa creates tasks to reassign review ownership, send a team status sync, and open a time-boxed QA checkpoint, then routes those actions for your approval. No deliverable artifact.",
    outcomes: {
      approve: [
        "You approve the reassignment action. Vessa updates ownership in Workstream.",
        "You approve the comms action. Vessa sends the team status sync.",
        "You approve the checkpoint action. Vessa creates the QA task and assigns it."
      ],
      adjust: [
        "You revise the reassignment target before approval.",
        "Vessa holds the comms action and escalates to a manager instead.",
        "Vessa shortens the QA window and resubmits the action set."
      ],
      hold: [
        "No actions run. The deadline risk stays open.",
        "Vessa logs the risk and keeps the action queue paused.",
        "Execution stays blocked until leadership decides."
      ]
    }
  },
  {
    id: "delivery-package-review",
    label: "Delivery package review",
    lane: "deliverable",
    laneLabel: "Lane 2: Deliverable review",
    signal:
      "A client milestone is due tomorrow. The delivery package draft is incomplete and no one has pulled the final asset summary together.",
    vessaMove:
      "Vessa executes the work, builds the delivery package artifact, and sends it to review. You approve the deliverable, then she delivers it.",
    outcomes: {
      approve: [
        "You review the delivery package Vessa built.",
        "You approve the artifact as-is.",
        "Vessa delivers the package to the client workflow and marks the milestone complete."
      ],
      adjust: [
        "You request revisions on the package summary.",
        "Vessa updates the artifact and resubmits for review.",
        "After your approval, Vessa delivers the revised package."
      ],
      hold: [
        "The deliverable stays in review. Nothing is sent.",
        "Vessa flags the milestone risk on Decide.",
        "Delivery waits for your manual override."
      ]
    }
  },
  {
    id: "team-capacity-crunch",
    label: "Team capacity crunch",
    lane: "action",
    laneLabel: "Lane 1: Action approval",
    signal:
      "This week has a 34% workload spike, but two senior operators are at capacity and ticket response time is slipping.",
    vessaMove:
      "Vessa creates reassignment tasks, defers low-impact work in ClickUp, and opens a rapid-response lane, then routes those operational actions for your sign-off.",
    outcomes: {
      approve: [
        "You approve reassignment. Vessa moves priority tickets to available operators.",
        "You approve deferrals. Vessa pushes low-impact tasks to next sprint.",
        "You approve the rapid-response lane. Vessa creates it with clear ownership."
      ],
      adjust: [
        "You keep most assignments intact and approve a smaller reassignment set.",
        "Vessa defers fewer tasks and resubmits the action batch.",
        "You approve rapid-response with a narrower ticket scope."
      ],
      hold: [
        "No routing changes run. Response lag is likely to grow.",
        "Vessa records capacity risk and alerts leadership.",
        "The action queue stays paused."
      ]
    }
  }
];

const DECISIONS = [
  { id: "approve", label: "Approve" },
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
            Meet Vessa, the autonomous AI COO that manages your Ops Hub. She creates tasks on her own, operates in two
            lanes (action approval and deliverable review) and moves work forward with traceability.
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
            Most AI tools help you think. Vessa creates work, executes in the right lane, and routes the checkpoint that
            actually matters.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>A chatbot waits for prompts. Vessa creates tasks and moves on what she sees.</li>
            <li>A chatbot generates text. Vessa takes action or builds deliverables, then asks when needed.</li>
            <li>A chatbot helps you think. Vessa helps your business operate.</li>
          </ul>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">The Operating Layer Between Decisions and Done</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Businesses usually do not break because nobody knows what is happening. They break because too much is
            happening at once. Vessa catches the signal, creates the work, picks the lane, and routes the right approval
            checkpoint.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>High-impact decisions appear on the Decide page.</li>
            <li>Lightweight approvals can happen inside chat.</li>
            <li>Completed actions move into the execution feed.</li>
            <li>Everything important is traceable.</li>
          </ul>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Two Execution Lanes</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Vessa does not pitch tasks for you to approve from scratch. She creates tasks on her own and operates in
            two lanes, so you are always approving the right thing.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#FF2FB3]/40 bg-[#10101A] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#FF2FB3]">Lane 1: Action approval</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Approve the action, not a deliverable</h3>
              <p className="mt-2 text-sm leading-7 text-[#B9B9CC]">
                Vessa takes an operational action that needs your sign-off before it runs. There is no deliverable
                artifact. You approve the action itself.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#B9B9CC]">
                <li>Creating a task in ClickUp and assigning teammates</li>
                <li>Sending team comms</li>
                <li>Reassigning or adjusting existing tasks</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[#B37DFF]/40 bg-[#10101A] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#B37DFF]">Lane 2: Deliverable review</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Review the artifact, then she delivers</h3>
              <p className="mt-2 text-sm leading-7 text-[#B9B9CC]">
                Vessa executes the work, builds the artifact, and sends it to review. Once you approve the deliverable,
                she delivers it.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#B9B9CC]">
                <li>Client update drafts and delivery packages</li>
                <li>Proof-of-completion summaries staged for release</li>
                <li>Revision-ready outputs that need a final human pass</li>
              </ul>
            </div>
          </div>
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
              <h3 className="font-medium text-white">Create</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Creates tasks on her own: action batches in Lane 1 or executable work in Lane 2.
              </p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Route</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Sends action approvals or deliverable reviews to Decide, chat, or Workstream as appropriate.
              </p>
            </div>
            <div className="rounded-lg border border-[#27273A] bg-[#10101A] p-4">
              <h3 className="font-medium text-white">Execute / Deliver</h3>
              <p className="mt-1 text-sm text-[#B9B9CC]">
                Lane 1: runs approved actions. Lane 2: delivers the artifact after final approval.
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
                Flags governance-sensitive moments like lost handoffs before they become operational failures.
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
          <p className="mt-4 text-[#B9B9CC]">
            No noise. No raw logs. Just the checkpoint that matches the lane: action approval or deliverable review.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>what Vessa created and which lane it is in</li>
            <li>why it matters</li>
            <li>risk, confidence, and expected impact</li>
            <li>your approval, revision, or hold, plus the execution trace</li>
          </ul>
          <p className="mt-6 text-[#B9B9CC]">
            Leadership leverage comes from approving actions and reviewing deliverables, not re-deciding work Vessa
            should already be doing.
          </p>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Actions and Artifacts, Not AI Answers</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Vessa does not stop at suggestions. In Lane 1 she routes operational actions for approval. In Lane 2 she
            builds reviewable artifacts, waits for your sign-off, then delivers.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[#B9B9CC]">
            <li>ClickUp task creation, assignment, and reassignment actions</li>
            <li>team comms queued for approval before send</li>
            <li>delivery packages and client-ready drafts in review</li>
            <li>proof-of-completion summaries staged for release</li>
            <li>operator-ready context tied to each checkpoint</li>
          </ul>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Controlled Autonomy, Not Chaos</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Vessa does not blindly automate meaningful business actions. She creates the work, picks the lane, and
            records every approval before anything runs or ships.
          </p>
          <p className="mt-4 text-[#B9B9CC]">
            Lane 1 actions and Lane 2 deliverables route through Decide when impact is high. Lower-friction action
            approvals can happen in chat.
          </p>
          <p className="mt-4 text-[#FF2FB3]">You stay in control. The business moves faster.</p>
        </section>

        <section className="border-b border-[#27273A] py-10">
          <h2 className="text-2xl font-semibold">Try a Vessa Simulation</h2>
          <p className="mt-4 text-[#B9B9CC]">
            Pick a realistic scenario. See which lane Vessa is in, make the call, and trace what happens next.
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

            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#FF2FB3]">{activeScenario.laneLabel}</p>

            <h3 className="mt-5 text-lg font-semibold text-white">What Vessa is doing</h3>
            <p className="mt-2 text-sm leading-7 text-[#B9B9CC]">{activeScenario.vessaMove}</p>

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
              Experience demo. Representative of workflow logic, not a claim of exact live output.
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
            <li>Vessa creates tasks and picks the lane.</li>
            <li>You approve actions or review deliverables.</li>
            <li>Vessa executes or delivers after approval.</li>
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
