"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "./easing";

const MotionLink = motion.create(Link);

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Stagger({ as = "div", className, style, children, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({ as = "div", href, className, style, children, ...rest }) {
  if (href) {
    return (
      <MotionLink href={href} className={className} style={style} variants={itemVariants} {...rest}>
        {children}
      </MotionLink>
    );
  }
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag className={className} style={style} variants={itemVariants} {...rest}>
      {children}
    </MotionTag>
  );
}
