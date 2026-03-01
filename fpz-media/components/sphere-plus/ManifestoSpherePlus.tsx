"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content-de"
import { CSSphere } from "./CSSphere"

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSpherePlus() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const sphereWrapRef = useRef<HTMLDivElement>(null)

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

      // Flash effect
      tl.to(bgRef.current, { backgroundColor: "#c8c8c8", duration: 0.1, yoyo: true, repeat: 1 })

      // Text shrinks in
      tl.fromTo(
        textRef.current,
        { fontSize: "clamp(60px, 15vw, 200px)", rotationX: 45, filter: "blur(10px)", scale: 1.5, opacity: 0 },
        { fontSize: "clamp(28px, 4vw, 64px)", rotationX: 0, filter: "blur(0px)", scale: 1, opacity: 1, ease: "power2.inOut", duration: 0.5 },
        0
      )

      // Line draws
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "elastic.out(1, 0.3)", duration: 0.5 },
        0.5
      )

      // Background sphere slides in from right
      tl.fromTo(
        sphereWrapRef.current,
        { x: "20%", opacity: 0, scale: 0.6 },
        { x: 0, opacity: 1, scale: 1, ease: "power3.out", duration: 0.6 },
        0.1
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
        <span style={{ color: "#c8c8c8", fontStyle: "italic", textShadow: "0 0 20px rgba(200,200,200,0.5)" }}>
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
      style={{ backgroundColor: "#0a0a0a" }}
      id="manifesto"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none transition-colors" />

      {/* Large background sphere right side */}
      <div
        ref={sphereWrapRef}
        aria-hidden
        style={{
          position: "absolute",
          right: "-8%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <CSSphere size={520} opacity={0.14} glow animate="float" />
      </div>

      {/* Small accent spheres */}
      <div
        aria-hidden
        style={{ position: "absolute", top: "12%", left: "5%", zIndex: 1, pointerEvents: "none" }}
      >
        <CSSphere size={32} opacity={0.3} animate="pulse" style={{ "--cssphere-dur": "7s" } as React.CSSProperties} />
      </div>
      <div
        aria-hidden
        style={{ position: "absolute", bottom: "15%", right: "25%", zIndex: 1, pointerEvents: "none" }}
      >
        <CSSphere size={20} opacity={0.25} animate="pulse" style={{ "--cssphere-dur": "9s", "--cssphere-delay": "3s" } as React.CSSProperties} />
      </div>

      <div className="max-w-6xl z-10 relative">
        {/* Label */}
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-10"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          Unser Manifest
        </p>

        {/* Main animated text */}
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
          <div style={{ color: "#ebebeb" }}>{highlightUnfair(manifesto.line2)}</div>
        </div>

        {/* Separator line */}
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

export default ManifestoSpherePlus
