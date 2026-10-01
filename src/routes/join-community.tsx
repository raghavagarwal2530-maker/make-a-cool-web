import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MOCK_COMMUNITIES,
  joinCommunity,
  isCommunityFull,
  type Community,
} from "@/lib/mock-communities";

export const Route = createFileRoute("/join-community")({
  head: () => ({
    meta: [
      { title: "Join a volunteering community — WorkWave" },
      {
        name: "description",
        content:
          "Browse volunteering communities and join one that fits you. Open to all ages.",
      },
    ],
  }),
  component: JoinCommunity,
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

function JoinCommunity() {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Community | null>(null);
  const [joinName, setJoinName] = useState("");
  const [joinPhone, setJoinPhone] = useState("");
  const [joinResult, setJoinResult] = useState<string | null>(null);

  const communities = MOCK_COMMUNITIES.filter((c) =>
    filter
      ? c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.category.toLowerCase().includes(filter.toLowerCase()) ||
        c.location.toLowerCase().includes(filter.toLowerCase())
      : true,
  );

  if (selected) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-16">
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setJoinResult(null);
            setJoinName("");
            setJoinPhone("");
          }}
          className={ghostBtn}
        >
          ← Back to all communities
        </button>

        <div className={`mt-6 ${card}`}>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              categoryStyles[selected.category] || categoryStyles["Other"]
            }`}
          >
            {selected.category}
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
            {selected.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Created by {selected.creatorName} · {selected.createdAt}
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div>
              <p className="font-semibold text-foreground">Description</p>
              <p className="mt-1 text-muted-foreground">{selected.description}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Location</p>
              <p className="mt-1 text-muted-foreground">{selected.location}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Timing</p>
              <p className="mt-1 text-muted-foreground">{selected.timing}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Members</p>
              <p className="mt-1 text-muted-foreground">
                {selected.members.length} / {selected.memberLimit} joined
                {isCommunityFull(selected) && " — full!"}
              </p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, (selected.members.length / selected.memberLimit) * 100)}%` }}
                />
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground">How joining works</p>
              <p className="mt-1 text-muted-foreground">
                {selected.autoAccept
                  ? "Auto-accept: you'll join instantly if there's space."
                  : "Manual review: the creator will review your application and get back to you."}
              </p>
            </div>
          </div>

          {joinResult ? (
            <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
              {joinResult}
            </div>
          ) : isCommunityFull(selected) ? (
            <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              This community is full! Check back later or browse other communities.
            </div>
          ) : (
            <div className="mt-6">
              <h2 className="text-base font-bold text-foreground">Join this community</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Any age can join. If you're under 18, use a parent or guardian's phone number.
              </p>
              <label className="mt-4 block text-sm font-medium text-foreground">
                Your name
                <input
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="Your name"
                  maxLength={80}
                  className={input}
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-foreground">
                Phone number
                <input
                  type="tel"
                  value={joinPhone}
                  onChange={(e) => setJoinPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  maxLength={20}
                  className={input}
                />
              </label>
              <button
                type="button"
                disabled={!joinName.trim() || joinPhone.trim().length < 7}
                onClick={() => {
                  const result = joinCommunity(selected.id, joinName.trim(), joinPhone.trim());
                  setJoinResult(result.message);
                }}
                className={`mt-5 ${primaryBtn}`}
              >
                {selected.autoAccept ? "Join now" : "Apply to join"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Volunteer
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Join a{" "}
        <span className="bg-gradient-to-r from-brand-red from-0% via-brand-orange via-38% to-brand-sky to-78% bg-clip-text text-transparent">
          community
        </span>
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Browse volunteering communities near you and join one that fits. Open to all ages —
        no verification needed to join.
      </p>

      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search by name, category, or location…"
        maxLength={100}
        className={`mt-6 ${input}`}
      />

      {communities.length === 0 ? (
        <p className="mt-6 rounded-xl border border-border bg-card/60 p-5 text-sm text-muted-foreground">
          No communities found. Try a different search or{" "}
          <Link to="/create-community" className="text-accent underline-offset-4 hover:underline">
            create your own
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {communities.map((c) => {
            const full = isCommunityFull(c);
            return (
              <li
                key={c.id}
                className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur transition-colors hover:border-primary"
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
                    <h3 className="mt-2 text-base font-semibold text-foreground">{c.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.location} · {c.timing}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {c.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {c.members.length}/{c.memberLimit} members
                      {c.autoAccept ? " · Auto-accept" : " · Manual review"}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={full}
                    onClick={() => setSelected(c)}
                    className={`shrink-0 ${primaryBtn}`}
                  >
                    {full ? "Full" : "View & join"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/create-community" className={ghostBtn}>
          Create your own community
        </Link>
        <Link to="/volunteer" className={ghostBtn}>
          Back to volunteer
        </Link>
      </div>
    </div>
  );
}
