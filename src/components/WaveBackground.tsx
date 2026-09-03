export function WaveBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* vibrant orange / sky blue / red base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_12%_0%,oklch(0.72_0.2_45/0.7),transparent_60%),radial-gradient(110%_90%_at_92%_15%,oklch(0.78_0.16_225/0.55),transparent_62%),radial-gradient(120%_90%_at_50%_110%,oklch(0.58_0.24_27/0.6),transparent_65%)]" />

      {/* full-height stacked wave bands */}
      <svg
        className="absolute inset-y-0 left-0 h-full w-[220%] animate-wave-slower opacity-70"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wv1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.19 48)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.8 0.15 225)" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="wv2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.24 27)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="wv3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.55 0.2 240)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.72 0.21 40)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wv1)"
          d="M0,180 C240,300 480,60 720,180 C960,300 1200,120 1440,220 L1440,420 C1200,320 960,500 720,400 C480,300 240,520 0,400 Z"
        />
      </svg>

      <svg
        className="absolute inset-y-0 left-0 h-full w-[220%] animate-wave-fast opacity-60"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path
          fill="url(#wv2)"
          d="M0,430 C260,540 520,320 780,430 C1020,530 1220,380 1440,470 L1440,700 C1220,600 1020,760 780,660 C520,550 260,780 0,660 Z"
        />
      </svg>

      <svg
        className="absolute inset-y-0 left-0 h-full w-[220%] animate-wave-slow opacity-70"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path
          fill="url(#wv3)"
          d="M0,700 C300,820 600,600 900,720 C1140,815 1300,700 1440,760 L1440,900 L0,900 Z"
        />
      </svg>

      {/* soften the top so text stays readable */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.15_0.06_250/0.55),transparent_35%,oklch(0.14_0.06_250/0.6))]" />
    </div>
  );
}
