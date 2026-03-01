"use client"

import { useRef, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import dynamic from "next/dynamic"
import { manifesto } from "@/lib/content-de"
import { CSSphere } from "./CSSphere"

const ChromeSphere = dynamic(
  () => import("@/components/sphere/ChromeSphere").then((m) => m.ChromeSphere),
  { ssr: false }
)

const MARQUEE_TEXT = "WEBENTWICKLUNG · MEDIENPRODUKTION · AUTOMATION · RUHRGEBIET · "

export function HeroSpherePlus() {
  const containerRef = useRef<HTMLElement>(null)
  const word1Ref = useRef<HTMLDivElement>(null)
  const word2Ref = useRef<HTMLDivElement>(null)
  const word3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<number>(0)

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / 700))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(word1Ref.current, { x: "-15vw", opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 })
        .fromTo(word2Ref.current, { x: "15vw", opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, "-=0.85")
        .fromTo(word3Ref.current, { y: "8vh", opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, "-=0.85")
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")

      // Extra orbs pop in with bounce
      tl.fromTo(
        orb1Ref.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.4)" },
        "-=1.0"
      )
        .fromTo(
          orb2Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.4)" },
          "-=0.9"
        )
        .fromTo(
          orb3Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.0, ease: "elastic.out(1, 0.5)" },
          "-=1.0"
        )
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
        backgroundColor: "var(--v6-bg)",
      }}
    >
      {/* Main chrome sphere (WebGL) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ animation: "sphere-fadein 1.2s ease 0.4s both" }}
      >
        <ChromeSphere scrollRef={scrollRef} />
      </div>

      {/* Extra orb — top-right cluster, medium */}
      <div
        ref={orb1Ref}
        aria-hidden
        style={{
          position: "absolute",
          top: "12%",
          right: "2%",
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none",
          animation: "cssphere-float 10s ease-in-out 0.6s infinite",
        }}
      >
        <CSSphere size={88} opacity={0.55} glow />
      </div>

      {/* Extra orb — below-right of main sphere */}
      <div
        ref={orb2Ref}
        aria-hidden
        style={{
          position: "absolute",
          top: "58%",
          right: "8%",
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none",
          animation: "cssphere-float 13s ease-in-out 2s infinite",
        }}
      >
        <CSSphere size={48} opacity={0.4} />
      </div>

      {/* Extra orb — far top-right tiny accent */}
      <div
        ref={orb3Ref}
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          right: "18%",
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none",
          animation: "cssphere-pulse 8s ease-in-out 1s infinite",
        }}
      >
        <CSSphere size={22} opacity={0.6} glow />
      </div>

      <style>{`
        @keyframes sphere-fadein  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cssphere-float { 0%, 100% { transform: translateY(0px);  } 50% { transform: translateY(-16px); } }
        @keyframes cssphere-pulse { 0%, 100% { transform: scale(1);   opacity: 0.6; } 50% { transform: scale(1.15); opacity: 0.3; } }
      `}</style>

      {/* Gradient overlay: keeps text readable */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, var(--v6-bg) 30%, color-mix(in srgb, var(--v6-bg) 55%, transparent) 60%, color-mix(in srgb, var(--v6-bg) 10%, transparent) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, transparent, var(--v6-hero-gradient-end))",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Marquee */}
      <div
        className="absolute top-20 left-0 right-0 overflow-hidden select-none"
        style={{ zIndex: 2 }}
        aria-hidden
      >
        <div className="flex whitespace-nowrap">
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_18s_linear_infinite]"
            style={{ color: "var(--v6-accent)", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.4 }}
          >
            {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
          </span>
          <span
            className="inline-flex shrink-0 animate-[stahl-marquee_18s_linear_infinite]"
            style={{ color: "var(--v6-accent)", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.4 }}
            aria-hidden
          >
            {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Words */}
      <div
        className="px-8 md:px-16 lg:px-24 pt-16 pb-8 flex flex-col leading-none"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          ref={word1Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform"
          style={{ fontSize: "clamp(80px, 18vw, 240px)", color: "var(--v6-text)", lineHeight: 0.9, opacity: 0 }}
        >
          Lokal.
        </div>
        <div
          ref={word2Ref}
          className="block font-[family-name:var(--font-display)] will-change-transform self-end md:self-center text-right md:text-center"
          style={{ fontSize: "clamp(80px, 18vw, 240px)", color: "var(--v6-text)", lineHeight: 0.9, opacity: 0 }}
        >
          Digital.
        </div>
        <div
          ref={word3Ref}
          className="block font-[family-name:var(--font-display)] italic will-change-transform self-end"
          style={{ fontSize: "clamp(80px, 18vw, 240px)", color: "var(--v6-accent)", lineHeight: 0.9, opacity: 0 }}
        >
          Komplett.
        </div>
      </div>

      {/* Sub + CTA */}
      <div
        className="px-8 md:px-16 lg:px-24 pb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        style={{ position: "relative", zIndex: 2 }}
      >
        <p
          ref={subRef}
          className="max-w-md text-base md:text-lg leading-relaxed"
          style={{ color: "var(--v6-text-muted)", opacity: 0, fontFamily: "var(--font-body)" }}
        >
          {manifesto.sub}
        </p>

        <div ref={ctaRef} style={{ opacity: 0, display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#services"
            className="inline-flex items-center h-11 px-8 text-[13px] tracking-[0.1em] uppercase font-semibold transition-all duration-300 hover:bg-[var(--v6-accent-hover)]"
            style={{ backgroundColor: "var(--v6-accent)", color: "var(--v6-text-on-accent)", textDecoration: "none" }}
          >
            Unsere Leistungen
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 group"
            style={{ color: "var(--v6-accent)", textDecoration: "none" }}
          >
            <span className="text-[13px] tracking-[0.12em] uppercase font-semibold transition-colors duration-300 group-hover:text-[var(--v6-text)]">
              Projekt starten
            </span>
            <span
              className="flex items-center justify-center w-10 h-10 border transition-all duration-300 group-hover:bg-[var(--v6-accent)] group-hover:text-[var(--v6-text-on-accent)]"
              style={{ borderColor: "var(--v6-accent)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSpherePlus
