// Featured communities Joey De Leon serves across Southern California.
// Each entry powers /areas/<slug> pages and the home/about Featured Areas grids.
//
// `realscoutCity` is the exact city string RealScout's search expects.
// Coordinates are used for the embedded location map on each area page.
//
// COUNTY MODEL (June 2026 update per Joey):
//   The site is organized around four California counties. Every featured area
//   belongs to exactly one of these counties. The CountyExplorer component on
//   the homepage uses this taxonomy to render expandable county cards.

export const COUNTIES = [
  "Orange County",
  "Los Angeles County",
  "Riverside County",
  "San Bernardino County",
] as const;
export type County = (typeof COUNTIES)[number];

export type Area = {
  slug: string;
  name: string;
  region: County;
  county: string;
  realscoutCity: string; // exact string for RealScout city label
  realscoutGeoId: string; // RealScout city geo_id for filtered search URL
  lat: number;
  lng: number;
  vibe: string; // 6-10 word positioning line
  intro: string; // 2-3 sentence opening paragraph
  market: string; // 1-2 sentences on housing stock / price posture
  living: string; // 1-2 sentences on lifestyle / who lives there
};

export const AREAS: Area[] = [
  {
    slug: "yorba-linda",
    name: "Yorba Linda",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Yorba Linda",
    realscoutGeoId: "0686832",
    lat: 33.8886,
    lng: -117.8131,
    vibe: "Land of gracious living, Orange County's rolling hillside enclave.",
    intro:
      "Yorba Linda earned its 'Land of Gracious Living' nickname for good reason, sweeping hillside estates, top-ranked Placentia-Yorba Linda Unified schools, and equestrian trails are woven into daily life. It's where Orange County families settle for the long arc.",
    market:
      "Inventory skews toward larger lots and custom builds, with a steady contingent of newer planned communities like Vista del Verde. Pricing rewards patience and a sharp offer strategy.",
    living:
      "Home of the Nixon Library, a thriving Main Street district, and some of the county's quietest cul-de-sacs. Popular with families trading up from north Orange County.",
  },
  {
    slug: "newport-beach",
    name: "Newport Beach",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Newport Beach",
    realscoutGeoId: "0651182",
    lat: 33.6189,
    lng: -117.9298,
    vibe: "Coastal-luxury benchmark, harbor living from the Peninsula to Crystal Cove.",
    intro:
      "Newport Beach sets the bar for Southern California coastal real estate, Balboa Island cottages, Corona del Mar bluff homes, Newport Coast estates, and harbor-front compounds. Buyers come here for water access, weather, and discretion.",
    market:
      "One of the most distinct micro-markets in the country: each village (Balboa Peninsula, Lido Isle, Big Canyon, Crystal Cove) trades on its own dynamics. Off-market activity is meaningful, relationships matter.",
    living:
      "Yacht clubs, Fashion Island, and some of the best beach breaks in OC sit alongside Pelican Hill golf and award-winning schools. The quintessential 'arrive once, stay for life' market.",
  },
  {
    slug: "irvine",
    name: "Irvine",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Irvine",
    realscoutGeoId: "0636770",
    lat: 33.6846,
    lng: -117.8265,
    vibe: "The planned community that became a city, schools, safety, scale.",
    intro:
      "Irvine is one of the most carefully master-planned cities in America, and consistently among the safest in the U.S. Villages like Turtle Rock, Northwood, Quail Hill, and Great Park offer remarkably distinct feels under one zip-code-friendly umbrella.",
    market:
      "Inventory ranges from condos in Woodbury and Stonegate to executive homes in Shady Canyon and Turtle Ridge. New construction in Great Park keeps a steady pipeline; resale moves on schools and floor plan.",
    living:
      "Home to UC Irvine, the Spectrum, and one of the largest urban parks in the country. Strong international buyer pool, IUSD-anchored demand, and an outsized share of move-up families.",
  },
  {
    slug: "mission-viejo",
    name: "Mission Viejo",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Mission Viejo",
    realscoutGeoId: "0648256",
    lat: 33.6000,
    lng: -117.6720,
    vibe: "South County's safest big city, Lake Mission Viejo at its core.",
    intro:
      "Mission Viejo has a quiet superpower: it's repeatedly ranked among the safest cities its size in America, and Lake Mission Viejo gives residents a private 124-acre playground year-round. South Orange County families plant deep roots here.",
    market:
      "Original 1970s–80s tract neighborhoods sit alongside gated communities like Pacific Hills and Stoneridge. Excellent value relative to coastal South OC, meaningful square footage for the dollar.",
    living:
      "Saddleback College, the Norman P. Murray Center, and easy 5-freeway access make it a commuter's friend. Strong CUSD school pull from Bathgate, Castille, and Newhart.",
  },
  {
    slug: "tustin",
    name: "Tustin",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Tustin",
    realscoutGeoId: "0680854",
    lat: 33.7458,
    lng: -117.8268,
    vibe: "Central OC's underrated hub, Old Town charm, Tustin Legacy reinvention.",
    intro:
      "Tustin balances genuine history (Old Town's century-old craftsmans and the iconic blimp hangars) with one of the most ambitious infill projects in Orange County: Tustin Legacy. Central, connected, and quietly appreciating.",
    market:
      "A real range, Old Town bungalows, mid-century ranches in Tustin Meadows, gated luxury in Cowan Heights, and new construction in Levity, Anton, and Greenwood at Tustin Legacy.",
    living:
      "Tustin Marketplace, The District, and quick access to the 5 and 55. Tustin Unified pulls hard for families; younger buyers love walkability around Old Town.",
  },
  {
    slug: "anaheim",
    name: "Anaheim",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Anaheim",
    realscoutGeoId: "0602000",
    lat: 33.8366,
    lng: -117.9143,
    vibe: "OC's largest city, far more than Disneyland and a baseball stadium.",
    intro:
      "Anaheim is Orange County's most populated city, but its neighborhoods feel anything but uniform. Anaheim Hills sits 1,000 feet above the basin with custom estates; West Anaheim and Platinum Triangle offer some of OC's most accessible price points.",
    market:
      "Tremendous range, entry-level condos in the Platinum Triangle and Stadium Lofts, classic ranch homes near Cypress border, and gated luxury in Anaheim Hills. Rental yield is strong city-wide.",
    living:
      "Disneyland and Angel Stadium anchor the south; the GardenWalk and Packing District energize downtown. A real working city with serious investor appeal.",
  },
  {
    slug: "buena-park",
    name: "Buena Park",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Buena Park",
    realscoutGeoId: "0608786",
    lat: 33.8675,
    lng: -117.9981,
    vibe: "Center of the Greater LA / OC corridor, value-rich, transit-friendly.",
    intro:
      "Buena Park sits at the crossroads of Orange and Los Angeles counties, fifteen minutes to Long Beach, ten to Anaheim, and an easy hop to downtown LA. Knott's Berry Farm and a vibrant Korean-American business district give the city real cultural depth.",
    market:
      "Single-family inventory is built mostly between 1955 and 1980, solid bones, reasonable lot sizes, and one of the most accessible price entry points for an OC zip. Townhome and condo supply is meaningful.",
    living:
      "Beach Boulevard's 'Entertainment Zone,' The Source, and the Buena Park Mall draw weekend foot traffic. Popular with first-time buyers stepping into Orange County.",
  },
  {
    slug: "garden-grove",
    name: "Garden Grove",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Garden Grove",
    realscoutGeoId: "0629000",
    lat: 33.7739,
    lng: -117.9415,
    vibe: "Vibrant, diverse, central OC, home of Little Saigon's heart.",
    intro:
      "Garden Grove is one of the most culturally rich cities in California, Little Saigon's commercial core, a thriving Korean business district along Garden Grove Boulevard, and a deeply rooted Latino community. Real neighborhoods, real food, real community.",
    market:
      "Predominantly post-war single-family inventory with strong owner-occupier history. Pricing is meaningfully below neighboring Westminster and Fountain Valley while delivering similar location.",
    living:
      "Anchored by the Garden Grove Strawberry Festival, the historic Main Street district, and easy access to the 22 and 5 freeways. Strong demand from families and multi-generational households.",
  },
  {
    slug: "orange",
    name: "Orange",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Orange",
    realscoutGeoId: "0653980",
    lat: 33.7879,
    lng: -117.8531,
    vibe: "Old Towne Orange, the county's most-loved historic plaza district.",
    intro:
      "The City of Orange is home to Old Towne Orange, one of the largest National Register historic districts in California, with century-old craftsman and Victorian homes circling the Plaza. Beyond Old Towne, neighborhoods like Orange Park Acres and Mabury Ranch deliver a horse-property feel inside the urban core.",
    market:
      "Pre-1940s character homes in Old Towne command premiums; mid-century ranches dominate east of Tustin Street; Orange Park Acres offers half-acre+ lots with equestrian zoning.",
    living:
      "Chapman University, the Plaza's antique-and-coffee corridor, and a tight community calendar. A favorite with buyers who want character without a Pasadena-level commute.",
  },
  {
    slug: "santa-ana",
    name: "Santa Ana",
    region: "Orange County",
    county: "Orange County",
    realscoutCity: "Santa Ana",
    realscoutGeoId: "0669000",
    lat: 33.7455,
    lng: -117.8677,
    vibe: "OC's county seat, historic, dense, culturally essential.",
    intro:
      "Santa Ana is Orange County's civic and cultural anchor, a downtown experiencing real renaissance, the Artists Village, the MainPlace mall transformation, and historic neighborhoods like Floral Park and Park Santiago that rival anything in Pasadena.",
    market:
      "Wide spectrum, designated historic neighborhoods (Floral Park, Wilshire Square, French Park) command top dollar for restored Tudors and Spanish Colonials, while broader inventory offers some of the most accessible OC entry points.",
    living:
      "The Yost Theater, Fourth Street, and Bowers Museum keep downtown lively. A city with serious history, serious diversity, and rising momentum.",
  },
  {
    slug: "riverside",
    name: "Riverside",
    region: "Riverside County",
    county: "Riverside County",
    realscoutCity: "Riverside",
    realscoutGeoId: "0662000",
    lat: 33.9806,
    lng: -117.3755,
    vibe: "The Inland Empire's cultural anchor, citrus heritage, real character.",
    intro:
      "Riverside is the Inland Empire's most distinctive city, Mission Inn, UC Riverside, Mount Rubidoux, and a downtown that has been quietly thoughtful about preserving its character. The original orange capital, and still one of the best value plays in Southern California.",
    market:
      "Genuine architectural depth, Wood Streets craftsmans, Victoria Avenue estates, mid-century ranches in Arlanza and Casa Blanca, and newer construction in Orangecrest. Significantly more home for the dollar versus coastal OC.",
    living:
      "Mission Inn's holiday lights, Fairmount Park, and the Riverside Plaza. Popular with families relocating from OC and LA who want square footage without sacrificing real downtown energy.",
  },
  {
    slug: "ontario",
    name: "Ontario",
    region: "San Bernardino County",
    county: "San Bernardino County",
    realscoutCity: "Ontario",
    realscoutGeoId: "0653896",
    lat: 34.0633,
    lng: -117.6509,
    vibe: "Logistics hub turned real-estate value engine, Ontario Ranch leads the way.",
    intro:
      "Ontario has quietly become one of the fastest-growing cities in California, driven by Ontario International Airport's expansion, the Ontario Ranch master plan (the largest active master-planned community in SoCal), and serious industrial-job growth.",
    market:
      "Ontario Ranch's new-construction wave (New Haven, Park Place, The Preserve) accounts for much of recent volume; established neighborhoods north of the 60 deliver value on mature streets. Strong investor interest.",
    living:
      "Ontario Mills, the Toyota Arena, and direct ONT airport access. A city built for people who need to move, and increasingly, a city where people are choosing to stay.",
  },
  {
    slug: "fontana",
    name: "Fontana",
    region: "San Bernardino County",
    county: "San Bernardino County",
    realscoutCity: "Fontana",
    realscoutGeoId: "0624680",
    lat: 34.0922,
    lng: -117.4350,
    vibe: "Inland Empire workhorse, affordability with serious recent investment.",
    intro:
      "Fontana has transformed dramatically over the last two decades, from its Kaiser Steel roots to a city of master-planned neighborhoods, retail growth, and a much-improved school landscape under Fontana Unified and Etiwanda.",
    market:
      "Inventory weighted toward newer construction (1995+) in North Fontana, with established post-war stock south of Foothill. Etiwanda school boundaries drive meaningful pricing differential.",
    living:
      "Auto Club Speedway, Jurupa Hills, and easy 10/15/210 freeway access. Popular with families priced out of Rancho Cucamonga who still want the school pull.",
  },
  {
    slug: "perris",
    name: "Perris",
    region: "Riverside County",
    county: "Riverside County",
    realscoutCity: "Perris",
    realscoutGeoId: "0656700",
    lat: 33.7825,
    lng: -117.2287,
    vibe: "South Inland Empire growth corridor, Lake Perris, new construction, value.",
    intro:
      "Perris anchors the south Inland Empire's growth corridor along the 215, Lake Perris State Recreation Area on one side, the booming logistics and new-home development pipeline on the other. One of the most accessible price points in the region.",
    market:
      "Predominantly newer single-family inventory (2000s and later) in master-planned tracts; meaningful land parcels still trade in rural unincorporated zones. Investor demand has been strong.",
    living:
      "Lake Perris fishing and boating, the Orange Empire Railway Museum, and easy reach to Temecula wine country. First-time buyers and growing families fuel demand.",
  },
  {
    slug: "long-beach",
    name: "Long Beach",
    region: "Los Angeles County",
    county: "Los Angeles County",
    realscoutCity: "Long Beach",
    realscoutGeoId: "0643000",
    lat: 33.7701,
    lng: -118.1937,
    vibe: "LA's coastal big city with neighborhood soul, Belmont Shore to Bixby Knolls.",
    intro:
      "Long Beach is the most underrated coastal city in Southern California, Belmont Shore's walkable beach village, Naples Island's canals and gondolas, Bixby Knolls' tree-lined craftsmans, and a downtown that has reinvented itself around the waterfront.",
    market:
      "Architecturally rich: Spanish Colonials in Belmont Heights, mid-century moderns in Park Estates, lofts and high-rises downtown, and craftsman pockets in California Heights and Wrigley. Each pocket trades on its own logic.",
    living:
      "The Queen Mary, the Pike, Long Beach State, and Shoreline Village. A real city, diverse, deeply local, and dramatically more affordable than equivalent coastal LA.",
  },
  {
    slug: "palmdale",
    name: "Palmdale",
    region: "Los Angeles County",
    county: "Los Angeles County",
    realscoutCity: "Palmdale",
    realscoutGeoId: "0655156",
    lat: 34.5794,
    lng: -118.1165,
    vibe: "Antelope Valley anchor, space, sky, and serious square footage.",
    intro:
      "Palmdale sits at the heart of the Antelope Valley, high desert living with mountain views, an active aerospace community (Lockheed, Northrop, Boeing skunkworks), and home sizes that are nearly impossible to find south of the mountains.",
    market:
      "Predominantly 1990s and newer single-family inventory on generous lots; significant new construction east of the 14 freeway. Substantial price advantage vs. the LA basin.",
    living:
      "Antelope Valley Mall, Lake Palmdale, and the California Poppy Reserve in spring. Strong demand from buyers commuting via Metrolink and aerospace professionals putting down roots.",
  },
  {
    slug: "barstow",
    name: "Barstow",
    region: "San Bernardino County",
    county: "San Bernardino County",
    realscoutCity: "Barstow",
    realscoutGeoId: "0604030",
    lat: 34.8958,
    lng: -117.0173,
    vibe: "Mojave crossroads, historic Route 66 town with real upside.",
    intro:
      "Barstow is the gateway to the Mojave, historic Route 66, Calico Ghost Town, and a strategic crossroads of the 15 and 40 freeways. A market with genuine value and meaningful long-term growth catalysts (Brightline West rail, Barstow International Gateway logistics).",
    market:
      "Inventory is varied, historic homes downtown, mid-century ranches, ranchettes on acreage in Lenwood and Daggett. Some of the most accessible price points in the state.",
    living:
      "Barstow Station, the Route 66 Mother Road Museum, and Fort Irwin nearby. A market that rewards buyers thinking five-to-ten years out.",
  },
];

export function findArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}

// -----------------------------------------------------------------------------
// CITIES_BY_COUNTY
// -----------------------------------------------------------------------------
// Comprehensive city/community list for each of the four counties Joey serves.
// Used by components/CountyExplorer.tsx on the homepage so visitors can browse
// every city in their county, not just the featured ones with full pages.
//
// `slug` (if present) means the city has a full /areas/<slug>/ page on the
// site, so the CountyExplorer links there. Cities without a slug are linked
// straight to RealScout's city-filtered search via realscoutGeoId, opened in
// the same-page modal lightbox (window.open is intercepted by layout.tsx).
//
// City lists below cover the most populous and most-searched cities in each
// county. Not exhaustive (CA has 482 incorporated cities), but representative.
// Geo IDs follow the same 7-digit RealScout convention as the AREAS table.

export type CountyCity = {
  name: string;
  slug?: string;          // present if a full /areas/<slug>/ page exists
  realscoutGeoId?: string; // for cities without a dedicated page
};

export const CITIES_BY_COUNTY: Record<County, CountyCity[]> = {
  "Orange County": [
    { name: "Aliso Viejo", realscoutGeoId: "0600884" },
    { name: "Anaheim", slug: "anaheim", realscoutGeoId: "0602000" },
    { name: "Brea", realscoutGeoId: "0608142" },
    { name: "Buena Park", slug: "buena-park", realscoutGeoId: "0608954" },
    { name: "Costa Mesa", realscoutGeoId: "0616532" },
    { name: "Cypress", realscoutGeoId: "0617568" },
    { name: "Dana Point", realscoutGeoId: "0617778" },
    { name: "Fountain Valley", realscoutGeoId: "0625380" },
    { name: "Fullerton", realscoutGeoId: "0627000" },
    { name: "Garden Grove", slug: "garden-grove", realscoutGeoId: "0629000" },
    { name: "Huntington Beach", realscoutGeoId: "0636000" },
    { name: "Irvine", slug: "irvine", realscoutGeoId: "0636770" },
    { name: "Laguna Beach", realscoutGeoId: "0639220" },
    { name: "Laguna Hills", realscoutGeoId: "0639223" },
    { name: "Laguna Niguel", realscoutGeoId: "0639241" },
    { name: "Lake Forest", realscoutGeoId: "0639496" },
    { name: "La Habra", realscoutGeoId: "0639192" },
    { name: "La Palma", realscoutGeoId: "0639612" },
    { name: "Los Alamitos", realscoutGeoId: "0643980" },
    { name: "Mission Viejo", slug: "mission-viejo", realscoutGeoId: "0648256" },
    { name: "Newport Beach", slug: "newport-beach", realscoutGeoId: "0651182" },
    { name: "Orange", slug: "orange", realscoutGeoId: "0653980" },
    { name: "Placentia", realscoutGeoId: "0657078" },
    { name: "Rancho Santa Margarita", realscoutGeoId: "0659451" },
    { name: "San Clemente", realscoutGeoId: "0665084" },
    { name: "San Juan Capistrano", realscoutGeoId: "0668028" },
    { name: "Santa Ana", slug: "santa-ana", realscoutGeoId: "0669000" },
    { name: "Seal Beach", realscoutGeoId: "0670644" },
    { name: "Stanton", realscoutGeoId: "0674200" },
    { name: "Tustin", slug: "tustin", realscoutGeoId: "0680854" },
    { name: "Villa Park", realscoutGeoId: "0682590" },
    { name: "Westminster", realscoutGeoId: "0684550" },
    { name: "Yorba Linda", slug: "yorba-linda", realscoutGeoId: "0686832" },
  ],
  "Los Angeles County": [
    { name: "Alhambra", realscoutGeoId: "0601198" },
    { name: "Arcadia", realscoutGeoId: "0602462" },
    { name: "Beverly Hills", realscoutGeoId: "0606308" },
    { name: "Burbank", realscoutGeoId: "0609330" },
    { name: "Calabasas", realscoutGeoId: "0609710" },
    { name: "Carson", realscoutGeoId: "0611530" },
    { name: "Cerritos", realscoutGeoId: "0612552" },
    { name: "Compton", realscoutGeoId: "0615044" },
    { name: "Covina", realscoutGeoId: "0616770" },
    { name: "Culver City", realscoutGeoId: "0617568" },
    { name: "Downey", realscoutGeoId: "0619766" },
    { name: "El Monte", realscoutGeoId: "0622230" },
    { name: "El Segundo", realscoutGeoId: "0622300" },
    { name: "Gardena", realscoutGeoId: "0629084" },
    { name: "Glendale", realscoutGeoId: "0630000" },
    { name: "Glendora", realscoutGeoId: "0630224" },
    { name: "Hawthorne", realscoutGeoId: "0633000" },
    { name: "Hermosa Beach", realscoutGeoId: "0633364" },
    { name: "Inglewood", realscoutGeoId: "0636546" },
    { name: "La Cañada Flintridge", realscoutGeoId: "0639122" },
    { name: "Lakewood", realscoutGeoId: "0639576" },
    { name: "Long Beach", slug: "long-beach", realscoutGeoId: "0643000" },
    { name: "Los Angeles", realscoutGeoId: "0644000" },
    { name: "Lynwood", realscoutGeoId: "0644574" },
    { name: "Malibu", realscoutGeoId: "0644892" },
    { name: "Manhattan Beach", realscoutGeoId: "0645050" },
    { name: "Monrovia", realscoutGeoId: "0648648" },
    { name: "Montebello", realscoutGeoId: "0648914" },
    { name: "Norwalk", realscoutGeoId: "0652526" },
    { name: "Palmdale", slug: "palmdale", realscoutGeoId: "0655156" },
    { name: "Palos Verdes Estates", realscoutGeoId: "0655260" },
    { name: "Pasadena", realscoutGeoId: "0656000" },
    { name: "Pico Rivera", realscoutGeoId: "0656924" },
    { name: "Pomona", realscoutGeoId: "0658072" },
    { name: "Redondo Beach", realscoutGeoId: "0660018" },
    { name: "Rolling Hills Estates", realscoutGeoId: "0662364" },
    { name: "Rosemead", realscoutGeoId: "0662546" },
    { name: "San Dimas", realscoutGeoId: "0667112" },
    { name: "San Fernando", realscoutGeoId: "0667154" },
    { name: "San Gabriel", realscoutGeoId: "0667294" },
    { name: "San Marino", realscoutGeoId: "0668056" },
    { name: "Santa Clarita", realscoutGeoId: "0669088" },
    { name: "Santa Monica", realscoutGeoId: "0670000" },
    { name: "Sierra Madre", realscoutGeoId: "0672016" },
    { name: "Signal Hill", realscoutGeoId: "0672044" },
    { name: "South Pasadena", realscoutGeoId: "0673080" },
    { name: "Temple City", realscoutGeoId: "0678120" },
    { name: "Torrance", realscoutGeoId: "0680000" },
    { name: "Vernon", realscoutGeoId: "0682380" },
    { name: "Walnut", realscoutGeoId: "0683136" },
    { name: "West Covina", realscoutGeoId: "0683724" },
    { name: "West Hollywood", realscoutGeoId: "0683724" },
    { name: "Whittier", realscoutGeoId: "0685418" },
  ],
  "Riverside County": [
    { name: "Banning", realscoutGeoId: "0603918" },
    { name: "Beaumont", realscoutGeoId: "0604954" },
    { name: "Blythe", realscoutGeoId: "0606798" },
    { name: "Calimesa", realscoutGeoId: "0609906" },
    { name: "Canyon Lake", realscoutGeoId: "0610726" },
    { name: "Cathedral City", realscoutGeoId: "0612120" },
    { name: "Coachella", realscoutGeoId: "0614260" },
    { name: "Corona", realscoutGeoId: "0616350" },
    { name: "Desert Hot Springs", realscoutGeoId: "0618870" },
    { name: "Eastvale", realscoutGeoId: "0620018" },
    { name: "Hemet", realscoutGeoId: "0633182" },
    { name: "Indian Wells", realscoutGeoId: "0636546" },
    { name: "Indio", realscoutGeoId: "0636546" },
    { name: "Jurupa Valley", realscoutGeoId: "0637848" },
    { name: "Lake Elsinore", realscoutGeoId: "0639494" },
    { name: "La Quinta", realscoutGeoId: "0640004" },
    { name: "Menifee", realscoutGeoId: "0646260" },
    { name: "Moreno Valley", realscoutGeoId: "0649270" },
    { name: "Murrieta", realscoutGeoId: "0649508" },
    { name: "Norco", realscoutGeoId: "0651994" },
    { name: "Palm Desert", realscoutGeoId: "0655184" },
    { name: "Palm Springs", realscoutGeoId: "0655254" },
    { name: "Perris", slug: "perris", realscoutGeoId: "0656560" },
    { name: "Rancho Mirage", realscoutGeoId: "0659400" },
    { name: "Riverside", slug: "riverside", realscoutGeoId: "0662000" },
    { name: "San Jacinto", realscoutGeoId: "0667826" },
    { name: "Temecula", realscoutGeoId: "0678120" },
    { name: "Wildomar", realscoutGeoId: "0685418" },
  ],
  "San Bernardino County": [
    { name: "Adelanto", realscoutGeoId: "0600296" },
    { name: "Apple Valley", realscoutGeoId: "0602364" },
    { name: "Barstow", slug: "barstow", realscoutGeoId: "0604030" },
    { name: "Big Bear Lake", realscoutGeoId: "0606154" },
    { name: "Chino", realscoutGeoId: "0613210" },
    { name: "Chino Hills", realscoutGeoId: "0613214" },
    { name: "Colton", realscoutGeoId: "0614890" },
    { name: "Fontana", slug: "fontana", realscoutGeoId: "0624680" },
    { name: "Grand Terrace", realscoutGeoId: "0630812" },
    { name: "Hesperia", realscoutGeoId: "0633420" },
    { name: "Highland", realscoutGeoId: "0633924" },
    { name: "Loma Linda", realscoutGeoId: "0642370" },
    { name: "Montclair", realscoutGeoId: "0648648" },
    { name: "Needles", realscoutGeoId: "0650468" },
    { name: "Ontario", slug: "ontario", realscoutGeoId: "0653980" },
    { name: "Rancho Cucamonga", realscoutGeoId: "0659451" },
    { name: "Redlands", realscoutGeoId: "0659962" },
    { name: "Rialto", realscoutGeoId: "0660466" },
    { name: "San Bernardino", realscoutGeoId: "0665000" },
    { name: "Twentynine Palms", realscoutGeoId: "0680854" },
    { name: "Upland", realscoutGeoId: "0681680" },
    { name: "Victorville", realscoutGeoId: "0682590" },
    { name: "Yucaipa", realscoutGeoId: "0687042" },
    { name: "Yucca Valley", realscoutGeoId: "0687070" },
  ],
};
