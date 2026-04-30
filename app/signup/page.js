"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { authContextToQuery, buildAuthCallbackUrl, buildAuthContextFromSearchParams } from "../../lib/auth/config";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const context =
    typeof window === "undefined"
      ? { intent: "signup" }
      : buildAuthContextFromSearchParams(new URLSearchParams(window.location.search));

  const loginQuery = authContextToQuery({ ...context, intent: "login" });
  const loginHref = loginQuery ? `/login?${loginQuery}` : "/login";

  async function syncServerSession(session) {
    await fetch("/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
      }),
    });
  }

  function routeToResolver(contextValue) {
    const query = authContextToQuery({ ...contextValue, intent: "signup" });
    window.location.href = query ? `/auth/resolve?${query}` : "/auth/resolve";
  }

  function buildCallbackUrl(contextValue) {
    return buildAuthCallbackUrl({ ...contextValue, intent: "signup" });
  }

  async function handleEmailSignup(event) {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!email.trim()) {
      setStatus("error");
      setMessage("Email is required.");
      return;
    }
    if (!password.trim()) {
      setStatus("error");
      setMessage("Password is required.");
      return;
    }
    if (!supabase) {
      setStatus("error");
      setMessage("Auth is unavailable. Missing Supabase environment variables.");
      return;
    }

    const callbackUrl = buildCallbackUrl(context);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message || "Unable to create account.");
      return;
    }

    if (data?.session) {
      await syncServerSession(data.session);
      routeToResolver(context);
      return;
    }

    setStatus("success");
    setMessage("Check your email to confirm signup and continue.");
  }

  async function handleGoogleSignup() {
    setStatus("idle");
    setMessage("");

    if (!supabase) {
      setStatus("error");
      setMessage("Auth is unavailable. Missing Supabase environment variables.");
      return;
    }

    const callbackUrl = buildCallbackUrl(context);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl.toString(),
        queryParams: { prompt: "select_account" },
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message || "Unable to start Google signup.");
    }
  }

  async function handleMagicLink(event) {
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

    const callbackUrl = buildCallbackUrl(context);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message || "Unable to send magic link.");
      return;
    }

    setStatus("success");
    setMessage("Magic link sent. Complete signup from your inbox.");
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
          <Link href={loginHref} className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white">
            Already have access?
          </Link>
        </nav>

        <section className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Global Auth</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Create your StudioFlows account</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">Choose your preferred signup method.</p>

          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white/[0.07]"
            >
              Continue with Google
            </button>

            <form onSubmit={handleEmailSignup} className="space-y-4 rounded-xl border border-white/12 bg-black/20 p-4">
              <label className="block space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-3 text-sm text-white outline-none focus:border-[#BC9A2D]/55"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-[#BC9A2D] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105"
              >
                Create Account
              </button>
            </form>

            <form onSubmit={handleMagicLink} className="space-y-3 rounded-xl border border-white/12 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/46">Magic link (optional)</p>
              <label className="block space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl border border-white/20 bg-transparent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white/[0.04]"
              >
                Send Magic Link
              </button>
            </form>
          </div>

          {status !== "idle" && (
            <div
              className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
                status === "success"
                  ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                  : "border-red-300/35 bg-red-300/10 text-red-200"
              }`}
            >
              {message}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
