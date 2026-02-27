"use client"

import { motion } from "framer-motion"
import { useRef, MouseEvent } from "react"
import { pricing } from "@/lib/content"

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof pricing)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty("--x", `${x}%`)
    card.style.setProperty("--y", `${y}%`)
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty("--x", `50%`)
    card.style.setProperty("--y", `50%`)
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          {
            "--x": "50%",
            "--y": "50%",
            position: "relative",
            backgroundColor: plan.highlighted ? "#1a0509" : "#130609",
            border: plan.highlighted ? "1px solid #f43f5e" : "1px solid #2d0d14",
            borderRadius: "12px",
            padding: "40px 32px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            overflow: "hidden",
            cursor: "default",
            background: `
              radial-gradient(circle at var(--x) var(--y), rgba(244,63,94,0.1) 0%, transparent 60%),
              ${plan.highlighted ? "#1a0509" : "#130609"}
            `,
            transition: "box-shadow 0.2s",
          } as React.CSSProperties
        }
      >
        {/* Popular badge */}
        {plan.highlighted && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "#f43f5e",
              color: "#fff0f2",
              fontSize: "11px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            Beliebt
          </div>
        )}

        {/* Plan name */}
        <h3
          style={{
            fontSize: "20px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: plan.highlighted ? "#f43f5e" : "#9c6472",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          {plan.name}
        </h3>

        {/* Price */}
        <div>
          <span
            style={{
              fontSize: "clamp(40px, 5vw, 56px)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff0f2",
              lineHeight: 1,
            }}
          >
            {plan.price}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "var(--font-body)",
              color: "#9c6472",
              marginLeft: "8px",
            }}
          >
            einmalig
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            fontFamily: "var(--font-body)",
            color: "#9c6472",
            margin: 0,
            lineHeight: 1.65,
          }}
        >
          {plan.description}
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "#2d0d14",
          }}
        />

        {/* Features */}
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flexGrow: 1,
          }}
        >
          {plan.features.map((feature) => (
            <li
              key={feature}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                color: "#fff0f2",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <circle cx="8" cy="8" r="7.5" stroke="#f43f5e" />
                <polyline
                  points="5 8 7 10.5 11 6"
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            display: "block",
            textAlign: "center",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.03em",
            transition: "all 0.2s",
            backgroundColor: plan.highlighted ? "#f43f5e" : "transparent",
            color: plan.highlighted ? "#fff0f2" : "#f43f5e",
            border: plan.highlighted ? "1px solid #f43f5e" : "1px solid #f43f5e",
          }}
        >
          {plan.cta}
        </a>
      </div>
    </motion.div>
  )
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      style={{
        backgroundColor: "#090405",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px", textAlign: "center" }}
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
            Pakete
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
            Transparent. Klar. Fair.
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {pricing.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
