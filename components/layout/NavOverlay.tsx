"use client";

import { useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type NavOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NAV_ROUTES = [
  { href: "/", index: "01", label: "INDEX" },
  { href: "/work", index: "02", label: "WORK" },
  { href: "/writing", index: "03", label: "WRITING" },
  { href: "/about", index: "04", label: "ABOUT" },
] as const;

const STREAK_STAGGER_SECONDS = 0.07;

export default function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  useFocusTrap(overlayRef, isOpen, onClose);

  const linkRevealOffset = prefersReducedMotion ? 0 : -60;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="nav-overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 md:px-8 lg:px-12"
        >
          <div className="flex items-center justify-end py-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="font-mono text-xs font-medium tracking-[0.2em] text-paper transition-colors hover:text-gold"
            >
              CLOSE
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col justify-center gap-2 md:gap-4"
          >
            {NAV_ROUTES.map((route, routeOrder) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: linkRevealOffset }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: routeOrder * STREAK_STAGGER_SECONDS,
                }}
              >
                <Link
                  href={route.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 text-paper transition-colors hover:text-gold"
                >
                  <span className="font-mono text-sm tracking-widest text-paper/50 group-hover:text-gold">
                    {route.index}
                  </span>
                  <span className="font-display text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
                    {route.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}