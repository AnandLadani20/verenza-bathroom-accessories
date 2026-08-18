"use client";

import { motion } from "framer-motion";
import { EASE } from "./easing";

export default function Reveal({ as = "div", className, children, style, delay = 0, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
