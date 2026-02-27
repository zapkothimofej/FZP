"use client"

import { motion } from "framer-motion"
import { manifesto } from "@/lib/content"

export default function ManifestoSection() {
  return (
    <section
      id="manifesto"
      style={{
        backgroundColor: "#130609",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Left half — slides from left */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "#fff0f2",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {manifesto.line1}
            </p>
          </motion.div>

          {/* Right half — slides from right */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "#f43f5e",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {manifesto.line2}
            </p>
          </motion.div>
        </div>

        {/* Sub text */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: "48px",
            fontSize: "18px",
            fontFamily: "var(--font-body)",
            color: "#9c6472",
            maxWidth: "600px",
            lineHeight: 1.7,
          }}
        >
          {manifesto.sub}
        </motion.p>
      </div>
    </section>
  )
}
