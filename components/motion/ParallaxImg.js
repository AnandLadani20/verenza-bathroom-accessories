"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImg({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div className="bg-img" ref={ref}>
      <motion.img src={src} alt={alt} style={{ y }} />
    </div>
  );
}
