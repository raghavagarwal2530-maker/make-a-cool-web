import { createFileRoute } from "@tanstack/react-router";

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

function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About WorkWave
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          WorkWave is a marketplace for everyday work. We built it because finding a few hours of
          help — or a few hours of paid work — should not take weeks of emails and interviews.
        </p>
        <p>
          The platform has two sides. Requesters post one-time gigs, recurring gigs or part-time
          jobs. Doers browse what is nearby and take on what fits their schedule.
        </p>
        <p>
          Everyone on WorkWave confirms they are 18 or older and registers a phone number, so both
          sides know there is a real, reachable person on the other end.
        </p>
        <p>
          WorkWave is made by <span className="font-semibold text-foreground">team Jobify</span>.
        </p>
      </div>
    </div>
  );
}
