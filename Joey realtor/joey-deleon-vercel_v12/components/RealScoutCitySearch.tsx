"use client";

import { useState } from "react";

type Props = {
  /** RealScout city geo_id, e.g. "0636770" for Irvine. Omit to load Joey's full inventory. */
  geoId?: string;
  /** Optional accessible label */
  label?: string;
  /** Height, defaults to a tall, immersive viewport for browse-feel. */
  heightClass?: string;
};

// Joey's RealScout agent subdomain. Fetched once via
// https://www.realscout.com/widgets/api/agent_subdomain?agent_encoded_id=QWdlbnQtMjg0MTY4
// — pinned here so we don't make an extra request on every render.
const REALSCOUT_SUBDOMAIN = "joeydeleon440";

/**
 * Embeds Joey's RealScout search experience as an iframe.
 * The RealScout app is iframe-friendly (X-Frame-Options: ALLOWALL, no CSP)
 * and its internal listing cards navigate within the same window,  * which means the iframe, so visitors stay on Joey's site while browsing.
 */
export default function RealScoutCitySearch({
  geoId,
  label = "Property search",
  heightClass = "h-[78vh] min-h-[640px]",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = geoId
    ? `https://${REALSCOUT_SUBDOMAIN}.realscout.com/homesearch/map?geo_type=city&geo_id=${geoId}`
    : `https://${REALSCOUT_SUBDOMAIN}.realscout.com/homesearch/map`;

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-stone-200 bg-ivory shadow-sm`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-ivory">
          <div className="flex flex-col items-center gap-3 text-charcoal/60">
            <div className="h-8 w-8 border-2 border-stone-200 border-t-gold rounded-full animate-spin" />
            <span className="text-xs tracking-[0.18em] uppercase">Loading live MLS</span>
          </div>
        </div>
      )}
      <iframe
        src={src}
        title={label}
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full border-0"
        allow="geolocation; clipboard-write; fullscreen; cross-origin-isolated; storage-access *"
        referrerPolicy="no-referrer-when-downgrade"
        // @ts-expect-error - non-standard but supported by Chromium for third-party storage access
        credentialless="true"
      />
    </div>
  );
}
