"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"
import { services } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

const WireframeIcon = dynamic(
  () => import("@/components/v10/WireframeIcon").then((m) => m.WireframeIcon),
  { ssr: false }
)

const PANEL_ICONS: Array<"cube" | "sphere" | "torus"> = ["cube", "sphere", "torus"]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return

      const panels = gsap.utils.toArray<HTMLElement>(".v10-service-panel")
      if (panels.length === 0) return

      // Use a slightly different approach to avoid disappearing elements.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          end: () => "+=" + (panels.length * 100) + "%", // Make scrolling proportional
          invalidateOnRefresh: true,
        },
      })

      // Horizontal scroll
      tl.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
      })

      // Internal animations based on container timeline
      panels.forEach((panel) => {
        const title = panel.querySelector("h2")
        const number = panel.querySelector(".bg-number")
        
        // Use simpler parallax to avoid layout breaking
        gsap.to(title, {
          x: 100,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "left center",
            end: "right left",
            scrub: true,
          }
        })

        gsap.to(number, {
          rotation: 30,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "left center",
            end: "right left",
            scrub: true,
          }
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section id="services" className="relative overflow-hidden bg-white" ref={containerRef}>
      {/* Section label */}
      <div
        className="absolute top-8 left-8 md:left-16 lg:left-24 z-20 pointer-events-none"
        aria-hidden
      >
        <p
          className="text-[12px] tracking-[0.3em] font-bold uppercase"
          style={{ color: "#0a0a0a", fontFamily: "var(--font-body)" }}
        >
          Unsere Leistungen — Scroll
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-screen"
        style={{ width: `${services.length * 100}vw` }}
      >
        {services.map((service, i) => (
          <div
            key={service.id}
            className="v10-service-panel relative flex flex-col justify-end overflow-hidden"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f9fa",
              borderRight: i < services.length - 1 ? "1px solid #e0e0e0" : "none",
              flexShrink: 0,
            }}
          >
            {/* Giant service number in background */}
            <div
              className="bg-number absolute top-[-5%] right-[-5%] select-none pointer-events-none font-[family-name:var(--font-display)] leading-none z-0"
              aria-hidden
              style={{
                fontSize: "clamp(250px, 45vw, 600px)",
                color: "#e0e0e0", // Light grey
                opacity: 0.3,
                lineHeight: 0.85,
                paddingRight: "2rem",
                textShadow: "0 0 50px rgba(0,0,0,0.05)",
              }}
            >
              {service.number}
            </div>

            {/* Three.js Wireframe Icon — top-right corner */}
            <div
              className="absolute top-12 right-12 z-0 opacity-20 mix-blend-multiply scale-150 pointer-events-none"
              aria-hidden
            >
              <WireframeIcon type={PANEL_ICONS[i % PANEL_ICONS.length]} color="#0a0a0a" />
            </div>

            {/* Panel content */}
            <div className="relative z-10 px-12 md:px-20 pb-20 pt-32 max-w-3xl">
              {/* Number label */}
              <p
                className="text-[14px] tracking-[0.3em] uppercase mb-8 font-extrabold"
                style={{ color: "#0a0a0a", fontFamily: "var(--font-body)" }}
              >
                {service.number} / {String(services.length).padStart(2, "0")}
              </p>

              {/* Title */}
              <h2
                className="font-[family-name:var(--font-display)] mb-6 tracking-tighter"
                style={{
                  fontSize: "clamp(50px, 9vw, 120px)",
                  color: "#0a0a0a",
                  lineHeight: 0.9,
                }}
              >
                {service.title}
              </h2>

              {/* Headline */}
              <p
                className="text-xl mb-8 italic font-medium"
                style={{
                  color: "#555555",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 3vw, 36px)",
                }}
              >
                {service.headline}
              </p>

              {/* Description */}
              <p
                className="text-base leading-relaxed mb-10 max-w-lg font-medium"
                style={{ color: "#333333", fontFamily: "var(--font-body)" }}
              >
                {service.description}
              </p>

              {/* Thin separator */}
              <div
                className="mb-8"
                style={{ height: "2px", backgroundColor: "#0a0a0a", width: "100%", opacity: 0.1 }}
              />

              {/* Deliverables */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((d, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-4 text-sm font-bold text-[#0a0a0a] transition-all hover:translate-x-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span
                      className="w-2 h-2 flex-shrink-0 bg-[#0a0a0a]"
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scroll hint on first panel */}
            {i === 0 && (
              <div
                className="absolute bottom-12 right-12 flex items-center gap-3 animate-pulse"
                style={{ color: "#0a0a0a", fontSize: "14px", letterSpacing: "0.2em", fontWeight: "bold" }}
              >
                <span>WEITER SCROLLEN</span>
                <svg
                  width="30"
                  height="12"
                  viewBox="0 0 24 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M0 5h22M17 1l5 4-5 4" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
