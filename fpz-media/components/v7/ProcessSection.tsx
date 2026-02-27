"use client"

import { motion, type Variants } from "framer-motion"
import { process } from "@/lib/content"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        backgroundColor: "#1e293b",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "64px" }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#2dd4bf",
            }}
          >
            Process
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#f8fafc",
              margin: "12px 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            How It Works
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0",
            position: "relative",
          }}
        >
          {process.map((step, i) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              style={{
                position: "relative",
                padding: "0 32px 0 0",
              }}
            >
              {/* Connecting arrow (desktop) — not on last item */}
              {i < process.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "36px",
                    right: "0",
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                  }}
                  className="hidden lg:flex"
                >
                  <div style={{ width: "24px", height: "1px", backgroundColor: "#2dd4bf" }} />
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    style={{ color: "#2dd4bf", flexShrink: 0 }}
                  >
                    <path d="M0 4h6M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              )}

              {/* Step number */}
              <div
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "80px",
                  fontWeight: 800,
                  color: "#334155",
                  lineHeight: 1,
                  marginBottom: "16px",
                  userSelect: "none",
                }}
              >
                {step.step}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#f8fafc",
                  margin: "0 0 12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "15px",
                  color: "#94a3b8",
                  lineHeight: 1.65,
                  margin: 0,
                  paddingRight: "16px",
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection
