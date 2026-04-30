"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { sanitizeProductKey, validateRelativeNext, validateReturnTo } from "../../lib/auth/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!email.trim()) {
      setStatus("error");
      setMessage("Email is required.");
      return;
    }

    if (!supabase) {
      setStatus("error");
      setMessage("Auth is unavailable. Missing Supabase environment variables.");
      return;
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const context = {
      product: sanitizeProductKey(urlSearchParams.get("product")),
      returnTo: validateReturnTo(urlSearchParams.get("return_to")),
      next: validateRelativeNext(urlSearchParams.get("next")),
    };

    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("intent", "login");
    if (context.product) callbackUrl.searchParams.set("product", context.product);
    if (context.returnTo) callbackUrl.searchParams.set("return_to", context.returnTo);
    if (context.next) callbackUrl.searchParams.set("next", context.next);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message || "Unable to send magic link.");
      return;
    }

    setStatus("success");
    setMessage("Magic link sent. Check your inbox to continue.");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272727] text-[#F7F7F7]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative z-10 mx-auto w-full max-w-[760px] px-6 py-12 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between py-4">
          <img
            src="/StudioFlows logo white (1200 x 675 px).png"
            alt="StudioFlows"
            className="h-12 w-auto object-contain opacity-90 sm:h-14"
          />
          <Link href="/signup" className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white">
            Need an account?
          </Link>
        </nav>

        <section className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Global Auth</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Log in</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Use your work email to receive a magic link. You will be routed to the correct StudioFlows product after authentication.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block space-y-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Work Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55"
              />
            </label>

            {status !== "idle" && (
              <div
                className={`rounded-lg border px-3 py-2 text-sm ${
                  status === "success"
                    ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                    : "border-red-300/35 bg-red-300/10 text-red-200"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="rounded-xl bg-[#BC9A2D] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105"
            >
              Send Magic Link
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
