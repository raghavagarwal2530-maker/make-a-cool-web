import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "WorkWave pricing — Only pay when work gets done" },
      {
        name: "description",
        content:
          "Doers join for free. Requesters pay a 10% fee on small one-time gigs or AED 100 per month for recurring gigs. No hidden costs.",
      },
      { property: "og:title", content: "WorkWave pricing" },
      {
        property: "og:description",
        content:
          "Doers keep what they earn. Requesters pay 10% on small one-time gigs or AED 100/month for recurring gigs.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "One-time gig",
    price: "10%",
    note: "commission per gig",
    features: [
      "Post single tasks instantly",
      "The doer receives 10% less than the price the requester sets",
      "Example: AED 200 gig → doer gets AED 180, WorkWave keeps AED 20",
      "Only charged when the gig is completed",
    ],
    featured: false,
  },
  {
    name: "Recurring gig",
    price: "10%",
    note: "commission every month",
    features: [
      "Same shift every week or month",
      "10% commission taken every month the gig runs",
      "The doer receives 10% less than the listed pay",
      "Cancel or change anytime",
    ],
    featured: true,
  },
  {
    name: "Part-time job (company)",
    price: "AED 100",
    note: "every 3 months, for one year",
    features: [
      "For real part-time roles posted by companies",
      "AED 100 charged every 3 months for the first year",
      "After one year we stop charging completely",
      "No percentage taken from the employee’s salary",
    ],
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Simple, fair pricing
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Doers pay no fees or subscriptions — our commission is taken out of the gig price, so a
          doer receives the listed pay minus 10%. Companies hiring part-time pay a flat fee instead.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={
              p.featured
                ? "relative rounded-2xl border-2 border-primary bg-card p-6"
                : "relative rounded-2xl border border-border bg-card p-6"
            }
          >
            {p.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Most common
              </span>
            )}
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {p.name}
            </h2>
            <p className="mt-4 text-4xl font-extrabold text-foreground">{p.price}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-primary">·</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Detailed breakdown */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-foreground">One-time gigs</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            For small, one-off tasks we take a <strong className="text-foreground">10% commission</strong>.
            The remaining <strong className="text-foreground">90% goes straight to the doer</strong>.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Example: a one-time gig pays <strong className="text-foreground">AED 200</strong>. The doer
            receives <strong className="text-foreground">AED 180</strong> and WorkWave receives{" "}
            <strong className="text-foreground">AED 20</strong>.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-foreground">Recurring gigs</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            For a shift that repeats, we take the same{" "}
            <strong className="text-foreground">10% commission every month</strong> the gig keeps
            running. The doer receives 90% of the agreed pay each time.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Example: a weekly cleaning shift at AED 500 pays the doer{" "}
            <strong className="text-foreground">AED 450</strong> per shift.
          </p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-foreground">Part-time jobs & companies</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          When a company hires for a real part-time role, we don’t touch the salary. Instead the
          company pays <strong className="text-foreground">AED 100 every 3 months</strong> —{" "}
          <strong className="text-foreground">four payments over one year</strong>. After that year
          we stop charging for that role entirely.
        </p>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        No subscriptions for doers and no posting fees — just the commission on gig pay, or the flat
        company fee for part-time roles.
      </p>
    </div>
  );
}
