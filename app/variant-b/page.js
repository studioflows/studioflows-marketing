"use client";

import Link from "next/link";

export default function VariantBPage() {
  return (
    <main className="min-h-screen bg-[#060608] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1240px] flex-col justify-center px-5 py-16 sm:px-8 lg:px-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#FACC15]">Variant B</p>
        <h1 className="mt-5 max-w-[900px] text-[clamp(2.2rem,7vw,5.4rem)] font-bold leading-[0.94] tracking-[-0.03em]">
          Aggressive Landing Test Surface
        </h1>
        <p className="mt-5 max-w-[760px] text-base leading-8 text-white/78 sm:text-lg">
          This page is isolated from the main homepage so we can test a radically different conversion approach without
          affecting Variant A.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl border border-white/30 px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/[0.08]"
          >
            View Variant A
          </Link>
          <a
            href="#build-zone"
            className="rounded-xl bg-[#FACC15] px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-105"
          >
            Build Variant B
          </a>
        </div>

        <section
          id="build-zone"
          className="mt-14 rounded-2xl bg-[linear-gradient(145deg,rgba(250,204,21,0.14),rgba(17,24,39,0.9))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(250,204,21,0.25)] sm:p-8"
        >
          <p className="text-sm leading-7 text-white/78">
            Ready for the aggressive concept build. Give me your direction and I will implement it directly on this route.
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/55">Route: /variant-b</p>
        </section>
      </div>
    </main>
  );
}
