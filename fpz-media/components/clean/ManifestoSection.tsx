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

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current || !lineRef.current) return

      // Text fades + slides up once when section enters viewport
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )

      // Line draws in from left as section scrolls into center
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  const highlightUnfair = (text: string) => {
    const parts = text.split("unfairen")
    if (parts.length < 2) return text
    return (
      <>
        {parts[0]}
        <span
          style={{
            color: "var(--v6-text-on-accent)",
            backgroundColor: "var(--v6-accent)",
            padding: "0 10px",
            display: "inline-block",
            transform: "rotate(-2deg)",
          }}
        >
          unfairen
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "var(--v6-bg)" }}
      id="manifesto"
    >
      <div className="max-w-6xl z-10 relative">
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-10"
          style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
        >
          Unser Manifest
        </p>

        <div
          ref={textRef}
          className="font-[family-name:var(--font-display)] leading-tight"
          style={{
            lineHeight: 1.05,
            opacity: 0,
            fontSize: "clamp(40px, 6vw, 96px)",
          }}
        >
          <div>{manifesto.line1}</div>
          <div className="mt-2">{highlightUnfair(manifesto.line2)}</div>
        </div>

        <div
          ref={lineRef}
          className="mt-12"
          style={{
            height: "1px",
            backgroundColor: "var(--v6-accent)",
            width: "100%",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />

        <p
          className="mt-8 text-base leading-relaxed max-w-lg"
          style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
        >
          {manifesto.sub}
        </p>
      </div>
    </section>
  )
}

export default ManifestoSection
