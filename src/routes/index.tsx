import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkWave — Find gigs, shifts and part-time jobs" },
      {
        name: "description",
        content:
          "WorkWave connects companies with verified 18+ workers for one-time gigs, recurring shifts and part-time jobs.",
      },
      { property: "og:title", content: "WorkWave — Find gigs and part-time jobs" },
      {
        property: "og:description",
        content: "Post a gig or find work. Verified 18+ workers, phone confirmed.",
      },
    ],
  }),
  component: Home,
});

const jobTypes = [
  { title: "One-time gigs", body: "Single tasks that need doing today — move, clean, help out." },
  { title: "Recurring gigs", body: "The same shift every week, with people you already trust." },
  { title: "Part-time jobs", body: "Real part-time roles at companies hiring right now." },
];

function Home() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          WorkWave by Jobify
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          Work that fits your life.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          One-time gigs, recurring shifts and part-time jobs — from companies and people nearby.
          Everyone is 18+ and phone verified.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/how-it-works"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Find work
          </Link>
          <Link
            to="/how-it-works"
            className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Post a gig
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 py-14 sm:grid-cols-3">
          {jobTypes.map((t) => (
            <div key={t.title} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold text-foreground">{t.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-7">
            <h2 className="text-xl font-bold text-foreground">For requesters</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Post what you need and get matched with verified people who can start soon.
            </p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-7">
            <h2 className="text-xl font-bold text-foreground">For doers</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse gigs near you, pick the ones that fit your schedule, and get paid.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
