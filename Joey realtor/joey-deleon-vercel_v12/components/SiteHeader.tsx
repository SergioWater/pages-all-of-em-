"use client";
// Client component header.
//
// We deliberately DO NOT use `usePathname()` from `next/navigation` here,
// because this site is statically exported and deployed under arbitrary
// prefix URLs (S3 proxy, GitHub Pages, etc.). `usePathname` returns the
// raw browser path including the prefix, which would diverge from the
// build-time path baked into the SSR HTML and trigger React hydration
// errors on every non-home page.
//
// Instead we read window.location.pathname inside a useEffect (post-hydrate)
// to decide active-nav and transparent-hero state. First render always
// matches SSR (non-transparent, no active link), and we hydrate cleanly.

import { useEffect, useState } from "react";
import Link from "@/components/Link";
import Monogram from "./Monogram";
import { Menu, X, Phone, Calendar } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/home-valuation", label: "Home Valuation" },
  { href: "/contact", label: "Contact" },
];

// Normalize a path to a route segment that doesn't care about prefixes.
// "/web/.../contact/index.html"  -> "/contact"
// "/contact/"                    -> "/contact"
// "/"                            -> "/"
function normalize(path: string): string {
  if (!path || path === "/") return "/";
  const cleaned = path.replace(/index\.html$/, "").replace(/\/$/, "");
  // Match against the longest known nav href that the path ends with.
  // (Sorted longest first so /home-valuation wins over /home.)
  const candidates = NAV.map((n) => n.href)
    .filter((h) => h !== "/")
    .sort((a, b) => b.length - a.length);
  for (const c of candidates) {
    if (cleaned.endsWith(c)) return c;
  }
  // Area pages
  if (/\/areas\/[^/]+$/.test(cleaned)) return "/areas";
  return cleaned || "/";
}

export default function SiteHeader() {
  const [currentSlug, setCurrentSlug] = useState<string>("/");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const slug = normalize(window.location.pathname || "/");
    setCurrentSlug(slug);
  }, []);

  const transparentHero = currentSlug === "/";

  useEffect(() => {
    if (!mounted) return;
    if (!transparentHero) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, transparentHero]);

  // Transparent only on home, only when mounted, only when not scrolled.
  // First render is always non-transparent so SSR HTML matches.
  const isTransparent = mounted && transparentHero && !scrolled;

  function openBookingPopup(e: React.MouseEvent) {
    e.preventDefault();
    // Dispatch a custom event the EngagementPopup listens for.
    window.dispatchEvent(new CustomEvent("jdl:openBooking"));
    setMenuOpen(false);
  }

  function isActive(href: string) {
    if (!mounted) return false;
    if (href === "/") return currentSlug === "/";
    return currentSlug === href;
  }

  return (
    <header
      id="site-header"
      className={[
        "fixed top-0 inset-x-0 z-50 transition-colors duration-500",
        isTransparent
          ? "bg-transparent text-ivory"
          : "bg-ivory/95 backdrop-blur-md text-navy border-b border-stone-200",
      ].join(" ")}
      style={{ height: "78px" }}
    >
      <div className="max-w-[1440px] mx-auto h-full px-6 md:px-10 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Joey De Leon home">
          <Monogram size={26} className="opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-[1.05rem] tracking-tight">Joey De Leon</span>
            <span className="text-[0.6rem] tracking-[0.32em] uppercase opacity-70">
              Realtor® · Southern California
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative text-[0.7rem] tracking-[0.22em] uppercase font-medium transition-colors duration-200 py-1",
                  isTransparent ? "text-ivory hover:text-gold" : active ? "text-gold" : "hover:text-gold",
                  active
                    ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-gold"
                    : "",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={openBookingPopup}
            className={[
              "flex items-center gap-2 px-4 py-2 rounded-full border text-[0.68rem] tracking-[0.2em] uppercase font-medium transition-all",
              isTransparent
                ? "border-ivory/40 text-ivory hover:bg-ivory hover:text-navy"
                : "border-gold bg-gold text-white hover:bg-gold/90",
            ].join(" ")}
          >
            <Calendar className="w-3.5 h-3.5" strokeWidth={1.8} />
            Book Joey
          </button>
          <a
            href="tel:+14086137001"
            className={[
              "hidden lg:flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase font-medium transition-colors",
              isTransparent ? "text-ivory/90 hover:text-gold" : "text-navy hover:text-gold",
            ].join(" ")}
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
            (408) 613-7001
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 -mr-2"
        >
          {menuOpen ? (
            <X strokeWidth={1.5} />
          ) : (
            <Menu strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-ivory border-t border-stone-200 text-navy"
        >
          <nav className="px-6 py-6 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "py-3 text-[0.78rem] tracking-[0.22em] uppercase font-medium border-b border-stone-200 last:border-b-0",
                    active ? "text-gold" : "hover:text-gold",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={openBookingPopup}
              className="mt-5 btn-gold w-full justify-center"
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.8} />
              Book Joey
            </button>
            <a href="tel:+14086137001" className="mt-3 flex items-center justify-center gap-2 py-3 text-[0.78rem] tracking-[0.22em] uppercase text-navy hover:text-gold border border-stone-200 rounded">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.6} />
              (408) 613-7001
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
