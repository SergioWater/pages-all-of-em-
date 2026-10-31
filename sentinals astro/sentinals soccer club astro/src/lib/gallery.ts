export type GalleryImage = { src: string; alt: string; caption?: string };

export const CAROUSEL_SLIDES: GalleryImage[] = [
  {
    src: "team-2014-half-moon-bay-champions.jpg",
    alt: "Sentinels Soccer Club 2014 birth-year boys team, Half Moon Bay champions, celebrating with medals",
    caption:
      "The 2014 birth-year Sentinels boys team celebrates their Half Moon Bay championship with medals in hand.",
  },
  {
    src: "team-boys-futsal-champions.jpg",
    alt: "Sentinels boys futsal team celebrating a championship win with trophy and medals",
    caption:
      "Sentinels boys claim the futsal championship trophy after a strong indoor season.",
  },
  {
    src: "team-teen-boys-best-of-the-best.jpg",
    alt: "Sentinels teen boys team named Best of the Best under the championship banner",
    caption:
      "The teen boys team is honored as Best of the Best after a standout tournament run.",
  },
  {
    src: "team-boys-thanksgiving-champions.jpg",
    alt: "Sentinels boys team celebrating a Thanksgiving tournament championship with silver medals",
    caption:
      "Sentinels boys bring home silver medals from the Thanksgiving tournament.",
  },
  {
    src: "team-young-boys-cup.jpg",
    alt: "Sentinels young boys team from Gilroy holding a championship cup at the goal",
    caption:
      "Young Sentinels lift the championship cup at the goal with their coaches.",
  },
];

export type GallerySection = {
  id: string;
  title: string;
  icon: string;
  aspect: string;
  images: GalleryImage[];
};

export const GALLERY_SECTIONS: GallerySection[] = [
  {
    id: "grid-championships",
    title: "Championships & Trophies",
    icon: "fa-trophy",
    aspect: "4/3",
    images: [
      {
        src: "team-girls-state-cup-champions.jpg",
        alt: "2009 Sentinels girls — 2022 State Cup Champions, photographed at PayPal Park stadium",
      },
      {
        src: "team-girls-norcal-podium-trophy.jpg",
        alt: "Sentinels girls team on the NorCal Premier winners podium holding the championship trophy",
      },
      {
        src: "team-girls-norcal-premier-podium.jpg",
        alt: "Sentinels girls team lifting their trophy on the NorCal Premier Soccer championship stage",
      },
      {
        src: "team-girls-norcal-tournament-medals.jpg",
        alt: "Sentinels girls team celebrating with medals under the NorCal tournament tent",
      },
      {
        src: "team-girls-huddle-trophy-celebration.jpg",
        alt: "Sentinels girls team huddled in a celebration circle with their championship trophy",
      },
      {
        src: "team-2014-half-moon-bay-group.jpg",
        alt: "Sentinels 2014 birth-year boys team group photo before their Half Moon Bay championship run, Morgan Hill",
      },
      {
        src: "team-2014-half-moon-bay-champions.jpg",
        alt: "Sentinels 2014 birth-year boys team, Half Moon Bay champions, posing with medals on the bleachers",
      },
      {
        src: "team-boys-three-trophies.jpg",
        alt: "Sentinels boys team posing with three championship trophies on the field",
      },
      {
        src: "team-boys-futsal-champions.jpg",
        alt: "Sentinels boys futsal champions with trophy, medals, and coach indoors",
      },
      {
        src: "team-boys-thanksgiving-champions.jpg",
        alt: "Sentinels boys Thanksgiving tournament champions with silver medals",
      },
      {
        src: "team-young-boys-cup.jpg",
        alt: "Sentinels young boys team from Gilroy with championship cup at the goal",
      },
      {
        src: "team-teen-boys-best-of-the-best.jpg",
        alt: "Sentinels teen boys team named Best of the Best with tournament medals",
      },
    ],
  },
  {
    id: "grid-team-moments",
    title: "Team Moments",
    icon: "fa-people-group",
    aspect: "4/3",
    images: [
      {
        src: "team-teen-girls-celebration.jpg",
        alt: "Sentinels teen girls team from Gilroy celebrating a tournament win with cupcakes",
      },
      {
        src: "team-girls-paypal-park-walk.jpg",
        alt: "Sentinels girls squad walking the field at PayPal Park on a stadium visit",
      },
      {
        src: "players-stadium-field-waving.jpg",
        alt: "Sentinels players waving as they walk the stadium field before a match",
      },
      {
        src: "players-stadium-walkout-duo.jpg",
        alt: "Two Sentinels players walking out onto the stadium pitch",
      },
      {
        src: "players-quakes-stadium-visit.jpg",
        alt: "Sentinels teammates together at a San Jose Earthquakes stadium visit",
      },
      {
        src: "players-face-paint-duo.jpg",
        alt: "Two Sentinels teammates in blue face paint on a club match day",
      },
      {
        src: "family-face-paint-stadium.jpg",
        alt: "Sentinels players and family in face paint at a Bay Area soccer stadium",
      },
      {
        src: "coaches-with-players-candid.jpg",
        alt: "Sentinels coaches carrying young players outdoors in a candid Morgan Hill moment",
      },
      {
        src: "player-odp-showcase.jpg",
        alt: "Sentinels player in US Youth Soccer ODP showcase jersey, number 8",
      },
      {
        src: "training-cone-drill-three-players.jpg",
        alt: "Sentinels boys running a cone drill together at practice",
      },
    ],
  },
  {
    id: "grid-academy",
    title: "Academy Portraits",
    icon: "fa-camera",
    aspect: "3/5",
    images: [
      {
        src: "academy-2017-portrait-01-curly-laughing.jpg",
        alt: "2017 Sentinels Academy player laughing during a portrait session, Morgan Hill",
      },
      {
        src: "academy-2017-portrait-02-curly-smiling.jpg",
        alt: "2017 Sentinels Academy player smiling in a candid portrait",
      },
      {
        src: "academy-2017-portrait-03-fullbody.jpg",
        alt: "2017 Sentinels Academy player, full-body team portrait",
      },
      {
        src: "academy-2017-portrait-04-gold-trophy.jpg",
        alt: "2017 Sentinels Academy player posing with a gold championship trophy",
      },
      {
        src: "academy-2017-portrait-05-standing.jpg",
        alt: "2017 Sentinels Academy player standing portrait, Morgan Hill",
      },
      {
        src: "academy-2017-portrait-06-with-medal.jpg",
        alt: "2017 Sentinels Academy player wearing a championship medal",
      },
      {
        src: "academy-2017-portrait-07-neutral.jpg",
        alt: "2017 Sentinels Academy player team portrait",
      },
      {
        src: "academy-2017-portrait-08-wide-smile.jpg",
        alt: "2017 Sentinels Academy player with a wide smile",
      },
      {
        src: "academy-2017-portrait-09-spiky.jpg",
        alt: "2017 Sentinels Academy player portrait, Morgan Hill",
      },
      {
        src: "academy-2017-portrait-10-tall-trophy.jpg",
        alt: "2017 Sentinels Academy player posing with a tall championship trophy",
      },
      {
        src: "academy-2017-portrait-11-portrait.jpg",
        alt: "2017 Sentinels Academy player portrait",
      },
      {
        src: "academy-2017-portrait-12-teal-jersey.jpg",
        alt: "2017 Sentinels Academy player in teal jersey, Morgan Hill",
      },
      {
        src: "academy-2017-portrait-13-wavy.jpg",
        alt: "2017 Sentinels Academy player, closing portrait of the Academy class",
      },
    ],
  },
];

export const IMG_PATH = "/images/";
