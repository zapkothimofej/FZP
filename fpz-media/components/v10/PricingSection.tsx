"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { pricing } from "@/lib/content-de"

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

      // Bouncy, light-themed reveal
      gsap.fromTo(
        ".v10-pricing-card",
        { y: 100, opacity: 0, scale: 0.9, rotationZ: -5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = prefix + Math.round(obj.val).toLocaleString("de-DE") + suffix
          },
          onComplete: () => {
            gsap.to(el, { scale: 1.1, color: "#0a0a0a", duration: 0.15, yoyo: true, repeat: 1 })
          }
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-32 px-8 md:px-16 lg:px-24 bg-white relative overflow-hidden"
    >
      <div 
        className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0a0a0a 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 relative z-10">
        <div>
          <p
            className="text-[12px] tracking-[0.3em] font-bold uppercase mb-4"
            style={{ color: "#707070", fontFamily: "var(--font-body)" }}
          >
            Investition
          </p>
          <h2
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "clamp(40px, 8vw, 90px)", color: "#0a0a0a" }}
          >
            Transparente Preise
          </h2>
        </div>
        <p
          className="max-w-sm text-base leading-relaxed font-medium"
          style={{ color: "#555", fontFamily: "var(--font-body)" }}
        >
          Keine versteckten Kosten. Keine überraschenden Rechnungen. Ein Preis, alles inklusive.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {pricing.map((plan, i) => {
          const { prefix, num, suffix } = parsePrice(plan.price)
          return (
            <div
              key={plan.name}
              className={`v10-pricing-card flex flex-col relative overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-4 ${plan.highlighted ? "scale-105 z-10" : ""}`}
              style={{
                backgroundColor: plan.highlighted ? "#0a0a0a" : "#f8f9fa",
                border: plan.highlighted ? "none" : "1px solid #e0e0e0",
                padding: "clamp(32px, 4vw, 56px)",
                opacity: 0,
                boxShadow: plan.highlighted ? "0 20px 50px rgba(0,0,0,0.2)" : "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              {/* Shimmer sweep for highlighted card */}
              {plan.highlighted && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)",
                    animation: "stahl-shimmer 3s ease-in-out infinite",
                  }}
                />
              )}

              {/* Popular badge */}
              {plan.highlighted && (
                <div className="mb-8">
                  <span
                    className="text-[12px] tracking-[0.2em] uppercase px-4 py-2 font-extrabold rounded-full"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#0a0a0a",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Bestseller
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p
                className="text-[14px] tracking-[0.3em] font-extrabold uppercase mb-4"
                style={{ color: plan.highlighted ? "#e0e0e0" : "#0a0a0a", fontFamily: "var(--font-body)" }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div
                className="font-[family-name:var(--font-display)] mb-6 transition-all duration-300 hover:scale-105 origin-left"
                style={{
                  fontSize: "clamp(50px, 8vw, 90px)",
                  color: plan.highlighted ? "#ffffff" : "#0a0a0a",
                  lineHeight: 1,
                  textShadow: plan.highlighted ? "0 10px 20px rgba(0,0,0,0.5)" : "none"
                }}
              >
                {num !== null ? (
                  <>
                    {prefix}
                    <span ref={(el) => { priceRefs.current[i] = el }} style={{ display: "inline-block" }}>0</span>
                    {suffix}
                  </>
                ) : (
                  <span ref={(el) => { priceRefs.current[i] = el }} style={{ display: "inline-block" }}>{plan.price}</span>
                )}
              </div>

              {/* Description */}
              <p
                className="text-base leading-relaxed mb-10 min-h-[48px] font-medium"
                style={{ color: plan.highlighted ? "#c8c8c8" : "#555", fontFamily: "var(--font-body)" }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div className="mb-10" style={{ height: "1px", backgroundColor: plan.highlighted ? "#333" : "#e0e0e0" }} />

              {/* Features */}
              <ul className="flex flex-col gap-4 flex-1">
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-4 text-sm font-bold transition-all hover:translate-x-2"
                    style={{ color: plan.highlighted ? "#ffffff" : "#0a0a0a", fontFamily: "var(--font-body)" }}
                  >
                    <svg
                      className="mt-1 flex-shrink-0"
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke={plan.highlighted ? "#ffffff" : "#0a0a0a"}
                      strokeWidth="2"
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
                className="mt-12 flex items-center justify-center h-14 text-[14px] tracking-[0.1em] uppercase font-bold transition-all duration-300 rounded-full hover:scale-[1.05]"
                style={
                  plan.highlighted
                    ? {
                        backgroundColor: "#ffffff",
                        color: "#0a0a0a",
                        boxShadow: "0 10px 20px rgba(255,255,255,0.2)",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#0a0a0a",
                        border: "2px solid #0a0a0a",
                      }
                }
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (!plan.highlighted) {
                    el.style.backgroundColor = "#0a0a0a"
                    el.style.color = "#ffffff"
                  } else {
                    el.style.boxShadow = "0 15px 30px rgba(255,255,255,0.3)"
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (!plan.highlighted) {
                    el.style.backgroundColor = "#ffffff"
                    el.style.color = "#0a0a0a"
                  } else {
                    el.style.boxShadow = "0 10px 20px rgba(255,255,255,0.2)"
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
