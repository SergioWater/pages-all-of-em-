/** Single source of truth for NAP, nav, and shared site strings (pack 05). */

export const SITE_TITLE = "Sentinels Soccer Club";
export const SITE_DESCRIPTION =
  "Soccer club in Gilroy, Morgan Hill, and Hollister, CA. Sentinels runs competitive teams, recreational leagues, and summer camps for boys and girls ages 5-18. Est. 2015.";

export const CONTACT = {
  name: "Sentinels Soccer Club",
  alternateName: "Sentinels SC",
  street: "",
  city: "Morgan Hill",
  region: "CA",
  postal: "",
  country: "US",
  email: "sentinelssoccerclub@gmail.com",
  phoneDisplay: "(408) 722-1028",
  phoneTel: "4087221028",
  phoneE164: "+14087221028",
  foundingYear: "2015",
  registrationUrl: "https://sportscampament.web.app/#",
  norcalClubUrl: "https://norcalpremier.com/club/13079/",
  sameAs: [
    "https://www.facebook.com/sentinelssoccerclub/",
    "https://www.instagram.com/sentinels.soccer.club",
    "https://www.youtube.com/@SentinelsSoccerClub/featured",
    "https://norcalpremier.com/club/13079/",
  ],
  areaServed: [
    "Morgan Hill",
    "Gilroy",
    "Hollister",
    "San Juan Bautista",
    "Aromas",
    "Rucker",
    "San Felipe",
    "Hudner",
    "Watsonville",
  ],
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Homepage", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/#programs",
    children: [
      { label: "Competitive", href: "/competitive" },
      { label: "Rec League", href: "/recreational" },
      { label: "Private Training", href: "/private-training" },
      { label: "Summer Camps", href: "/summer-camps" },
    ],
  },
  { label: "Coaches", href: "/coaches" },
  { label: "Gallery", href: "/gallery" },
  { label: "Tryouts", href: "/tryouts" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Competitive", href: "/competitive" },
  { label: "Rec League", href: "/recreational" },
  { label: "Private Training", href: "/private-training" },
  { label: "Summer Camps", href: "/summer-camps" },
  { label: "Coaches", href: "/coaches" },
  { label: "Gallery", href: "/gallery" },
  { label: "Tryouts", href: "/tryouts" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const CLUB_VALUES = [
  "Every Player Has a Chance",
  "Grow From Feedback",
  "Embrace Diversity",
  "Compete Beyond the Field",
  "Build Your Soccer Skills",
  "Fuel Your Ambition",
  "Live a Healthy Lifestyle",
];
