import Link from "@/components/Link";
import Monogram from "./Monogram";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-navy text-ivory">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Monogram size={38} className="text-gold" />
            <h3 className="display-serif text-3xl md:text-[2.4rem] mt-7 text-ivory">
              Joey De Leon
            </h3>
            <p className="text-sm tracking-[0.28em] uppercase mt-2 text-ivory/65">
              Realtor® · Power Real Estate Group ⚡
            </p>
            <p className="mt-6 text-ivory/70 text-[0.95rem] leading-relaxed max-w-md">
              A trusted partner for buying and selling homes across
              Southern California, Orange County, the Inland Empire, and
              greater LA. Discreet, attentive representation from first
              conversation through closing.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/search", label: "Search Homes" },
                { href: "/about", label: "About Joey" },
                { href: "/home-valuation", label: "Home Valuation" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ivory/80 hover:text-gold transition-colors text-[0.95rem]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="eyebrow text-gold">Get in Touch</p>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex items-start gap-3 text-ivory/85">
                <Phone className="w-4 h-4 mt-1 text-gold" strokeWidth={1.5} />
                <div>
                  <a href="tel:+14086137001" className="hover:text-gold block">
                    (408) 613-7001 <span className="text-ivory/50 text-xs ml-1">cell</span>
                  </a>
                  <a href="tel:+19498066169" className="hover:text-gold block mt-1">
                    (949) 806-6169 <span className="text-ivory/50 text-xs ml-1">office</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-ivory/85">
                <Mail className="w-4 h-4 mt-1 text-gold" strokeWidth={1.5} />
                <a href="mailto:joeydln@powerreteam.com" className="hover:text-gold break-all">
                  joeydln@powerreteam.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-ivory/85">
                <MapPin className="w-4 h-4 mt-1 text-gold" strokeWidth={1.5} />
                <span>
                  Power Real Estate Group
                  <br />
                  Serving Southern California
                </span>
              </li>
              <li className="flex items-start gap-3 text-ivory/85">
                <Instagram className="w-4 h-4 mt-1 text-gold" strokeWidth={1.5} />
                <a
                  href="https://www.instagram.com/realtorjoeyd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  @realtorjoeyd
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/15 flex flex-col md:flex-row justify-between gap-4 text-[0.72rem] tracking-[0.18em] uppercase text-ivory/55">
          <p>© {new Date().getFullYear()} Joey De Leon · All Rights Reserved</p>
          <p>
            DRE# 02238070 · Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
}
