"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { manifesto } from "@/lib/content"

const MARQUEE_TEXT =
  "WEB DEVELOPMENT · MEDIA PRODUCTION · AUTOMATION · RUHRGEBIET · "

export function HeroGSAP() {
  const containerRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLDivElement>(null)
  const word2Ref = useRef<HTMLDivElement>(null)
  const word3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Word animations: left, right, bottom
      tl.fromTo(
        word1Ref.current,
        { x: "-15vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1 }
      )
        .fromTo(
          word2Ref.current,
          { x: "15vw", opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1 },
          "-=0.85"
        )
        .fromTo(
          word3Ref.current,
          { y: "8vh", opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          "-=0.85"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Marquee ticker — upper area */}
      <div
        className="absolute top-20 left-0 right-0 overflow-hidden select-none"
        aria-hidden
      >
        <div className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          <span
            className="marquee-track inline-flex shrink-0 animate-[stahl-marquee_18s_linear_infinite]"
            style={{ color: "#c8c8c8", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.45 }}
          >
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </span>
          <span
            className="marquee-track inline-flex shrink-0 animate-[stahl-marquee_18s_linear_infinite]"
            style={{ color: "#c8c8c8", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.45 }}
            aria-hidden
          >
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Main heading block */}
      <div className="px-8 md:px-16 lg:px-24 pt-16 pb-8 flex flex-col leading-none">
        <div
          ref={word1Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform"
          style={{
            fontSize: "clamp(80px, 18vw, 240px)",
            color: "#ebebeb",
            lineHeight: 0.9,
            opacity: 0,
          }}
        >
          Lokal.
        </div>
        <div
          ref={word2Ref}
          className="block font-[family-name:var(--font-display)] will-change-transform self-end md:self-center text-right md:text-center"
          style={{
            fontSize: "clamp(80px, 18vw, 240px)",
            color: "#ebebeb",
            lineHeight: 0.9,
            opacity: 0,
          }}
        >
          Digital.
        </div>
        <div
          ref={word3Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform self-end"
          style={{
            fontSize: "clamp(80px, 18vw, 240px)",
            color: "#c8c8c8",
            lineHeight: 0.9,
            opacity: 0,
          }}
        >
          Komplett.
        </div>
      </div>

      {/* Sub + CTA */}
      <div className="px-8 md:px-16 lg:px-24 pb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <p
          ref={subRef}
          className="max-w-md text-base md:text-lg leading-relaxed"
          style={{ color: "#707070", opacity: 0, fontFamily: "var(--font-body)" }}
        >
          {manifesto.sub}
        </p>

        <a
          ref={ctaRef}
          href="#contact"
          className="inline-flex items-center gap-3 group"
          style={{ opacity: 0, color: "#c8c8c8", textDecoration: "none" }}
        >
          <span
            className="text-[13px] tracking-[0.12em] uppercase font-semibold transition-colors duration-300 group-hover:text-[#ebebeb]"
          >
            Start a Project
          </span>
          <span
            className="flex items-center justify-center w-10 h-10 border transition-all duration-300 group-hover:bg-[#c8c8c8] group-hover:text-[#0a0a0a]"
            style={{ borderColor: "#c8c8c8" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </span>
        </a>
      </div>

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
      />
    </section>
  )
}
