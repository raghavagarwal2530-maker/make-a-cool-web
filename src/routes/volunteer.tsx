import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer on WorkWave — Create or join a community" },
      {
        name: "description",
        content:
          "Start a volunteering community or join one. Joining is free and open to any age; creating a community is for 18+.",
      },
      { property: "og:title", content: "Volunteer on WorkWave" },
      {
        property: "og:description",
        content:
          "Create a community or join one. Joining is always free — your first community is free too.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Volunteer,
});

const card =
  "rounded-2xl border border-border bg-card/80 p-7 backdrop-blur transition-colors hover:border-primary";

function Volunteer() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Volunteer
      </p>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        <span className="bg-gradient-to-r from-brand-red from-0% via-brand-orange via-38% to-brand-sky to-78% bg-clip-text text-transparent">
          Give time, not just work.
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        Volunteering on WorkWave is open to every age. Join a community for free, or start your own
        and bring people together.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link to="/create-community" className={card}>
          <h2 className="text-lg font-bold text-foreground">Create a community</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start a volunteering group, set what needs doing and invite people to help.
          </p>
          <p className="mt-4 text-sm font-semibold text-accent">
            First community free · AED 50 for each one after
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Creators must be 18 or older.</p>
        </Link>

        <Link to="/join-community" className={card}>
          <h2 className="text-lg font-bold text-foreground">Join a community</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Find a cause near you and give a few hours whenever it suits you.
          </p>
          <p className="mt-4 text-sm font-semibold text-accent">Always free</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Any age can join — kids can use a parent's phone number.
          </p>
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-foreground">How volunteering works</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Everyone still confirms their email so we know accounts are real. Volunteers of any age are
          welcome, and younger volunteers can put down a parent or guardian's phone number. Creating a
          community is the only part that requires being 18 or older.
        </p>
      </div>
    </div>
  );
}
