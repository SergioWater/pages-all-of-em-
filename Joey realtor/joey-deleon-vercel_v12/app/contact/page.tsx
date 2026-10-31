import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/Link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import BookOrAskInline from "@/components/BookOrAskInline";

export const metadata: Metadata = {
  title: "Contact Joey De Leon | Southern California Realtor®",
  description:
    "Reach Joey De Leon, Realtor® with Power Real Estate Group. Cell (408) 613-7001 · Office (949) 806-6169 · joeydln@powerreteam.com.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-[78px] bg-ivory">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
          <div className="md:col-span-7 reveal">
            <p className="eyebrow text-gold">
              <span className="gold-rule mr-3 align-middle" />
              Get in Touch
            </p>
            <h1 className="display-serif text-5xl md:text-[5rem] lg:text-[6rem] mt-6 text-navy leading-[0.95]">
              Let&apos;s start
              <br />
              a conversation.
            </h1>
            <p className="mt-8 text-stone-700 text-lg leading-[1.75] max-w-xl">
              Whether you&apos;re thinking about a move next quarter or
              next year, Joey&apos;s here to talk it through, no
              pressure, just clear advice.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 reveal">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/joey-portrait.jpg"
                alt="Joey De Leon, Realtor®, Power Real Estate Group"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 30vw"
                priority
              />
            </div>
            <p className="mt-4 text-xs tracking-[0.22em] uppercase text-stone-500">
              Joey De Leon · Realtor®
            </p>
          </div>
        </div>
      </section>

      {/* Contact details + Form */}
      <section className="bg-stone-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Details */}
            <div className="md:col-span-5 reveal">
              <p className="eyebrow text-gold">
                <span className="gold-rule mr-3 align-middle" />
                Direct Lines
              </p>
              <h2 className="display-serif text-3xl md:text-[2.4rem] mt-5 text-navy">
                Reach Joey directly.
              </h2>

              <ul className="mt-10 divide-y divide-stone-300 border-y border-stone-300">
                <li className="py-6 flex items-start gap-5">
                  <Phone className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                  <div>
                    <p className="eyebrow text-stone-500">Cell · Preferred</p>
                    <a
                      href="tel:+14086137001"
                      className="display-serif text-2xl text-navy hover:text-gold transition-colors block mt-1"
                    >
                      (408) 613-7001
                    </a>
                  </div>
                </li>
                <li className="py-6 flex items-start gap-5">
                  <Phone className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                  <div>
                    <p className="eyebrow text-stone-500">Office</p>
                    <a
                      href="tel:+19498066169"
                      className="display-serif text-2xl text-navy hover:text-gold transition-colors block mt-1"
                    >
                      (949) 806-6169
                    </a>
                  </div>
                </li>
                <li className="py-6 flex items-start gap-5">
                  <Mail className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                  <div>
                    <p className="eyebrow text-stone-500">Email</p>
                    <a
                      href="mailto:joeydln@powerreteam.com"
                      className="display-serif text-xl text-navy hover:text-gold transition-colors block mt-1 break-all"
                    >
                      joeydln@powerreteam.com
                    </a>
                  </div>
                </li>
                <li className="py-6 flex items-start gap-5">
                  <MapPin className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                  <div>
                    <p className="eyebrow text-stone-500">Brokerage</p>
                    <p className="text-navy text-[1.05rem] mt-2 leading-relaxed">
                      Power Real Estate Group ⚡
                      <br />
                      Serving Orange County, the Inland Empire &amp; Greater LA
                    </p>
                  </div>
                </li>
                <li className="py-6 flex items-start gap-5">
                  <Clock className="w-5 h-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                  <div>
                    <p className="eyebrow text-stone-500">Hours</p>
                    <p className="text-navy text-[1.05rem] mt-2 leading-relaxed">
                      By appointment, seven days a week.
                      <br />
                      Texts welcome 8a–8p PT.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Book a call / Ask a question */}
            <div className="md:col-span-7 reveal w-full md:w-full">
              <BookOrAskInline defaultTab="book" />
            </div>
          </div>  
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


        </div>
      </section>
    </>
  );
}
