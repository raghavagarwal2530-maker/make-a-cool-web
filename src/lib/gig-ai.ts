// Mock "AI reconfirmation" for the Post-a-gig flow.
// There is no real AI backend wired up yet, so this simulates two AI passes
// that classify and validate a gig description client-side.

export type GigClassification = "one-time" | "recurring" | "uncertain";

export interface AiReconfirmResult {
  valid: boolean;
  type: GigClassification;
  label: string;
  summary: string;
  usedSecondAI: boolean;
}

const RECURRING_HINTS = [
  "every week",
  "each week",
  "weekly",
  "recurring",
  "regular",
  "monthly",
  "ongoing",
  "routine",
  "every day",
  "mon-fri",
  "mon–fri",
  "sun-thu",
  "sun–thu",
  "fri-sun",
  "fri–sun",
];

// "every <day>" / "each <day>" indicates a recurring weekly shift.
const EVERY_DAY_RE = /\b(every|each)\s+(mon|tue|wed|thu|fri|sat|sun)/i;

const ONETIME_HINTS = [
  "today",
  "tomorrow",
  "once",
  "one-time",
  "this weekend",
  "moving",
  "single",
  "asap",
  "urgent",
  "today only",
];

const SPAM_HINTS = ["buy", "click here", "free money", "crypto", "investment"];

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// First AI pass — classifies the gig.
function firstPass(text: string): GigClassification {
  const lower = text.toLowerCase();
  if (EVERY_DAY_RE.test(text) || RECURRING_HINTS.some((h) => lower.includes(h)))
    return "recurring";
  if (ONETIME_HINTS.some((h) => lower.includes(h))) return "one-time";
  return "uncertain";
}

// Second AI pass — reconfirms when the first pass was uncertain.
function secondPass(text: string): GigClassification {
  const lower = text.toLowerCase();
  // Heuristic: longer, descriptive text tends to be a real one-time gig.
  if (text.trim().length >= 25) return "one-time";
  if (RECURRING_HINTS.some((h) => lower.includes(h))) return "recurring";
  return "one-time";
}

export async function reconfirmGig(
  description: string,
): Promise<AiReconfirmResult> {
  const text = description.trim();

  // First AI pass.
  await delay(1100);
  const first = firstPass(text);

  if (first !== "uncertain") {
    const label = first === "recurring" ? "Recurring gig" : "One-time gig";
    return {
      valid: true,
      type: first,
      label,
      summary: `AI reconfirmed this looks like a real ${label.toLowerCase()}.`,
      usedSecondAI: false,
    };
  }

  // First AI couldn't decide — second AI reconfirms.
  await delay(1300);
  const second = secondPass(text);
  const label = second === "recurring" ? "Recurring gig" : "One-time gig";
  return {
    valid: true,
    type: second,
    label,
    summary: `First AI was unsure, so a second AI reconfirmed this as a ${label.toLowerCase()}.`,
    usedSecondAI: true,
  };
}

export function looksLikeSpam(text: string): boolean {
  const lower = text.toLowerCase();
  return SPAM_HINTS.some((h) => lower.includes(h));
}
