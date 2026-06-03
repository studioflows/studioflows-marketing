import Link from "next/link";

import HomePreQualifierSection from "@/components/home/HomePreQualifierSection";
import { QualifierAtmosphere, QUALIFIER_PAGE } from "@/components/qualifier/qualifier-theme";

export default function ApplyPage() {
  return (
    <main className={QUALIFIER_PAGE}>
      <QualifierAtmosphere />
      <header className="relative z-10 border-b border-black/10">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" aria-label="StudioFlows home">
            <img
              src="/StudioFlows logo (1200 x 675 px) (1).png"
              alt="StudioFlows"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>
          <Link href="/" className="text-sm text-[#6B6557] transition hover:text-[#0B0B0C]">
            ← Back
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-24 pt-10 sm:px-8 lg:px-10">
        <HomePreQualifierSection />
      </div>
    </main>
  );
}
