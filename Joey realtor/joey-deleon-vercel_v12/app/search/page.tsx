import type { Metadata } from "next";
import RealScoutCitySearch from "@/components/RealScoutCitySearch";
import CountyExplorer from "@/components/CountyExplorer";

export const metadata: Metadata = {
  title: "Search Southern California Homes | Joey De Leon, Realtor®",
  description:
    "Browse active Southern California listings on Joey De Leon's interactive RealScout map search. Filter by city, price, beds, baths, and more across Orange County, the Inland Empire, and Greater LA.",
};

// Header height is 78px (defined in SiteHeader.tsx). We fill the remaining viewport.
export default function SearchPage() {
  return (
    <div className="bg-stone-50" style={{ marginTop: "78px" }}>
      {/* Slim page intro strip */}
      <div className="bg-ivory border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="eyebrow text-gold">
              <span className="gold-rule mr-3 align-middle" />
              Live MLS Search
            </p>
            <h1 className="display-serif text-2xl md:text-[1.75rem] text-navy mt-1">
              Browse every active listing.
            </h1>
          </div>
          <p className="text-sm text-stone-600 max-w-md sm:text-right">
            Powered by RealScout. Filter, save, and tour Southern California,             updated in real time from MLS.
          </p>
        </div>
      </div>

      {/* County folder guide — sits ABOVE the map so visitors can jump
          straight into a county before scrolling through unfiltered results.
          Every city click opens the same-page RealScout modal. */}
      <div className="bg-ivory border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Jump In By County
              </p>
              <h2 className="display-serif text-2xl md:text-[1.75rem] text-navy mt-2">
                Open a county. Click any city.
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md md:text-right">
              Live MLS listings load instantly on this page, no new tabs, no
              detours.
            </p>
          </div>
          <CountyExplorer />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <RealScoutCitySearch
          label="Search Southern California homes"
          heightClass="h-[calc(100vh-220px)] min-h-[680px]"
        />
      </div>
    </div>
  );
}
