// Joey De Leon — RealScout agent encoded ID.
// One ID powers all widget types (Simple Search, Office Listings, Home Value,
// Advanced Search). Update here if Joey ever rotates it.
export const REALSCOUT_AGENT_ID = "QWdlbnQtMjg0MTY4";

// Custom CSS variables Joey provided in his snippet — apply via inline style.
// Wrap the brand-tuned styling around any <realscout-simple-search>.
export const SIMPLE_SEARCH_STYLE: React.CSSProperties = {
  // @ts-expect-error custom properties
  "--rs-ss-font-primary-color": "#6a6d72",
  "--rs-ss-searchbar-border-color": "hsl(0, 0%, 80%)",
  "--rs-ss-box-shadow": "0 10px 15px -3px #0000001a",
  "--rs-ss-widget-width": "100%",
  display: "block",
  width: "100%",
};
