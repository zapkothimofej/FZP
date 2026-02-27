"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { stats } from "@/lib/content"

function CountUpStat({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const [display, setDisplay] = useState(stat.value)

  useEffect(() => {
    if (!inView) return

    // Extract numeric portion if any
    const numMatch = stat.value.match(/^(\d+)/)
    if (!numMatch) {
      // Non-numeric (e.g. "∞", "1 Partner", "100%") — just show immediately
      setDisplay(stat.value)
      return
    }

    const target = parseInt(numMatch[1], 10)
    const suffix = stat.value.slice(numMatch[0].length) // e.g. "%", " Partner"
    const duration = 1500
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, stat.value])

  return <>{display}</>
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#090405",
        padding: "100px 24px",
        borderTop: "1px solid #2d0d14",
        borderBottom: "1px solid #2d0d14",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px",
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#881337",
                borderRadius: "6px",
                padding: "4px 16px 8px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  color: "#fff0f2",
                  lineHeight: 1.1,
                }}
              >
                <CountUpStat stat={stat} inView={inView} />
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                color: "#9c6472",
                margin: 0,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
