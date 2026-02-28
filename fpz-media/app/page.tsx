import Link from "next/link"

const versions = [
  {
    slug: "gsap",
    name: "Stahl",
    accent: "#c8c8c8",
    stack: "GSAP",
    desc: "Luxury editorial, horizontal scroll",
  },
  {
    slug: "chrom",
    name: "Chrom",
    accent: "#a78bfa",
    stack: "Three.js + GSAP",
    desc: "Maximale Effekte, Chrome-Ästhetik",
  },
  {
    slug: "clean",
    name: "Klar",
    accent: "#2dd4bf",
    stack: "FM subtle",
    desc: "Clean, timeless, design-over-effects",
  },
  {
    slug: "sphere",
    name: "Sphere",
    accent: "#f472b6",
    stack: "Three.js + GSAP",
    desc: "Chrome Sphere, dynamische 3D-Effekte",
  },
]

export default function VersionPickerPage() {
  return (
    <div
      style={{ backgroundColor: "#080808", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 py-20"
    >
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

      <div className="text-center mb-16 max-w-xl">
        <h1 className="text-white text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          FPZ Media
        </h1>
        <p className="text-white/40 text-lg">Wähle ein Design.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        {versions.map((v) => (
          <Link
            key={v.slug}
            href={`/${v.slug}`}
            className="version-card block rounded-xl p-6"
            style={{ "--card-accent": v.accent } as React.CSSProperties}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-mono font-bold tracking-widest uppercase"
                style={{ color: v.accent }}
              >
                {v.slug}
              </span>
              <span
                className="block w-4 h-4 rounded-full"
                style={{ backgroundColor: v.accent }}
              />
            </div>
            <h2 className="text-white text-xl font-bold mb-1">{v.name}</h2>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">{v.desc}</p>
            <span
              className="text-xs font-mono px-2 py-1 rounded"
              style={{
                backgroundColor: `color-mix(in srgb, ${v.accent} 15%, transparent)`,
                color: v.accent,
                border: `1px solid color-mix(in srgb, ${v.accent} 30%, transparent)`,
              }}
            >
              {v.stack}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
