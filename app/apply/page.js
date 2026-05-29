import Link from "next/link";

import HomePreQualifierSection from "@/components/home/HomePreQualifierSection";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" aria-label="StudioFlows home">
            <img
              src="/StudioFlows logo white (1200 x 675 px).png"
              alt="StudioFlows"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>
          <Link href="/" className="text-sm text-white/70 transition hover:text-white">
            ← Back
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1240px] px-5 pb-24 pt-10 sm:px-8 lg:px-10">
        <HomePreQualifierSection />
      </div>
    </main>
  );
}
