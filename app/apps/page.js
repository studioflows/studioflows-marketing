import Link from "next/link";
import { cookies } from "next/headers";
import { getProductDestination } from "../../lib/auth/config";
import { getActiveEntitlements, getAuthenticatedUserFromCookies } from "../../lib/auth/server";

export default async function AppsPage({ searchParams }) {
  const user = await getAuthenticatedUserFromCookies(cookies());
  const entitlements = user ? await getActiveEntitlements(user.id) : [];
  const state = searchParams?.state;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272727] text-[#F7F7F7]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative z-10 mx-auto w-full max-w-[980px] px-6 py-10 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">App Access</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Choose your StudioFlows app</h1>

        {state === "no-access" && (
          <div className="mt-6 rounded-xl border border-red-300/35 bg-red-300/10 px-4 py-3 text-sm text-red-200">
            No active access found for this account. Contact support to request product access.
          </div>
        )}

        {!user && (
          <div className="mt-8 rounded-[20px] border border-white/12 bg-black/25 p-5">
            <p className="text-white/75">You are not signed in.</p>
            <Link href="/login" className="mt-4 inline-flex rounded-lg bg-[#BC9A2D] px-4 py-2 text-xs uppercase tracking-[0.2em] text-black">
              Go to Login
            </Link>
          </div>
        )}

        {user && entitlements.length === 0 && (
          <div className="mt-8 rounded-[20px] border border-white/12 bg-black/25 p-5">
            <p className="text-white/75">No active entitlements were found for this account.</p>
          </div>
        )}

        {entitlements.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {entitlements.map((entitlement) => (
              <div key={entitlement.id} className="rounded-[20px] border border-white/12 bg-black/25 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">{entitlement.product_key}</p>
                <p className="mt-2 text-sm text-white/65">Role: {entitlement.role || "member"}</p>
                <Link
                  href={`/auth/resolve?product=${encodeURIComponent(entitlement.product_key)}`}
                  className="mt-5 inline-flex rounded-lg bg-[#BC9A2D] px-4 py-2 text-xs uppercase tracking-[0.2em] text-black"
                >
                  Continue
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-[20px] border border-white/12 bg-black/25 p-4 text-sm text-white/60">
          <p>Default app preference (coming soon).</p>
          <p className="mt-2 text-white/45">Stub only: no persistence yet.</p>
        </div>
      </div>
    </main>
  );
}
