"use client"

import { useRef, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_TEXT = "WEB DEVELOPMENT · MEDIA PRODUCTION · AUTOMATION · RUHRGEBIET · "

export function HeroChrom() {
  const containerRef = useRef<HTMLElement>(null)
  const word1Ref = useRef<HTMLDivElement>(null)
  const word2Ref = useRef<HTMLDivElement>(null)
  const word3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // Initial Fly-in
      tl.fromTo(
        word1Ref.current,
        { x: "-100vw", rotation: -15, scale: 0.5, opacity: 0 },
        { x: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.2)" }
      )
        .fromTo(
          word2Ref.current,
          { x: "100vw", rotation: 15, scale: 0.5, opacity: 0 },
          { x: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.2)" },
          "-=1.2"
        )
        .fromTo(
          word3Ref.current,
          { y: "100vh", rotationX: -90, opacity: 0 },
          { y: 0, rotationX: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)", transformPerspective: 500 },
          "-=1.2"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.8"
        )

      // Extreme Scroll Effects
      if (containerRef.current) {
        gsap.to(lightRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: "30vh",
          scale: 1.5,
          opacity: 0,
        })

        // Words parallax & rotation on scroll
        gsap.to(word1Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
          x: "-50vw",
          y: "20vh",
          rotation: -45,
          scale: 1.5,
          opacity: 0,
          filter: "blur(20px)",
        })
        gsap.to(word2Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
          x: "50vw",
          y: "30vh",
          rotation: 45,
          scale: 1.8,
          opacity: 0,
          filter: "blur(20px)",
        })
        gsap.to(word3Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2.5,
          },
          y: "40vh",
          scale: 2,
          opacity: 0,
          filter: "blur(20px)",
        })

        // Subtext & CTA slide out
        gsap.to(subRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: 100,
          opacity: 0,
        })
        gsap.to(ctaRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
          y: 150,
          opacity: 0,
        })

        // Marquee speed up on scroll
        gsap.to(marqueeRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          x: "-50vw",
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
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Background gradients instead of ChromeSphere */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(50,50,50,0.4) 0%, rgba(10,10,10,1) 70%)",
        }}
      />
      
      {/* Dynamic light blob moving behind text */}
      <div
        ref={lightRef}
        className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, #c8c8c8, #707070)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      {/* Marquee ticker — upper band */}
      <div
        className="absolute top-20 left-0 right-0 overflow-hidden select-none"
        style={{ zIndex: 2 }}
        aria-hidden
      >
        <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_12s_linear_infinite]"
            style={{ color: "#c8c8c8", fontSize: "14px", letterSpacing: "0.2em", opacity: 0.6 }}
          >
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </span>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_12s_linear_infinite]"
            style={{ color: "#c8c8c8", fontSize: "14px", letterSpacing: "0.2em", opacity: 0.6 }}
            aria-hidden
          >
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* GSAP word reveal */}
      <div
        className="px-8 md:px-16 lg:px-24 pt-16 pb-8 flex flex-col leading-none"
        style={{ position: "relative", zIndex: 2 }}
      >
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
            textShadow: "0px 0px 20px rgba(200,200,200,0.5)",
          }}
        >
          Komplett.
        </div>
      </div>

      {/* Sub + CTA row */}
      <div
        className="px-8 md:px-16 lg:px-24 pb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        style={{ position: "relative", zIndex: 2 }}
      >
        <p
          ref={subRef}
          className="max-w-md text-base md:text-lg leading-relaxed"
          style={{ color: "#c8c8c8", opacity: 0, fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          {manifesto.sub}
        </p>

        <div ref={ctaRef} style={{ opacity: 0, display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#services"
            className="inline-flex items-center h-14 px-10 text-[14px] tracking-[0.1em] uppercase font-bold transition-all duration-300 shadow-[0_0_20px_rgba(200,200,200,0.2)] hover:shadow-[0_0_30px_rgba(200,200,200,0.5)] hover:scale-105"
            style={{ backgroundColor: "#ebebeb", color: "#0a0a0a", textDecoration: "none" }}
          >
            Unsere Leistungen
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 group"
            style={{ color: "#ebebeb", textDecoration: "none" }}
          >
            <span className="text-[14px] tracking-[0.12em] uppercase font-bold transition-all duration-300 group-hover:text-white group-hover:tracking-[0.2em]">
              Projekt starten
            </span>
            <span
              className="flex items-center justify-center w-14 h-14 border transition-all duration-300 group-hover:bg-[#ebebeb] group-hover:text-[#0a0a0a] group-hover:rotate-45"
              style={{ borderColor: "#ebebeb" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroChrom
