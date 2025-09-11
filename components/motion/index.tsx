"use client";
import { motion, HTMLMotionProps } from "motion/react";
import { VARIANTS_SECTION, TRANSITION_SECTION } from "./constants";

export function MotionDiv({
  variants = VARIANTS_SECTION,
  transition = TRANSITION_SECTION,
  initial = "hidden",
  whileInView = "visible",
  viewport = { once: true, amount: 0.2 },
  children,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={variants}
      transition={transition}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function MotionMain({
  variants = VARIANTS_SECTION,
  transition = TRANSITION_SECTION,
  initial = "hidden",
  whileInView = "visible",
  viewport = { once: true, amount: 0.2 },
  children,
  ...rest
}: HTMLMotionProps<"main">) {
  return (
    <motion.main
      variants={variants}
      transition={transition}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.main>
  );
}

export function MotionSection({
  variants = VARIANTS_SECTION,
  transition = TRANSITION_SECTION,
  initial = "hidden",
  whileInView = "visible",
  viewport = { once: true, amount: 0.2 },
  children,
  ...rest
}: HTMLMotionProps<"section">) {
  return (
    <motion.section
      variants={variants}
      transition={transition}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
