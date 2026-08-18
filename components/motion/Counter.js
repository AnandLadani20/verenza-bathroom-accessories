"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || !to) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, to]);

  return (
    <div className="num" ref={ref}>
      {display}
      {suffix}
    </div>
  );
}
