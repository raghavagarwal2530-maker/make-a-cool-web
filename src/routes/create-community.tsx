import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AREAS } from "@/lib/mock-gigs";
import { createCommunity } from "@/lib/mock-communities";

export const Route = createFileRoute("/create-community")({
  head: () => ({
    meta: [
      { title: "Create a volunteering community — WorkWave" },
      {
        name: "description",
        content:
          "Start a volunteering community. 18+ only. Set your community details, member limit, and acceptance preferences.",
      },
    ],
  }),
  component: CreateCommunity,
});

const card =
  "rounded-2xl border border-border bg-card/80 p-6 backdrop-blur shadow-[0_20px_60px_-30px_oklch(0.62_0.22_305/0.8)]";

const input =
  "mt-1 w-full rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const primaryBtn =
  "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50";

const ghostBtn =
  "rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary";

function age(birthdate: string) {
  const b = new Date(birthdate);
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
  return a;
}

const CATEGORIES = ["Environment", "Charity", "Education", "Health", "Animals", "Community", "Other"];

function CreateCommunity() {
  const [step, setStep] = useState(0);
  const [birthdate, setBirthdate] = useState("");
  const [name, setName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [timing, setTiming] = useState("");
  const [category, setCategory] = useState("");
  const [memberLimit, setMemberLimit] = useState("");
  const [autoAccept, setAutoAccept] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const total = 4;

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Volunteer
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Create a{" "}
        <span className="bg-gradient-to-r from-brand-red from-0% via-brand-orange via-38% to-brand-sky to-78% bg-clip-text text-transparent">
          community
        </span>
      </h1>

      {!done && step < total && (
        <div className="mt-6 flex gap-2" aria-label={`Step ${step + 1} of ${total}`}>
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Step 1 — age verification */}
      {step === 0 && !done && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Verify your age</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You must be 18 or older to create a volunteering community. This is to keep
            our communities safe and well-managed.
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Date of birth
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className={input}
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!birthdate}
              onClick={() => {
                if (age(birthdate) < 18) {
                  setError("You must be 18 or older to create a community.");
                  return;
                }
                setError(null);
                setStep(1);
              }}
              className={primaryBtn}
            >
              Continue
            </button>
            <Link to="/volunteer" className={ghostBtn}>
              Back
            </Link>
          </div>
        </div>
      )}

      {/* Step 2 — community details */}
      {step === 1 && !done && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Community details</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you write here will be shown to people who want to join your
            community, so be descriptive!
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Community name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dubai Beach Cleanup Crew"
              maxLength={100}
              className={input}
            />
          </label>
          <label className="mt-5 block text-sm font-medium text-foreground">
            Your name
            <input
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="Your name (shown as the creator)"
              maxLength={80}
              className={input}
            />
          </label>
          <label className="mt-5 block text-sm font-medium text-foreground">
            Your email
            <input
              type="email"
              value={creatorEmail}
              onChange={(e) => setCreatorEmail(e.target.value)}
              placeholder="you@gmail.com — for notifications"
              maxLength={255}
              className={input}
            />
          </label>
          <label className="mt-5 block text-sm font-medium text-foreground">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your community does, what volunteers will be doing, and why people should join."
              rows={4}
              maxLength={600}
              className={`${input} resize-none`}
            />
          </label>
          <p className="mt-2 text-xs text-muted-foreground">{description.length}/600</p>
          <label className="mt-5 block text-sm font-medium text-foreground">
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={input}>
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!name.trim() || !creatorName.trim() || !creatorEmail.trim() || !description.trim() || !category}
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

      {/* Step 3 — location & timing */}
      {step === 2 && !done && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Location & timing</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Where and when does your community meet? This helps volunteers find you.
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Location
            <select value={location} onChange={(e) => setLocation(e.target.value)} className={input}>
              <option value="">Select an area…</option>
              {AREAS.map((a) => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
          </label>
          <label className="mt-5 block text-sm font-medium text-foreground">
            Timing
            <input
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              placeholder="e.g. Every Friday, 7:00 AM – 9:00 AM"
              maxLength={200}
              className={input}
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!location || !timing.trim()}
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

      {/* Step 4 — member limit & acceptance */}
      {step === 3 && !done && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Member limit & acceptance</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Set how many people can join and how you want to handle new applications.
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            Maximum number of members
            <input
              type="number"
              value={memberLimit}
              onChange={(e) => setMemberLimit(e.target.value)}
              placeholder="e.g. 30"
              min={1}
              max={1000}
              className={input}
            />
          </label>
          <p className="mt-6 text-sm font-medium text-foreground">
            How do you want to accept new members?
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setAutoAccept(true)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                autoAccept === true
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background/50 hover:border-primary/60"
              }`}
            >
              <span className="block text-sm font-semibold text-foreground">Auto-accept</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                The first {memberLimit || "N"} people who apply join instantly. No waiting.
              </span>
            </button>
            <button
              type="button"
              onClick={() => setAutoAccept(false)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                autoAccept === false
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background/50 hover:border-primary/60"
              }`}
            >
              <span className="block text-sm font-semibold text-foreground">Review each application</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                You get a notification each time someone applies. Accept or reject them yourself.
              </span>
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!memberLimit || autoAccept === null}
              onClick={() => {
                createCommunity(
                  name.trim(),
                  description.trim(),
                  location,
                  timing.trim(),
                  category,
                  parseInt(memberLimit, 10),
                  autoAccept!,
                  creatorName.trim(),
                  creatorEmail.trim(),
                );
                setDone(true);
              }}
              className={primaryBtn}
            >
              Create community
            </button>
            <button type="button" onClick={() => setStep(2)} className={ghostBtn}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Done */}
      {done && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Your community is live! 🎉</h2>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">Name:</span> {name}</p>
            <p><span className="font-semibold text-foreground">Category:</span> {category}</p>
            <p><span className="font-semibold text-foreground">Location:</span> {location}</p>
            <p><span className="font-semibold text-foreground">Timing:</span> {timing}</p>
            <p><span className="font-semibold text-foreground">Member limit:</span> {memberLimit}</p>
            <p>
              <span className="font-semibold text-foreground">Acceptance:</span>{" "}
              {autoAccept ? "Auto-accept (first come, first served)" : "Manual review (you approve each applicant)"}
            </p>
          </div>
          <p className="mt-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
            {autoAccept
              ? "People who apply will join automatically until your limit is reached. You'll get an email when your community is full."
              : "You'll get a notification each time someone applies. Go to your community to accept or reject them."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/join-community" className={primaryBtn}>
              View all communities
            </Link>
            <Link to="/volunteer" className={ghostBtn}>
              Back to volunteer
            </Link>
            <Link to="/" className={ghostBtn}>
              Back home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
