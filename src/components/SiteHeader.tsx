import { Link } from "@tanstack/react-router";
import workwaveSymbol from "../assets/workwave-symbol.png";

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
          <img
            src={workwaveSymbol}
            alt="WorkWave symbol"
            className="size-10 rounded-lg object-cover shadow-lg"
          />
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text leading-none text-transparent">
            <span className="block whitespace-nowrap text-base font-extrabold sm:text-lg">
              WorkWave
            </span>
            <span className="mt-1 block whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.24em]">
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
          to="/get-started"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
