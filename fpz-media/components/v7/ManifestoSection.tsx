"use client"

import { motion } from "framer-motion"
import { manifesto } from "@/lib/content"

export function ManifestoSection() {
  return (
    <section
      style={{
        backgroundColor: "#0f172a",
        padding: "128px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}
        >
          {/* Teal vertical bar */}
          <div
            aria-hidden
            style={{
              width: "6px",
              height: "100px",
              backgroundColor: "#2dd4bf",
              borderRadius: "2px",
              flexShrink: 0,
              marginTop: "8px",
              boxShadow: "0 0 20px rgba(45,212,191,0.5)",
            }}
          />

          {/* Content */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 600,
                color: "#94a3b8",
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              {manifesto.line1}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                color: "#f8fafc",
                margin: "4px 0 0",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              {manifesto.line2}
            </p>
            <p
              style={{
                fontSize: "20px",
                color: "#94a3b8",
                marginTop: "28px",
                maxWidth: "640px",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              {manifesto.sub}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ManifestoSection
