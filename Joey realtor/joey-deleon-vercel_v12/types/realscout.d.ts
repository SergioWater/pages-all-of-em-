// JSX type declarations for RealScout web components.
// Lets TSX accept <realscout-simple-search>, <realscout-office-listings>, etc.

import type { CSSProperties } from "react";

type RealScoutAttrs = {
  "agent-encoded-id": string;
  cities?: string;
  "sort-order"?: string;
  "listing-status"?: string;
  "property-types"?: string;
  "price-min"?: string | number;
  "price-max"?: string | number;
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "realscout-simple-search": RealScoutAttrs;
      "realscout-advanced-search": RealScoutAttrs;
      "realscout-office-listings": RealScoutAttrs;
      "realscout-agent-listings": RealScoutAttrs;
      "realscout-home-value": RealScoutAttrs;
    }
  }
}

export {};
