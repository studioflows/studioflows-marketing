import Link from "next/link";

import { FOOTER } from "@/lib/homepage-content";

export default function HomeFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <p className="text-sm text-white/55">{FOOTER.tagline}</p>
      <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/72" aria-label="Footer">
        {FOOTER.links.map((link) =>
          link.href.startsWith("/") ? (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          )
        )}
      </nav>
      <p className="mt-8 text-xs text-white/40">© {new Date().getFullYear()} StudioFlows</p>
    </footer>
  );
}
