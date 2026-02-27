"use client"

import { motion } from "framer-motion"
import { process } from "@/lib/content"

export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        backgroundColor: "#130609",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#f43f5e",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Wie wir arbeiten
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff0f2",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Unser Prozess
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ x: index % 2 === 0 ? 60 : -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "flex",
                gap: "32px",
                position: "relative",
              }}
            >
              {/* Crimson vertical accent line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {/* Step dot */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#130609",
                    border: "2px solid #f43f5e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "#f43f5e",
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                {/* Connector line (not on last) */}
                {index < process.length - 1 && (
                  <div
                    style={{
                      width: "2px",
                      flexGrow: 1,
                      minHeight: "48px",
                      backgroundColor: "#2d0d14",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: "48px", paddingTop: "8px" }}>
                <h3
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 26px)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#fff0f2",
                    margin: "0 0 12px 0",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--font-body)",
                    color: "#9c6472",
                    margin: 0,
                    lineHeight: 1.7,
                    maxWidth: "520px",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
