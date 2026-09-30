// Mock "hireable workers" data for the Find work registration and Post-a-gig matching.
// Placeholder — no real worker sign-ups are persisted yet.

import type { GigType } from "./mock-gigs";

export interface HireableWorker {
  id: string;
  name: string;
  area: string;
  workTypes: GigType[];
  uni: string | null;
  course: string | null;
  ready: boolean;
  phone: string;
  rating: number;
  skills: string[];
}

export const MOCK_WORKERS: HireableWorker[] = [
  {
    id: "w1",
    name: "Aisha N.",
    area: "Dubai Marina",
    workTypes: ["one-time", "recurring"],
    uni: "University of Wollongong Dubai",
    course: "Business",
    ready: true,
    phone: "+971 50 111 2222",
    rating: 4.8,
    skills: ["Barista", "Retail", "Customer service"],
  },
  {
    id: "w2",
    name: "Omar K.",
    area: "Deira",
    workTypes: ["part-time", "one-time"],
    uni: null,
    course: null,
    ready: true,
    phone: "+971 50 333 4444",
    rating: 4.6,
    skills: ["Delivery", "Warehouse", "Driving"],
  },
  {
    id: "w3",
    name: "Priya S.",
    area: "Jumeirah",
    workTypes: ["recurring"],
    uni: "Heriot-Watt Dubai",
    course: "Education",
    ready: true,
    phone: "+971 50 555 6666",
    rating: 4.9,
    skills: ["Tutoring", "Maths", "English"],
  },
  {
    id: "w4",
    name: "Daniel O.",
    area: "Silicon Oasis",
    workTypes: ["one-time"],
    uni: null,
    course: null,
    ready: true,
    phone: "+971 50 777 8888",
    rating: 4.5,
    skills: ["Furniture assembly", "Handyman", "Moving"],
  },
  {
    id: "w5",
    name: "Leila H.",
    area: "Business Bay",
    workTypes: ["part-time", "recurring"],
    uni: "AUD",
    course: "Marketing",
    ready: true,
    phone: "+971 50 999 0000",
    rating: 4.7,
    skills: ["Social media", "Admin", "Reception"],
  },
  {
    id: "w6",
    name: "Ahmed R.",
    area: "Al Barsha",
    workTypes: ["one-time", "part-time"],
    uni: null,
    course: null,
    ready: false,
    phone: "+971 52 123 4567",
    rating: 4.4,
    skills: ["Cleaning", "Painting", "Gardening"],
  },
];

export function workersMatching(
  area: string | null,
  workType: GigType | null,
  skills: string[] = [],
): HireableWorker[] {
  return MOCK_WORKERS.filter((w) => w.ready)
    .filter((w) => (area ? w.area === area : true))
    .filter((w) => (workType ? w.workTypes.includes(workType) : true))
    .filter((w) =>
      skills.length
        ? w.skills.some((s) =>
            skills.some((sk) => sk.toLowerCase() === s.toLowerCase()),
          )
        : true,
    );
}
