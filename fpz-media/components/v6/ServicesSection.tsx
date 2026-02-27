"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"
import { services } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

const WireframeIcon = dynamic(
  () => import("@/components/v6/WireframeIcon").then((m) => m.WireframeIcon),
  { ssr: false }
)

// Each service panel gets a different wireframe icon
const PANEL_ICONS: Array<"cube" | "sphere" | "torus"> = ["cube", "sphere", "torus"]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return

      const panels = gsap.utils.toArray<HTMLElement>(".v6-service-panel")
      if (panels.length === 0) return

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (panels.length - 1) * window.innerWidth,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section id="services" className="relative" ref={containerRef}>
      {/* Section label */}
      <div
        className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 pointer-events-none"
        aria-hidden
      >
        <p
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          Unsere Leistungen — Scroll
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex"
        style={{ width: `${services.length * 100}vw` }}
      >
        {services.map((service, i) => (
          <div
            key={service.id}
            className="v6-service-panel relative flex flex-col justify-end overflow-hidden"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: "#141414",
              borderRight: i < services.length - 1 ? "1px solid #c8c8c8" : "none",
              flexShrink: 0,
            }}
          >
            {/* Giant service number in background */}
            <div
              className="absolute top-0 right-0 select-none pointer-events-none font-[family-name:var(--font-display)] leading-none"
              aria-hidden
              style={{
                fontSize: "clamp(160px, 28vw, 400px)",
                color: "#c8c8c8",
                opacity: 0.06,
                lineHeight: 0.85,
                paddingRight: "2rem",
              }}
            >
              {service.number}
            </div>

            {/* Three.js Wireframe Icon — top-right corner */}
            <div
              className="absolute top-8 right-8"
              aria-hidden
            >
              <WireframeIcon type={PANEL_ICONS[i % PANEL_ICONS.length]} />
            </div>

            {/* Panel content */}
            <div className="relative z-10 px-12 md:px-20 pb-20 pt-32 max-w-2xl">
              {/* Number label */}
              <p
                className="text-[11px] tracking-[0.2em] uppercase mb-6"
                style={{ color: "#707070", fontFamily: "var(--font-body)" }}
              >
                {service.number} / {String(services.length).padStart(2, "0")}
              </p>

              {/* Title */}
              <h2
                className="font-[family-name:var(--font-display)] mb-4"
                style={{
                  fontSize: "clamp(40px, 7vw, 96px)",
                  color: "#ebebeb",
                  lineHeight: 1,
                }}
              >
                {service.title}
              </h2>

              {/* Headline */}
              <p
                className="text-lg mb-6 italic"
                style={{
                  color: "#c8c8c8",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2vw, 26px)",
                }}
              >
                {service.headline}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-8 max-w-md"
                style={{ color: "#707070", fontFamily: "var(--font-body)" }}
              >
                {service.description}
              </p>

              {/* Thin separator */}
              <div
                className="mb-6"
                style={{ height: "1px", backgroundColor: "#222222", width: "100%" }}
              />

              {/* Deliverables */}
              <ul className="flex flex-col gap-2">
                {service.deliverables.map((d, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#c8c8c8" }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scroll hint on first panel */}
            {i === 0 && (
              <div
                className="absolute bottom-8 right-12 flex items-center gap-2"
                style={{ color: "#707070", fontSize: "11px", letterSpacing: "0.1em" }}
              >
                <span>DRAG TO EXPLORE</span>
                <svg
                  width="24"
                  height="10"
                  viewBox="0 0 24 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
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
