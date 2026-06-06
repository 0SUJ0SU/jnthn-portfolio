"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const STREAK_STAGGER_SECONDS = 0.12;
const STREAK_EASE = [0.22, 1, 0.36, 1] as const;

const titleStreakVariants = {
  rest: { opacity: 1, x: 0 },
  enter: (streakOffset: number) => ({ opacity: 0, x: streakOffset }),
};

const bioStreakVariants = {
  rest: { opacity: 1, x: 0 },
  enter: (streakOffset: number) => ({ opacity: 0, x: streakOffset }),
};

export default function HeroMasthead() {
  const prefersReducedMotion = useReducedMotion();
  const titleStreakOffset = prefersReducedMotion ? 0 : -140;
  const bioStreakOffset = prefersReducedMotion ? 0 : -70;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-paper px-6 py-24 md:px-8 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 z-0 aspect-video w-full -translate-y-1/2">
        <Image src="/images/hero-bg.png" alt="" fill priority sizes="100vw" className="object-cover opacity-100" />
      </div>
      <h1 className="relative z-10 font-display font-black uppercase leading-[0.8] tracking-tight text-ink">
        <motion.span
          custom={titleStreakOffset}
          variants={titleStreakVariants}
          initial="enter"
          animate="rest"
          transition={{ duration: 0.7, ease: STREAK_EASE }}
          className="block w-max whitespace-nowrap text-[clamp(5rem,36vw,26rem)]"
        >
          JNTHN
        </motion.span>
        <span className="absolute left-1/2 top-full mt-4 w-max max-w-[90vw] -translate-x-1/2 text-center font-mono text-[0.6rem] font-bold uppercase leading-relaxed tracking-[0.2em] text-rust md:text-xs">
          <motion.span
            custom={bioStreakOffset}
            variants={bioStreakVariants}
            initial="enter"
            animate="rest"
            transition={{ duration: 0.6, ease: STREAK_EASE, delay: STREAK_STAGGER_SECONDS }}
            className="block"
          >
            <span className="block">- PORTFOLIO -</span>
          </motion.span>
        </span>
      </h1>
    </section>
  );
}
