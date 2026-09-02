import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "WorkWave pricing — Only 5%, the rest goes to the doer" },
      {
        name: "description",
        content:
          "WorkWave takes just 5% per completed gig. The other 95% goes straight to the doer. No monthly fees, no hidden costs.",
      },
      { property: "og:title", content: "WorkWave pricing" },
      {
        property: "og:description",
        content:
          "Only 5% per gig. The rest goes straight to the person doing the work.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Doer",
    price: "Free",
    note: "for people looking for work",
    features: [
      "Browse every gig",
      "18+ and phone verification",
      "Keep everything you earn — no deductions",
    ],
    featured: false,
  },
  {
    name: "Requester",
    price: "5%",
    note: "per completed gig",
    features: [
      "Unlimited gig posts",
      "One-time, recurring and part-time",
      "Verified applicants only",
    ],
    featured: true,
  },
  {
    name: "Company",
    price: "Custom",
    note: "for teams hiring at scale",
    features: ["Volume pricing", "Multiple locations", "Dedicated support"],
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Pricing</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Workers never pay. Requesters only pay when the work is actually done.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={
              p.featured
                ? "rounded-xl border-2 border-primary bg-card p-6"
                : "rounded-xl border border-border bg-card p-6"
            }
          >
            <h2 className="text-base font-semibold text-foreground">{p.name}</h2>
            <p className="mt-4 text-3xl font-bold text-foreground">{p.price}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {p.features.map((f) => (
                <li key={f}>· {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">How the 5% works</h2>
        <p className="mt-3 text-muted-foreground">
          When a gig is completed, WorkWave keeps only a <strong className="text-foreground">5% commission</strong>. The remaining <strong className="text-foreground">95% goes straight to the doer</strong>.
        </p>
        <p className="mt-3 text-muted-foreground">
          There are no monthly subscriptions, no posting fees, and no hidden charges. If a gig pays AED 1,000, the doer receives AED 950 and WorkWave receives AED 50. Simple as that.
        </p>
      </div>
    </div>
  );
}
