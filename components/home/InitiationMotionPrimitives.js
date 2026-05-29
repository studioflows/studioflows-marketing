"use client";

import { useEffect, useRef, useState } from "react";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION_MS = 600;
const MOBILE_DURATION_MS = 450;
const RISE_PX = 16;
const MOBILE_RISE_PX = 10;
const THRESHOLD = 0.15;
const ROOT_MARGIN = "0px 0px -15% 0px";

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

function useIsMobileViewport() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return mobile;
}

function useRevealOnViewport({ enabled }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (!enabled || reduced) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, reduced]);

  return { ref, visible: enabled ? visible || reduced : true, reduced };
}

export function RevealSection({ children, className = "", fadeOnly = false, as: Tag = "div" }) {
  const mobile = useIsMobileViewport();
  const { ref, visible, reduced } = useRevealOnViewport({ enabled: true });
  const rise = reduced || fadeOnly ? 0 : mobile ? MOBILE_RISE_PX : RISE_PX;
  const duration = reduced ? 0 : mobile ? MOBILE_DURATION_MS : DURATION_MS;

  const style = {
    opacity: visible ? 1 : 0,
    transform: rise > 0 ? `translateY(${visible ? 0 : rise}px)` : "none",
    transition:
      reduced || duration === 0
        ? "none"
        : `opacity ${duration}ms ${EASING}, transform ${duration}ms ${EASING}`,
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

export function RevealLine({
  children,
  className = "",
  delayMs = 120,
  as: Tag = "span",
}) {
  const mobile = useIsMobileViewport();
  const { ref, visible, reduced } = useRevealOnViewport({ enabled: true });
  const rise = reduced ? 0 : mobile ? 6 : 8;
  const duration = reduced ? 0 : mobile ? 375 : 500;
  const delay = reduced ? 0 : mobile ? Math.round(delayMs * 0.75) : delayMs;

  const style = {
    opacity: visible ? 1 : 0,
    transform: rise > 0 ? `translateY(${visible ? 0 : rise}px)` : "none",
    transition:
      reduced || duration === 0
        ? "none"
        : `opacity ${duration}ms ${EASING} ${delay}ms, transform ${duration}ms ${EASING} ${delay}ms`,
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
