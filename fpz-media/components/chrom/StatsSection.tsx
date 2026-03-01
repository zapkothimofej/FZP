"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { stats } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_TEXT = "WEB · FILM · AUTOMATION · RUHRGEBIET · FPZ-MEDIA · "

function parseStatValue(val: string): { prefix: string; num: number | null; suffix: string } {
  const match = val.match(/^([^0-9∞]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return { prefix: "", num: null, suffix: val }
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] }
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      stats.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return
        const { prefix, num, suffix } = parseStatValue(stat.value)
        if (num === null) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: num,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Number.isInteger(num)
              ? Math.round(obj.val).toString()
              : obj.val.toFixed(1)
          },
        })
      })

      gsap.fromTo(
        ".v6-stat-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-28"
      style={{ backgroundColor: "var(--v6-bg-elevated)" }}
    >
      {/* Stats grid */}
      <div className="px-8 md:px-16 lg:px-24">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ backgroundColor: "var(--v6-border)", border: "1px solid var(--v6-border)" }}
        >
          {stats.map((stat, i) => {
            const { prefix, num, suffix } = parseStatValue(stat.value)
            return (
              <div
                key={stat.label}
                className="v6-stat-card flex flex-col items-center justify-center py-16 px-4 text-center"
                style={{
                  backgroundColor: "var(--v6-bg-elevated)",
                  opacity: 0,
                }}
              >
                <div
                  className="font-[family-name:var(--font-display)] mb-3"
                  style={{
                    fontSize: "clamp(36px, 6vw, 80px)",
                    color: "var(--v6-accent)",
                    lineHeight: 1,
                    textShadow: "var(--v6-text-shadow-extrude)",
                  }}
                >
                  {num !== null ? (
                    <>
                      {prefix}
                      <span ref={(el) => { numbersRef.current[i] = el }}>0</span>
                      {suffix}
                    </>
                  ) : (
                    <span ref={(el) => { numbersRef.current[i] = el }}>
                      {stat.value}
                    </span>
                  )}
                </div>
                <p
                  className="text-[11px] tracking-[0.15em] uppercase"
                  style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Infinite marquee ticker */}
      <div
        className="mt-16 overflow-hidden border-t border-b select-none"
        style={{ borderColor: "var(--v6-border)", padding: "14px 0" }}
        aria-hidden
      >
        <div className="flex">
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_20s_linear_infinite]"
            style={{
              color: "var(--v6-text-muted)",
              fontSize: "11px",
              letterSpacing: "0.25em",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
            }}
          >
            {Array(6).fill(MARQUEE_TEXT).join("")}
          </span>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_20s_linear_infinite]"
            style={{
              color: "var(--v6-text-muted)",
              fontSize: "11px",
              letterSpacing: "0.25em",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
            }}
            aria-hidden
          >
            {Array(6).fill(MARQUEE_TEXT).join("")}
          </span>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
