export function WaveBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />

      <svg
        className="absolute inset-x-0 top-[18vh] h-[60vh] w-[220%] animate-wave-slow text-primary/15"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,160 C240,240 480,80 720,140 C960,200 1200,120 1440,170 L1440,320 L0,320 Z"
        />
      </svg>

      <svg
        className="absolute inset-x-0 top-[30vh] h-[60vh] w-[220%] animate-wave-fast text-primary/10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,200 C200,120 460,240 720,190 C980,140 1220,230 1440,160 L1440,320 L0,320 Z"
        />
      </svg>

      <svg
        className="absolute inset-x-0 bottom-0 h-[40vh] w-[220%] animate-wave-slower text-primary/[0.07]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,120 C300,220 600,60 900,140 C1140,205 1300,180 1440,120 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
}
