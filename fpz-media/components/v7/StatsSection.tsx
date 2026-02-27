"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { stats } from "@/lib/content"

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState("0")

  useEffect(() => {
    if (!inView) return

    // Parse numeric part from value
    const numericMatch = value.match(/\d+/)
    if (!numericMatch) {
      setDisplayed(value)
      return
    }

    const targetNum = parseInt(numericMatch[0], 10)
    const prefix = value.slice(0, numericMatch.index ?? 0)
    const suffix = value.slice((numericMatch.index ?? 0) + numericMatch[0].length)

    const duration = 1200
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * targetNum)
      setDisplayed(`${prefix}${current}${suffix}`)
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-display, sans-serif)",
          fontSize: "clamp(56px, 7vw, 96px)",
          fontWeight: 800,
          color: "#f8fafc",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          textShadow: "0 0 40px rgba(45,212,191,0.3)",
        }}
      >
        {displayed}
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#5eead4",
          marginTop: "12px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function StatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: "#0f172a",
        padding: "96px 24px",
        borderTop: "1px solid #334155",
        borderBottom: "1px solid #334155",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          position: "relative",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "24px 16px",
              borderLeft: i > 0 ? "1px solid #334155" : "none",
            }}
          >
            <AnimatedStat value={stat.value} label={stat.label} />
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export default StatsSection
