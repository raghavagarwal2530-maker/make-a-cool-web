import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "WorkWave pricing — Free for workers, pay per booking" },
      {
        name: "description",
        content:
          "Doers join WorkWave free. Companies pay a simple fee only when a gig is completed. No monthly contracts.",
      },
      { property: "og:title", content: "WorkWave pricing" },
      {
        property: "og:description",
        content: "Free for doers. Companies pay only when work gets done.",
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
    features: ["Browse every gig", "18+ and phone verification", "No fees on your earnings"],
    featured: false,
  },
  {
    name: "Requester",
    price: "8%",
    note: "per completed gig",
    features: ["Unlimited gig posts", "One-time, recurring and part-time", "Verified applicants only"],
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
    </div>
  );
}
