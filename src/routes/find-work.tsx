import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AREAS, gigsSortedByDistanceFrom, gigDistance, type MockGig } from "@/lib/mock-gigs";

export const Route = createFileRoute("/find-work")({
  head: () => ({
    meta: [
      { title: "Find work on WorkWave — gigs near you" },
      {
        name: "description",
        content: "Browse gigs, shifts and part-time jobs near you, sorted by distance.",
      },
    ],
  }),
  component: FindWork,
});

const card =
  "rounded-2xl border border-border bg-card/80 p-6 backdrop-blur shadow-[0_20px_60px_-30px_oklch(0.62_0.22_305/0.8)]";

const input =
  "mt-1 w-full rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary";

const primaryBtn =
  "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50";

const ghostBtn =
  "rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary";

const typeStyles: Record<MockGig["type"], string> = {
  "one-time": "bg-sky-500/15 text-sky-600",
  recurring: "bg-accent/15 text-accent",
  "part-time": "bg-emerald-500/15 text-emerald-600",
};

function FindWork() {
  const [area, setArea] = useState("");
  const [filter, setFilter] = useState<"all" | MockGig["type"]>("all");
  const [submitted, setSubmitted] = useState(false);

  const gigs = useMemo(() => {
    if (!submitted || !area) return [];
    return gigsSortedByDistanceFrom(area).filter(
      (g) => filter === "all" || g.type === filter,
    );
  }, [submitted, area, filter]);

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

      {/* Location selector */}
      <div className={`mt-8 ${card}`}>
        <h2 className="text-xl font-bold text-foreground">Where are you?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us your area and we'll sort every gig from closest to farthest.
        </p>
        <label className="mt-6 block text-sm font-medium text-foreground">
          Your area
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
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!area}
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
      {submitted && area && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">
              {gigs.length} gig{gigs.length === 1 ? "" : "s"} near {area}
            </p>
            <div className="flex flex-wrap gap-2">
              {(["all", "one-time", "recurring", "part-time"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {f === "part-time" ? "part-time" : f}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Sorted by distance — closest first.
          </p>

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
                      <p className="text-sm font-bold text-foreground">{g.pay}</p>
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
        </div>
      )}
    </div>
  );
}
