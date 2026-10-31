import type { Metadata } from "next";
import Image from "next/image";
import { TrendingUp, FileText, Camera, Megaphone } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import RealScoutHomeValue from "@/components/RealScoutHomeValue";

export const metadata: Metadata = {
  title: "What's My Home Worth? | Joey De Leon, Realtor®",
  description:
    "Receive a complimentary, no-obligation valuation of your Southern California home from Joey De Leon, Realtor® with Power Real Estate Group. Serving Orange County, the Inland Empire, and Greater LA.",
};

const STEPS = [
  { icon: TrendingUp, title: "Instant Estimate", copy: "Begin with a real-time RealScout valuation, comps drawn from active MLS data." },
  { icon: FileText, title: "Tailored CMA", copy: "Joey follows up with a hand-tuned Comparative Market Analysis based on your home's specific story." },
  { icon: Camera, title: "Position & Prepare", copy: "Editorial photography, light staging, and pre-listing improvements that quietly earn back multiples." },
  { icon: Megaphone, title: "Go to Market", copy: "Strategic launch, print, digital, network, built to attract the right buyers, not just any buyer." },
];

export default function HomeValuationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-[78px] bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow text-gold">
              <span className="gold-rule mr-3 align-middle" />
              For Sellers
            </p>
            <h1 className="display-serif text-5xl md:text-[5rem] lg:text-[6rem] mt-6 text-navy leading-[0.95]">
              What is your
              <br />
              home worth?
            </h1>
          </div>
          <div className="md:col-span-5 reveal">
            <p className="text-stone-700 text-lg leading-[1.75]">
              The honest answer rarely lives in a Zestimate. Get a
              live RealScout valuation in seconds, then receive a
              tailored, no-obligation CMA from Joey, built around your
              home, your block, and the buyers active right now.
            </p>
          </div>
        </div>
      </section>

      {/* Instant valuation widget */}
      <section className="bg-stone-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-2xl mx-auto text-center reveal">
            <p className="eyebrow text-gold">
              <span className="gold-rule mr-3 align-middle" />
              Step One
            </p>
            <h2 className="display-serif text-4xl md:text-[2.8rem] mt-5 text-navy">
              Instant home valuation.
            </h2>
            <p className="mt-5 text-stone-600 text-lg leading-relaxed">
              Enter your address. RealScout pulls active comps and produces
              a working value range in seconds.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto reveal">
            {/* RealScout Home Value widget, client-mounted to avoid SSR hydration mismatch. */}
            <RealScoutHomeValue />
          </div>
        </div>
      </section>

      {/* How Joey sells homes */}
      <section className="bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
            <div className="md:col-span-5 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Step Two and Beyond
              </p>
              <h2 className="display-serif text-4xl md:text-[3rem] mt-5 text-navy">
                How Joey
                <br />
                sells homes.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 reveal">
              <p className="text-stone-700 text-lg leading-[1.75]">
                Algorithms see square footage. Joey sees light, layout,
                and the story behind every comp. Here&apos;s the practice
                behind the price.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mt-20">
            {STEPS.map((s, i) => (
              <div key={i} className="reveal flex gap-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="shrink-0">
                  <span className="display-serif text-gold text-[2.4rem] leading-none">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <s.icon className="w-6 h-6 text-gold" strokeWidth={1.4} />
                  <h3 className="display-serif text-2xl md:text-[1.7rem] text-navy mt-3">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-stone-600 leading-relaxed">{s.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CMA Request form */}
      <section className="bg-navy text-ivory">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" style={{ backgroundColor: "#B8935A" }} />
                Request a CMA
              </p>
              <h2 className="display-serif text-4xl md:text-[2.8rem] mt-5 text-ivory">
                Want a real number?
              </h2>
              <p className="mt-6 text-ivory/75 leading-[1.8]">
                Joey will personally prepare a Comparative Market Analysis
                for your home, tuned to recent sales, current
                competition, and where buyers are actually looking. No
                pressure, no obligation.
              </p>
            </div>

            <div className="md:col-span-7 reveal bg-ivory p-8 md:p-12 text-charcoal">
              <LeadForm
                formKind="cma"
                submitLabel="Request My CMA"
                intro="Tell Joey a little about your home and how to reach you. He'll personally follow up within one business day."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
