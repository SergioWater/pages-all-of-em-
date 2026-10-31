"use client";
// CountyExplorer
// -----------------------------------------------------------------------------
// Four county cards. Each expands to reveal every city Joey serves in that
// county. ALL city clicks open live RealScout listings in the same-page modal
// lightbox (window.open → intercepted by layout.tsx). This keeps the section
// purely search-focused per Joey (June 2026): every click answers
// "show me homes here" instantly. Featured cities still get a small gold
// indicator so visitors know Joey has deep familiarity, but they no longer
// detour through a separate guide page.

import { useState } from "react";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";
import {
  COUNTIES,
  CITIES_BY_COUNTY,
  type County,
  type CountyCity,
} from "@/lib/areas";

// Build a RealScout city-search URL for any city.
// Preferred: geo_id-based deep link if we have one.
// Fallback: omnisearch text query — more forgiving when geo_ids aren't
// validated, and still routes to a city result inside RealScout.
function realscoutUrlForCity(city: CountyCity): string {
  if (city.realscoutGeoId) {
    return `https://joeydeleon440.realscout.com/homesearch/map?geo_type=city&geo_id=${city.realscoutGeoId}`;
  }
  return `https://joeydeleon440.realscout.com/homesearch/map?q=${encodeURIComponent(
    city.name
  )}`;
}

export default function CountyExplorer() {
  // Single-open accordion: when one county is open, opening another closes
  // the previous. Set to `null` for fully collapsed.
  const [openCounty, setOpenCounty] = useState<County | null>(null);

  return (
    <div className="grid grid-cols-1 gap-5">
      {COUNTIES.map((county) => {
        const cities = CITIES_BY_COUNTY[county];
        const isOpen = openCounty === county;

        return (
          // NOTE: do NOT add the global `.reveal` class here. The runtime
          // script in layout.tsx mutates `.reveal` elements to add `.in-view`
          // before React hydrates this client component, causing a className
          // mismatch (hydration error). The fade-in is unnecessary for these
          // cards since they sit in an interactive section users explicitly
          // open.
          <div
            key={county}
            className="border border-stone-300 rounded-md bg-white overflow-hidden transition-colors hover:border-gold"
          >
            <button
              type="button"
              onClick={() => setOpenCounty(isOpen ? null : county)}
              aria-expanded={isOpen}
              aria-controls={`county-${county.replace(/\s+/g, "-").toLowerCase()}`}
              className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <MapPin
                  className="w-6 h-6 text-gold shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="display-serif text-2xl md:text-[1.7rem] text-navy group-hover:text-gold transition-colors">
                    {county}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">
                    {cities.length} cities · click any to see live listings
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-gold" : ""
                }`}
                strokeWidth={1.6}
              />
            </button>

            {/* Expandable city list. Conditionally rendered via grid-rows trick
                so opening/closing animates the height. DOM stays light. */}
            <div
              id={`county-${county.replace(/\s+/g, "-").toLowerCase()}`}
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 md:px-8 pb-7 pt-1 border-t border-stone-200">
                  <p className="text-xs text-stone-500 mt-5 mb-4">
                    Tap any city to open live MLS listings.{" "}
                    <span className="inline-flex items-center gap-1 text-gold">
                      <Sparkles className="w-3 h-3" strokeWidth={2} />
                      sparkle
                    </span>{" "}
                    cities are Joey&rsquo;s most-active markets.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2.5">
                    {cities.map((city) => {
                      const featured = !!city.slug;
                      const href = realscoutUrlForCity(city);
                      const className = `group flex items-center gap-1.5 text-sm py-1 transition-colors cursor-pointer ${
                        featured
                          ? "text-navy font-medium hover:text-gold"
                          : "text-stone-600 hover:text-navy"
                      }`;
                      return (
                        <a
                          key={city.name}
                          href={href}
                          onClick={(e) => {
                            // window.open is intercepted by layout.tsx and
                            // routed into the same-page modal lightbox so
                            // visitors stay on Joey's site.
                            e.preventDefault();
                            window.open(href, "_blank");
                          }}
                          rel="noopener noreferrer"
                          className={className}
                        >
                          <span>{city.name}</span>
                          {featured && (
                            <Sparkles
                              className="w-3 h-3 text-gold opacity-80 group-hover:opacity-100 transition-opacity"
                              strokeWidth={2}
                              aria-label="Joey's most-active market"
                            />
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
