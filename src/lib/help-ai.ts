// Keyword-based help AI for the Help page.
// Answers common questions about WorkWave without needing an external AI API.

export interface HelpMessage {
  role: "user" | "ai";
  text: string;
}

interface HelpRule {
  keywords: string[];
  response: string;
}

const RULES: HelpRule[] = [
  {
    keywords: ["find work", "find a job", "looking for work", "browse gig", "get a gig"],
    response:
      "To find work on WorkWave: go to Get Started, choose 'Find work', verify your email, then head to the Find Work page. Pick your area, university (optional), course, and what type of work you want (one-time gigs, recurring shifts, or part-time jobs). We'll filter gigs near you. You can also register as available so companies can find and hire you directly!",
  },
  {
    keywords: ["post a gig", "post gig", "hire someone", "hire", "i need someone", "looking to hire"],
    response:
      "To post a gig: go to Get Started, choose 'Post a gig', verify your email, then visit the Post a Gig page. We'll first ask if you're a company or an individual. If you're a company, you'll add your company details and the qualities you want in a worker. Then describe the gig — our AI will reconfirm what type it is. Add the location, timing, and pay, and we'll match you with workers who've signed up for that kind of work.",
  },
  {
    keywords: ["volunteer", "community", "create community", "join community"],
    response:
      "Volunteering on WorkWave is open to all ages! You can either create a community (18+ only) or join an existing one (any age). To create: go to Volunteer → Create a community, verify you're 18+, then add your community name, description, location, timing, and set a member limit. You can choose to auto-accept members or review each application manually. To join: go to Volunteer → Join a community and browse all available communities.",
  },
  {
    keywords: ["verify", "verification", "code", "email", "otp", "confirm email"],
    response:
      "When you sign up, we send a 6-digit verification code to your email. Check your inbox (and spam folder just in case), enter the code on the verification page, and you're in! If you didn't receive a code, you can resend it after 60 seconds.",
  },
  {
    keywords: ["age", "18", "under 18", "minor", "how old"],
    response:
      "You must be 18 or older to post gigs, find work, or create a volunteering community. However, anyone of any age can JOIN a volunteering community — younger volunteers just need to provide a parent or guardian's phone number.",
  },
  {
    keywords: ["register", "sign up", "get started", "account", "create account"],
    response:
      "To get started: click 'Get started' in the top right. Choose whether you want to post a gig or find work (or volunteer). Verify your email with the 6-digit code we send, add your phone number and date of birth, and optionally add an ID. That's it — you're ready to go!",
  },
  {
    keywords: ["payment", "pay", "cost", "price", "free", "how much", "aed", "money"],
    response:
      "Finding work and joining volunteering communities is always free. Posting gigs is free too. Creating your first volunteering community is free — each additional community costs AED 50. Check our Pricing page for full details.",
  },
  {
    keywords: ["contact", "phone", "call", "message", "reach", "get in touch"],
    response:
      "Once you're verified, you can contact people directly! If you're finding work, click 'Apply' on any gig to reveal the poster's phone number — you can call or message them. If you're posting a gig, we'll show you matched workers with their contact info so you can reach out.",
  },
  {
    keywords: ["match", "matching", "filter", "recommend"],
    response:
      "Our matching system filters based on your area, the type of work you want, and your skills. When you post a gig, we match you with workers who've signed up for that type of work in your area and have the skills you need. When you find work, we sort gigs by distance from your area.",
  },
  {
    keywords: ["auto accept", "auto-accept", "manual", "approve", "notification", "pending"],
    response:
      "When creating a community, you can choose: auto-accept the first people up to your member limit (they join instantly), or review each application manually (you get a notification each time someone applies, and you can accept or reject them). When your community is full, the creator gets an email notification.",
  },
  {
    keywords: ["safe", "safety", "trust", "scam", "legit", "real"],
    response:
      "Everyone on WorkWave is email-verified and must be 18+ (except volunteering joiners). We collect phone numbers so both sides know who they're dealing with. You can optionally add an ID for extra trust — verified profiles get picked for gigs more often.",
  },
];

const DEFAULT_RESPONSE =
  "I'm here to help with anything about WorkWave! You can ask me about finding work, posting gigs, volunteering, creating or joining communities, verification, payments, safety, and more. What would you like to know?";

export function getHelpResponse(question: string): string {
  const lower = question.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return DEFAULT_RESPONSE;
}
