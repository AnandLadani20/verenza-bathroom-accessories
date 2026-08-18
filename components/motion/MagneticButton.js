"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MotionLink = motion.create(Link);
const SPRING = { stiffness: 300, damping: 20, mass: 0.5 };

function useMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { style: { x: sx, y: sy }, onMouseMove, onMouseLeave };
}

export default function MagneticButton({ href, external, download, target, rel, type, className, children, ...rest }) {
  const magnetic = useMagnetic();

  if (!href) {
    return (
      <motion.button
        type={type || "button"}
        className={className}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }

  if (external || download || target) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={className}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink
      href={href}
      className={className}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      {...rest}
    >
      {children}
    </MotionLink>
  );
}
