"use client";
// Inline "Book a call / Ask a question" panel.
// Same tabbed UI + embedded Google calendar as EngagementPopup, but
// rendered inline on a page (no modal overlay). Drop in anywhere.

import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, MessageSquare, ArrowUpRight, Check, Phone, RefreshCw, ExternalLink } from "lucide-react";
import { BOOKING_URL, BOOKING_TITLE, BOOKING_SUBTITLE } from "@/lib/booking";

type Tab = "book" | "ask";

export default function BookOrAskInline({ defaultTab = "book" }: { defaultTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---- Booking iframe state ----
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeStatus, setIframeStatus] = useState<"loading" | "loaded" | "slow">("loading");
  const slowTimerRef = useRef<number | null>(null);

  // Detect slow iframe load (mirrors EngagementPopup behavior)
  useEffect(() => {
    if (tab !== "book") return;
    if (BOOKING_URL.includes("PLACEHOLDER")) return;
    setIframeStatus("loading");
    if (slowTimerRef.current) window.clearTimeout(slowTimerRef.current);
    slowTimerRef.current = window.setTimeout(() => {
      setIframeStatus((s) => (s === "loaded" ? s : "slow"));
    }, 6000);
    return () => {
      if (slowTimerRef.current) {
        window.clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
    };
  }, [tab, iframeKey]);

  const reloadIframe = useCallback(() => {
    setIframeStatus("loading");
    setIframeKey((k) => k + 1);
  }, []);

  async function onAskSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = { formKind: "contact-ask" };
    fd.forEach((v, k) => {
      payload[k] = String(v);
    });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call (408) 613-7001."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-ivory rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-10 pt-8 pb-5 border-b border-stone-200">
        <p className="eyebrow text-gold">A quick hello from Joey</p>
        <h2 className="display-serif text-2xl sm:text-[1.7rem] text-navy mt-3 leading-tight">
          Looking for something specific?
        </h2>
        <p className="mt-2 text-stone-600 text-[0.95rem]">
          Tell Joey what you have in mind, or grab time on his calendar.
        </p>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 bg-stone-100 p-1 rounded-lg w-full sm:w-fit">
          <button
            onClick={() => setTab("book")}
            className={[
              "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-[0.78rem] tracking-[0.18em] uppercase font-medium rounded-md transition-all",
              tab === "book" ? "bg-white text-navy shadow-sm" : "text-stone-600 hover:text-navy",
            ].join(" ")}
          >
            <Calendar className="w-3.5 h-3.5" strokeWidth={1.8} />
            Book a call
          </button>
          <button
            onClick={() => setTab("ask")}
            className={[
              "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-[0.78rem] tracking-[0.18em] uppercase font-medium rounded-md transition-all",
              tab === "ask" ? "bg-white text-navy shadow-sm" : "text-stone-600 hover:text-navy",
            ].join(" ")}
          >
            <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.8} />
            Ask a question
          </button>
        </div>
      </div>

      {/* Body */}
      <div>
        {tab === "book" ? (
          <div className="flex flex-col">
            <div className="px-6 sm:px-10 pt-5 pb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg text-navy">{BOOKING_TITLE}</h3>
                <p className="text-sm text-stone-600 mt-1">{BOOKING_SUBTITLE}</p>
              </div>
              {!BOOKING_URL.includes("PLACEHOLDER") && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={reloadIframe}
                    title="Reload the calendar"
                    aria-label="Reload the calendar"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-navy bg-white border border-stone-300 hover:border-gold px-3 py-2 rounded-md transition-colors"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${iframeStatus === "loading" ? "animate-spin" : ""}`}
                      strokeWidth={1.8}
                    />
                    Reload
                  </button>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open calendar in a new tab"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-navy bg-white border border-stone-300 hover:border-gold px-3 py-2 rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.8} />
                    Open in new tab
                  </a>
                </div>
              )}
            </div>
            <div className="px-3 sm:px-6 pb-6">
              <div className="relative w-full" style={{ height: "min(49vh, 504px)" }}>
                {BOOKING_URL.includes("PLACEHOLDER") ? (
                  <div className="absolute inset-0 border border-dashed border-stone-300 rounded-md flex flex-col items-center justify-center text-center p-8 bg-stone-50">
                    <Calendar className="w-10 h-10 text-stone-400" strokeWidth={1.4} />
                    <h4 className="mt-4 font-serif text-lg text-navy">Calendar not connected yet</h4>
                    <p className="mt-2 text-sm text-stone-600 max-w-sm">
                      Replace <code className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-xs">BOOKING_URL</code> in{" "}
                      <code className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-xs">lib/booking.ts</code> with Joey&rsquo;s Google Appointment Schedule URL.
                    </p>
                    <a href="tel:+14086137001" className="btn-gold mt-6">
                      <Phone className="w-3.5 h-3.5" strokeWidth={1.8} />
                      Call Joey now
                    </a>
                  </div>
                ) : (
                  <>
                    <iframe
                      key={iframeKey}
                      src={BOOKING_URL}
                      title="Book a call with Joey"
                      className="absolute inset-0 w-full h-full border-0 rounded-md bg-white"
                      allow="geolocation; clipboard-write; fullscreen"
                      referrerPolicy="no-referrer-when-downgrade"
                      onLoad={() => {
                        setIframeStatus("loaded");
                        if (slowTimerRef.current) {
                          window.clearTimeout(slowTimerRef.current);
                          slowTimerRef.current = null;
                        }
                      }}
                    />
                    {iframeStatus === "loading" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-md pointer-events-none">
                        <RefreshCw className="w-6 h-6 text-gold animate-spin" strokeWidth={1.8} />
                        <p className="mt-3 text-sm text-stone-500">Loading Joey&rsquo;s calendar…</p>
                      </div>
                    )}
                    {iframeStatus === "slow" && (
                      <div className="absolute inset-x-0 top-0 mx-3 mt-3 bg-ivory border border-gold/30 rounded-md p-4 shadow-md pointer-events-auto">
                        <p className="text-sm text-navy font-medium">Calendar slow to load?</p>
                        <p className="text-xs text-stone-600 mt-1">
                          Sometimes it gets stuck. Try reloading or opening in a new tab, or call Joey at{" "}
                          <a href="tel:+14086137001" className="text-gold underline underline-offset-2">
                            (408) 613-7001
                          </a>
                          .
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={reloadIframe}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-gold hover:bg-gold/90 px-3 py-1.5 rounded-md transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.8} />
                            Reload calendar
                          </button>
                          <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-navy bg-white border border-stone-300 hover:border-gold px-3 py-1.5 rounded-md transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.8} />
                            Open in new tab
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : submitted ? (
          <div className="px-6 sm:px-10 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-gold/10 mx-auto flex items-center justify-center">
              <Check className="w-7 h-7 text-gold" strokeWidth={1.6} />
            </div>
            <h3 className="display-serif text-2xl text-navy mt-5">Thank you.</h3>
            <p className="mt-3 text-stone-600 max-w-md mx-auto">
              Joey will reach out personally within one business day. For anything urgent,{" "}
              <a href="tel:+14086137001" className="text-gold underline underline-offset-4">
                (408) 613-7001
              </a>
              .
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTab("book");
              }}
              className="mt-8 text-sm text-stone-500 hover:text-navy underline underline-offset-4"
            >
              Back to booking
            </button>
          </div>
        ) : (
          <form onSubmit={onAskSubmit} className="px-6 sm:px-10 py-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label htmlFor="bai-name" className="block eyebrow text-stone-500 mb-2">
                  Name <span className="text-gold">*</span>
                </label>
                <input id="bai-name" name="name" required placeholder="Full name" className="input-field" />
              </div>
              <div>
                <label htmlFor="bai-email" className="block eyebrow text-stone-500 mb-2">
                  Email <span className="text-gold">*</span>
                </label>
                <input id="bai-email" name="email" type="email" required placeholder="you@email.com" className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bai-phone" className="block eyebrow text-stone-500 mb-2">
                  Phone (optional)
                </label>
                <input id="bai-phone" name="phone" type="tel" placeholder="(408) 000-0000" className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bai-message" className="block eyebrow text-stone-500 mb-2">
                  What can Joey help with? <span className="text-gold">*</span>
                </label>
                <textarea
                  id="bai-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Buying, selling, just exploring, anything works."
                  className="input-field resize-none"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-stone-500 max-w-xs">
                Your info is never shared. Joey replies personally.
              </p>
              <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-50">
                {submitting ? "Sending…" : "Send"}
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
