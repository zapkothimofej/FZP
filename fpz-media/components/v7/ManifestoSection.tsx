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

      // Compute how far right the text must shift so its center aligns with the viewport center
      const viewportCenter = window.innerWidth / 2
      const textRect = textRef.current.getBoundingClientRect()
      const textCenter = textRect.left + textRect.width / 2
      const xToCenter = viewportCenter - textCenter

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      })

      // Subtle background flash
      tl.to(bgRef.current, {
        backgroundColor: "var(--v6-bg-elevated)",
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })

      // Phase 1 (0→1): Pop up INTO the center — text settles centered
      tl.fromTo(
        textRef.current,
        {
          fontSize: "clamp(80px, 15vw, 250px)",
          rotationX: -45,
          scale: 2,
          x: xToCenter,
          y: "20vh",
          color: "var(--v6-text-muted)",
          transformOrigin: "center top",
          opacity: 0,
        },
        {
          fontSize: "clamp(40px, 6vw, 96px)",
          rotationX: 0,
          scale: 1,
          x: xToCenter,
          y: "0vh",
          color: "var(--v6-text)",
          opacity: 1,
          ease: "power2.out",
          duration: 1,
        },
        0
      )

      // Phase 2 (1→2): Slide from center to left (natural position)
      tl.to(
        textRef.current,
        {
          x: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        1
      )

      // Separator line draws itself after text lands left
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center center" },
        { scaleX: 1, ease: "elastic.out(1, 0.5)", duration: 0.8 },
        1.5
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
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none" />
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
            transformPerspective: 1000,
            lineHeight: 1.05,
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
