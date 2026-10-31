import Link from "@/components/Link";
import Image from "next/image";
import { ArrowUpRight, Phone, Compass, KeyRound, Handshake } from "lucide-react";
import RealScoutCitySearch from "@/components/RealScoutCitySearch";
import CommunityBrowser from "@/components/CommunityBrowser";
import CountyExplorer from "@/components/CountyExplorer";

// Page architecture (June 2026 final):
//   1. Hero
//   2. Practice / value props
//   3. CommunityBrowser  <-- THE main search experience for every visitor
//   4. About Joey teaser
//   5. CountyExplorer    <-- 'fun to play around' county folder guide
//   6. Reviews
//   7. Featured listings widget
//   8. Final CTA
//
// The old 'Begin Your Search' RealScout autocomplete section was removed;
// CommunityBrowser is now the single, premium search surface and is also
// reused on /about (replacing Featured Areas) and on /search (above the map).

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <Image
          src="/images/hero-home.png"
          alt="Modern California home at golden hour, Southern California real estate"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Cinematic overlay, stronger at bottom where copy sits */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/35 to-navy/85" />
        {/* Extra bottom vignette for guaranteed text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />

        <div className="relative z-10 h-full flex items-end pb-20 md:pb-28">
          <div className="max-w-[1440px] w-full mx-auto px-6 md:px-10">
            <p className="eyebrow text-ivory animate-fade-in drop-shadow-[0_1px_8px_rgba(15,31,51,0.6)]">
              <span className="gold-rule mr-4 align-middle" />
              Orange County · Inland Empire · Greater LA
            </p>
            <h1 className="display-serif text-ivory text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] lg:text-[6rem] mt-6 max-w-5xl animate-fade-in-up">
              A trusted guide to
              <br />
              <em className="not-italic text-gold">your next address.</em>
            </h1>
            <p className="mt-7 text-ivory/85 text-base md:text-lg max-w-xl leading-relaxed animate-fade-in-up">
              Joey De Leon, Realtor® with Power Real Estate Group ⚡, partners
              with buyers and sellers across Southern California, from the
              coast to the canyons.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <Link href="/search" className="btn-gold">
                Browse Homes
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </Link>
              <Link href="/home-valuation" className="btn-outline-light">
                What&apos;s My Home Worth?
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-ivory/60 text-[0.62rem] tracking-[0.32em] uppercase">
          Scroll
        </div>
      </section>

      {/* ============ VALUE PROPS ============ */}
      <section className="bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
            <div className="md:col-span-5 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                The Practice
              </p>
              <h2 className="display-serif text-4xl md:text-[3.2rem] mt-5 text-navy">
                Quiet expertise.
                <br />
                Southern California roots.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 reveal">
              <p className="text-stone-700 text-lg leading-[1.7]">
                Every transaction is a turning point. Joey brings strategy, a
                sharp eye for value, and a deep network of Southern California
                professionals so each step, from search to signing, unfolds
                with intention.
              </p>
            </div>
          </div>

          {/* Value-prop cards, titles only.
              Per Joey: paragraph copy below each card was removed because the
              previous descriptions were narrow (OC-only) or unclear (e.g.
              "inspection-savvy negotiation", "considered staging"). Letting
              the title carry the message keeps it broad and confident. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-20 md:mt-24">
            {[
              {
                icon: Compass,
                eyebrow: "Local Knowledge",
                title: "Block by block.",
              },
              {
                icon: KeyRound,
                eyebrow: "Buyer Representation",
                title: "Win the right home.",
              },
              {
                icon: Handshake,
                eyebrow: "Seller Strategy",
                title: "Position. Price. Sell.",
              },
            ].map((item, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <item.icon className="w-7 h-7 text-gold" strokeWidth={1.4} />
                <p className="eyebrow text-stone-500 mt-6">{item.eyebrow}</p>
                <h3 className="display-serif text-2xl md:text-[1.7rem] text-navy mt-3">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMMUNITIES & NEIGHBORHOODS (PRIMARY SEARCH) ============ */}
      {/* This is now THE main search surface for the entire site. Joey's
          mandate: don't pigeonhole into a fixed city list, every visitor
          should feel served. Free-form bar + county chips + popular chips.
          All actions route to the on-site RealScout modal so visitors stay
          on Joey's site. */}
      <section className="bg-stone-100" id="search">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <p className="eyebrow text-gold">
              <span className="gold-rule mr-3 align-middle" />
              Communities &amp; Neighborhoods
            </p>
            <h2 className="display-serif text-4xl md:text-[3rem] mt-5 text-navy">
              Wherever you&rsquo;re looking,
              <br />
              Joey can help.
            </h2>
            <p className="mt-5 text-stone-600 text-lg leading-relaxed">
              From the coast to the canyons, Orange County to the high desert,
              Joey works wherever your search takes you. Type any city,
              neighborhood, ZIP, or address, or jump in by county.
            </p>
          </div>

          <CommunityBrowser />

          <div className="mt-16 text-center reveal">
            <Link href="/search" className="btn-outline">
              Open Map Search
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ ABOUT JOEY TEASER ============ */}
      <section className="bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-5 reveal relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/joey-portrait.jpg"
                alt="Joey De Leon, Realtor®, Power Real Estate Group, Southern California"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Meet Joey
              </p>
              <h2 className="display-serif text-4xl md:text-[3rem] mt-5 text-navy">
                Southern California.
                <br />
                Built on referrals.
              </h2>
              <p className="mt-6 text-stone-700 text-lg leading-[1.75]">
                Joey De Leon helps Southern California families find their
                place. Across Orange County, the Inland Empire, and greater
                LA, his clients come back because the work is steady, the
                communication is honest, and the outcome is right.
              </p>
              <div className="mt-9">
                <Link href="/about" className="btn-outline">
                  Read Joey&apos;s Story
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COUNTY FOLDER GUIDE ============ */}
      {/* The 'fun to play around' folder guide. Each county card opens to
          reveal every city Joey serves in that county. Clicking any city opens
          live RealScout listings in the on-site modal. Sits below About Joey
          so visitors who scroll past the primary search can still explore by
          geography. */}
      <section className="bg-ivory border-t border-stone-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Browse by County
              </p>
              <h2 className="display-serif text-4xl md:text-[3rem] mt-5 text-navy">
                Open a county.
                <br />
                Pick a city. Tour homes.
              </h2>
            </div>
            <p className="text-stone-600 max-w-md md:text-right">
              Click any county to see every city Joey serves in it. Pick a
              city to open live MLS listings, right here on the site.
            </p>
          </div>

          <CountyExplorer />
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-navy text-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-3xl reveal">
            <p className="eyebrow text-gold">
              <span className="gold-rule mr-3 align-middle" style={{ backgroundColor: "#B8935A" }} />
              In Their Words
            </p>
            <h2 className="display-serif text-4xl md:text-[3rem] mt-5 text-ivory">
              Trusted by Southern California neighbors.
            </h2>
            <p className="mt-4 text-ivory/65 text-[0.95rem] leading-relaxed">
              Verified five-star reviews from Joey&apos;s actual buyers and sellers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-16 max-w-5xl">
            {[
              {
                rating: 5.0,
                date: "May 22, 2025",
                reviewer: "Jackson Walz",
                transaction: "Bought a condo in 2025 · Downtown Long Beach, CA",
                quote:
                  "Joey did an outstanding job finding my wife and I our first home. He showed us places that fit our criteria perfectly and found places that we were not aware of. Joey has a great personality and is easy to work alongside with. As a first time homebuyer, Joey made the escrow process very easy to handle. Joey and his team were able to get us a great deal on our condo and we highly recommend choosing them to help find your next home.",
                scores: [
                  ["Local knowledge", 5],
                  ["Process expertise", 5],
                  ["Responsiveness", 5],
                  ["Negotiation skills", 5],
                ] as const,
              },
              {
                rating: 5.0,
                date: "Mar 28, 2025",
                reviewer: "nalejand3",
                transaction: "Sold a condo in 2025 · Santa Ana, CA",
                quote:
                  "Joey did an outstanding job making sure we were comfortable knowing our property was in good hands, with us living out of state. He was there every weekend doing open houses, always communicated with us, and super helpful with all the small details. His vibrant personality and dedication made the entire process stress-free.",
                scores: [
                  ["Local knowledge", 5],
                  ["Process expertise", 5],
                  ["Responsiveness", 5],
                  ["Negotiation skills", 5],
                ] as const,
              },
            ].map((t, i) => (
              <figure key={i} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                {/* Star rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg
                        key={s}
                        className="w-4 h-4 text-gold"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.366 2.445c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.951-.69l1.286-3.957z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gold text-sm font-medium">{t.rating.toFixed(1)}</span>
                </div>
                <p className="mt-2 text-xs tracking-[0.18em] uppercase text-ivory/55">
                  {t.date} · {t.reviewer}
                </p>

                <p className="mt-5 text-[0.78rem] tracking-[0.14em] uppercase font-medium text-ivory/85">
                  {t.transaction}
                </p>

                <span className="display-serif text-gold text-[2.5rem] leading-none block mt-5">&ldquo;</span>
                <blockquote className="display-serif text-lg md:text-[1.3rem] leading-[1.5] text-ivory mt-2">
                  {t.quote}
                </blockquote>

                <dl className="mt-8 pt-6 border-t border-ivory/15 grid grid-cols-2 gap-y-3 gap-x-6">
                  {t.scores.map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between gap-3">
                      <dt className="text-xs text-ivory/70">{label}</dt>
                      <dd className="flex gap-0.5" aria-label={`${val} out of 5`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <svg
                            key={s}
                            className={`w-2.5 h-2.5 ${s < val ? "text-gold" : "text-ivory/20"}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.366 2.445c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.951-.69l1.286-3.957z" />
                          </svg>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED LISTINGS WIDGET ============ */}
      <section className="bg-stone-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
            <div>
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Selected Inventory
              </p>
              <h2 className="display-serif text-4xl md:text-[3rem] mt-5 text-navy">
                Featured listings.
              </h2>
            </div>
            <p className="text-stone-600 max-w-md md:text-right">
              A curated look at active inventory across Orange County and
              the Inland Empire, refreshed live from MLS.
            </p>
          </div>

          <div className="reveal">
            {/* Embedded RealScout search, keeps visitors browsing on-site. */}
            <RealScoutCitySearch label="Active Southern California listings" />
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hills.png"
            alt="Southern California foothills at golden hour"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/65" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 py-28 md:py-36 text-center">
          <p className="eyebrow text-gold reveal">
            <span className="gold-rule mr-3 align-middle" />
            Let&apos;s talk
          </p>
          <h2 className="display-serif text-ivory text-4xl md:text-[3.6rem] lg:text-[4.4rem] mt-6 max-w-3xl mx-auto reveal">
            Ready to make a move?
          </h2>
          <p className="text-ivory/80 text-lg mt-7 max-w-xl mx-auto reveal">
            Buying, selling, or simply exploring, Joey is here for an
            honest, no-pressure conversation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center reveal">
            <Link href="/contact" className="btn-gold">
              Start a Conversation
            </Link>
            <a href="tel:+14086137001" className="btn-outline-light">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.8} />
              (408) 613-7001
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
