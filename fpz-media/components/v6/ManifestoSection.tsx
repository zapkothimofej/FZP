"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none" },
        0
      )
    },
    { scope: sectionRef }
  )

  const highlightUnfair = (text: string) => {
    const parts = text.split("unfair")
    return (
      <>
        {parts[0]}
        <span style={{ color: "var(--v6-accent)" }}>unfair</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--v6-bg)" }}
      id="manifesto"
    >
      <div className="max-w-6xl">
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-10"
          style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
        >
          Unser Manifest
        </p>

        <div
          className="font-[family-name:var(--font-display)] leading-tight"
          style={{
            fontSize: "clamp(48px, 10vw, 160px)",
            color: "var(--v6-text)",
            lineHeight: 1.05,
          }}
        >
          <div>{manifesto.line1}</div>
          <div style={{ color: "var(--v6-text)" }}>
            {highlightUnfair(manifesto.line2)}
          </div>
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
