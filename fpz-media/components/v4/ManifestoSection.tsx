"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { manifesto } from "@/lib/content"

export default function ManifestoSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ backgroundColor: "#090909" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Gold accent bar + label */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <div
            className="w-1 h-12 rounded-full"
            style={{ backgroundColor: "#c9a84c" }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
          >
            Our Manifesto
          </span>
        </motion.div>

        {/* Main manifesto text — Playfair Display italic */}
        <div className="pl-5">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "#f5f0e0",
              lineHeight: 1.15,
            }}
          >
            {manifesto.line1}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="leading-tight mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "#c9a84c",
              lineHeight: 1.15,
            }}
          >
            {manifesto.line2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-6"
          >
            <div
              className="w-px self-stretch mt-1"
              style={{ backgroundColor: "rgba(201,168,76,0.25)" }}
            />
            <p
              className="max-w-lg text-base leading-relaxed"
              style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
            >
              {manifesto.sub}
            </p>
          </motion.div>
        </div>

        {/* Decorative horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 origin-left"
          style={{
            height: "1px",
            background: "linear-gradient(to right, #c9a84c, rgba(201,168,76,0.1), transparent)",
          }}
        />
      </div>
    </section>
  )
}
