import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";

// Public host for canonicals / sitemap (pack 05, 07) — never a staging IP
export default defineConfig({
  site: "https://sentinelssoccerclub.com",
  integrations: [mdx(), sitemap(), solid()],
});
