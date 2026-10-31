"use client";
// CommunityBrowser
// -----------------------------------------------------------------------------
// Replaces the fixed-list CountyExplorer. Joey's mandate: don't pigeonhole into
// a finite city list — a client looking somewhere outside the list should not
// feel like Joey doesn't serve them. He works wherever the client wants.
//
// UX (per user, June 2026):
//   1. Free-form search bar at top — "Type any city, neighborhood, ZIP, or address"
//   2. 4 county quick-pick chips below — Orange / LA / Riverside / San Bernardino
//   3. A row of popular-neighborhood chips for engagement / inspiration
//
// All actions call window.open(realscoutUrl, "_blank"). That call is intercepted
// by the layout.tsx runtime so the URL opens inside the same-page modal — visitors
// stay on Joey's site (the persistent "stay as long as possible" mandate).

import { useState, FormEvent } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";

// RealScout subdomain for Joey
const RS_BASE = "https://joeydeleon440.realscout.com/homesearch/map";

// County quick-picks. geo_id values are the RealScout county geo_ids
// (county FIPS-like codes used in their geo system).
const COUNTIES = [
  { name: "Orange County", geoId: "06059" },
  { name: "Los Angeles County", geoId: "06037" },
  { name: "Riverside County", geoId: "06065" },
  { name: "San Bernardino County", geoId: "06071" },
];

// Popular cities spanning all four counties.
// IMPORTANT: each chip MUST carry a RealScout city geo_id (Census Place FIPS
// for California, prefix 06). Without geo_id, RealScout opens the map with
// just a typed-in search string — the user then has to press 'Search' again.
// With geo_id, the city filter applies immediately and listings load.
const POPULAR: { name: string; geoId: string }[] = [
  { name: "Yorba Linda", geoId: "0686832" },
  { name: "Newport Beach", geoId: "0651182" },
  { name: "Irvine", geoId: "0636770" },
  { name: "Long Beach", geoId: "0643000" },
  { name: "Pasadena", geoId: "0656000" },
  { name: "Riverside", geoId: "0662000" },
  { name: "Rancho Cucamonga", geoId: "0659451" },
  { name: "Temecula", geoId: "0678120" },
  { name: "Mission Viejo", geoId: "0648256" },
  { name: "Santa Monica", geoId: "0670000" },
];

function openRealScout(url: string) {
  // Explicit window.open — layout.tsx's interceptor routes realscout.com URLs
  // into the same-page modal lightbox. Using <a target="_blank"> directly is
  // NOT intercepted, so we must call window.open programmatically.
  window.open(url, "_blank");
}

export default function CommunityBrowser() {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const url = `${RS_BASE}?q=${encodeURIComponent(q)}`;
    openRealScout(url);
  }

  function openCounty(geoId: string) {
    openRealScout(`${RS_BASE}?geo_type=county&geo_id=${geoId}`);
  }

  function openPopular(geoId: string) {
    openRealScout(`${RS_BASE}?geo_type=city&geo_id=${geoId}`);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* --- Free-form search bar --- */}
      <form
        onSubmit={handleSubmit}
        className="relative"
        role="search"
        aria-label="Search any community or neighborhood"
      >
        <div className="flex items-stretch bg-white border border-stone-300 rounded-full shadow-sm focus-within:border-gold focus-within:shadow-md transition-all overflow-hidden">
          <span className="pl-5 pr-2 flex items-center text-stone-400">
            <Search className="w-5 h-5" strokeWidth={1.6} />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any city, neighborhood, ZIP, or address"
            className="flex-1 py-4 pr-3 bg-transparent text-navy placeholder:text-stone-400 focus:outline-none text-base"
            aria-label="Community or neighborhood search"
          />
          <button
            type="submit"
            className="px-6 md:px-8 bg-navy text-ivory hover:bg-gold hover:text-navy transition-colors text-sm font-medium tracking-wide uppercase"
          >
            Search
          </button>
        </div>
        <p className="text-stone-500 text-sm mt-3 text-center">
          Joey serves clients across Southern California. If your spot isn&rsquo;t below, just type it in.
        </p>
      </form>

      {/* --- County chips --- */}
      <div className="mt-10">
        <p className="eyebrow text-stone-500 text-center mb-4">
          <span className="gold-rule mr-2 align-middle" />
          Quick browse by county
        </p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {COUNTIES.map((c) => (
            <button
              key={c.geoId}
              type="button"
              onClick={() => openCounty(c.geoId)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-ivory border border-navy hover:bg-gold hover:border-gold hover:text-navy transition-all text-sm font-medium"
            >
              <MapPin className="w-4 h-4" strokeWidth={1.8} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* --- Popular neighborhoods --- */}
      <div className="mt-10">
        <p className="eyebrow text-stone-500 text-center mb-4">
          <span className="gold-rule mr-2 align-middle" />
          Or jump to a popular community
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {POPULAR.map((c) => (
            <button
              key={c.geoId}
              type="button"
              onClick={() => openPopular(c.geoId)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-700 text-sm hover:border-gold hover:text-navy hover:shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" strokeWidth={1.8} />
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
