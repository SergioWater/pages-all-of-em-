"use client";

import { useEffect, useRef, useState } from "react";
import { REALSCOUT_AGENT_ID, SIMPLE_SEARCH_STYLE } from "@/lib/realscout";

/**
 * Mounts <realscout-simple-search> imperatively AFTER hydration.
 * This avoids React #418 hydration mismatches because the custom element
 * is never present in the SSR HTML, only inserted client-side.
 */
export default function RealScoutSimpleSearch() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const el = document.createElement("realscout-simple-search");
    el.setAttribute("agent-encoded-id", REALSCOUT_AGENT_ID);
    Object.entries(SIMPLE_SEARCH_STYLE).forEach(([k, v]) => {
      if (v == null) return;
      if (k.startsWith("--")) el.style.setProperty(k, String(v));
      else el.style.setProperty(
        k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
        String(v),
      );
    });
    ref.current.innerHTML = "";
    ref.current.appendChild(el);
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [mounted]);

  return (
    <div
      ref={ref}
      className="min-h-[44px]"
      aria-label="Property search"
    />
  );
}
