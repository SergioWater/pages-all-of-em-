import { CONTACT, SITE_DESCRIPTION } from "../consts";

/** Honest LocalBusiness / SportsOrganization from confirmed legacy site facts (pack 05, 07). */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["SportsOrganization", "LocalBusiness"],
    name: CONTACT.name,
    alternateName: CONTACT.alternateName,
    url: "https://sentinelssoccerclub.com/",
    logo: "https://sentinelssoccerclub.com/images/site-logo-1.png",
    image: "https://sentinelssoccerclub.com/images/bg-stadium-ball-corner.jpg",
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    telephone: "+1-408-722-1028",
    foundingDate: CONTACT.foundingYear,
    sport: "Soccer",
    memberOf: { "@type": "Organization", name: "NorCal Premier Soccer" },
    areaServed: CONTACT.areaServed.map((name) => ({
      "@type": "City",
      name,
      addressRegion: "CA",
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    sameAs: CONTACT.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: CONTACT.name,
    url: "https://sentinelssoccerclub.com/",
  };
}

export function faqPageSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export async function buildHomeSchemas() {
  return [localBusinessSchema(), websiteSchema()];
}
