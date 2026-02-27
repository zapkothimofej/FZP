"use client"

import { motion, type Variants } from "framer-motion"
import { pricing } from "@/lib/content"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function PricingSection() {
  return (
    <>
      <style>{`
        @keyframes gold-card-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(201,168,76,0.08) 35%,
            rgba(232,213,163,0.12) 50%,
            rgba(201,168,76,0.08) 65%,
            transparent 80%
          );
          background-size: 200% auto;
          animation: gold-card-shimmer 3s linear infinite;
          border-radius: inherit;
          pointer-events: none;
        }
        @keyframes gold-border-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <section id="pricing" className="py-28 px-6" style={{ backgroundColor: "#111108" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: "#c9a84c" }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
              >
                Investment
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
            >
              Transparent Pricing
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`relative rounded-sm overflow-hidden flex flex-col ${plan.highlighted ? "gold-shimmer-card" : ""}`}
                style={{
                  backgroundColor: plan.highlighted ? "#1a1a10" : "#090909",
                  border: plan.highlighted
                    ? "1px solid rgba(201,168,76,0.6)"
                    : "1px solid #1a1a10",
                  padding: plan.highlighted ? "2.5rem 2rem" : "2rem",
                  transform: plan.highlighted ? "scale(1.04)" : "scale(1)",
                  animation: plan.highlighted
                    ? "gold-border-pulse 2.5s ease-in-out infinite"
                    : "none",
                  zIndex: plan.highlighted ? 1 : 0,
                }}
              >
                {plan.highlighted && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{
                      background: "linear-gradient(to right, transparent, #c9a84c, transparent)",
                    }}
                  />
                )}

                {plan.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                    style={{
                      backgroundColor: "#c9a84c",
                      color: "#090909",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span
                    className="text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: plan.highlighted ? "#c9a84c" : "#f5f0e0",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm ml-2"
                    style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                  >
                    one-time
                  </span>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "#f5f0e0", fontFamily: "var(--font-body)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c9a84c"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="block text-center h-11 leading-[2.75rem] rounded-sm text-sm font-semibold tracking-wide transition-all duration-200"
                  style={{
                    backgroundColor: plan.highlighted ? "#c9a84c" : "transparent",
                    border: plan.highlighted ? "none" : "1px solid rgba(201,168,76,0.3)",
                    color: plan.highlighted ? "#090909" : "#c9a84c",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
