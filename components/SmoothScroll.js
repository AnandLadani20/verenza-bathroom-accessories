"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    window.__verenzaLenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__verenzaLenis = null;
    };
  }, []);

  // Runs synchronously before the browser paints the new route, so the old
  // scroll position never becomes visible against the new page's content.
  useLayoutEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    if (lenisRef.current) {
      lenisRef.current.stop();
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
      lenisRef.current.start();
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
