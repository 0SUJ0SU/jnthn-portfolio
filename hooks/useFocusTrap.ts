import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  onEscape: () => void,
) {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable =
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    firstFocusable?.focus();

    function onKeyDown(keyEvent: KeyboardEvent) {
      if (keyEvent.key === "Escape") {
        onEscape();
        return;
      }
      if (keyEvent.key !== "Tab" || focusable.length === 0) return;

      if (keyEvent.shiftKey && document.activeElement === firstFocusable) {
        keyEvent.preventDefault();
        lastFocusable?.focus();
      } else if (
        !keyEvent.shiftKey &&
        document.activeElement === lastFocusable
      ) {
        keyEvent.preventDefault();
        firstFocusable?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [containerRef, isActive, onEscape]);
}