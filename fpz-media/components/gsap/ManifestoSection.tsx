"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current || !lineRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      })

      // Shrink font size from large to normal
      tl.fromTo(
        textRef.current,
        { fontSize: "clamp(48px, 10vw, 160px)" },
        { fontSize: "clamp(28px, 4vw, 64px)", ease: "none" },
        0
      )

      // Draw the separator line
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none" },
        0.5
      )
    },
    { scope: sectionRef }
  )

  // Highlight "unfair" in platinum
  const highlightUnfair = (text: string) => {
    const parts = text.split("unfair")
    return (
      <>
        {parts[0]}
        <span style={{ color: "#c8c8c8" }}>unfair</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-start min-h-screen px-8 md:px-16 lg:px-24 pt-24 md:pt-32"
      style={{ backgroundColor: "#0a0a0a" }}
      id="manifesto"
    >
      <div className="max-w-6xl">
        {/* Small label */}
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-10"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          Our Manifesto
        </p>

        {/* Main animated text */}
        <div
          ref={textRef}
          className="font-[family-name:var(--font-display)] leading-tight"
          style={{
            fontSize: "clamp(48px, 10vw, 160px)",
            color: "#ebebeb",
            lineHeight: 1.05,
          }}
        >
          <div>{manifesto.line1}</div>
          <div style={{ color: "#ebebeb" }}>
            {highlightUnfair(manifesto.line2)}
          </div>
        </div>

        {/* Separator line */}
        <div
          ref={lineRef}
          className="mt-12"
          style={{
            height: "1px",
            backgroundColor: "#c8c8c8",
            width: "100%",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />

        {/* Sub text below line */}
        <p
          className="mt-8 text-base leading-relaxed max-w-lg"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          {manifesto.sub}
        </p>
      </div>
    </section>
  )
}
