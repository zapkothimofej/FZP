"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Bebas_Neue, Outfit } from "next/font/google"
import { stats } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-10%" })

  useGSAP(
    () => {
      if (!numRef.current || !isInView) return

      // Extract numeric part for count-up
      const raw = stat.value
      const match = raw.match(/(\d+(?:\.\d+)?)/)

      if (match) {
        const numericValue = parseFloat(match[1])
        const prefix = raw.slice(0, raw.indexOf(match[1]))
        const suffix = raw.slice(raw.indexOf(match[1]) + match[1].length)

        const obj = { val: 0 }
        gsap.to(obj, {
          val: numericValue,
          duration: 1.8,
          ease: "power2.out",
          delay: index * 0.15,
          onUpdate: () => {
            if (numRef.current) {
              const display =
                numericValue % 1 === 0
                  ? Math.round(obj.val).toString()
                  : obj.val.toFixed(1)
              numRef.current.textContent = prefix + display + suffix
            }
          },
        })
      }
    },
    { dependencies: [isInView], scope: cardRef }
  )

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col items-center text-center p-10 rounded-xl"
      style={{
        background: "#0b0b1f",
        border: "1px solid #1e2a4a",
      }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(96,165,250,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Number */}
      <div
        className={`${display.className} mb-2`}
        style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          color: "#60a5fa",
          textShadow: "0 0 40px rgba(96,165,250,0.5)",
          letterSpacing: "0.02em",
        }}
      >
        <span ref={numRef}>{stat.value}</span>
      </div>

      {/* Label */}
      <p
        className={`${body.className} text-sm tracking-wider uppercase`}
        style={{ color: "#6b7db3" }}
      >
        {stat.label}
      </p>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px"
        style={{
          width: "60%",
          background: "linear-gradient(to right, transparent, #60a5fa40, transparent)",
        }}
      />
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="py-24 px-6"
      style={{ background: "#060612" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
