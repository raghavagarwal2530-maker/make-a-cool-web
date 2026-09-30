import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/get-started")({
  validateSearch: (search: Record<string, unknown>): { role?: Role } => {
    const role = search["role"];
    return role === "requester" ||
      role === "doer" ||
      role === "community" ||
      role === "volunteer"
      ? { role }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Get started on WorkWave — Post a gig or find work" },
      {
        name: "description",
        content:
          "Choose your side, verify your email, add your phone and birthdate, and start on WorkWave.",
      },
      { property: "og:title", content: "Get started on WorkWave" },
      {
        property: "og:description",
        content:
          "Post a gig or find work. Email, phone and 18+ age check in a few steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GetStarted,
});

type Role = "requester" | "doer" | "community" | "volunteer";

const roles: Role[] = ["requester", "doer", "community", "volunteer"];

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

  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) {
    a--;
  }

  return a;
}

function GetStarted() {
  const search = Route.useSearch();
  const directRole = search.role;
  const [step, setStep] = useState(directRole ? 1 : 0);
  const [role, setRole] = useState<Role | null>(directRole ?? null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const total = 5;

  // Restore role/email from a previous attempt (e.g. after a page refresh).
  useEffect(() => {
    if (directRole) {
      window.sessionStorage.setItem("workwave-onboarding-role", directRole);
    }

    const savedRole = window.sessionStorage.getItem(
      "workwave-onboarding-role",
    );
    const savedEmail = window.sessionStorage.getItem(
      "workwave-onboarding-email",
    );

    if (savedRole && roles.includes(savedRole as Role)) {
      setRole(savedRole as Role);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, [directRole]);

  useEffect(() => {
    if (resendIn <= 0) return;

    const timer = window.setTimeout(
      () => setResendIn((value) => value - 1),
      1000,
    );

    return () => window.clearTimeout(timer);
  }, [resendIn]);

  async function verifyCode() {
    setError(null);

    const token = code.replace(/\D/g, "");

    if (token.length !== 6) {
      setError("Enter the 6-digit code.");
      return;
    }

    if (token !== generatedCode) {
      setError("That code is wrong. Check the code shown above and try again.");
      return;
    }

    setError(null);
    setStep(3);
  }

  async function sendCode() {
    setError(null);
    setCode("");

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    // Generate a 6-digit verification code client-side.
    // (In production this would be sent via email; in this preview
    //  we show it on screen so the flow works without email delivery.)
    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(newCode);

    window.sessionStorage.setItem(
      "workwave-onboarding-email",
      email.trim(),
    );

    if (role) {
      window.sessionStorage.setItem(
        "workwave-onboarding-role",
        role,
      );
    }

    setResendIn(60);
    setStep(2);
  }

  async function saveDetails(withId: boolean) {
    setError(null);

    if (phone.trim().length < 7) {
      setError("Add a phone number we can reach you on.");
      return;
    }

    if (!birthdate) {
      setError("Add your date of birth.");
      return;
    }

    if (role !== "volunteer" && age(birthdate) < 18) {
      setError(
        role === "community"
          ? "You must be 18 or older to create a community."
          : "You must be 18 or older to use WorkWave.",
      );
      return;
    }

    // Store profile locally (mock — no backend session in preview).
    window.sessionStorage.setItem(
      "workwave-onboarding-profile",
      JSON.stringify({
        role: role ?? "doer",
        email: email.trim(),
        phone: phone.trim(),
        birthdate,
        id_document_type: withId && idType ? idType : null,
        id_document_number: withId && idNumber ? idNumber.trim() : null,
        age_confirmed: true,
      }),
    );

    setStep(5);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Get started
      </p>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        A few quick{" "}
        <span className="bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
          steps
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
              className={`h-1.5 flex-1 rounded-full ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Step 1 — side */}
      {step === 0 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Would you like to post a gig, find work or volunteer?
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You can switch later — this just sets up the right home screen
            for you.
          </p>

          <Link
            to="/volunteer"
            className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            I'd like to volunteer instead →
          </Link>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                key: "requester" as Role,
                title: "Post a gig",
                body:
                  "I need someone for a one-time gig, a recurring shift or a part-time role.",
              },
              {
                key: "doer" as Role,
                title: "Find work",
                body:
                  "I want to browse gigs and shifts near me and pick what fits my schedule.",
              },
            ].map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => setRole(o.key)}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  role === o.key
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

          <div className="mt-6">
            <button
              type="button"
              disabled={!role}
              onClick={() => setStep(1)}
              className={primaryBtn}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — email */}
      {step === 1 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Verify your email
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            We'll send a 6-digit verification code to your email. Enter it
            on the next step to continue.
          </p>

          <label className="mt-6 block text-sm font-medium text-foreground">
            Email address

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              maxLength={255}
              className={input}
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={sendCode}
              className={primaryBtn}
            >
              Send verification code
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

      {/* Step 3 — verification code */}
      {step === 2 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Enter your verification code
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-foreground">{email}</span>.
            Enter it below to continue.
          </p>

          {/* Preview-only: show the code on screen since email delivery
              isn't available in this environment. */}
          <div className="mt-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">
              Your verification code (shown here for this preview):
            </p>
            <p className="mt-1 text-2xl font-bold tracking-[0.4em] text-foreground">
              {generatedCode}
            </p>
          </div>

          <label className="mt-6 block text-sm font-medium text-foreground">
            Verification code

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode="numeric"
              placeholder="123456"
              maxLength={6}
              className={input}
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={code.replace(/\D/g, "").length !== 6}
              onClick={verifyCode}
              className={primaryBtn}
            >
              Verify code
            </button>

            <button
              type="button"
              disabled={resendIn > 0}
              onClick={sendCode}
              className={ghostBtn}
            >
              {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className={ghostBtn}
            >
              Use a different email
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — phone + birthdate */}
      {step === 3 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Phone number and date of birth
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {role === "volunteer"
              ? "Volunteers of any age are welcome. If you're under 18, add a parent or guardian's phone number so we can reach someone."
              : role === "community"
                ? "Your phone is required so members know who runs the community. Community creators must be 18 or older."
                : "Your phone is required so both sides know who they're dealing with. You must be 18 or older to work on WorkWave."}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              Phone number

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 50 123 4567"
                maxLength={20}
                className={input}
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Date of birth

              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className={input}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(4)}
              className={primaryBtn}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 5 — optional ID */}
      {step === 4 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Add an ID (optional)
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            If you're willing, add an ID to confirm your age. Verified
            profiles get picked for gigs more often — but you can skip this
            and finish now.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              ID type

              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className={input}
              >
                <option value="">Select…</option>
                <option value="emirates_id">Emirates ID</option>
                <option value="passport">Passport</option>
                <option value="driving_licence">
                  Driving licence
                </option>
              </select>
            </label>

            <label className="block text-sm font-medium text-foreground">
              ID number

              <input
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="784-XXXX-XXXXXXX-X"
                maxLength={40}
                className={input}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveDetails(true)}
              className={primaryBtn}
            >
              Finish with ID
            </button>

            <button
              type="button"
              onClick={() => saveDetails(false)}
              className={ghostBtn}
            >
              Skip for now
            </button>
          </div>
        </div>
      )}

      {/* Done */}
      {step === 5 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            You're verified 🎉
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Email confirmed and phone saved. You're set up to{" "}
            {role === "requester"
              ? "post gigs"
              : role === "community"
                ? "create your community"
                : role === "volunteer"
                  ? "join a volunteering community"
                  : "find work"}{" "}
            on WorkWave.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {role === "requester" ? (
              <Link to="/post-a-gig" className={primaryBtn}>
                Start posting a gig
              </Link>
            ) : (
              <Link to="/find-work" className={primaryBtn}>
                Start finding work
              </Link>
            )}

            <Link to="/how-it-works" className={ghostBtn}>
              See how it works
            </Link>

            <Link to="/" className={ghostBtn}>
              Back home
            </Link>
          </div>
        </div>
      )}

      <p className="mt-8 text-xs text-muted-foreground">
        Everyone on WorkWave is 18+ and phone verified. We only use your
        details to match you with gigs.
      </p>
    </div>
  );
}
