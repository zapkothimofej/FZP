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
          end: "+=150%", // Make it slightly shorter to prevent getting stuck
          pin: true,
          scrub: 1,
        },
      })

      // Extreme background color flash
      tl.to(bgRef.current, { backgroundColor: "#0a0a0a", duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" })

      // Text scales down perfectly, with color change
      tl.fromTo(
        textRef.current,
        { 
          fontSize: "clamp(80px, 15vw, 250px)", 
          rotationX: -45, 
          scale: 2, 
          y: "20vh",
          color: "#e0e0e0",
          transformOrigin: "center top",
          opacity: 0
        },
        { 
          fontSize: "clamp(40px, 6vw, 96px)", 
          rotationX: 0, 
          scale: 1, 
          y: "0vh",
          color: "#0a0a0a",
          opacity: 1,
          ease: "power2.out", 
          duration: 1 
        },
        0
      )

      // Draw the separator line from middle
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center center" },
        { scaleX: 1, ease: "elastic.out(1, 0.5)", duration: 0.8 },
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
        <span 
          style={{ 
            color: "#ffffff", 
            backgroundColor: "#0a0a0a", 
            padding: "0 10px", 
            display: "inline-block",
            transform: "rotate(-2deg)",
            boxShadow: "5px 5px 0px rgba(0,0,0,0.2)"
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
      style={{ backgroundColor: "#fafafa" }}
      id="manifesto"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none transition-colors" />
      <div className="max-w-6xl z-10 relative w-full mx-auto">
        {/* Small label */}
        <p
          className="text-[12px] tracking-[0.3em] font-bold uppercase mb-10 text-center"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          Unser Manifest
        </p>

        {/* Main animated text */}
        <div
          ref={textRef}
          className="font-[family-name:var(--font-display)] leading-[1.1] text-center w-full"
          style={{
            transformPerspective: 1000,
          }}
        >
          <div>{manifesto.line1}</div>
          <div className="mt-2">
            {highlightUnfair(manifesto.line2)}
          </div>
        </div>

        {/* Separator line draws itself */}
        <div
          ref={lineRef}
          className="mt-16 mx-auto"
          style={{
            height: "4px",
            backgroundColor: "#0a0a0a",
            width: "80%",
            transform: "scaleX(0)",
          }}
        />

        {/* Sub text */}
        <p
          className="mt-12 text-xl font-medium leading-relaxed max-w-2xl mx-auto text-center"
          style={{ color: "#555", fontFamily: "var(--font-body)" }}
        >
          {manifesto.sub}
        </p>
      </div>
    </section>
  )
}

export default ManifestoSection
