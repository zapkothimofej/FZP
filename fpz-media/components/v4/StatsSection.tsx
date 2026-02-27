"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { stats } from "@/lib/content"

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!active) return

    // Handle non-numeric targets
    if (!/^\d+/.test(target)) {
      setDisplay(target)
      return
    }

    const numericMatch = target.match(/^(\d+)/)
    if (!numericMatch) {
      setDisplay(target)
      return
    }

    const end = parseInt(numericMatch[1], 10)
    const suffix = target.slice(numericMatch[1].length)
    const duration = 1800
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(end * eased)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, target])

  return display
}

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const displayed = useCountUp(value, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-8 px-6 rounded-sm relative overflow-hidden"
      style={{ border: "1px solid #1a1a10", backgroundColor: "#111108" }}
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(201,168,76,0.04) 50%, transparent 100%)",
          animation: `shimmer-${index} 3s ease-in-out infinite`,
          animationDelay: `${index * 0.5}s`,
        }}
      />

      <span
        className="text-5xl md:text-6xl font-bold mb-2 relative z-10"
        style={{
          fontFamily: "var(--font-display)",
          color: "#c9a84c",
          textShadow: "0 0 30px rgba(201,168,76,0.3)",
        }}
      >
        {displayed}
      </span>
      <span
        className="text-sm tracking-wider uppercase relative z-10"
        style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <>
      <style>{`
        @keyframes gold-shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(-100%); }
          50% { opacity: 0.8; transform: translateX(100%); }
        }
      `}</style>
      <section className="py-20 px-6" style={{ backgroundColor: "#090909" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
