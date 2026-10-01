// Mock "hireable workers" data for the Find work registration and Post-a-gig matching.
// UK-based placeholder — no real worker sign-ups are persisted yet.

import type { GigType } from "./mock-gigs";

export interface WorkerRating {
  id: string;
  fromName: string;
  gigTitle: string;
  stars: number;
  comment: string;
  createdAt: string;
}

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
  ratings: WorkerRating[];
  jobsDone: { gigTitle: string; company: string; completedAt: string }[];
}

// Mutable list — new registrations from the Find Work page are added here
// at runtime so the Post-a-gig matcher can pick them up in the same session.
export const MOCK_WORKERS: HireableWorker[] = [
  {
    id: "w1",
    name: "Aisha N.",
    area: "Camden, London",
    workTypes: ["one-time", "recurring"],
    uni: "UCL",
    course: "Business",
    ready: true,
    phone: "+44 7700 900111",
    rating: 4.8,
    skills: ["Barista", "Retail", "Customer service"],
    ratings: [
      { id: "r1", fromName: "Brew & Co Café", gigTitle: "Barista for morning shifts", stars: 5, comment: "Punctual and great with customers.", createdAt: "1 week ago" },
    ],
    jobsDone: [
      { gigTitle: "Barista for morning shifts", company: "Brew & Co Café", completedAt: "1 week ago" },
    ],
  },
  {
    id: "w2",
    name: "Omar K.",
    area: "Manchester",
    workTypes: ["part-time", "one-time"],
    uni: null,
    course: null,
    ready: true,
    phone: "+44 7700 900222",
    rating: 4.6,
    skills: ["Delivery", "Warehouse", "Driving"],
    ratings: [
      { id: "r2", fromName: "SwiftDeliver", gigTitle: "Delivery rider — own bike", stars: 4, comment: "Reliable, would hire again.", createdAt: "3 days ago" },
    ],
    jobsDone: [
      { gigTitle: "Delivery rider — own bike", company: "SwiftDeliver", completedAt: "3 days ago" },
      { gigTitle: "Warehouse packer — evening shift", company: "BoxRight Logistics", completedAt: "2 weeks ago" },
    ],
  },
  {
    id: "w3",
    name: "Priya S.",
    area: "Oxford",
    workTypes: ["recurring"],
    uni: "Oxford Brookes University",
    course: "Education",
    ready: true,
    phone: "+44 7700 900333",
    rating: 4.9,
    skills: ["Tutoring", "Maths", "English"],
    ratings: [
      { id: "r3", fromName: "Private family", gigTitle: "Tutor for GCSE maths", stars: 5, comment: "Excellent tutor, my daughter's grades improved.", createdAt: "5 days ago" },
    ],
    jobsDone: [
      { gigTitle: "Tutor for GCSE maths", company: "Private family", completedAt: "5 days ago" },
    ],
  },
  {
    id: "w4",
    name: "Daniel O.",
    area: "Bristol",
    workTypes: ["one-time"],
    uni: null,
    course: null,
    ready: true,
    phone: "+44 7700 900444",
    rating: 4.5,
    skills: ["Furniture assembly", "Handyman", "Moving"],
    ratings: [],
    jobsDone: [
      { gigTitle: "Furniture assembly (IKEA)", company: "BuildIt Handy", completedAt: "1 week ago" },
    ],
  },
  {
    id: "w5",
    name: "Leila H.",
    area: "Shoreditch, London",
    workTypes: ["part-time", "recurring"],
    uni: "King's College London",
    course: "Marketing",
    ready: true,
    phone: "+44 7700 900555",
    rating: 4.7,
    skills: ["Social media", "Admin", "Reception"],
    ratings: [
      { id: "r4", fromName: "BrightSmile Clinic", gigTitle: "Receptionist cover — 2 weeks", stars: 5, comment: "Very professional and organised.", createdAt: "2 days ago" },
    ],
    jobsDone: [
      { gigTitle: "Receptionist cover — 2 weeks", company: "BrightSmile Clinic", completedAt: "2 days ago" },
    ],
  },
  {
    id: "w6",
    name: "Ahmed R.",
    area: "Birmingham",
    workTypes: ["one-time", "part-time"],
    uni: null,
    course: null,
    ready: false,
    phone: "+44 7700 900666",
    rating: 4.4,
    skills: ["Cleaning", "Painting", "Gardening"],
    ratings: [],
    jobsDone: [],
  },
];

let _nextId = 100;
let _nextRatingId = 100;

export function registerWorker(
  name: string,
  area: string,
  workTypes: GigType[],
  phone: string,
  skills: string[],
  uni: string | null = null,
  course: string | null = null,
): HireableWorker {
  const worker: HireableWorker = {
    id: `w${_nextId++}`,
    name,
    area,
    workTypes,
    uni,
    course,
    ready: true,
    phone,
    rating: 0,
    skills,
    ratings: [],
    jobsDone: [],
  };
  MOCK_WORKERS.push(worker);
  return worker;
}

export function workersMatching(
  area: string | null,
  workType: GigType | null,
  skills: string[] = [],
): HireableWorker[] {
  return MOCK_WORKERS.filter((w) => w.ready)
    .filter((w) => {
      if (!area) return true;
      const a = area.toLowerCase();
      const wArea = w.area.toLowerCase();
      return wArea.includes(a) || a.includes(wArea);
    })
    .filter((w) => (workType ? w.workTypes.includes(workType) : true))
    .filter((w) =>
      skills.length
        ? w.skills.some((s) =>
            skills.some((sk) => sk.toLowerCase() === s.toLowerCase()),
          )
        : true,
    );
}

// Add a rating to a worker. Returns the updated worker or null.
export function addWorkerRating(
  workerId: string,
  fromName: string,
  gigTitle: string,
  stars: number,
  comment: string,
): HireableWorker | null {
  const worker = MOCK_WORKERS.find((w) => w.id === workerId);
  if (!worker) return null;

  const rating: WorkerRating = {
    id: `r${_nextRatingId++}`,
    fromName,
    gigTitle,
    stars,
    comment,
    createdAt: "Just now",
  };
  worker.ratings.push(rating);

  // Recalculate average rating
  const total = worker.ratings.reduce((sum, r) => sum + r.stars, 0);
  worker.rating = Math.round((total / worker.ratings.length) * 10) / 10;

  return worker;
}
