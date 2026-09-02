import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_8px_24px_-8px_oklch(0.62_0.22_305/0.9)]">
            <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" fill="none">
              <path
                d="M2 15c3-5 5 5 8 0s5 5 8 0"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M2 9c3-5 5 5 8 0s5 5 8 0"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.55"
              />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
              WorkWave
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              by Jobify
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary font-semibold" }}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/how-it-works"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
