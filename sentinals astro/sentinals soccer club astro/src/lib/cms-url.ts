/** Build-time CMS origin. Do not use for Astro.site / canonicals (pack 05). */
export function cmsBase(): string {
  const raw =
    (typeof process !== "undefined" && process.env.WP_URL) ||
    "https://sentinelssoccerclub.com";
  return String(raw).replace(/\/$/, "");
}
