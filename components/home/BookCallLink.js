"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { loadBookCallUrl } from "@/lib/lead-attribution";

export function BookCallLink({ href, className, children }) {
  const [resolvedHref, setResolvedHref] = useState(href);

  useEffect(() => {
    const stored = loadBookCallUrl();
    if (stored) {
      setResolvedHref(stored);
    }
  }, [href]);

  return (
    <Link href={resolvedHref} className={className}>
      {children}
    </Link>
  );
}
