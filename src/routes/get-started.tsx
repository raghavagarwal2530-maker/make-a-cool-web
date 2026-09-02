import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get started on WorkWave — Post a gig or find work" },
      {
        name: "description",
        content:
          "Choose your side, verify your email with a one-time code, add your phone and birthdate, and start on WorkWave.",
      },
      { property: "og:title", content: "Get started on WorkWave" },
      {
        property: "og:description",
        content: "Post a gig or find work. Email code, phone and 18+ age check in a few steps.",
      },
    ],
  }),
  component: GetStarted,
});

type Role = "requester" | "doer";

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

function GetStarted() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = 5;

  // If the email link was clicked (it signs you in and comes back here), skip ahead.
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active || !data.session) return;
      setEmail((e) => e || data.session!.user.email || "");
      setStep((s) => (s < 3 ? 3 : s));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) return;
      setEmail((e) => e || session.user.email || "");
      setStep((s) => (s < 3 ? 3 : s));
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function sendCode() {
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/get-started` : undefined,
      },
    });
    setBusy(false);
    if (err) return setError(err.message);
    setStep(2);
  }


  async function verifyCode() {
    setError(null);
    if (code.trim().length < 6) return setError("Enter the 6-digit code from your inbox.");
    setBusy(true);
    const { error: err } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    setBusy(false);
    if (err) return setError("That code didn't work. Check it or send a new one.");
    setStep(3);
  }

  async function saveDetails(withId: boolean) {
    setError(null);
    if (phone.trim().length < 7) return setError("Add a phone number we can reach you on.");
    if (!birthdate) return setError("Add your date of birth.");
    if (age(birthdate) < 18) return setError("You must be 18 or older to use WorkWave.");

    setBusy(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) {
      setBusy(false);
      setError("Your session expired. Please verify your email again.");
      setStep(1);
      return;
    }

    const { error: err } = await supabase.from("onboarding_profiles").upsert(
      {
        user_id: userId,
        role: role ?? "doer",
        email: email.trim(),
        phone: phone.trim(),
        birthdate,
        id_document_type: withId && idType ? idType : null,
        id_document_number: withId && idNumber ? idNumber.trim() : null,
        age_confirmed: true,
      },
      { onConflict: "user_id" },
    );
    setBusy(false);
    if (err) return setError(err.message);
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

      {/* Step 1 — side */}
      {step === 0 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">
            Would you like to post a gig or find work?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You can switch later — this just sets up the right home screen for you.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {(
              [
                {
                  key: "requester" as Role,
                  title: "Post a gig",
                  body: "I need someone for a one-time gig, a recurring shift or a part-time role.",
                },
                {
                  key: "doer" as Role,
                  title: "Find work",
                  body: "I want to browse gigs and shifts near me and pick what fits my schedule.",
                },
              ]
            ).map((o) => (
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
                <span className="block text-base font-semibold text-foreground">{o.title}</span>
                <span className="mt-2 block text-sm text-muted-foreground">{o.body}</span>
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
          <h2 className="text-xl font-bold text-foreground">Verify your email</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We'll send a one-time passcode to your Gmail (or any email). This is the first half of
            the 18+ check.
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
            <button type="button" disabled={busy} onClick={sendCode} className={primaryBtn}>
              {busy ? "Sending…" : "Send code"}
            </button>
            <button type="button" onClick={() => setStep(0)} className={ghostBtn}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — code */}
      {step === 2 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Enter your one-time passcode</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a 6-digit code to <span className="text-foreground">{email}</span>.
          </p>
          <label className="mt-6 block text-sm font-medium text-foreground">
            6-digit code
            <input
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className={`${input} tracking-[0.4em]`}
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" disabled={busy} onClick={verifyCode} className={primaryBtn}>
              {busy ? "Checking…" : "Verify"}
            </button>
            <button type="button" disabled={busy} onClick={sendCode} className={ghostBtn}>
              Resend code
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — phone + birthdate */}
      {step === 3 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Phone number and date of birth</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your phone is required so both sides know who they're dealing with. You must be 18 or
            older to work on WorkWave.
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
            <button type="button" onClick={() => setStep(4)} className={primaryBtn}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 5 — optional ID */}
      {step === 4 && (
        <div className={`mt-8 ${card}`}>
          <h2 className="text-xl font-bold text-foreground">Add an ID (optional)</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If you're willing, add an ID to confirm your age. Verified profiles get picked for gigs
            more often — but you can skip this and finish now.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              ID type
              <select value={idType} onChange={(e) => setIdType(e.target.value)} className={input}>
                <option value="">Select…</option>
                <option value="emirates_id">Emirates ID</option>
                <option value="passport">Passport</option>
                <option value="driving_licence">Driving licence</option>
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
              disabled={busy}
              onClick={() => saveDetails(true)}
              className={primaryBtn}
            >
              {busy ? "Saving…" : "Finish with ID"}
            </button>
            <button
              type="button"
              disabled={busy}
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
          <h2 className="text-xl font-bold text-foreground">You're verified 🎉</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Email confirmed, phone saved and age checked. You're set up to{" "}
            {role === "requester" ? "post gigs" : "find work"} on WorkWave.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/how-it-works" className={primaryBtn}>
              See how it works
            </Link>
            <Link to="/" className={ghostBtn}>
              Back home
            </Link>
          </div>
        </div>
      )}

      <p className="mt-8 text-xs text-muted-foreground">
        Everyone on WorkWave is 18+ and phone verified. We only use your details to match you with
        gigs.
      </p>
    </div>
  );
}
