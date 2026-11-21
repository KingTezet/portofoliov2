"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ReactNode, useEffect, useState } from "react";

/**
 * Inertia scrolling for wheel and trackpad. Touch keeps native scrolling
 * (already smooth on phones). Off for users who prefer reduced motion.
 * Framer Motion scroll effects keep working because Lenis drives window scroll.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        // Fixed navbar is ~80px tall.
        anchors: { offset: -88 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
