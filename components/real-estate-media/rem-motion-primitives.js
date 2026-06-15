"use client";

import { useEffect, useState } from "react";

export function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export const REM_EASE = [0.16, 1, 0.3, 1];

export const DEFAULT_ARRIVAL_MS = [0, 700, 1800, 3200];
