"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/layout/Nav";
import NavOverlay from "@/components/layout/NavOverlay";

export default function NavBar() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  return (
    <>
      <Nav
        isOverlayOpen={isOverlayOpen}
        onMenuOpen={() => setIsOverlayOpen(true)}
      />
      <NavOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </>
  );
}