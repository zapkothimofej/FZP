export function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden>
      <svg className="w-full h-full opacity-[0.035]">
        <filter id="noise-v6">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-v6)" />
      </svg>
    </div>
  )
}
