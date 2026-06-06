"use client";

import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";

type NavProps = {
  isOverlayOpen: boolean;
  onMenuOpen: () => void;
};

const NAV_ROUTE_COUNT = 4;

export default function Nav({ isOverlayOpen, onMenuOpen }: NavProps) {
  const { scrollDirection, isNearTop } = useScrollDirection();
  const isHidden = scrollDirection === "down" && !isNearTop && !isOverlayOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="relative flex items-center justify-between border-b border-ink/15 bg-paper/85 px-6 py-4 backdrop-blur-sm md:px-8 lg:px-12"
      >
        <Link
          href="/"
          className="font-display text-2xl font-black leading-none tracking-tight text-ink transition-colors hover:text-rust"
        >
          JNTHN
        </Link>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest tabular-nums text-ink/60"
        >
          01 / 0{NAV_ROUTE_COUNT}
        </span>

        <button
          type="button"
          onClick={onMenuOpen}
          aria-expanded={isOverlayOpen}
          aria-controls="nav-overlay"
          aria-label="Open menu"
          className="font-mono text-xs font-medium tracking-[0.2em] text-ink transition-colors hover:text-rust"
        >
          MENU
        </button>
      </nav>
    </header>
  );
}