"use client"

import { motion } from "framer-motion"
import { services } from "@/lib/content"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        padding: "120px 24px",
        backgroundColor: "#04080f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
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
            What We Do
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
            Our Services
          </h2>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              style={{
                position: "relative",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(56,189,248,0.15)",
                borderRadius: "16px",
                padding: "40px 36px 40px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                overflow: "hidden",
                cursor: "default",
              }}
              whileHover={{
                borderColor: "rgba(56,189,248,0.35)",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Big service number behind card */}
              <span
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "24px",
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 800,
                  fontSize: "120px",
                  color: "#38bdf8",
                  opacity: 0.06,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                  letterSpacing: "-0.05em",
                }}
              >
                {service.number}
              </span>

              {/* Service number badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(56,189,248,0.12)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#38bdf8",
                    letterSpacing: "0.05em",
                  }}
                >
                  {service.number}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#f0f8ff",
                  marginBottom: "8px",
                  letterSpacing: "0.02em",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#0ea5e9",
                  marginBottom: "16px",
                  letterSpacing: "0.04em",
                }}
              >
                {service.headline}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  color: "rgba(240,248,255,0.5)",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                {service.description}
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(56,189,248,0.12)",
                  marginBottom: "24px",
                }}
              />

              {/* Deliverables */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "13px",
                      color: "rgba(240,248,255,0.6)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "#38bdf8",
                        fontSize: "10px",
                        flexShrink: 0,
                        marginTop: "3px",
                        opacity: 0.8,
                      }}
                    >
                      ◆
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
