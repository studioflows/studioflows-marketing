"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { authContextToQuery, buildAuthContextFromSearchParams, mergeAuthContext } from "../../../lib/auth/config";

const AUTH_CONTEXT_STORAGE_KEY = "sf_auth_context";

export default function AuthCompletePage() {
  const [message, setMessage] = useState("Completing sign in...");

  useEffect(() => {
    let cancelled = false;

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function completeOAuthSignIn() {
      if (typeof window === "undefined") return;

      if (!supabase) {
        window.location.href = "/login?error=missing_supabase_client";
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const urlContext = buildAuthContextFromSearchParams(params);
      let storedContext = null;
      try {
        const raw = window.sessionStorage.getItem(AUTH_CONTEXT_STORAGE_KEY);
        if (raw) {
          storedContext = JSON.parse(raw);
        }
      } catch {
        storedContext = null;
      }
      const context = mergeAuthContext(urlContext, storedContext);
      const intent = context.intent === "signup" ? "signup" : "login";

      let session = null;

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          const reason = encodeURIComponent(error.message || "oauth_code_exchange_failed");
          window.location.href = `/login?error=${reason}`;
          return;
        }
        session = data?.session || null;
      }

      if (!session) {
        for (let attempt = 0; attempt < 6; attempt += 1) {
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            session = data.session;
            break;
          }
          await sleep(120);
        }
      }

      if (!session) {
        window.location.href = "/login?error=oauth_session_not_found_after_redirect";
        return;
      }

      await fetch("/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_in: session.expires_in,
        }),
      });

      const query = authContextToQuery({ ...context, intent });
      if (!cancelled) {
        setMessage("Signed in. Routing to your app...");
        window.sessionStorage.removeItem(AUTH_CONTEXT_STORAGE_KEY);
        window.location.href = query ? `/auth/resolve?${query}` : "/auth/resolve";
      }
    }

    completeOAuthSignIn();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272727] text-[#F7F7F7]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative z-10 mx-auto w-full max-w-[760px] px-6 py-12 sm:px-8 lg:px-10">
        <section className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.02] p-7 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Global Auth</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Finishing sign in</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">{message}</p>
          <Link href="/login" className="mt-6 inline-flex text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white">
            Back to login
          </Link>
        </section>
      </div>
    </main>
  );
}
