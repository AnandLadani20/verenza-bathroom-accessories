"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SPRING = { stiffness: 200, damping: 22, mass: 0.4 };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ringX = useSpring(mx, RING_SPRING);
  const ringY = useSpring(my, RING_SPRING);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const hoverSelector = "a, button, .cat-card, .product-card, .feat-card, .mosaic-item";

    function onMouseMove(e) {
      mx.set(e.clientX);
      my.set(e.clientY);
    }
    function onEnter(e) {
      if (e.target.closest && e.target.closest(hoverSelector)) setActive(true);
    }
    function onLeave(e) {
      if (e.target.closest && e.target.closest(hoverSelector)) setActive(false);
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onEnter, true);
    document.addEventListener("mouseout", onLeave, true);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onEnter, true);
      document.removeEventListener("mouseout", onLeave, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cursor-dot" style={{ left: mx, top: my }} />
      <motion.div className={`cursor-ring${active ? " is-active" : ""}`} style={{ left: ringX, top: ringY }} />
    </>
  );
}
