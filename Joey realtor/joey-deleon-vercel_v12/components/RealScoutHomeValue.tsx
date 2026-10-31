"use client";

import { useEffect, useRef, useState } from "react";
import { REALSCOUT_AGENT_ID } from "@/lib/realscout";

/**
 * Mounts <realscout-home-value> imperatively after hydration.
 * Avoids React #418 hydration mismatches.
 */
export default function RealScoutHomeValue() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const el = document.createElement("realscout-home-value");
    el.setAttribute("agent-encoded-id", REALSCOUT_AGENT_ID);
    ref.current.innerHTML = "";
    ref.current.appendChild(el);
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [mounted]);

  return (
    <div
      ref={ref}
      className="min-h-[280px]"
      aria-label="Home valuation"
    />
  );
}
