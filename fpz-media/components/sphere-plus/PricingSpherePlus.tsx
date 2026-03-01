"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { pricing } from "@/lib/content-de"
import { CSSphere } from "./CSSphere"

gsap.registerPlugin(ScrollTrigger)

function parsePrice(priceStr: string): { prefix: string; num: number | null; suffix: string } {
  const match = priceStr.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/)
  if (!match) return { prefix: "", num: null, suffix: priceStr }
  const numStr = match[2].replace(",", ".")
  return { prefix: match[1], num: parseFloat(numStr), suffix: match[3] }
}

export function PricingSpherePlus() {
  const sectionRef = useRef<HTMLElement>(null)
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      gsap.fromTo(
        ".v6sp-pricing-card",
        { y: 150, opacity: 0, rotationY: -90, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      )

      pricing.forEach((plan, i) => {
        const el = priceRefs.current[i]
        if (!el) return
        const { prefix, num, suffix } = parsePrice(plan.price)
        if (num === null) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: num,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          onUpdate: () => { el.textContent = prefix + Math.round(obj.val).toLocaleString("de-DE") + suffix },
          onComplete: () => { gsap.to(el, { scale: 1.2, color: "#fff", duration: 0.1, yoyo: true, repeat: 1 }) },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a", perspective: "2000px", position: "relative" }}
    >
      {/* Ambient spheres */}
      <div aria-hidden style={{ position: "absolute", bottom: "-10%", left: "-5%", pointerEvents: "none", zIndex: 0 }}>
        <CSSphere size={350} opacity={0.06} animate="float" style={{ "--cssphere-dur": "18s" } as React.CSSProperties} />
      </div>

      {/* Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 relative z-10">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: "#707070", fontFamily: "var(--font-body)" }}>
            Investition
          </p>
          <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "clamp(40px, 8vw, 90px)", color: "#ebebeb" }}>
            Transparente Preise
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed" style={{ color: "#c8c8c8", fontFamily: "var(--font-body)" }}>
          Keine versteckten Kosten. Keine überraschenden Rechnungen. Ein Preis, alles inklusive.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {pricing.map((plan, i) => {
          const { prefix, num, suffix } = parsePrice(plan.price)
          return (
            <div
              key={plan.name}
              className={`v6sp-pricing-card flex flex-col relative overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${plan.highlighted ? "scale-105 z-10" : ""}`}
              style={{
                backgroundColor: plan.highlighted ? "#141414" : "#0f0f0f",
                border: plan.highlighted ? "1px solid #c8c8c8" : "1px solid #333",
                padding: "clamp(32px, 4vw, 56px)",
                opacity: 0,
                transformStyle: "preserve-3d",
              }}
            >
              {plan.highlighted && (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(200,200,200,0.1) 0%, transparent 60%)" }} />
                  <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: "linear-gradient(135deg, transparent 30%, rgba(200,200,200,0.2) 50%, transparent 70%)", animation: "stahl-shimmer 3s ease-in-out infinite" }} />
                  <div className="absolute top-0 left-0 right-0 shadow-[0_0_10px_#c8c8c8]" style={{ height: "4px", backgroundColor: "#c8c8c8" }} />
                </>
              )}

              {/* Sphere above highlighted card */}
              {plan.highlighted && (
                <div
                  aria-hidden
                  className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none"
                >
                  <CSSphere size={52} opacity={0.65} glow animate="float" style={{ "--cssphere-dur": "6s" } as React.CSSProperties} />
                </div>
              )}

              {/* Small sphere accent for non-highlighted cards */}
              {!plan.highlighted && (
                <div
                  aria-hidden
                  className="absolute top-4 right-4 pointer-events-none opacity-30"
                >
                  <CSSphere size={28} animate="pulse" style={{ "--cssphere-dur": `${7 + i * 2}s` } as React.CSSProperties} />
                </div>
              )}

              {plan.highlighted && (
                <div className="mb-8">
                  <span className="text-[12px] tracking-[0.2em] uppercase px-4 py-2 font-bold rounded-full" style={{ backgroundColor: "#c8c8c8", color: "#0a0a0a", fontFamily: "var(--font-body)" }}>
                    Bestseller
                  </span>
                </div>
              )}

              <p className="text-[14px] tracking-[0.3em] uppercase mb-4 font-bold" style={{ color: "#707070", fontFamily: "var(--font-body)" }}>
                {plan.name}
              </p>

              <div
                className="font-[family-name:var(--font-display)] mb-6 transition-all duration-300 hover:scale-105"
                style={{
                  fontSize: "clamp(50px, 8vw, 90px)",
                  color: plan.highlighted ? "#ebebeb" : "#c8c8c8",
                  lineHeight: 1,
                  textShadow: plan.highlighted ? "0 10px 20px rgba(0,0,0,0.5), 0 0 15px rgba(200,200,200,0.3)" : "0 5px 15px rgba(0,0,0,0.3)",
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

              <p className="text-base leading-relaxed mb-10 min-h-[48px]" style={{ color: "#a0a0a0", fontFamily: "var(--font-body)" }}>
                {plan.description}
              </p>
              <div className="mb-10" style={{ height: "1px", backgroundColor: "#333" }} />

              <ul className="flex flex-col gap-4 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-4 text-sm font-medium hover:text-[#ebebeb] transition-colors" style={{ color: "#c8c8c8", fontFamily: "var(--font-body)" }}>
                    <svg className="mt-1 flex-shrink-0" width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="#ebebeb" strokeWidth="2" strokeLinecap="round">
                      <polyline points="2 7 5.5 10.5 12 3.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-12 flex items-center justify-center h-14 text-[14px] tracking-[0.1em] uppercase font-bold transition-all duration-300 rounded-sm hover:scale-[1.02]"
                style={
                  plan.highlighted
                    ? { backgroundColor: "#ebebeb", color: "#0a0a0a", boxShadow: "0 0 20px rgba(200,200,200,0.2)" }
                    : { backgroundColor: "#1a1a1a", color: "#c8c8c8", border: "1px solid #333" }
                }
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

export default PricingSpherePlus
