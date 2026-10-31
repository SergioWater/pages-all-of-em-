"use client";

import { useEffect } from "react";

// Globally observes elements with the `.reveal` class and toggles `.in-view`.
export default function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
