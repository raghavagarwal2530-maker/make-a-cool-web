import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          <span className="font-semibold text-foreground">WorkWave</span> by Jobify
        </p>
        <nav className="flex gap-6">
          <Link to="/how-it-works" className="hover:text-primary">
            How it works
          </Link>
          <Link to="/pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
        </nav>
        <p>18+ only · Phone verified</p>
      </div>
    </footer>
  );
}
