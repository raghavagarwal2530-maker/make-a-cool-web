import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  getCommunitiesByCreator,
  isCommunityFull,
  type Community,
} from "@/lib/mock-communities";
import {
  MOCK_WORKERS,
  addWorkerRating,
  type HireableWorker,
} from "@/lib/mock-workers";

export const Route = createFileRoute("/my-account")({
  head: () => ({
    meta: [
      { title: "My Account — WorkWave" },
      {
        name: "description",
        content:
          "View your communities, jobs, and worker ratings all in one place.",
      },
    ],
  }),
  component: MyAccount,
});

const card =
  "rounded-2xl border border-border bg-card/80 p-6 backdrop-blur shadow-[0_20px_60px_-30px_oklch(0.62_0.22_305/0.8)]";

const input =
  "mt-1 w-full rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const primaryBtn =
  "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50";

const ghostBtn =
  "rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary";

const categoryStyles: Record<string, string> = {
  Environment: "bg-emerald-500/15 text-emerald-600",
  Charity: "bg-sky-500/15 text-sky-600",
  Education: "bg-accent/15 text-accent",
  Health: "bg-rose-500/15 text-rose-600",
  Animals: "bg-amber-500/15 text-amber-600",
  Community: "bg-primary/15 text-primary",
  Other: "bg-muted/15 text-muted-foreground",
} as Record<string, string>;

type Tab = "communities" | "jobs" | "ratings";

function MyAccount() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("communities");

  // Rating form state
  const [ratingWorker, setRatingWorker] = useState<HireableWorker | null>(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingGig, setRatingGig] = useState("");
  const [ratingComment, setRatingComment] = useState("");
  const [ratingDone, setRatingDone] = useState(false);

  const myCommunities: Community[] = loggedIn ? getCommunitiesByCreator(email) : [];

  const workersWithJobs = MOCK_WORKERS.filter((w) => w.jobsDone.length > 0);

  function submitRating() {
    if (!ratingWorker || !ratingFrom.trim() || !ratingGig.trim()) return;
    addWorkerRating(
      ratingWorker.id,
      ratingFrom.trim(),
      ratingGig.trim(),
      ratingStars,
      ratingComment.trim(),
    );
    setRatingDone(true);
    setRatingWorker(null);
    setRatingStars(5);
    setRatingFrom("");
    setRatingGig("");
    setRatingComment("");
  }

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-md px-5 pb-20 pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          My Account
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          View your{" "}
          <span className="bg-gradient-to-r from-brand-red from-0% via-brand-orange via-38% to-brand-sky to-78% bg-clip-text text-transparent">
            dashboard
          </span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Enter the email you used to create communities or post gigs. We'll show
          your communities, jobs, and worker ratings.
        </p>
        <div className={`mt-8 ${card}`}>
          <label className="block text-sm font-medium text-foreground">
            Your email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={255}
              className={input}
              onKeyDown={(e) => {
                if (e.key === "Enter" && email.trim()) setLoggedIn(true);
              }}
            />
          </label>
          <button
            type="button"
            disabled={!email.trim()}
            onClick={() => setLoggedIn(true)}
            className={`mt-5 ${primaryBtn}`}
          >
            View my account
          </button>
          <Link to="/" className={`mt-3 inline-block ${ghostBtn}`}>
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            My Account
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Your{" "}
            <span className="bg-gradient-to-r from-brand-red from-0% via-brand-orange via-38% to-brand-sky to-78% bg-clip-text text-transparent">
              dashboard
            </span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{email}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setLoggedIn(false);
            setEmail("");
            setTab("communities");
          }}
          className={ghostBtn}
        >
          Switch account
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-border">
        {([
          { key: "communities", label: "My Communities" },
          { key: "jobs", label: "Jobs" },
          { key: "ratings", label: "Workers & Ratings" },
        ] as { key: Tab; label: string }[]).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.key
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* My Communities tab */}
      {tab === "communities" && (
        <div className="mt-6">
          {myCommunities.length === 0 ? (
            <div className={`mt-4 ${card}`}>
              <p className="text-sm text-muted-foreground">
                You haven't created any communities yet.
              </p>
              <Link to="/create-community" className={`mt-4 inline-block ${primaryBtn}`}>
                Create your first community (free)
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {myCommunities.length} community{myCommunities.length === 1 ? "" : "ies"} created.
                {myCommunities.length >= 1 && (
                  <span className="ml-1 text-accent">
                    Your first was free — additional communities require bank details.
                  </span>
                )}
              </p>
              <ul className="mt-4 space-y-4">
                {myCommunities.map((c) => {
                  const full = isCommunityFull(c);
                  return (
                    <li
                      key={c.id}
                      className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                                categoryStyles[c.category] || categoryStyles["Other"]
                              }`}
                            >
                              {c.category}
                            </span>
                            {full && (
                              <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-[11px] font-semibold text-destructive">
                                Full
                              </span>
                            )}
                          </div>
                          <h3 className="mt-2 text-base font-semibold text-foreground">
                            {c.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {c.location} · {c.timing}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {c.members.length}/{c.memberLimit} members · Created {c.createdAt}
                          </p>
                        </div>
                        <Link
                          to="/join-community"
                          className={`shrink-0 ${ghostBtn}`}
                        >
                          View
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Link to="/create-community" className={`mt-6 inline-block ${primaryBtn}`}>
                Create another community
              </Link>
            </>
          )}
        </div>
      )}

      {/* Jobs tab */}
      {tab === "jobs" && (
        <div className="mt-6 space-y-6">
          <div className={`mt-4 ${card}`}>
            <h2 className="text-lg font-bold text-foreground">Jobs found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Gigs you've applied to or shown interest in. Once a gig is completed,
              it moves to "Jobs done" and the hirer can rate the worker.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { title: "Barista for morning shifts", company: "Brew & Co Café", area: "Shoreditch, London", status: "Applied" },
                { title: "Furniture assembly (IKEA)", company: "BuildIt Handy", area: "Brighton", status: "In progress" },
              ].map((j, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-background/50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{j.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {j.company} · {j.area}
                      </p>
                    </div>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                      {j.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-4 ${card}`}>
            <h2 className="text-lg font-bold text-foreground">Jobs done</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Completed gigs. The person who hired you can leave a rating that
              everyone can see.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { title: "Garden cleanup and hedge trim", company: "GreenScape", area: "Bristol", completedAt: "1 week ago" },
                { title: "Retail assistant — weekend", company: "Mart Plus", area: "Manchester", completedAt: "2 weeks ago" },
              ].map((j, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-background/50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{j.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {j.company} · {j.area} · Completed {j.completedAt}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
                      Done ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Workers & Ratings tab */}
      {tab === "ratings" && (
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            Workers who've completed gigs. Leave a rating to help others find
            reliable workers — everyone can see the ratings.
          </p>

          {ratingDone && (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
              Rating submitted! 🎉 It's now visible to everyone.
            </div>
          )}

          {workersWithJobs.length === 0 ? (
            <p className="mt-4 rounded-xl border border-border bg-card/60 p-5 text-sm text-muted-foreground">
              No workers have completed jobs yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {workersWithJobs.map((w) => (
                <li
                  key={w.id}
                  className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {w.name}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          · {w.area} · ★ {w.rating || "No ratings yet"}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {w.skills.join(" · ")}
                        {w.uni ? ` · ${w.uni}` : ""}
                      </p>

                      {/* Jobs done */}
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-foreground">Jobs done:</p>
                        <ul className="mt-1 space-y-1">
                          {w.jobsDone.map((j, i) => (
                            <li key={i} className="text-xs text-muted-foreground">
                              · {j.gigTitle} — {j.company} ({j.completedAt})
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Existing ratings */}
                      {w.ratings.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-foreground">Ratings:</p>
                          <ul className="mt-1 space-y-2">
                            {w.ratings.map((r) => (
                              <li
                                key={r.id}
                                className="rounded-lg border border-border bg-background/50 p-3"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-accent">
                                    {"★".repeat(r.stars)}
                                    <span className="text-muted-foreground">
                                      {"☆".repeat(5 - r.stars)}
                                    </span>
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    by {r.fromName} · {r.createdAt}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  "{r.comment}" — {r.gigTitle}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setRatingWorker(w);
                        setRatingGig(w.jobsDone[0]?.gigTitle || "");
                        setRatingDone(false);
                      }}
                      className={`shrink-0 ${primaryBtn}`}
                    >
                      Rate this worker
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Rating form modal */}
          {ratingWorker && (
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <h3 className="text-base font-bold text-foreground">
                Rate {ratingWorker.name}
              </h3>
              <label className="mt-4 block text-sm font-medium text-foreground">
                Your name / company
                <input
                  value={ratingFrom}
                  onChange={(e) => setRatingFrom(e.target.value)}
                  placeholder="e.g. Brew & Co Café"
                  maxLength={120}
                  className={input}
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-foreground">
                Which gig?
                <select
                  value={ratingGig}
                  onChange={(e) => setRatingGig(e.target.value)}
                  className={input}
                >
                  {ratingWorker.jobsDone.map((j, i) => (
                    <option key={i} value={j.gigTitle}>
                      {j.gigTitle} — {j.company}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-4 block text-sm font-medium text-foreground">
                Rating
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatingStars(s)}
                      className={`text-2xl transition-colors ${
                        s <= ratingStars ? "text-accent" : "text-border"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </label>
              <label className="mt-4 block text-sm font-medium text-foreground">
                Comment (optional)
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share your experience…"
                  rows={3}
                  maxLength={300}
                  className={`${input} resize-none`}
                />
              </label>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!ratingFrom.trim() || !ratingGig}
                  onClick={submitRating}
                  className={primaryBtn}
                >
                  Submit rating
                </button>
                <button
                  type="button"
                  onClick={() => setRatingWorker(null)}
                  className={ghostBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
