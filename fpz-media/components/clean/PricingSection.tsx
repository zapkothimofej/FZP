"use client"

import { motion, type Variants } from "framer-motion"
import { pricing } from "@/lib/content"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function PricingSection() {
  return (
    <section
      id="pricing"
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
          style={{ marginBottom: "64px", textAlign: "center" }}
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
            Pricing
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
            Transparent Pricing
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "18px", marginTop: "16px", maxWidth: "480px", margin: "16px auto 0" }}>
            No hidden fees. No surprise invoices. Pick the package that fits.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
                backgroundColor: "#0f172a",
                borderRadius: "12px",
                padding: "40px 32px",
                border: plan.highlighted ? "2px solid #2dd4bf" : "1px solid #334155",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {/* Most Popular badge */}
              {plan.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#2dd4bf",
                    color: "#0f172a",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "4px 16px",
                    borderRadius: "20px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  margin: "0 0 16px",
                }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "clamp(48px, 6vw, 64px)",
                  fontWeight: 800,
                  color: "#f8fafc",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginBottom: "16px",
                }}
              >
                {plan.price}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "15px",
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  margin: "0 0 32px",
                  paddingBottom: "32px",
                  borderBottom: "1px solid #334155",
                }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul
                style={{
                  margin: "0 0 36px",
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                }}
              >
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "14px",
                      color: "#f8fafc",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ flexShrink: 0 }}
                    >
                      <circle cx="8" cy="8" r="7" stroke="#2dd4bf" strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px 24px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background-color 0.2s, color 0.2s",
                  backgroundColor: plan.highlighted ? "#2dd4bf" : "transparent",
                  color: plan.highlighted ? "#0f172a" : "#f8fafc",
                  border: plan.highlighted ? "none" : "1.5px solid #334155",
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
