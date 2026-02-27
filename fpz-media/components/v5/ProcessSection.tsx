"use client"

import { motion } from "framer-motion"
import { process as processSteps } from "@/lib/content"

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        padding: "120px 24px",
        backgroundColor: "#070d17",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(56,189,248,0.18), transparent)",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0ea5e9",
              fontFamily: "var(--font-body, sans-serif)",
              marginBottom: "16px",
            }}
          >
            How We Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#f0f8ff",
              letterSpacing: "0.03em",
            }}
          >
            Our Process
          </h2>
        </div>

        {/* Steps container */}
        <div
          style={{
            position: "relative",
          }}
        >
          {/* Horizontal frosted connecting line — hidden on mobile */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: "40px",
              left: "calc(12.5% + 20px)",
              right: "calc(12.5% + 20px)",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(56,189,248,0.08), rgba(56,189,248,0.3), rgba(56,189,248,0.3), rgba(56,189,248,0.08))",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Clip-path wipe reveal for the line */}
          <motion.div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: "40px",
              left: "calc(12.5% + 20px)",
              right: "calc(12.5% + 20px)",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(56,189,248,0.5), rgba(14,165,233,0.7), rgba(56,189,248,0.5))",
              transformOrigin: "left center",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          {/* Steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={stepVariants}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(56,189,248,0.3)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {/* Outer glow ring */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "-4px",
                      borderRadius: "50%",
                      border: "1px solid rgba(56,189,248,0.1)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontWeight: 800,
                      fontSize: "18px",
                      color: "#38bdf8",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#f0f8ff",
                    marginBottom: "12px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "14px",
                    color: "rgba(240,248,255,0.5)",
                    lineHeight: 1.7,
                    maxWidth: "220px",
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
