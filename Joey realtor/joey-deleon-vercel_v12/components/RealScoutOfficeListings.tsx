"use client";

import { useEffect, useRef, useState } from "react";
import { REALSCOUT_AGENT_ID } from "@/lib/realscout";

type Props = {
  cities?: string[];
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  priceMin?: string | number;
};

/**
 * Mounts <realscout-office-listings> imperatively after hydration.
 * Avoids React #418 hydration mismatches.
 */
export default function RealScoutOfficeListings({
  cities,
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MUL,CON,LAL,LSE",
  priceMin,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const el = document.createElement("realscout-office-listings");
    el.setAttribute("agent-encoded-id", REALSCOUT_AGENT_ID);
    el.setAttribute("sort-order", sortOrder);
    el.setAttribute("listing-status", listingStatus);
    el.setAttribute("property-types", propertyTypes);
    if (cities && cities.length > 0) el.setAttribute("cities", JSON.stringify(cities));
    if (priceMin !== undefined) el.setAttribute("price-min", String(priceMin));
    ref.current.innerHTML = "";
    ref.current.appendChild(el);
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [mounted, cities, sortOrder, listingStatus, propertyTypes, priceMin]);

  return (
    <div
      ref={ref}
      className="min-h-[400px]"
      aria-label="Active listings"
    />
  );
}
