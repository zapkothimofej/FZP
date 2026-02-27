"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { stats } from "@/lib/content"

function useCountUp(target: string, isInView: boolean) {
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!isInView) return

    // If it contains non-numeric content, just set it directly
    const num = parseFloat(target.replace(/[^0-9.]/g, ""))
    if (isNaN(num) || target === "∞" || target === "100%" || target === "1 Partner") {
      // Animate with a reveal effect by setting after a short delay
      const t = setTimeout(() => setDisplay(target), 300)
      return () => clearTimeout(t)
    }

    const duration = 1200
    const steps = 40
    const stepDuration = duration / steps
    let current = 0
    const increment = num / steps
    const suffix = target.replace(/[0-9.]/g, "")

    const timer = setInterval(() => {
      current += increment
      if (current >= num) {
        current = num
        clearInterval(timer)
      }
      setDisplay(`${Math.round(current)}${suffix}`)
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, target])

  return display
}

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const display = useCountUp(value, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display, sans-serif)",
          fontWeight: 800,
          fontSize: "clamp(40px, 5vw, 64px)",
          color: "#38bdf8",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginBottom: "12px",
          animation: "eis-shimmer 3s ease-in-out infinite",
          animationDelay: `${delay}s`,
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body, sans-serif)",
          fontSize: "13px",
          color: "rgba(240,248,255,0.4)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section
      style={{
        padding: "80px 24px",
        backgroundColor: "#04080f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Frosted glass band */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(56,189,248,0.15)",
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "56px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "32px",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-cols-2 md:grid-cols-4"
      >
        {/* Subtle inner glow */}
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "25%",
            width: "50%",
            height: "80%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {stats.map((stat, i) => (
          <StatItem key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

export default StatsSection
