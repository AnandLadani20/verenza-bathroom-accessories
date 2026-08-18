"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

const CIRCUMFERENCE = 326.7;

export default function RingFill({ pct }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const offset = CIRCUMFERENCE * (1 - pct / 100);
    const controls = animate(CIRCUMFERENCE, offset, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.style.strokeDashoffset = v;
      },
    });
    return () => controls.stop();
  }, [isInView, pct]);

  return <circle ref={ref} className="ring-fill" cx="55" cy="55" r="52" />;
}
