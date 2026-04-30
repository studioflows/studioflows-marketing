"use client";

import Link from "next/link";

export default function ProductsPage() {
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
              ["Vessa", "/vessa"],
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

        <section className="py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#D7C48A]">Products</p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Page scaffold ready: products
          </h1>
        </section>
      </div>
    </main>
  );
}
