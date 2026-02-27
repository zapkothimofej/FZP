"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { pricing } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

function parsePrice(priceStr: string): { prefix: string; num: number | null; suffix: string } {
  const match = priceStr.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/)
  if (!match) return { prefix: "", num: null, suffix: priceStr }
  const numStr = match[2].replace(",", ".")
  return { prefix: match[1], num: parseFloat(numStr), suffix: match[3] }
}

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Cards stagger in
      gsap.fromTo(
        ".v6-pricing-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Count-up prices
      pricing.forEach((plan, i) => {
        const el = priceRefs.current[i]
        if (!el) return
        const { prefix, num, suffix } = parsePrice(plan.price)
        if (num === null) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: num,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = prefix + Math.round(obj.val).toLocaleString("de-DE") + suffix
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-32 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--v6-bg)" }}
    >
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
          >
            Investment
          </p>
          <h2
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "var(--v6-text)" }}
          >
            Transparent Pricing
          </h2>
        </div>
        <p
          className="max-w-xs text-sm leading-relaxed"
          style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
        >
          No hidden fees. No surprise invoices. One price, everything included.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--v6-border)]">
        {pricing.map((plan, i) => {
          const { prefix, num, suffix } = parsePrice(plan.price)
          return (
            <div
              key={plan.name}
              className="v6-pricing-card flex flex-col relative overflow-hidden"
              style={{
                backgroundColor: plan.highlighted ? "var(--v6-bg-elevated)" : "var(--v6-bg)",
                padding: "clamp(32px, 4vw, 56px)",
                opacity: 0,
              }}
            >
              {/* Shimmer sweep for highlighted card */}
              {plan.highlighted && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "var(--v6-price-highlight)",
                    animation: "stahl-shimmer 3s ease-in-out infinite",
                  }}
                />
              )}

              {/* Accent top line */}
              {plan.highlighted && (
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: "2px", backgroundColor: "var(--v6-accent)" }}
                />
              )}

              {/* Popular badge */}
              {plan.highlighted && (
                <div className="mb-6">
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-semibold"
                    style={{
                      border: "1px solid var(--v6-accent)",
                      color: "var(--v6-accent)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Beliebteste
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
              >
                {plan.name}
              </p>

              {/* Price — 3D extrusion text-shadow */}
              <div
                className="font-[family-name:var(--font-display)] mb-4"
                style={{
                  fontSize: "clamp(48px, 7vw, 80px)",
                  color: plan.highlighted ? "var(--v6-accent)" : "var(--v6-text)",
                  lineHeight: 1,
                  textShadow: plan.highlighted ? "var(--v6-text-shadow-extrude)" : "none",
                }}
              >
                {num !== null ? (
                  <>
                    {prefix}
                    <span ref={(el) => { priceRefs.current[i] = el }}>0</span>
                    {suffix}
                  </>
                ) : (
                  <span ref={(el) => { priceRefs.current[i] = el }}>{plan.price}</span>
                )}
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div className="mb-8" style={{ height: "1px", backgroundColor: "var(--v6-border)" }} />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--v6-text)", fontFamily: "var(--font-body)" }}
                  >
                    <svg
                      className="mt-0.5 flex-shrink-0"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="var(--v6-accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <polyline points="2 7 5.5 10.5 12 3.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="mt-10 flex items-center justify-center h-11 text-[13px] tracking-[0.08em] uppercase font-semibold transition-all duration-300"
                style={
                  plan.highlighted
                    ? {
                        backgroundColor: "var(--v6-accent)",
                        color: "var(--v6-text-on-accent)",
                        border: "1px solid var(--v6-accent)",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "var(--v6-accent)",
                        border: "1px solid var(--v6-border)",
                      }
                }
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (!plan.highlighted) {
                    el.style.borderColor = "var(--v6-accent)"
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (!plan.highlighted) {
                    el.style.borderColor = "var(--v6-border)"
                  }
                }}
              >
                {plan.cta}
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PricingSection
