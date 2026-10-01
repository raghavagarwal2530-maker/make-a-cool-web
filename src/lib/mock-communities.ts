// Mock volunteering community data.
// Placeholder — no real communities are persisted yet.

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
    name: "Dubai Beach Cleanup Crew",
    description:
      "We meet every Friday morning to clean up Kite Beach. Gloves and bags provided. Great way to meet people and help the environment!",
    location: "Kite Beach, Dubai",
    timing: "Every Friday, 7:00 AM – 9:00 AM",
    category: "Environment",
    memberLimit: 30,
    autoAccept: true,
    members: [
      { id: "m1", name: "Farah A.", phone: "+971 50 111 2222", joinedAt: "2d ago" },
      { id: "m2", name: "Hassan M.", phone: "+971 50 333 4444", joinedAt: "1d ago" },
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
      "University students collecting and distributing food to labor camps across Dubai. We need drivers and sorters. Join us every Saturday!",
    location: "Deira, Dubai",
    timing: "Every Saturday, 10:00 AM – 2:00 PM",
    category: "Charity",
    memberLimit: 20,
    autoAccept: false,
    members: [
      { id: "m3", name: "Omar S.", phone: "+971 50 555 6666", joinedAt: "3d ago" },
    ],
    pendingMembers: [
      { id: "p1", name: "Nora B.", phone: "+971 50 777 8888", joinedAt: "5h ago" },
    ],
    creatorName: "Ahmed T.",
    creatorEmail: "ahmed@example.com",
    createdAt: "3 days ago",
  },
  {
    id: "c3",
    name: "Free Tutoring for Kids",
    description:
      "Volunteer tutors helping younger students with homework and exam prep. All subjects welcome. Sessions are held at the community center.",
    location: "Al Barsha, Dubai",
    timing: "Sundays & Wednesdays, 4:00 PM – 6:00 PM",
    category: "Education",
    memberLimit: 15,
    autoAccept: true,
    members: [
      { id: "m4", name: "Priya R.", phone: "+971 50 999 0000", joinedAt: "1w ago" },
      { id: "m5", name: "Sara D.", phone: "+971 52 111 2222", joinedAt: "4d ago" },
      { id: "m6", name: "Khalid A.", phone: "+971 52 333 4444", joinedAt: "2d ago" },
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
