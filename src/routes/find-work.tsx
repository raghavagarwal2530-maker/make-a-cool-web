import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AREAS,
  gigsSortedByDistanceFrom,
  gigDistance,
  type MockGig,
} from "@/lib/mock-gigs";

export const Route = createFileRoute("/find-work")({
  head: () => ({
    meta: [
      { title: "Find work on WorkWave — gigs near you" },
      {
        name: "description",
        content:
          "Tell us your area, course and what you want — we filter gigs near you.",
      },
    ],
  }),
  component: FindWork,
});

const card =
  "rounded-2xl border border-border bg-card/80 p-6 backdrop-blur shadow-[0_20px_60px_-30px_oklch(0.62_0.22_305/0.8)]";

const input =
  "mt-1 w-full rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const primaryBtn =
  "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50";

const ghostBtn =
  "rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary";

const typeStyles: Record<MockGig["type"], string> = {
  "one-time": "bg-sky-500/15 text-sky-600",
  recurring: "bg-accent/15 text-accent",
  "part-time": "bg-emerald-500/15 text-emerald-600",
};

const WORK_TYPES: { key: MockGig["type"]; label: string; body: string }[] = [
  {
    key: "one-time",
    label: "One-time gigs",
    body: "Single tasks — move, clean, assemble.",
  },
  {
    key: "recurring",
    label: "Recurring shifts",
    body: "The same shift every week.",
  },
  {
    key: "part-time",
    label: "Part-time jobs",
    body: "Regular part-time roles & communities.",
  },
];

function FindWork() {
  const [area, setArea] = useState("");
  const [uni, setUni] = useState("");
  const [course, setCourse] = useState("");
  const [workType, setWorkType] = useState<MockGig["type"] | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [registered, setRegistered] = useState(false);

  const gigs = useMemo(() => {
    if (!submitted || !area || !workType) return [];
    return gigsSortedByDistanceFrom(area).filter((g) => g.type === workType);
  }, [submitted, area, workType]);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Find work
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Gigs{" "}
        <span className="bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
          near you
        </span>
      </h1>

      {/* Questions */}
      <div className={`mt-8 ${card}`}>
        <h2 className="text-xl font-bold text-foreground">
          Tell us what you’re looking for
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Answer a few quick questions and we’ll filter gigs to fit you.
        </p>

        <label className="mt-6 block text-sm font-medium text-foreground">
          Which area do you want to find work in?
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={input}
          >
            <option value="">Select your area…</option>
            {AREAS.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-5 block text-sm font-medium text-foreground">
          University{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
          <input
            value={uni}
            onChange={(e) => setUni(e.target.value)}
            placeholder="e.g. University of Wollongong Dubai"
            maxLength={120}
            className={input}
          />
        </label>

        <label className="mt-5 block text-sm font-medium text-foreground">
          Course you’re studying
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g. Business, Computer Science"
            maxLength={120}
            className={input}
          />
        </label>

        <p className="mt-6 text-sm font-medium text-foreground">
          What do you want to find?
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {WORK_TYPES.map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => setWorkType(o.key)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                workType === o.key
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background/50 hover:border-primary/60"
              }`}
            >
              <span className="block text-sm font-semibold text-foreground">
                {o.label}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {o.body}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!area || !workType}
            onClick={() => setSubmitted(true)}
            className={primaryBtn}
          >
            Show gigs near me
          </button>
          <Link to="/get-started" search={{}} className={ghostBtn}>
            Back
          </Link>
        </div>
      </div>

      {/* Results */}
      {submitted && area && workType && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-foreground">
            {gigs.length} {workType.replace("-", " ")} gig
            {gigs.length === 1 ? "" : "s"} near {area}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Sorted by distance — closest first.
          </p>

          {gigs.length === 0 ? (
            <p className="mt-5 rounded-xl border border-border bg-card/60 p-5 text-sm text-muted-foreground">
              No {workType.replace("-", " ")} gigs near {area} right now. Try
              another area or check back soon.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {gigs.map((g) => {
                const km = gigDistance(area, g);
                return (
                  <li
                    key={g.id}
                    className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur transition-colors hover:border-primary"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${typeStyles[g.type]}`}
                          >
                            {g.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {g.posted}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-foreground">
                          {g.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {g.company} · {g.area}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {g.duration}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-foreground">
                          {g.pay}
                        </p>
                        <p className="mt-1 text-xs font-medium text-accent">
                          {km < 1 ? "<1 km" : `${km.toFixed(1)} km`}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Apply
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        Details
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Register as available */}
      <div className={`mt-8 ${card}`}>
        <h2 className="text-xl font-bold text-foreground">Ready to work?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Register your name and area so companies can find and hire you. Once
          you’re on the list, you can also contact anyone posting a gig that
          fits you.
        </p>
        {registered ? (
          <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
            You’re on the hireable list 🎉 Companies can now find you for{" "}
            {area || "your area"}.
          </p>
        ) : (
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!area}
              onClick={() => setRegistered(true)}
              className={primaryBtn}
            >
              Register as available
            </button>
            <Link to="/get-started" search={{}} className={ghostBtn}>
              Verify my profile first
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
