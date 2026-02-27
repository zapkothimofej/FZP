"use client"

import { motion } from "framer-motion"
import { pricing } from "@/lib/content"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export function PricingSection() {
  return (
    <section
      id="pricing"
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
            Transparent Pricing
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
            Pakete & Preise
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {pricing.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              style={{
                position: "relative",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: plan.highlighted
                  ? "1px solid rgba(56,189,248,0.35)"
                  : "1px solid rgba(56,189,248,0.15)",
                borderRadius: "16px",
                padding: "40px 32px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: plan.highlighted
                  ? "0 0 40px rgba(56,189,248,0.2), 0 0 80px rgba(56,189,248,0.08)"
                  : "none",
              }}
              whileHover={{
                borderColor: plan.highlighted
                  ? "rgba(56,189,248,0.6)"
                  : "rgba(56,189,248,0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Animated gradient border for highlighted card */}
              {plan.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    inset: "-1px",
                    borderRadius: "17px",
                    background:
                      "linear-gradient(var(--border-angle, 0deg), rgba(56,189,248,0.5), rgba(14,165,233,0.15), rgba(56,189,248,0.08), rgba(14,165,233,0.5))",
                    zIndex: -1,
                    animation: "eis-border-rotate 4s linear infinite",
                  }}
                />
              )}

              {/* Popular badge */}
              {plan.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 16px",
                    backgroundColor: "rgba(56,189,248,0.2)",
                    border: "1px solid rgba(56,189,248,0.5)",
                    borderRadius: "100px",
                    backdropFilter: "blur(8px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      color: "#0ea5e9",
                      fontFamily: "var(--font-body, sans-serif)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: plan.highlighted ? "#38bdf8" : "#f0f8ff",
                    letterSpacing: "0.04em",
                    marginBottom: "8px",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "13px",
                    color: "rgba(240,248,255,0.45)",
                    lineHeight: 1.6,
                  }}
                >
                  {plan.description}
                </p>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    fontWeight: 800,
                    fontSize: "48px",
                    color: plan.highlighted ? "#38bdf8" : "#f0f8ff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "13px",
                    color: "rgba(240,248,255,0.35)",
                    marginLeft: "8px",
                  }}
                >
                  einmalig
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(56,189,248,0.12)",
                  marginBottom: "24px",
                }}
              />

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    {/* Ice-blue checkmark */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <circle cx="8" cy="8" r="7.5" stroke="rgba(56,189,248,0.35)" />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-body, sans-serif)",
                        fontSize: "14px",
                        color: "rgba(240,248,255,0.65)",
                        lineHeight: 1.5,
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "13px 24px",
                  borderRadius: "8px",
                  backgroundColor: plan.highlighted
                    ? "rgba(56,189,248,0.18)"
                    : "rgba(255,255,255,0.05)",
                  border: plan.highlighted
                    ? "1px solid rgba(56,189,248,0.5)"
                    : "1px solid rgba(56,189,248,0.18)",
                  color: plan.highlighted ? "#38bdf8" : "rgba(240,248,255,0.6)",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    plan.highlighted
                      ? "rgba(56,189,248,0.28)"
                      : "rgba(255,255,255,0.08)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    plan.highlighted
                      ? "rgba(56,189,248,0.18)"
                      : "rgba(255,255,255,0.05)"
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection
