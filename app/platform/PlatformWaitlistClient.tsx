"use client";

import Link from "next/link";
import { useState } from "react";

import { flattenPlatformMoldOptions } from "@/lib/platform-molds";

const MOLD_OPTIONS = flattenPlatformMoldOptions();

export default function PlatformWaitlistClient() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [verticalMold, setVerticalMold] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/platform/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consent,
          full_name: fullName,
          work_email: workEmail,
          company_name: companyName,
          vertical_mold: verticalMold,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Waitlist submission failed");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Waitlist submission failed");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">You&apos;re on the Accelerate waitlist.</h2>
        <p className="mt-3 text-white/75">
          We&apos;ll reach out when your vertical mold opens. Explore other speeds to revenue while you wait.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/vessa" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">
            Optimize with Vessa
          </Link>
          <Link
            href="/services/custom-ops-hub"
            className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white"
          >
            Custom Command
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-xs uppercase tracking-wider text-white/60">Full name</span>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#FACC15]"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="text-xs uppercase tracking-wider text-white/60">Work email</span>
          <input
            required
            type="email"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#FACC15]"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wider text-white/60">Company</span>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#FACC15]"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wider text-white/60">Vertical mold interest</span>
          <select
            value={verticalMold}
            onChange={(e) => setVerticalMold(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#FACC15]"
          >
            <option value="">Select a business type (optional)</option>
            {MOLD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
          required
        />
        <span>I agree to be contacted about Accelerate and understand this is a waitlist, not immediate access.</span>
      </label>

      {status === "error" && <p className="mt-4 text-sm text-red-300">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-xl bg-[#FACC15] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-black transition hover:brightness-105 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Join Accelerate waitlist"}
      </button>
    </form>
  );
}
