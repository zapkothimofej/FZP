"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!wrapperRef.current || !textRef.current || !lineRef.current) return

      const vw = window.innerWidth
      const startPx = Math.max(48, Math.min(vw * 0.1, 160))
      const endPx = Math.max(28, Math.min(vw * 0.04, 64))

      const tl = gsap.timeline({
        scrollTrigger: {
          // Wrapper als Trigger — kein pin:true, kein DOM-Insert durch GSAP
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })

      tl.fromTo(
        textRef.current,
        { fontSize: startPx + "px" },
        { fontSize: endPx + "px", ease: "none", duration: 2 },
        0
      )

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none", duration: 1 },
        1
      )
    },
    { scope: wrapperRef }
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
    // Wrapper: 300vh hoch → gibt der Animation Scroll-Raum
    <div ref={wrapperRef} style={{ height: "300vh" }} id="manifesto">
      {/* CSS sticky ersetzt GSAP pin — kein DOM-Eingriff, kein React-Konflikt */}
      <section
        className="sticky top-0 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 overflow-hidden"
        style={{ backgroundColor: "var(--v6-bg)" }}
      >
        <div className="max-w-6xl">
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
              fontSize: "clamp(48px, 10vw, 160px)",
              color: "var(--v6-text)",
              lineHeight: 1.05,
            }}
          >
            <div>{manifesto.line1}</div>
            <div>{highlightUnfair(manifesto.line2)}</div>
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
    </div>
  )
}

export default ManifestoSection
