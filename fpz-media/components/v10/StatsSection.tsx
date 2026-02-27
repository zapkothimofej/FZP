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

      // Count-up animations using GSAP
      stats.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return
        const { prefix, num, suffix } = parseStatValue(stat.value)
        
        if (num !== null) {
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
              el.textContent =
                prefix +
                (Number.isInteger(num)
                  ? Math.round(obj.val).toString()
                  : obj.val.toFixed(1)) +
                suffix
            },
          })
        }
      })

      // Stagger stat cards in with an intense 3D flip (Light Theme)
      gsap.fromTo(
        ".v10-stat-card",
        { y: 80, opacity: 0, rotationY: 90, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-32"
      style={{ backgroundColor: "#ffffff", perspective: "1000px" }}
    >
      {/* Stats grid */}
      <div className="px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const { prefix, num, suffix } = parseStatValue(stat.value)
            return (
              <div
                key={stat.label}
                className="v10-stat-card relative flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl bg-[#fafafa] border border-[#e0e0e0] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:bg-[#0a0a0a] group"
                style={{
                  opacity: 0,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* 3D extrusion effect on the numbers via text-shadow stacking */}
                <div
                  className="font-[family-name:var(--font-display)] mb-4 transition-colors duration-500 group-hover:text-[#ffffff] group-hover:scale-110"
                  style={{
                    fontSize: "clamp(40px, 7vw, 90px)",
                    color: "#0a0a0a",
                    lineHeight: 1,
                    textShadow: "2px 2px 0px rgba(0,0,0,0.05)"
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
                  className="text-[13px] tracking-[0.2em] uppercase font-bold transition-colors duration-500 group-hover:text-[#a0a0a0]"
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
        className="mt-24 overflow-hidden border-t border-b select-none bg-[#0a0a0a]"
        style={{ borderColor: "#0a0a0a", padding: "18px 0" }}
        aria-hidden
      >
        <div className="flex">
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_12s_linear_infinite]"
            style={{
              color: "#ffffff",
              fontSize: "15px",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {Array(8).fill(MARQUEE_TEXT).join("")}
          </span>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_12s_linear_infinite]"
            style={{
              color: "#ffffff",
              fontSize: "15px",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
            aria-hidden
          >
            {Array(8).fill(MARQUEE_TEXT).join("")}
          </span>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
