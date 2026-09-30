// Mock gig data and proximity helpers for the "Find work" screen.
// This is placeholder data — no real gigs are posted yet.

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

// UAE areas with approximate coordinates (lat, lng).
export const AREAS: { name: string; lat: number; lng: number }[] = [
  { name: "Dubai Marina", lat: 25.0772, lng: 55.139 },
  { name: "Downtown Dubai", lat: 25.1972, lng: 55.2744 },
  { name: "Business Bay", lat: 25.185, lng: 55.242 },
  { name: "JLT", lat: 25.0657, lng: 55.139 },
  { name: "Deira", lat: 25.273, lng: 55.3373 },
  { name: "Al Barsha", lat: 25.1185, lng: 55.209 },
  { name: "Jumeirah", lat: 25.227, lng: 55.208 },
  { name: "Silicon Oasis", lat: 25.13, lng: 55.2105 },
  { name: "Sharjah", lat: 25.3463, lng: 55.4209 },
  { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773 },
];

export const MOCK_GIGS: MockGig[] = [
  {
    id: "g1",
    title: "Movers needed for 1-bed apartment",
    company: "QuickShift Movers",
    type: "one-time",
    pay: "AED 350 / gig",
    area: "Dubai Marina",
    lat: 25.0772,
    lng: 55.139,
    posted: "2h ago",
    duration: "3–4 hours",
    phone: "+971 50 100 0001",
  },
  {
    id: "g2",
    title: "Barista for morning shifts",
    company: "Brew & Co Café",
    type: "recurring",
    pay: "AED 45 / hour",
    area: "Downtown Dubai",
    lat: 25.1972,
    lng: 55.2744,
    posted: "5h ago",
    duration: "Mon–Fri, 6–10am",
    phone: "+971 50 100 0002",
  },
  {
    id: "g3",
    title: "Weekend event setup crew",
    company: "Eventify Dubai",
    type: "recurring",
    pay: "AED 50 / hour",
    area: "Business Bay",
    lat: 25.185,
    lng: 55.242,
    posted: "1d ago",
    duration: "Every Sat, 8am–2pm",
    phone: "+971 50 100 0003",
  },
  {
    id: "g4",
    title: "Delivery rider — own bike",
    company: "SwiftDeliver",
    type: "part-time",
    pay: "AED 30 / hour + tips",
    area: "JLT",
    lat: 25.0657,
    lng: 55.139,
    posted: "3h ago",
    duration: "Evenings, 4–9pm",
    phone: "+971 50 100 0004",
  },
  {
    id: "g5",
    title: "House painting — 2 rooms",
    company: "ColourPro Handyman",
    type: "one-time",
    pay: "AED 600 / gig",
    area: "Al Barsha",
    lat: 25.1185,
    lng: 55.209,
    posted: "6h ago",
    duration: "1–2 days",
    phone: "+971 50 100 0005",
  },
  {
    id: "g6",
    title: "Retail assistant — weekend",
    company: "Mart Plus",
    type: "recurring",
    pay: "AED 40 / hour",
    area: "Deira",
    lat: 25.273,
    lng: 55.3373,
    posted: "8h ago",
    duration: "Fri–Sun, 12–8pm",
    phone: "+971 50 100 0006",
  },
  {
    id: "g7",
    title: "Tutor for Grade 10 maths",
    company: "Private family",
    type: "recurring",
    pay: "AED 120 / session",
    area: "Jumeirah",
    lat: 25.227,
    lng: 55.208,
    posted: "1d ago",
    duration: "2x weekly, 1.5hr",
    phone: "+971 50 100 0007",
  },
  {
    id: "g8",
    title: "Garden cleanup and hedge trim",
    company: "GreenScape",
    type: "one-time",
    pay: "AED 250 / gig",
    area: "Silicon Oasis",
    lat: 25.13,
    lng: 55.2105,
    posted: "4h ago",
    duration: "Half day",
    phone: "+971 50 100 0008",
  },
  {
    id: "g9",
    title: "Warehouse packer — evening shift",
    company: "BoxRight Logistics",
    type: "part-time",
    pay: "AED 35 / hour",
    area: "Sharjah",
    lat: 25.3463,
    lng: 55.4209,
    posted: "2d ago",
    duration: "Sun–Thu, 6–10pm",
    phone: "+971 50 100 0009",
  },
  {
    id: "g10",
    title: "Receptionist cover — 2 weeks",
    company: "BrightSmile Clinic",
    type: "part-time",
    pay: "AED 50 / hour",
    area: "Abu Dhabi",
    lat: 24.4539,
    lng: 54.3773,
    posted: "12h ago",
    duration: "9am–3pm, weekdays",
    phone: "+971 50 100 0010",
  },
  {
    id: "g11",
    title: "Furniture assembly (IKEA)",
    company: "BuildIt Handy",
    type: "one-time",
    pay: "AED 200 / gig",
    area: "Dubai Marina",
    lat: 25.0772,
    lng: 55.139,
    posted: "7h ago",
    duration: "2–3 hours",
    phone: "+971 50 100 0011",
  },
  {
    id: "g12",
    title: "Cleaner for small office",
    company: "Spotless Co.",
    type: "recurring",
    pay: "AED 60 / hour",
    area: "Business Bay",
    lat: 25.185,
    lng: 55.242,
    posted: "1d ago",
    duration: "3x weekly, 2hr",
    phone: "+971 50 100 0012",
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

export function gigsSortedByDistanceFrom(areaName: string): MockGig[] {
  const origin = AREAS.find((a) => a.name === areaName);
  if (!origin) return MOCK_GIGS;
  return [...MOCK_GIGS].sort(
    (a, b) => distanceKm(origin, a) - distanceKm(origin, b),
  );
}

export function gigDistance(areaName: string, gig: MockGig): number {
  const origin = AREAS.find((a) => a.name === areaName);
  if (!origin) return 0;
  return distanceKm(origin, gig);
}
