import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

const SCROLL_JITTER_THRESHOLD = 8;
const TOP_REVEAL_ZONE = 64;

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");
  const [isNearTop, setIsNearTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameRequested = false;

    function evaluateScroll() {
      const currentScrollY = window.scrollY;
      setIsNearTop(currentScrollY < TOP_REVEAL_ZONE);

      const movedFar =
        Math.abs(currentScrollY - lastScrollY) >= SCROLL_JITTER_THRESHOLD;
      if (movedFar) {
        setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
        lastScrollY = currentScrollY;
      }
      frameRequested = false;
    }

    function onScroll() {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(evaluateScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollDirection, isNearTop };
}