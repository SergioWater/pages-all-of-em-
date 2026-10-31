import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { ArrowUpRight, ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { AREAS, findArea } from "@/lib/areas";
import RealScoutCitySearch from "@/components/RealScoutCitySearch";

// Generates one static page per city at build time.
export async function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) return {};
  return {
    title: `${area.name}, CA Homes for Sale | Joey De Leon, Realtor®`,
    description: `Explore ${area.name} real estate with Joey De Leon, active listings, neighborhoods, market context, and local insight across ${area.region}. ${area.vibe}`,
  };
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) notFound();



  return (
    <>
      {/* Hero */}
      <section className="relative pt-[78px] bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-stone-500 text-xs tracking-[0.2em] uppercase hover:text-navy transition-colors reveal"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.6} />
            All Featured Areas
          </Link>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
            <div className="md:col-span-8 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                {area.region} · {area.county}
              </p>
              <h1 className="display-serif text-5xl md:text-[5rem] lg:text-[6rem] mt-6 text-navy leading-[0.95]">
                {area.name}
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-stone-600 font-serif italic leading-snug max-w-2xl">
                {area.vibe}
              </p>
            </div>
            <div className="md:col-span-4 reveal">
              <div className="border-l-2 border-gold pl-5 text-sm text-stone-700 leading-relaxed">
                <p>
                  Thinking about buying or selling in {area.name}? Joey
                  knows this market block by block.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-navy font-medium hover:text-gold transition-colors"
                >
                  Reach Joey
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About this area */}
      <section className="bg-stone-100 border-t border-stone-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                The Neighborhood
              </p>
              <h2 className="display-serif text-3xl md:text-[2.4rem] mt-5 text-navy leading-[1.05]">
                Why {area.name}.
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6 reveal space-y-6 text-stone-700 text-[1.05rem] leading-[1.8]">
              <p>{area.intro}</p>

              <div className="pt-2">
                <p className="eyebrow text-stone-500 mb-3">The Market</p>
                <p>{area.market}</p>
              </div>

              <div className="pt-2">
                <p className="eyebrow text-stone-500 mb-3">The Lifestyle</p>
                <p>{area.living}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active listings, filtered to this city via RealScout web component. */}
      <section className="bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 reveal">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Active Listings
              </p>
              <h2 className="display-serif text-3xl md:text-[2.6rem] mt-5 text-navy leading-[1.05]">
                Homes for sale in {area.name}.
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md md:text-right">
              Live MLS results, refreshed in real time. Save searches,
              tour homes, and reach Joey directly, all in one place.
            </p>
          </div>

          <div className="reveal">
            <RealScoutCitySearch
              geoId={area.realscoutGeoId}
              label={`Active listings in ${area.name}`}
            />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Link href="/contact" className="btn-gold">
              Ask Joey about {area.name}
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </Link>
            <a href="tel:+14086137001" className="btn-outline">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.8} />
              (408) 613-7001
            </a>
          </div>

          <p className="mt-6 text-[0.7rem] text-stone-500 tracking-[0.18em] uppercase">
            Powered by RealScout · MLS data refreshed live
          </p>
        </div>
      </section>

      {/* Location callout */}
      <section className="bg-navy text-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" style={{ backgroundColor: "#B8935A" }} />
                Where It Is
              </p>
              <h2 className="display-serif text-3xl md:text-[2.4rem] mt-5">
                {area.name}, on the map.
              </h2>
              <p className="mt-6 text-ivory/70 text-base leading-relaxed">
                {area.county} · {area.region}
              </p>
              <p className="mt-2 text-ivory/55 text-xs tracking-[0.2em] uppercase">
                {area.lat.toFixed(4)}°N, {Math.abs(area.lng).toFixed(4)}°W
              </p>
            </div>
            <div className="md:col-span-7 reveal">
              <div className="relative w-full aspect-[16/10] overflow-hidden border border-ivory/15">
                <iframe
                  title={`${area.name}, California map`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    area.name + ", CA"
                  )}&output=embed`}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-ivory">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <p className="eyebrow text-gold reveal">
            <span className="gold-rule mr-3 align-middle" />
            Let&apos;s Talk
          </p>
          <h2 className="display-serif text-4xl md:text-[3rem] mt-6 text-navy leading-[1.05] reveal">
            Considering {area.name}?
            <br />
            Joey will walk it with you.
          </h2>
          <p className="mt-7 text-stone-600 text-lg max-w-xl mx-auto reveal">
            From first conversation to closing, quiet, prepared
            representation across {area.region}.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
            <Link href="/contact" className="btn-gold">
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </Link>
            <a href="tel:+14086137001" className="btn-outline">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.8} />
              (408) 613-7001
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-stone-500 reveal">
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold" strokeWidth={1.6} />
              joeydln@powerreteam.com
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={1.6} />
              Power Real Estate Group ⚡
            </span>
          </div>
        </div>
      </section>

      {/* More areas */}
      <section className="bg-stone-100 border-t border-stone-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="flex items-end justify-between mb-10 reveal">
            <h2 className="display-serif text-2xl md:text-[2rem] text-navy">
              More communities Joey serves
            </h2>
            <Link
              href="/about"
              className="hidden sm:inline-flex items-center gap-1.5 text-navy text-sm hover:text-gold transition-colors"
            >
              See all areas
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5">
            {AREAS.filter((a) => a.slug !== area.slug)
              .slice(0, 8)
              .map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="reveal group block border-t border-stone-300 pt-4 hover:border-gold transition-colors"
                  style={{ transitionDelay: `${i * 25}ms` }}
                >
                  <p className="eyebrow text-stone-500 text-[0.62rem]">
                    {a.region}
                  </p>
                  <h3 className="display-serif text-lg mt-1.5 text-navy group-hover:text-gold transition-colors">
                    {a.name}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
