import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/Link";
import { ArrowUpRight, Award, MapPin, Star, Sparkles } from "lucide-react";
import CommunityBrowser from "@/components/CommunityBrowser";

export const metadata: Metadata = {
  title: "About Joey De Leon | Realtor® · Southern California",
  description:
    "Southern California Realtor® Joey De Leon represents buyers and sellers across Orange County, the Inland Empire, and the greater Los Angeles area.",
};

const CREDENTIALS = [
  { icon: Award, label: "Licensed Realtor®, California · DRE# 02238070" },
  { icon: MapPin, label: "Power Real Estate Group ⚡ · Southern California" },
  { icon: Star, label: "Serving Orange County, the Inland Empire & Greater LA" },
  { icon: Sparkles, label: "Member, California Association of Realtors" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero strip */}
      <section className="relative pt-[78px] bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow text-gold">
              <span className="gold-rule mr-3 align-middle" />
              About Joey
            </p>
            <h1 className="display-serif text-5xl md:text-[5rem] lg:text-[6rem] mt-6 text-navy leading-[0.95]">
              A steady hand
              <br />
              in a fast market.
            </h1>
          </div>
          <div className="md:col-span-5 reveal">
            <p className="text-stone-700 text-lg leading-[1.75]">
              Joey De Leon is a Realtor® with Power Real Estate Group ⚡,
              partnering with Southern California families to buy and sell
              with confidence, from Orange County&apos;s coastal
              neighborhoods to the Inland Empire and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Portrait + bio */}
      <section className="bg-stone-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5 reveal relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/joey-portrait.jpg"
                alt="Joey De Leon, Realtor®, Power Real Estate Group, Southern California"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>

            <div className="md:col-span-7 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                The Story
              </p>
              <h2 className="display-serif text-3xl md:text-[2.6rem] mt-5 text-navy">
                Built on relationships,
                <br />
                refined by experience.
              </h2>

              <div className="mt-8 space-y-5 text-stone-700 text-[1.05rem] leading-[1.8]">
                <p>
                  Joey is a Southern California Realtor® who has spent his
                  career helping neighbors do the most important thing they
                  ever do, buy or sell a home. Across Orange County, the
                  Inland Empire, and greater Los Angeles, his clients
                  remember one thing: how he made them feel under pressure.
                  In a market this fast, that&apos;s everything.
                </p>
                <p>
                  Today, Joey works with first-time buyers in Anaheim and
                  Riverside, families trading up in Irvine and Yorba Linda,
                  coastal moves to Newport Beach, and longtime owners in
                  Mission Viejo and Tustin ready to write the next chapter.
                  His clients describe him as prepared, plainspoken, and
                  genuinely on their side through every counteroffer,
                  inspection, and contingency.
                </p>
                <p>
                  At Power Real Estate Group ⚡, Joey draws on a tight
                  bench of inspectors, lenders, designers, and contractors,
                  the people who quietly make the difference between a
                  smooth close and a stressful one. The aim is simple:
                  fewer surprises, better outcomes, more referrals.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Credentials
              </p>
              <h2 className="display-serif text-3xl md:text-[2.4rem] mt-5 text-navy">
                Backed by the work.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 reveal">
              <ul className="divide-y divide-stone-200 border-y border-stone-200">
                {CREDENTIALS.map((c, i) => (
                  <li key={i} className="py-5 flex items-start gap-5">
                    <c.icon className="w-5 h-5 text-gold mt-1" strokeWidth={1.4} />
                    <span className="text-stone-800 text-[1.02rem]">{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Communities & Neighborhoods, replaces the old Featured Areas grid.
          Same primary search experience used on the homepage — keeps Joey's
          message consistent everywhere: he works wherever you are looking. */}
      <section className="bg-stone-100">
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
              From the coast to the canyons, Orange County to the high
              desert, Joey works wherever your search takes you. Type any
              city, neighborhood, ZIP, or address, or jump in by county.
            </p>
          </div>

          <CommunityBrowser />
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-ivory">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-36 text-center">
          <p className="eyebrow text-gold reveal">
            <span className="gold-rule mr-3 align-middle" />
            Philosophy
          </p>
          <blockquote className="display-serif text-3xl md:text-[3rem] lg:text-[3.4rem] mt-8 text-navy leading-[1.15] reveal">
            &ldquo;Your home. Your future. My priority.&rdquo;
          </blockquote>
          <p className="mt-10 eyebrow text-stone-500 reveal">Joey De Leon</p>

          <div className="mt-14 reveal">
            <Link href="/contact" className="btn-gold">
              Work With Joey
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
