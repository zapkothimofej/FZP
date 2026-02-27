"use client"

import { motion } from "framer-motion"
import { Bebas_Neue, Outfit } from "next/font/google"
import { pricing } from "@/lib/content"

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-32 px-6"
      style={{ background: "#0b0b1f" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <p
            className={`${body.className} text-xs tracking-[0.3em] uppercase mb-4`}
            style={{ color: "#60a5fa" }}
          >
            Investition
          </p>
          <h2
            className={`${display.className} leading-tight`}
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f0f4ff" }}
          >
            Transparente Preise
          </h2>
          <p
            className={`${body.className} mt-4 max-w-lg mx-auto`}
            style={{ color: "#6b7db3" }}
          >
            Kein Abonnement. Keine versteckten Kosten. Ein fairer Preis für echte Arbeit.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricing.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className="relative flex flex-col p-8 rounded-xl"
              style={{
                background: plan.highlighted ? "rgba(29,78,216,0.12)" : "#060612",
                border: plan.highlighted
                  ? "1px solid #60a5fa"
                  : "1px solid #1e2a4a",
                boxShadow: plan.highlighted
                  ? "0 0 60px rgba(96,165,250,0.15), inset 0 0 60px rgba(96,165,250,0.03)"
                  : "none",
              }}
            >
              {/* Most popular badge */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "#60a5fa",
                    color: "#060612",
                  }}
                >
                  <span className={body.className}>Empfohlen</span>
                </div>
              )}

              {/* Plan name */}
              <h3
                className={`${display.className} mb-1`}
                style={{
                  fontSize: "1.5rem",
                  color: plan.highlighted ? "#60a5fa" : "#f0f4ff",
                  letterSpacing: "0.08em",
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span
                  className={`${display.className}`}
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    color: "#f0f4ff",
                    lineHeight: 1.1,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  className={`${body.className} text-sm ml-2`}
                  style={{ color: "#6b7db3" }}
                >
                  einmalig
                </span>
              </div>

              {/* Description */}
              <p
                className={`${body.className} text-sm mb-8 pb-8 leading-relaxed`}
                style={{
                  color: "#6b7db3",
                  borderBottom: "1px solid #1e2a4a",
                }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`${body.className} flex items-center gap-3 text-sm`}
                    style={{ color: "#f0f4ff" }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: plan.highlighted
                          ? "rgba(96,165,250,0.2)"
                          : "rgba(96,165,250,0.08)",
                        border: "1px solid rgba(96,165,250,0.3)",
                      }}
                    >
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`${body.className} mt-auto text-center py-3 px-6 rounded-md text-sm font-semibold transition-all duration-200`}
                style={
                  plan.highlighted
                    ? {
                        background: "#60a5fa",
                        color: "#060612",
                        boxShadow: "0 0 24px rgba(96,165,250,0.35)",
                      }
                    : {
                        background: "transparent",
                        color: "#f0f4ff",
                        border: "1px solid #1e2a4a",
                      }
                }
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <p
          className={`${body.className} mt-12 text-center text-sm`}
          style={{ color: "#6b7db3" }}
        >
          Alle Preise zzgl. MwSt. · Kostenlose Erstberatung inklusive
        </p>
      </div>
    </section>
  )
}
