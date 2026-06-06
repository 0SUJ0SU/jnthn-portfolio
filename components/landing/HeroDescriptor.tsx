"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
const containerReveal = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } } };
const lineReveal = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] as const } } };
const cornerDraw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } } };
const DISPLAY_SIZE = "clamp(28px, 6.5vw, 110px)";
const CORNER_OUTER_PATH = "M0,74 L38,40 L260,40";
const CORNER_INNER_PATH = "M14,82 L46,50 L260,50";
export default function HeroDescriptor() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const cornerInitial = prefersReducedMotion ? "visible" : "hidden";
  const cornerAnimate = prefersReducedMotion || isInView ? "visible" : "hidden";
  const cornerFrame = (
    <svg viewBox="0 0 260 90" fill="none" className="h-auto w-full">
      <motion.path d={CORNER_OUTER_PATH} className="stroke-accent" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" variants={cornerDraw} initial={cornerInitial} animate={cornerAnimate} />
      <motion.path d={CORNER_INNER_PATH} className="stroke-accent" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" variants={cornerDraw} initial={cornerInitial} animate={cornerAnimate} />
    </svg>
  );
  return (
    <section ref={sectionRef} aria-labelledby="descriptor-name" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-paper px-6 py-24 md:px-8 lg:px-12">
      <span aria-hidden="true" className="pointer-events-none absolute -left-6 top-7 z-0 w-[clamp(140px,30vw,380px)] md:-left-5 lg:-left-5">{cornerFrame}</span>
      <span aria-hidden="true" className="pointer-events-none absolute -right-6 bottom-7 z-0 w-[clamp(140px,30vw,380px)] rotate-180 md:-right-5 lg:-right-5">{cornerFrame}</span>
      <motion.div variants={containerReveal} initial={prefersReducedMotion ? "visible" : "hidden"} animate={prefersReducedMotion || isInView ? "visible" : "hidden"} className="relative z-10 flex flex-col gap-[3vw]">
        <div className="self-start">
          <motion.p variants={prefersReducedMotion ? {} : lineReveal} className="font-display font-black uppercase text-ink" style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}>JNTHN IS THE FOLIO OF</motion.p>
          <motion.h2 id="descriptor-name" variants={prefersReducedMotion ? {} : lineReveal} className="flex flex-wrap items-baseline gap-x-[0.5vw] font-display font-black uppercase text-ink" style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}>
            <span>JONATHAN</span>
            <span className="text-accent">[ JOJO ]</span>
            <span>SUGONDO</span>
          </motion.h2>
        </div>
        <div className="self-end text-right">
          <motion.p variants={prefersReducedMotion ? {} : lineReveal} className="block font-display font-black uppercase text-ink" style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}>DEVELOPER, ANALYST</motion.p>
          <motion.p variants={prefersReducedMotion ? {} : lineReveal} className="block font-display font-black uppercase text-ink" style={{ fontSize: DISPLAY_SIZE, lineHeight: 1.05 }}><span className="text-accent">&amp;</span> CAR ENTHUSIAST</motion.p>
        </div>
      </motion.div>
    </section>
  );
}