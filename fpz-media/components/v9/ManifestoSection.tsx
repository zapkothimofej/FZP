"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

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

      // Extreme flash / distortion effect
      tl.to(bgRef.current, { backgroundColor: "#c8c8c8", duration: 0.1, yoyo: true, repeat: 1 })

      // Shrink font size from large to normal as you scroll and rotate slightly
      tl.fromTo(
        textRef.current,
        { fontSize: "clamp(60px, 15vw, 200px)", rotationX: 45, filter: "blur(10px)", scale: 1.5, opacity: 0 },
        { fontSize: "clamp(28px, 4vw, 64px)", rotationX: 0, filter: "blur(0px)", scale: 1, opacity: 1, ease: "power2.inOut", duration: 0.5 },
        0
      )

      // Draw the separator line from left with a bounce
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "elastic.out(1, 0.3)", duration: 0.5 },
        0.5
      )
    },
    { scope: sectionRef }
  )

  const highlightUnfair = (text: string) => {
    const parts = text.split("unfairen")
    if(parts.length < 2) return text;
    return (
      <>
        {parts[0]}
        <span style={{ color: "#c8c8c8", fontStyle: "italic", textShadow: "0 0 20px rgba(200,200,200,0.5)" }}>unfairen</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
      id="manifesto"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none transition-colors" />
      <div className="max-w-6xl z-10 relative">
        {/* Small label */}
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-10"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          Unser Manifest
        </p>

        {/* Main animated text — shrinks as scrub progresses */}
        <div
          ref={textRef}
          className="font-[family-name:var(--font-display)] leading-tight"
          style={{
            fontSize: "clamp(60px, 15vw, 200px)",
            color: "#ebebeb",
            lineHeight: 1.05,
            transformPerspective: 1000,
          }}
        >
          <div>{manifesto.line1}</div>
          <div style={{ color: "#ebebeb" }}>
            {highlightUnfair(manifesto.line2)}
          </div>
        </div>

        {/* Separator line draws itself */}
        <div
          ref={lineRef}
          className="mt-12"
          style={{
            height: "2px",
            backgroundColor: "#c8c8c8",
            width: "100%",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />

        {/* Sub text */}
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

export default ManifestoSection
