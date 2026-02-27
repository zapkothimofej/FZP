import Link from "next/link"

const versions = [
  {
    num: "V1",
    slug: "v1",
    name: "Nacht",
    accent: "#60a5fa",
    stack: "Three.js + FM + GSAP",
    desc: "Particle network reacts to cursor",
  },
  {
    num: "V2",
    slug: "v2",
    name: "Stahl",
    accent: "#c8c8c8",
    stack: "GSAP only",
    desc: "Luxury editorial, horizontal scroll",
  },
  {
    num: "V3",
    slug: "v3",
    name: "Glut",
    accent: "#f43f5e",
    stack: "Three.js + FM",
    desc: "Morphing wireframe geometry",
  },
  {
    num: "V6",
    slug: "v6",
    name: "Chrom",
    accent: "#c8c8c8",
    stack: "Three.js + GSAP",
    desc: "V2 Stahl × Three.js — maximale Effekte",
  },
  {
    num: "V7",
    slug: "v7",
    name: "Klar",
    accent: "#2dd4bf",
    stack: "FM subtle",
    desc: "Clean, timeless, design-over-effects",
  },
]

export default function VersionPickerPage() {
  return (
    <div
      style={{ backgroundColor: "#080808", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 py-20"
    >
      {/* Inline CSS for card hover effects */}
      <style>{`
        .version-card {
          background-color: #111111;
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .version-card:hover {
          border-color: var(--card-accent);
          box-shadow: 0 0 24px color-mix(in srgb, var(--card-accent) 20%, transparent);
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-16 max-w-xl">
        <h1 className="text-white text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          FPZ Media — Choose Your Design
        </h1>
        <p className="text-white/40 text-lg">
          5 versions, 5 aesthetics. Pick your favorite.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-6xl">
        {versions.map((v) => (
          <VersionCard key={v.slug} {...v} />
        ))}
      </div>
    </div>
  )
}

function VersionCard({
  num,
  slug,
  name,
  accent,
  stack,
  desc,
}: {
  num: string
  slug: string
  name: string
  accent: string
  stack: string
  desc: string
}) {
  return (
    <Link
      href={`/${slug}`}
      className="version-card block rounded-xl p-6"
      style={{ "--card-accent": accent } as React.CSSProperties}
    >
      {/* Top row: version number + color swatch */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-mono font-bold tracking-widest"
          style={{ color: accent }}
        >
          {num}
        </span>
        <span
          className="block w-4 h-4 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Name */}
      <h2 className="text-white text-xl font-bold mb-1">{name}</h2>

      {/* Description */}
      <p className="text-white/50 text-sm mb-4 leading-relaxed">{desc}</p>

      {/* Stack badge */}
      <div className="flex items-center">
        <span
          className="text-xs font-mono px-2 py-1 rounded"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
            color: accent,
            border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
          }}
        >
          {stack}
        </span>
      </div>
    </Link>
  )
}
