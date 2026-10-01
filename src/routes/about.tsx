import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About WorkWave — Built by team Jobify" },
      {
        name: "description",
        content:
          "WorkWave is a gig and part-time job marketplace built by team Jobify to connect companies with verified local workers.",
      },
      { property: "og:title", content: "About WorkWave" },
      {
        property: "og:description",
        content: "A gig and part-time job marketplace built by team Jobify.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    title: "Local first",
    body: "WorkWave matches nearby doers with requesters in the same city, so work gets started fast and trust is built face to face.",
  },
  {
    title: "Verified humans",
    body: "Every account confirms age, email and phone number before posting or accepting a gig. No anonymous profiles, no guesswork.",
  },
  {
    title: "Fair pay",
    body: "Doers keep the majority of what they earn. Requesters only pay when work is actually completed.",
  },
  {
    title: "Built by Jobify",
    body: "WorkWave is designed, built and run by team Jobify — a group focused on making everyday work easier to find and manage.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      {/* Hero / mission */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 sm:p-14">
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            Our mission
          </p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Find work. Find help. <span className="text-primary">No weeks of waiting.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            WorkWave is a marketplace for everyday work. We exist because a few hours of help — or a
            few hours of paid work — should never take weeks of emails, interviews and back-and-forth.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* The two sides */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="grid size-12 place-items-center rounded-2xl bg-primary/10">
            <svg viewBox="0 0 24 24" className="size-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-bold text-foreground">Requesters</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Companies and individuals post one-time gigs, recurring shifts and part-time jobs. You
            describe the work, set the pay, and choose from verified applicants.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="grid size-12 place-items-center rounded-2xl bg-accent/10">
            <svg viewBox="0 0 24 24" className="size-6 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-bold text-foreground">Doers</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            People looking for flexible work browse nearby gigs, pick what fits their schedule, and get
            paid when the job is done.
          </p>
        </div>
      </div>

      {/* Values grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-xl border border-border bg-card/50 p-6">
            <h3 className="text-base font-bold text-foreground">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>

      {/* Volunteering */}
      <div className="mt-10 rounded-2xl border border-accent/40 bg-accent/5 p-8 sm:p-10">
        <h2 className="text-xl font-bold text-foreground">Volunteering is for everyone</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Alongside paid work, WorkWave has communities for volunteering — and those are open to any
          age. A kid can join a community just as easily as an adult: they still confirm their email
          so we know the account is real, but they can put down a parent or guardian's phone number
          instead of their own. Joining is always free.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Creating a community is the one part reserved for 18+, since a creator is responsible for
          the people who show up. Your first community is free; each one after that is £10.
        </p>
        <Link
          to="/volunteer"
          className="mt-6 inline-flex rounded-full border border-accent/60 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
        >
          Explore volunteering
        </Link>
      </div>

      {/* Trust banner */}
      <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-8 sm:p-10">
        <h2 className="text-xl font-bold text-foreground">Safety by design</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Everyone on WorkWave confirms they are 18 or older and registers a working phone number. That
          means both sides know there is a real, reachable person on the other end — before any work
          begins.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">18+ required</span>
          <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">Email verified</span>
          <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">Phone verified</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <p className="text-lg font-semibold text-foreground">Ready to get started?</p>
        <p className="mt-1 text-sm text-muted-foreground">Join WorkWave today and see how simple everyday work can be.</p>
        <Link
          to="/get-started"
          search={{}}
          className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get started
        </Link>
      </div>

      <section className="mt-12 border-t border-border pt-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">The people behind WorkWave</p>
        <h2 className="mt-3 bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-lg font-extrabold text-transparent sm:text-xl">
          Founded by Raghav Agarwal
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Team Jobify includes Raghav Agarwal, Aditi Arun, Rudransh Rathore, Aadit Nair and Aarav Khandelwal.
        </p>
      </section>
    </div>
  );
}
