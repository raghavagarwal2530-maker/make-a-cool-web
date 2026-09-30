import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  reconfirmGig,
  looksLikeSpam,
  type AiReconfirmResult,
} from "@/lib/gig-ai";
import { AREAS, type GigType } from "@/lib/mock-gigs";
import { workersMatching, type HireableWorker } from "@/lib/mock-workers";

export const Route = createFileRoute("/post-a-gig")({
  head: () => ({
    meta: [
      { title: "Post a gig on WorkWave" },
      {
        name: "description",
        content:
          "Confirm you’re a company or individual, describe your gig, let AI reconfirm it, then add the location and timing.",
      },
    ],
  }),
  component: PostAGig,
});

const card =
  "rounded-2xl border border-border bg-card/80 p-6 backdrop-blur shadow-[0_20px_60px_-30px_oklch(0.62_0.22_305/0.8)]";

const input =
  "mt-1 w-full rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const primaryBtn =
  "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50";

const ghostBtn =
  "rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary";

function PostAGig() {
  const [step, setStep] = useState(0);
  const [isCompany, setIsCompany] = useState<boolean | null>(null);

  // Company / employee-quality details
  const [companyName, setCompanyName] = useState("");
  const [yourName, setYourName] = useState("");
  const [needType, setNeedType] = useState<GigType | "">("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  // Gig description + AI reconfirm
  const [description, setDescription] = useState("");
  const [aiState, setAiState] = useState<"idle" | "checking" | "done">("idle");
  const [aiResult, setAiResult] = useState<AiReconfirmResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Location + timing
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [timing, setTiming] = useState("");
  const [pay, setPay] = useState("");
  const [posted, setPosted] = useState(false);

  const total = isCompany ? 6 : 5;

  const matchedWorkers = useMemo<HireableWorker[]>(() => {
    if (step !== (isCompany ? 5 : 4)) return [];
    const skillsList = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return workersMatching(area || null, (needType || null) as GigType | null, skillsList);
  }, [step, isCompany, area, needType, skills]);

  async function runReconfirm() {
    const text = description.trim();
    if (text.length < 10) {
      setAiError("Add a bit more detail so the AI can reconfirm your gig.");
      return;
    }
    if (looksLikeSpam(text)) {
      setAiError("That doesn’t look like a gig. Please describe real work.");
      return;
    }
    setAiError(null);
    setAiState("checking");
    const result = await reconfirmGig(text);
    setAiResult(result);
    setAiState("done");
  }

  const describeStep = isCompany ? 2 : 1;
  const locationStep = isCompany ? 3 : 2;
  const timingStep = isCompany ? 4 : 3;
  const doneStep = isCompany ? 5 : 4;

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Post a gig
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Tell us what you{" "}
        <span className="bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
          need
        </span>
      </h1>

      {step < total && (
        <div
          className="mt-6 flex gap-2"
          aria-label={`Step ${step + 1} of ${total}`}
        >
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      )}

      {/* Step 1 — company or individual */}
      {step === 0 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Are you hiring as a company or as an individual?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Companies add their details and the qualities they want in a
            worker. Individuals can post a quick gig without company details.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                key: true,
                title: "A company",
                body: "I’m hiring on behalf of a registered business or brand.",
              },
              {
                key: false,
                title: "An individual",
                body: "I’m just someone who needs a hand with a one-off task.",
              },
            ].map((o) => (
              <button
                key={String(o.key)}
                type="button"
                onClick={() => setIsCompany(o.key)}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  isCompany === o.key
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background/50 hover:border-primary/60"
                }`}
              >
                <span className="block text-base font-semibold text-foreground">
                  {o.title}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">
                  {o.body}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isCompany === null}
              onClick={() => setStep(isCompany ? 1 : describeStep)}
              className={primaryBtn}
            >
              Continue
            </button>
            <Link to="/get-started" search={{}} className={ghostBtn}>
              Back
            </Link>
          </div>
        </div>
      )}

      {/* Step 2 — company details + employee qualities (company only) */}
      {step === 1 && isCompany && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Company details & the worker you want
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us about your company and the qualities you’re looking for.
            We’ll match you with workers who’ve signed up for that kind of
            work.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              Company name
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Brew & Co Café"
                maxLength={120}
                className={input}
              />
            </label>
            <label className="block text-sm font-medium text-foreground">
              Your name
              <input
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="Who’s posting this?"
                maxLength={120}
                className={input}
              />
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium text-foreground">
            What type of worker do you need?
            <select
              value={needType}
              onChange={(e) => setNeedType(e.target.value as GigType | "")}
              className={input}
            >
              <option value="">Select…</option>
              <option value="one-time">One-time gig</option>
              <option value="recurring">Recurring shift</option>
              <option value="part-time">Part-time role</option>
            </select>
          </label>
          <label className="mt-5 block text-sm font-medium text-foreground">
            Key skills / qualities (comma separated)
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Barista, Customer service, Reliable"
              maxLength={200}
              className={input}
            />
          </label>
          <label className="mt-5 block text-sm font-medium text-foreground">
            Experience level (optional)
            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 1+ years, training given"
              maxLength={120}
              className={input}
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!companyName.trim() || !needType}
              onClick={() => setStep(describeStep)}
              className={primaryBtn}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => setStep(0)}
              className={ghostBtn}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Describe the gig + AI reconfirm */}
      {step === describeStep && (
        <>
          <div className={`mt-8 ${card}`}>
            <h2 className="text-xl font-bold text-foreground">
              Describe the gig
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Write what you need done. Our AI will reconfirm whether it’s a
              one-time gig or a recurring one before you continue.
            </p>
            <label className="mt-6 block text-sm font-medium text-foreground">
              What’s the gig?
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. I need someone to help move a 1-bedroom apartment this Saturday morning, boxes and a few pieces of furniture."
                rows={5}
                maxLength={600}
                className={`${input} resize-none`}
              />
            </label>
            <p className="mt-2 text-xs text-muted-foreground">
              {description.length}/600
            </p>
            {aiError && (
              <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {aiError}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={runReconfirm} className={primaryBtn}>
                Reconfirm with AI
              </button>
              <button
                type="button"
                onClick={() => setStep(isCompany ? 1 : 0)}
                className={ghostBtn}
              >
                Back
              </button>
            </div>
          </div>

          {step === describeStep && aiState === "checking" && (
            <div className={`mt-6 ${card}`}>
              <div className="flex items-center gap-3">
                <span className="size-3 animate-pulse rounded-full bg-accent" />
                <p className="text-sm font-medium text-foreground">
                  AI is reading your gig and reconfirming…
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Checking whether this is a one-time gig or a recurring one.
              </p>
            </div>
          )}

          {step === describeStep && aiState === "done" && aiResult && (
            <div className={`mt-6 ${card}`}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    AI reconfirmed: {aiResult.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {aiResult.summary}
                  </p>
                  {aiResult.usedSecondAI && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      The first AI wasn’t sure, so a second AI reconfirmed it
                      for you.
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(locationStep)}
                  className={primaryBtn}
                >
                  Looks good — continue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAiState("idle");
                    setAiResult(null);
                  }}
                  className={ghostBtn}
                >
                  Edit description
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Location */}
      {step === locationStep && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Where is the work?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick the area and add any details that help someone find the spot.
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Area
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={input}
            >
              <option value="">Select an area…</option>
              {AREAS.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Address / landmark (optional)
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Building name, street, unit…"
              maxLength={200}
              className={input}
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!area}
              onClick={() => setStep(timingStep)}
              className={primaryBtn}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => setStep(describeStep)}
              className={ghostBtn}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Timing + pay */}
      {step === timingStep && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            When and how much?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {aiResult?.type === "recurring"
              ? "Since this is a recurring gig, add the days and shift times."
              : "Add when the gig should happen and what you’ll pay."}
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Timing
            <input
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              placeholder={
                aiResult?.type === "recurring"
                  ? "e.g. Mon–Fri, 6–10am"
                  : "e.g. Saturday 9am, ~3 hours"
              }
              maxLength={200}
              className={input}
            />
          </label>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Pay
            <input
              value={pay}
              onChange={(e) => setPay(e.target.value)}
              placeholder="e.g. AED 350 / gig"
              maxLength={100}
              className={input}
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!timing.trim()}
              onClick={() => setStep(doneStep)}
              className={primaryBtn}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => setStep(locationStep)}
              className={ghostBtn}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Done + matched workers */}
      {step === doneStep && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Your gig is posted 🎉
          </h2>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Gig:</span>{" "}
              {aiResult?.label}
            </p>
            {isCompany && companyName && (
              <p>
                <span className="font-semibold text-foreground">
                  Company:
                </span>{" "}
                {companyName}
              </p>
            )}
            <p>
              <span className="font-semibold text-foreground">What:</span>{" "}
              {description}
            </p>
            <p>
              <span className="font-semibold text-foreground">Where:</span>{" "}
              {area}
              {address ? ` — ${address}` : ""}
            </p>
            <p>
              <span className="font-semibold text-foreground">When:</span>{" "}
              {timing}
            </p>
            {pay && (
              <p>
                <span className="font-semibold text-foreground">Pay:</span>{" "}
                {pay}
              </p>
            )}
          </div>

          {/* Matched workers */}
          <div className="mt-6">
            <h3 className="text-base font-bold text-foreground">
              Workers who’ve signed up for this kind of work
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Filtered by area, work type and the skills you asked for.
            </p>
            {matchedWorkers.length === 0 ? (
              <p className="mt-3 rounded-xl border border-border bg-background/50 p-4 text-sm text-muted-foreground">
                No matching workers yet. Your gig is still live on the board
                for anyone to apply.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {matchedWorkers.map((w) => (
                  <li
                    key={w.id}
                    className="rounded-xl border border-border bg-background/50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {w.name}{" "}
                          <span className="text-xs font-normal text-muted-foreground">
                            · {w.area} · ★ {w.rating}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {w.skills.join(" · ")}
                          {w.uni ? ` · ${w.uni}` : ""}
                        </p>
                      </div>
                      <a
                        href={`tel:${w.phone.replace(/\s/g, "")}`}
                        className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        Contact
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setPosted(true);
                setStep(0);
                setIsCompany(null);
                setCompanyName("");
                setYourName("");
                setNeedType("");
                setSkills("");
                setExperience("");
                setDescription("");
                setAiState("idle");
                setAiResult(null);
                setArea("");
                setAddress("");
                setTiming("");
                setPay("");
              }}
              className={primaryBtn}
            >
              Post another gig
            </button>
            <Link to="/find-work" className={ghostBtn}>
              See gigs on WorkWave
            </Link>
            <Link to="/" className={ghostBtn}>
              Back home
            </Link>
          </div>
          {posted && (
            <p className="mt-4 text-xs text-muted-foreground">
              Your gig was added to the board.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
