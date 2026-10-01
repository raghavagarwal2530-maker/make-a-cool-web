// Mock volunteering community data.
// UK-based placeholder — no real communities are persisted yet.

export interface Community {
  id: string;
  name: string;
  description: string;
  location: string;
  timing: string;
  category: string;
  memberLimit: number;
  autoAccept: boolean;
  members: CommunityMember[];
  pendingMembers: CommunityMember[];
  creatorName: string;
  creatorEmail: string;
  createdAt: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  phone: string;
  joinedAt: string;
}

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: "c1",
    name: "Brighton Beach Cleanup Crew",
    description:
      "We meet every Saturday morning to clean up Brighton Beach. Gloves and bags provided. Great way to meet people and help the environment!",
    location: "Brighton Beach, East Sussex",
    timing: "Every Saturday, 8:00 AM – 10:00 AM",
    category: "Environment",
    memberLimit: 30,
    autoAccept: true,
    members: [
      { id: "m1", name: "Farah A.", phone: "+44 7700 900111", joinedAt: "2d ago" },
      { id: "m2", name: "Hassan M.", phone: "+44 7700 900222", joinedAt: "1d ago" },
    ],
    pendingMembers: [],
    creatorName: "Layla K.",
    creatorEmail: "layla@example.com",
    createdAt: "1 week ago",
  },
  {
    id: "c2",
    name: "Student Food Drive",
    description:
      "University students collecting and distributing food to shelters across Leeds. We need drivers and sorters. Join us every Sunday!",
    location: "Leeds City Centre",
    timing: "Every Sunday, 10:00 AM – 2:00 PM",
    category: "Charity",
    memberLimit: 20,
    autoAccept: false,
    members: [
      { id: "m3", name: "Omar S.", phone: "+44 7700 900333", joinedAt: "3d ago" },
    ],
    pendingMembers: [
      { id: "p1", name: "Nora B.", phone: "+44 7700 900444", joinedAt: "5h ago" },
    ],
    creatorName: "Ahmed T.",
    creatorEmail: "ahmed@example.com",
    createdAt: "3 days ago",
  },
  {
    id: "c3",
    name: "Free Tutoring for Kids",
    description:
      "Volunteer tutors helping younger students with homework and exam prep. All subjects welcome. Sessions are held at the community centre.",
    location: "Camden Community Centre, London",
    timing: "Sundays & Wednesdays, 4:00 PM – 6:00 PM",
    category: "Education",
    memberLimit: 15,
    autoAccept: true,
    members: [
      { id: "m4", name: "Priya R.", phone: "+44 7700 900555", joinedAt: "1w ago" },
      { id: "m5", name: "Sara D.", phone: "+44 7700 900666", joinedAt: "4d ago" },
      { id: "m6", name: "Khalid A.", phone: "+44 7700 900777", joinedAt: "2d ago" },
    ],
    pendingMembers: [],
    creatorName: "Mariam H.",
    creatorEmail: "mariam@example.com",
    createdAt: "2 weeks ago",
  },
];

let _nextId = 100;

export function createCommunity(
  name: string,
  description: string,
  location: string,
  timing: string,
  category: string,
  memberLimit: number,
  autoAccept: boolean,
  creatorName: string,
  creatorEmail: string,
): Community {
  const community: Community = {
    id: `c${_nextId++}`,
    name,
    description,
    location,
    timing,
    category,
    memberLimit,
    autoAccept,
    members: [],
    pendingMembers: [],
    creatorName,
    creatorEmail,
    createdAt: "Just now",
  };
  MOCK_COMMUNITIES.push(community);
  return community;
}

export function joinCommunity(
  communityId: string,
  name: string,
  phone: string,
): { accepted: boolean; message: string } {
  const community = MOCK_COMMUNITIES.find((c) => c.id === communityId);
  if (!community) return { accepted: false, message: "Community not found." };

  if (community.members.length >= community.memberLimit) {
    return {
      accepted: false,
      message: "This community is full! Check back later or browse other communities.",
    };
  }

  const member: CommunityMember = {
    id: `m${_nextId++}`,
    name,
    phone,
    joinedAt: "Just now",
  };

  if (community.autoAccept) {
    community.members.push(member);
    const isNowFull = community.members.length >= community.memberLimit;
    return {
      accepted: true,
      message: isNowFull
        ? `You're in! 🎉 This community is now full (${community.memberLimit}/${community.memberLimit}).`
        : `You're in! 🎉 You're member ${community.members.length} of ${community.memberLimit}.`,
    };
  }

  community.pendingMembers.push(member);
  return {
    accepted: false,
    message:
      "Your application has been sent! The community creator will review it and get back to you.",
  };
}

export function acceptPendingMember(communityId: string, memberId: string): boolean {
  const community = MOCK_COMMUNITIES.find((c) => c.id === communityId);
  if (!community) return false;

  const idx = community.pendingMembers.findIndex((m) => m.id === memberId);
  if (idx === -1) return false;

  const [member] = community.pendingMembers.splice(idx, 1);
  if (member) community.members.push(member);
  return true;
}

export function rejectPendingMember(communityId: string, memberId: string): boolean {
  const community = MOCK_COMMUNITIES.find((c) => c.id === communityId);
  if (!community) return false;

  const idx = community.pendingMembers.findIndex((m) => m.id === memberId);
  if (idx === -1) return false;

  community.pendingMembers.splice(idx, 1);
  return true;
}

export function isCommunityFull(community: Community): boolean {
  return community.members.length >= community.memberLimit;
}

// Get all communities created by a specific creator (by email).
export function getCommunitiesByCreator(creatorEmail: string): Community[] {
  return MOCK_COMMUNITIES.filter(
    (c) => c.creatorEmail.toLowerCase() === creatorEmail.toLowerCase(),
  );
}

// Count how many communities a creator has made.
export function countCommunitiesByCreator(creatorEmail: string): number {
  return MOCK_COMMUNITIES.filter(
    (c) => c.creatorEmail.toLowerCase() === creatorEmail.toLowerCase(),
  ).length;
}
