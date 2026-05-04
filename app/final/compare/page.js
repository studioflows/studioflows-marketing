"use client";

import Link from "next/link";

export default function FinalComparePage() {
  return (
    <main className="min-h-screen bg-[#111318] text-[#F5F7FA]">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="text-3xl font-semibold sm:text-4xl">Final Concept Compare</h1>
        <p className="mt-4 text-[#B3BDC9]">Wireframe + copy-first candidate routes (no existing pages replaced).</p>

        <div className="mt-8 space-y-3">
          <Link href="/" className="block rounded-lg border border-white/15 p-4">
            <h2 className="font-medium">Current Homepage</h2>
          </Link>
          <Link href="/final" className="block rounded-lg border border-white/15 p-4">
            <h2 className="font-medium">Candidate Homepage (Parent Brand)</h2>
          </Link>
          <Link href="/vessa" className="block rounded-lg border border-white/15 p-4">
            <h2 className="font-medium">Current Vessa</h2>
          </Link>
          <Link href="/final/vessa" className="block rounded-lg border border-white/15 p-4">
            <h2 className="font-medium">Candidate Vessa (Product Brand)</h2>
          </Link>
          <Link href="/final/behind-the-scenes" className="block rounded-lg border border-white/15 p-4">
            <h2 className="font-medium">Candidate Behind the Scenes (Axiom narrative)</h2>
          </Link>
          <Link href="/final/os" className="block rounded-lg border border-white/15 p-4">
            <h2 className="font-medium">Candidate StudioFlows OS (Consulting)</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
