"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content-de"

const MARQUEE_TEXT = "WEB DEVELOPMENT · MEDIA PRODUCTION · AUTOMATION · RUHRGEBIET · "

export function HeroChrom() {
  const containerRef = useRef<HTMLElement>(null)
  const word1Ref = useRef<HTMLDivElement>(null)
  const word2Ref = useRef<HTMLDivElement>(null)
  const word3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // Intense initial reveal (Light Theme)
      tl.fromTo(
        word1Ref.current,
        { x: "-100vw", rotation: -10, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)" }
      )
        .fromTo(
          word2Ref.current,
          { x: "100vw", rotation: 10, opacity: 0 },
          { x: 0, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)" },
          "-=0.9"
        )
        .fromTo(
          word3Ref.current,
          { y: "50vh", scale: 0.5, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.5)" },
          "-=0.9"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
          "-=0.4"
        )

      // Reliable Scroll effects (no glitches, no accidental hiding)
      if (containerRef.current) {
        gsap.to(bgRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          scale: 1.5,
          rotation: 15,
          backgroundColor: "#f0f0f0",
        })

        // Words move apart gently on scroll, without completely disappearing
        gsap.to(word1Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          x: "-20vw",
          y: "-10vh",
          opacity: 0.2,
        })
        gsap.to(word2Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          x: "20vw",
          y: "-5vh",
          opacity: 0.2,
        })
        gsap.to(word3Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          scale: 1.2,
          y: "10vh",
          opacity: 0.2,
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Crazy bright animated background */}
      <div
        ref={bgRef}
        className="absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full blur-[80px] opacity-60 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, #e0e0e0, #f8f9fa, #e8f0fe)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      {/* Marquee ticker — upper band */}
      <div
        className="absolute top-24 left-0 right-0 overflow-hidden select-none"
        style={{ zIndex: 2 }}
        aria-hidden
      >
        <div className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_10s_linear_infinite]"
            style={{ color: "#0a0a0a", fontSize: "16px", letterSpacing: "0.2em", opacity: 0.15, fontWeight: "bold" }}
          >
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </span>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_10s_linear_infinite]"
            style={{ color: "#0a0a0a", fontSize: "16px", letterSpacing: "0.2em", opacity: 0.15, fontWeight: "bold" }}
            aria-hidden
          >
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* GSAP word reveal */}
      <div
        className="px-8 md:px-16 lg:px-24 pt-20 pb-8 flex flex-col leading-none z-10"
      >
        <div
          ref={word1Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform"
          style={{
            fontSize: "clamp(80px, 18vw, 240px)",
            color: "#0a0a0a",
            lineHeight: 0.9,
            opacity: 0,
            textShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          Lokal.
        </div>
        <div
          ref={word2Ref}
          className="block font-[family-name:var(--font-display)] will-change-transform self-end md:self-center text-right md:text-center"
          style={{
            fontSize: "clamp(80px, 18vw, 240px)",
            color: "#0a0a0a",
            lineHeight: 0.9,
            opacity: 0,
            textShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          Digital.
        </div>
        <div
          ref={word3Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform self-end relative"
          style={{
            fontSize: "clamp(80px, 18vw, 240px)",
            color: "#ffffff",
            WebkitTextStroke: "2px #0a0a0a",
            lineHeight: 0.9,
            opacity: 0,
            textShadow: "0 15px 40px rgba(0,0,0,0.15)",
          }}
        >
          Komplett.
        </div>
      </div>

      {/* Sub + CTA row */}
      <div
        className="px-8 md:px-16 lg:px-24 pb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 z-10"
      >
        <p
          ref={subRef}
          className="max-w-md text-base md:text-xl leading-relaxed font-medium"
          style={{ color: "#333333", opacity: 0, fontFamily: "var(--font-body)" }}
        >
          {manifesto.sub}
        </p>

        <div ref={ctaRef} style={{ opacity: 0, display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a
            href="#services"
            className="inline-flex items-center h-14 px-10 text-[14px] tracking-[0.1em] uppercase font-bold transition-all duration-300 rounded-full hover:scale-110 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            style={{ backgroundColor: "#0a0a0a", color: "#ffffff", textDecoration: "none" }}
          >
            Leistungen
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 hover:bg-[#0a0a0a] hover:text-[#ffffff] hover:scale-110 group"
            style={{ borderColor: "#0a0a0a", color: "#0a0a0a" }}
          >
            <svg
              className="transition-transform duration-300 group-hover:rotate-45"
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroChrom
