"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

type LottieAnimationProps = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
};

export default function LottieAnimation({
  src,
  className = "",
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Lottie: ${src}`);
        }
        return response.json();
      })
      .then((json) => {
        if (!cancelled) {
          setAnimationData(json);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAnimationData(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (reducedMotion || !animationData) {
    return (
      <div
        aria-hidden="true"
        className={`rounded-2xl bg-[linear-gradient(145deg,rgba(99,102,241,0.18),rgba(168,85,247,0.12))] shadow-[inset_0_0_0_1px_rgba(196,181,253,0.2)] ${className}`}
      ></div>
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      aria-hidden="true"
    />
  );
}
