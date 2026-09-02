import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How WorkWave works — Post a gig or find work" },
      {
        name: "description",
        content:
          "Three simple steps for both sides of WorkWave: post or browse, verify your age and phone, then get the work done.",
      },
      { property: "og:title", content: "How WorkWave works" },
      {
        property: "og:description",
        content: "Post or browse, verify 18+ and phone, get the work done and paid.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    n: "1",
    title: "Post or browse",
    body: "Requesters describe the gig and the pay. Doers filter by type, schedule and distance.",
  },
  {
    n: "2",
    title: "Verify once",
    body: "Everyone confirms they are 18 or older and adds a phone number, so both sides know who they are dealing with.",
  },
  {
    n: "3",
    title: "Get it done",
    body: "Agree on the details, complete the work, and rate each other afterwards.",
  },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        How WorkWave works
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        The same three steps whether you are hiring or looking for work.
      </p>

      <ol className="mt-10 grid gap-5 sm:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="rounded-xl border border-border bg-card p-6">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {s.n}
            </span>
            <h2 className="mt-4 text-base font-semibold text-foreground">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
        <h2 className="text-base font-semibold text-foreground">Verification requirements</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>· You must be 18 years or older to use WorkWave.</li>
          <li>· A working phone number is required for every account.</li>
          <li>· Accounts that fail verification cannot post or accept gigs.</li>
        </ul>
      </div>
    </div>
  );
}
