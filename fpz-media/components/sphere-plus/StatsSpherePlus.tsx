"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { stats } from "@/lib/content-de"
import { CSSphere } from "./CSSphere"

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_TEXT = "WEB · FILM · AUTOMATION · RUHRGEBIET · FPZ-MEDIA · "

function parseStatValue(val: string): { prefix: string; num: number | null; suffix: string } {
  const match = val.match(/^([^0-9∞]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return { prefix: "", num: null, suffix: val }
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] }
}

export function StatsSpherePlus() {
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])
  const headerSphereRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Header sphere drops in
      gsap.fromTo(
        headerSphereRef.current,
        { y: -80, opacity: 0, scale: 0.4 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )

      // Count-up animations
      stats.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return
        const { prefix, num, suffix } = parseStatValue(stat.value)
        if (num !== null) {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: num,
            duration: 3,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
            onUpdate: () => {
              el.textContent = prefix + (Number.isInteger(num) ? Math.round(obj.val).toString() : obj.val.toFixed(1)) + suffix
            },
          })
        }
      })

      // Stat cards flip in with 3D
      gsap.fromTo(
        ".v6sp-stat-card",
        { y: 100, opacity: 0, rotationX: 90, scale: 0.5 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          stagger: 0.2,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-32"
      style={{ backgroundColor: "#141414", perspective: "1500px", overflow: "hidden", position: "relative" }}
    >
      {/* Ambient background spheres */}
      <div aria-hidden style={{ position: "absolute", top: "-8%", left: "-4%", pointerEvents: "none", zIndex: 0 }}>
        <CSSphere size={300} opacity={0.07} glow animate="float" style={{ "--cssphere-dur": "13s" } as React.CSSProperties} />
      </div>
      <div aria-hidden style={{ position: "absolute", bottom: "-5%", right: "-3%", pointerEvents: "none", zIndex: 0 }}>
        <CSSphere size={200} opacity={0.06} animate="float" style={{ "--cssphere-dur": "16s", "--cssphere-delay": "2s" } as React.CSSProperties} />
      </div>

      {/* Floating header sphere */}
      <div className="flex justify-center mb-12 relative z-10" aria-hidden>
        <div ref={headerSphereRef} style={{ opacity: 0 }}>
          <CSSphere size={90} opacity={0.7} glow animate="float" style={{ "--cssphere-dur": "7s" } as React.CSSProperties} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const { prefix, num, suffix } = parseStatValue(stat.value)
            return (
              <div
                key={stat.label}
                className="v6sp-stat-card relative flex flex-col items-center justify-center py-20 px-6 text-center rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #333",
                  opacity: 0,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, rgba(200,200,200,0.15) 0%, transparent 70%)" }}
                />

                {/* Tiny sphere accent — top-right corner */}
                <div
                  aria-hidden
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                >
                  <CSSphere size={14} opacity={1} glow />
                </div>

                <div
                  className="font-[family-name:var(--font-display)] mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    fontSize: "clamp(50px, 8vw, 120px)",
                    color: "#ebebeb",
                    lineHeight: 1,
                    textShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(235,235,235,0.4)",
                  }}
                >
                  {num !== null ? (
                    <>
                      {prefix}
                      <span ref={(el) => { numbersRef.current[i] = el }}>0</span>
                      {suffix}
                    </>
                  ) : (
                    <span ref={(el) => { numbersRef.current[i] = el }}>{stat.value}</span>
                  )}
                </div>
                <p
                  className="text-[14px] tracking-[0.3em] uppercase font-bold relative z-10 transition-colors duration-500 group-hover:text-[#ebebeb]"
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Marquee ticker */}
      <div
        className="mt-24 overflow-hidden border-t border-b select-none shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
        style={{ borderColor: "#333", padding: "20px 0", backgroundColor: "#0a0a0a" }}
        aria-hidden
      >
        <div className="flex">
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_15s_linear_infinite]"
            style={{ color: "#c8c8c8", fontSize: "14px", letterSpacing: "0.4em", fontFamily: "var(--font-body)", fontWeight: "bold", whiteSpace: "nowrap" }}
          >
            {Array(6).fill(MARQUEE_TEXT).join("")}
          </span>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_15s_linear_infinite]"
            style={{ color: "#c8c8c8", fontSize: "14px", letterSpacing: "0.4em", fontFamily: "var(--font-body)", fontWeight: "bold", whiteSpace: "nowrap" }}
            aria-hidden
          >
            {Array(6).fill(MARQUEE_TEXT).join("")}
          </span>
        </div>
      </div>
    </section>
  )
}

export default StatsSpherePlus
