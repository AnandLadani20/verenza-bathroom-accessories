"use client";

import { motion } from "framer-motion";
import { EASE } from "./easing";

export default function RevealScale({ as = "div", className, children, style, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.3, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
