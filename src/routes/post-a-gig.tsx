import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { reconfirmGig, looksLikeSpam, type AiReconfirmResult } from "@/lib/gig-ai";
import { AREAS } from "@/lib/mock-gigs";

export const Route = createFileRoute("/post-a-gig")({
  head: () => ({
    meta: [
      { title: "Post a gig on WorkWave" },
      {
        name: "description",
        content: "Describe your gig, let AI reconfirm it, then add the location and timing.",
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

const total = 4;

function PostAGig() {
  const [step, setStep] = useState(0);
  const [description, setDescription] = useState("");
  const [aiState, setAiState] = useState<"idle" | "checking" | "done">("idle");
  const [aiResult, setAiResult] = useState<AiReconfirmResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [timing, setTiming] = useState("");
  const [pay, setPay] = useState("");
  const [posted, setPosted] = useState(false);

  async function runReconfirm() {
    const text = description.trim();
    if (text.length < 10) {
      setAiError("Add a bit more detail so the AI can reconfirm your gig.");
      return;
    }
    if (looksLikeSpam(text)) {
      setAiError("That doesn't look like a gig. Please describe real work.");
      return;
    }
    setAiError(null);
    setAiState("checking");
    const result = await reconfirmGig(text);
    setAiResult(result);
    setAiState("done");
  }

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
        <div className="mt-6 flex gap-2" aria-label={`Step ${step + 1} of ${total}`}>
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      )}

      {/* Step 1 — describe the gig */}
      {step === 0 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Describe the gig</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Write what you need done. Our AI will reconfirm whether it's a one-time
            gig or a recurring one before you continue.
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            What's the gig?
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
            <Link to="/get-started" search={{}} className={ghostBtn}>
              Back
            </Link>
          </div>
        </div>
      )}

      {/* Step 2 — AI reconfirmation */}
      {step === 0 && aiState === "checking" && (
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

      {step === 0 && aiState === "done" && aiResult && (
        <div className={`mt-6 ${card}`}>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
              ✓
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                AI reconfirmed: {aiResult.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{aiResult.summary}</p>
              {aiResult.usedSecondAI && (
                <p className="mt-2 text-xs text-muted-foreground">
                  The first AI wasn't sure, so a second AI reconfirmed it for you.
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
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

      {/* Step 3 — location */}
      {step === 1 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Where is the work?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick the area and add any details that help someone find the spot.
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Area
            <select value={area} onChange={(e) => setArea(e.target.value)} className={input}>
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
              onClick={() => setStep(2)}
              className={primaryBtn}
            >
              Continue
            </button>
            <button type="button" onClick={() => setStep(0)} className={ghostBtn}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — timing + pay */}
      {step === 2 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">When and how much?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {aiResult?.type === "recurring"
              ? "Since this is a recurring gig, add the days and shift times."
              : "Add when the gig should happen and what you'll pay."}
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Timing
            <input
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              placeholder={aiResult?.type === "recurring" ? "e.g. Mon–Fri, 6–10am" : "e.g. Saturday 9am, ~3 hours"}
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
              onClick={() => setStep(3)}
              className={primaryBtn}
            >
              Continue
            </button>
            <button type="button" onClick={() => setStep(1)} className={ghostBtn}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Done */}
      {step === 3 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Your gig is posted 🎉</h2>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Gig:</span>{" "}
              {aiResult?.label}
            </p>
            <p>
              <span className="font-semibold text-foreground">What:</span>{" "}
              {description}
            </p>
            <p>
              <span className="font-semibold text-foreground">Where:</span> {area}
              {address ? ` — ${address}` : ""}
            </p>
            <p>
              <span className="font-semibold text-foreground">When:</span> {timing}
            </p>
            {pay && (
              <p>
                <span className="font-semibold text-foreground">Pay:</span> {pay}
              </p>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setPosted(true);
                setStep(0);
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
