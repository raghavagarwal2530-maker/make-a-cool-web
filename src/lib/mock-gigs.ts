// Mock gig data and proximity helpers for the "Find work" screen.
// UK-based placeholder data — no real gigs are posted yet.

export type GigType = "one-time" | "recurring" | "part-time";

export interface MockGig {
  id: string;
  title: string;
  company: string;
  type: GigType;
  pay: string;
  area: string;
  lat: number;
  lng: number;
  posted: string;
  duration: string;
  phone: string;
}

// UK areas with approximate coordinates (lat, lng).
export const AREAS: { name: string; lat: number; lng: number }[] = [
  { name: "Camden, London", lat: 51.529, lng: -0.1255 },
  { name: "Shoreditch, London", lat: 51.525, lng: -0.075 },
  { name: "Westminster, London", lat: 51.4975, lng: -0.1357 },
  { name: "Greenwich, London", lat: 51.4826, lng: 0.0077 },
  { name: "Brixton, London", lat: 51.461, lng: -0.115 },
  { name: "Manchester", lat: 53.4808, lng: -2.2426 },
  { name: "Birmingham", lat: 52.4862, lng: -1.8904 },
  { name: "Leeds", lat: 53.8008, lng: -1.5491 },
  { name: "Bristol", lat: 51.4545, lng: -2.5879 },
  { name: "Liverpool", lat: 53.4084, lng: -2.9916 },
  { name: "Sheffield", lat: 53.3811, lng: -1.4705 },
  { name: "Edinburgh", lat: 55.9533, lng: -3.1883 },
  { name: "Glasgow", lat: 55.8642, lng: -4.2518 },
  { name: "Cardiff", lat: 51.4816, lng: -3.1791 },
  { name: "Brighton", lat: 50.8225, lng: -0.1372 },
  { name: "Newcastle", lat: 54.9783, lng: -1.6178 },
  { name: "Oxford", lat: 51.752, lng: -1.2577 },
  { name: "Cambridge", lat: 52.2053, lng: 0.1218 },
  { name: "Bournemouth", lat: 50.7194, lng: -1.8809 },
  { name: "Nottingham", lat: 52.954, lng: -1.1581 },
];

export const MOCK_GIGS: MockGig[] = [
  {
    id: "g1",
    title: "Movers needed for 1-bed flat",
    company: "QuickShift Movers",
    type: "one-time",
    pay: "£120 / gig",
    area: "Camden, London",
    lat: 51.529,
    lng: -0.1255,
    posted: "2h ago",
    duration: "3–4 hours",
    phone: "+44 7700 900001",
  },
  {
    id: "g2",
    title: "Barista for morning shifts",
    company: "Brew & Co Café",
    type: "recurring",
    pay: "£12 / hour",
    area: "Shoreditch, London",
    lat: 51.525,
    lng: -0.075,
    posted: "5h ago",
    duration: "Mon–Fri, 6–10am",
    phone: "+44 7700 900002",
  },
  {
    id: "g3",
    title: "Weekend event setup crew",
    company: "Eventify London",
    type: "recurring",
    pay: "£13 / hour",
    area: "Westminster, London",
    lat: 51.4975,
    lng: -0.1357,
    posted: "1d ago",
    duration: "Every Sat, 8am–2pm",
    phone: "+44 7700 900003",
  },
  {
    id: "g4",
    title: "Delivery rider — own bike",
    company: "SwiftDeliver",
    type: "part-time",
    pay: "£10 / hour + tips",
    area: "Greenwich, London",
    lat: 51.4826,
    lng: 0.0077,
    posted: "3h ago",
    duration: "Evenings, 4–9pm",
    phone: "+44 7700 900004",
  },
  {
    id: "g5",
    title: "House painting — 2 rooms",
    company: "ColourPro Handyman",
    type: "one-time",
    pay: "£200 / gig",
    area: "Brixton, London",
    lat: 51.461,
    lng: -0.115,
    posted: "6h ago",
    duration: "1–2 days",
    phone: "+44 7700 900005",
  },
  {
    id: "g6",
    title: "Retail assistant — weekend",
    company: "Mart Plus",
    type: "recurring",
    pay: "£11 / hour",
    area: "Manchester",
    lat: 53.4808,
    lng: -2.2426,
    posted: "8h ago",
    duration: "Fri–Sun, 12–8pm",
    phone: "+44 7700 900006",
  },
  {
    id: "g7",
    title: "Tutor for GCSE maths",
    company: "Private family",
    type: "recurring",
    pay: "£25 / session",
    area: "Oxford",
    lat: 51.752,
    lng: -1.2577,
    posted: "1d ago",
    duration: "2x weekly, 1.5hr",
    phone: "+44 7700 900007",
  },
  {
    id: "g8",
    title: "Garden cleanup and hedge trim",
    company: "GreenScape",
    type: "one-time",
    pay: "£80 / gig",
    area: "Bristol",
    lat: 51.4545,
    lng: -2.5879,
    posted: "4h ago",
    duration: "Half day",
    phone: "+44 7700 900008",
  },
  {
    id: "g9",
    title: "Warehouse packer — evening shift",
    company: "BoxRight Logistics",
    type: "part-time",
    pay: "£10 / hour",
    area: "Birmingham",
    lat: 52.4862,
    lng: -1.8904,
    posted: "2d ago",
    duration: "Mon–Thu, 6–10pm",
    phone: "+44 7700 900009",
  },
  {
    id: "g10",
    title: "Receptionist cover — 2 weeks",
    company: "BrightSmile Clinic",
    type: "part-time",
    pay: "£12 / hour",
    area: "Leeds",
    lat: 53.8008,
    lng: -1.5491,
    posted: "12h ago",
    duration: "9am–3pm, weekdays",
    phone: "+44 7700 900010",
  },
  {
    id: "g11",
    title: "Furniture assembly (IKEA)",
    company: "BuildIt Handy",
    type: "one-time",
    pay: "£70 / gig",
    area: "Brighton",
    lat: 50.8225,
    lng: -0.1372,
    posted: "7h ago",
    duration: "2–3 hours",
    phone: "+44 7700 900011",
  },
  {
    id: "g12",
    title: "Cleaner for small office",
    company: "Spotless Co.",
    type: "recurring",
    pay: "£15 / hour",
    area: "Liverpool",
    lat: 53.4084,
    lng: -2.9916,
    posted: "1d ago",
    duration: "3x weekly, 2hr",
    phone: "+44 7700 900012",
  },
];

// Haversine distance in km between two coordinates.
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Try to match a free-text area to a known coordinate for distance sorting.
function findAreaCoord(text: string) {
  const lower = text.toLowerCase();
  return (
    AREAS.find((a) => a.name.toLowerCase() === lower) ||
    AREAS.find((a) => {
      const first = a.name.toLowerCase().split(",")[0] ?? "";
      return lower.includes(first);
    }) ||
    AREAS.find((a) => a.name.toLowerCase().includes(lower))
  );
}

export function gigsSortedByDistanceFrom(areaName: string): MockGig[] {
  const origin = findAreaCoord(areaName);
  if (!origin) return MOCK_GIGS;
  return [...MOCK_GIGS].sort(
    (a, b) => distanceKm(origin, a) - distanceKm(origin, b),
  );
}

export function gigDistance(areaName: string, gig: MockGig): number {
  const origin = findAreaCoord(areaName);
  if (!origin) return 0;
  return distanceKm(origin, gig);
}

// Filter gigs whose area matches the typed text (case-insensitive partial).
export function gigsByAreaText(text: string): MockGig[] {
  if (!text.trim()) return MOCK_GIGS;
  const lower = text.toLowerCase();
  return MOCK_GIGS.filter((g) => g.area.toLowerCase().includes(lower));
}
