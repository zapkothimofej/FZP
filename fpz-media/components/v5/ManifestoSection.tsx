"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { manifesto } from "@/lib/content"

export function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" })

  return (
    <section
      style={{
        padding: "120px 24px",
        backgroundColor: "#070d17",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(56,189,248,0.35), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Frosted glass container */}
        <div
          ref={ref}
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(56,189,248,0.15)",
            borderRadius: "16px",
            padding: "clamp(48px, 6vw, 80px)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            textAlign: "center",
          }}
        >
          <motion.p
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0ea5e9",
              marginBottom: "40px",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5 }}
          >
            Our Manifesto
          </motion.p>

          {/* Line 1 with letter-spacing animation */}
          <motion.h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 52px)",
              color: "#f0f8ff",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={
              isInView
                ? { letterSpacing: "0.15em", opacity: 1 }
                : { letterSpacing: "0.5em", opacity: 0 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {manifesto.line1}
          </motion.h2>

          {/* Line 2 with letter-spacing animation — slight delay */}
          <motion.h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 52px)",
              color: "#38bdf8",
              lineHeight: 1.2,
              marginBottom: "40px",
            }}
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={
              isInView
                ? { letterSpacing: "0.15em", opacity: 1 }
                : { letterSpacing: "0.5em", opacity: 0 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {manifesto.line2}
          </motion.h2>

          {/* Divider */}
          <motion.div
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(56,189,248,0.45)",
              margin: "0 auto 32px",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "rgba(240,248,255,0.5)",
              letterSpacing: "0.06em",
              lineHeight: 1.8,
              maxWidth: "560px",
              margin: "0 auto",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {manifesto.sub}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default ManifestoSection
