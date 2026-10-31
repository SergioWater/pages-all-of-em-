"use client";
// CitySuggestionChips — popular-city pills shown above the simple search bar.
//
// Why this exists:
//   When a visitor clicks the search field without typing, RealScout's widget
//   shows "no options" which kills engagement. These chips give people a
//   one-click starting point for each of Joey's top markets.
//
// Why client component:
//   We need an onClick handler so window.open(...) is invoked explicitly.
//   That call is intercepted by layout.tsx's interceptor which routes RealScout
//   URLs into the same-page modal lightbox instead of a new tab — keeping
//   visitors on Joey's site (the user's core mandate).

import { Compass } from "lucide-react";

const CITIES: { name: string; geoId: string }[] = [
  { name: "Yorba Linda", geoId: "0686832" },
  { name: "Newport Beach", geoId: "0651182" },
  { name: "Anaheim", geoId: "0602000" },
  { name: "Irvine", geoId: "0636770" },
  { name: "Long Beach", geoId: "0643000" },
  { name: "Santa Ana", geoId: "0669000" },
  { name: "Mission Viejo", geoId: "0648256" },
];

export default function CitySuggestionChips() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CITIES.map((c) => {
        const href = `https://joeydeleon440.realscout.com/homesearch/map?geo_type=city&geo_id=${c.geoId}`;
        return (
          <a
            key={c.geoId}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              window.open(href, "_blank");
            }}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-700 text-sm hover:border-gold hover:text-navy hover:shadow-sm transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-gold" strokeWidth={1.8} />
            {c.name}
          </a>
        );
      })}
    </div>
  );
}
