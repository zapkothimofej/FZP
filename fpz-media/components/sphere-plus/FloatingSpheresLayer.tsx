"use client"

import { CSSphere } from "./CSSphere"

/**
 * Fixed, full-viewport layer with ambient CSS chrome spheres.
 * Sits behind all content (z-index 0) and gives the entire page a
 * sphere-filled atmosphere without any WebGL overhead.
 */

const SPHERES = [
  {
    size: 160,
    style: { top: "8%", right: "4%", "--cssphere-dur": "9s", "--cssphere-delay": "0s" },
    animate: "float" as const,
    opacity: 0.12,
    glow: true,
  },
  {
    size: 60,
    style: { top: "28%", left: "1.5%", "--cssphere-dur": "12s", "--cssphere-delay": "2.5s" },
    animate: "float" as const,
    opacity: 0.1,
    glow: false,
  },
  {
    size: 220,
    style: { bottom: "18%", right: "6%", "--cssphere-dur": "14s", "--cssphere-delay": "1s" },
    animate: "float" as const,
    opacity: 0.07,
    glow: true,
  },
  {
    size: 40,
    style: { top: "55%", left: "6%", "--cssphere-dur": "8s", "--cssphere-delay": "4s" },
    animate: "pulse" as const,
    opacity: 0.13,
    glow: false,
  },
  {
    size: 100,
    style: { top: "75%", right: "18%", "--cssphere-dur": "11s", "--cssphere-delay": "3s" },
    animate: "float" as const,
    opacity: 0.09,
    glow: false,
  },
  {
    size: 28,
    style: { top: "42%", right: "28%", "--cssphere-dur": "7s", "--cssphere-delay": "5s" },
    animate: "pulse" as const,
    opacity: 0.11,
    glow: false,
  },
  {
    size: 75,
    style: { bottom: "5%", left: "14%", "--cssphere-dur": "10s", "--cssphere-delay": "1.5s" },
    animate: "float" as const,
    opacity: 0.08,
    glow: false,
  },
]

export function FloatingSpheresLayer() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {SPHERES.map((s, i) => (
        <CSSphere
          key={i}
          size={s.size}
          opacity={s.opacity}
          glow={s.glow}
          animate={s.animate}
          style={{
            position: "absolute",
            ...s.style,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

export default FloatingSpheresLayer
