"use client"

import { manifesto } from "@/lib/content"

type Crystal = {
  top: string
  left?: string
  right?: string
  size: number
  opacity: number
  duration: string
  delay: string
  shape: string
}

const crystals: Crystal[] = [
  {
    top: "12%",
    left: "8%",
    size: 48,
    opacity: 0.25,
    duration: "14s",
    delay: "0s",
    shape: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  },
  {
    top: "60%",
    left: "5%",
    size: 32,
    opacity: 0.18,
    duration: "18s",
    delay: "2s",
    shape: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  },
  {
    top: "20%",
    right: "10%",
    size: 56,
    opacity: 0.2,
    duration: "16s",
    delay: "1s",
    shape: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  },
  {
    top: "70%",
    right: "8%",
    size: 40,
    opacity: 0.28,
    duration: "12s",
    delay: "3s",
    shape: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  },
  {
    top: "40%",
    left: "15%",
    size: 24,
    opacity: 0.18,
    duration: "20s",
    delay: "0.5s",
    shape: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  },
  {
    top: "80%",
    left: "40%",
    size: 36,
    opacity: 0.2,
    duration: "15s",
    delay: "4s",
    shape: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  },
  {
    top: "30%",
    right: "25%",
    size: 20,
    opacity: 0.2,
    duration: "22s",
    delay: "1.5s",
    shape: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  },
  {
    top: "55%",
    left: "55%",
    size: 28,
    opacity: 0.18,
    duration: "17s",
    delay: "2.5s",
    shape: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  },
]

export function HeroCSS() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#04080f",
        paddingTop: "64px",
      }}
    >
      {/* Animated gradient blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Blob 1 — top left */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "eis-gradient 8s ease infinite",
          }}
        />
        {/* Blob 2 — top right */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            right: "-15%",
            width: "55%",
            height: "55%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "eis-gradient 11s ease infinite 2s",
          }}
        />
        {/* Blob 3 — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "eis-gradient 14s ease infinite 1s",
          }}
        />
        {/* Blob 4 — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-10%",
            width: "65%",
            height: "65%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "eis-gradient 9s ease infinite 3s",
          }}
        />
      </div>

      {/* Floating ice crystals */}
      {crystals.map((crystal, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: crystal.top,
            left: crystal.left,
            right: crystal.right,
            width: `${crystal.size}px`,
            height: `${crystal.size}px`,
            backgroundColor: `rgba(56,189,248,${crystal.opacity})`,
            clipPath: crystal.shape,
            animation: `eis-drift ${crystal.duration} ease-in-out infinite ${crystal.delay}`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            marginBottom: "32px",
            border: "1px solid rgba(56,189,248,0.35)",
            borderRadius: "100px",
            backgroundColor: "rgba(56,189,248,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#0ea5e9",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            V5 — Eis Edition
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(52px, 9vw, 96px)",
            letterSpacing: "0.1em",
            lineHeight: 1,
            color: "#f0f8ff",
            marginBottom: "24px",
            textShadow: "0 0 60px rgba(56,189,248,0.3)",
          }}
        >
          Lokal.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9, #38bdf8)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "eis-gradient 6s linear infinite",
            }}
          >
            Digital.
          </span>{" "}
          Komplett.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(240,248,255,0.6)",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 40px",
          }}
        >
          {manifesto.sub}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              backgroundColor: "rgba(56,189,248,0.15)",
              border: "1px solid rgba(56,189,248,0.5)",
              borderRadius: "8px",
              color: "#38bdf8",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textDecoration: "none",
              backdropFilter: "blur(12px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(56,189,248,0.25)"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(56,189,248,0.75)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(56,189,248,0.15)"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(56,189,248,0.5)"
            }}
          >
            Projekt starten
          </a>
          <a
            href="#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              backgroundColor: "transparent",
              border: "1px solid rgba(56,189,248,0.18)",
              borderRadius: "8px",
              color: "rgba(240,248,255,0.6)",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textDecoration: "none",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = "#38bdf8"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(56,189,248,0.35)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(240,248,255,0.6)"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(56,189,248,0.18)"
            }}
          >
            Leistungen entdecken
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(56,189,248,0.5)",
            textTransform: "uppercase",
            fontFamily: "var(--font-body, sans-serif)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, rgba(56,189,248,0.7), transparent)",
            animation: "eis-shimmer 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  )
}

export default HeroCSS
