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

      // Count-up animations using GSAP — same as V2
      stats.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return
        const { prefix, num, suffix } = parseStatValue(stat.value)
        if (num === null) return // ∞ — skip

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
            el.textContent =
              prefix +
              (Number.isInteger(num)
                ? Math.round(obj.val).toString()
                : obj.val.toFixed(1)) +
              suffix
          },
        })
      })

      // Stagger stat cards in
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
      style={{ backgroundColor: "#141414" }}
    >
      {/* Stats grid */}
      <div className="px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#222222]">
          {stats.map((stat, i) => {
            const { prefix, num, suffix } = parseStatValue(stat.value)
            return (
              <div
                key={stat.label}
                className="v6-stat-card flex flex-col items-center justify-center py-16 px-4 text-center"
                style={{
                  backgroundColor: "#141414",
                  borderRight: i < stats.length - 1 ? "1px solid #222222" : "none",
                  opacity: 0,
                }}
              >
                {/* 3D extrusion effect on the numbers via text-shadow stacking */}
                <div
                  className="font-[family-name:var(--font-display)] mb-3"
                  style={{
                    fontSize: "clamp(36px, 6vw, 80px)",
                    color: "#c8c8c8",
                    lineHeight: 1,
                    textShadow:
                      "1px 1px 0 rgba(200,200,200,0.3), 2px 2px 0 rgba(200,200,200,0.2), 3px 3px 0 rgba(200,200,200,0.1)",
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
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
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
        style={{ borderColor: "#222222", padding: "14px 0" }}
        aria-hidden
      >
        <div className="flex">
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_20s_linear_infinite]"
            style={{
              color: "#707070",
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
              color: "#707070",
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
