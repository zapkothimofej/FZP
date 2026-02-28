"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { services } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!wrapperRef.current || !trackRef.current) return

      const panels = gsap.utils.toArray<HTMLElement>(".v6-service-panel")
      if (panels.length === 0) return

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.4,
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: wrapperRef }
  )

  return (
    <div
      ref={wrapperRef}
      id="services"
      style={{ height: `${services.length * 100}vh` }}
    >
      <section className="sticky top-0 relative overflow-hidden" style={{ height: "100vh" }}>
        {/* Section label */}
        <div
          className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 pointer-events-none"
          aria-hidden
        >
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
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
              className="v6-service-panel relative flex flex-col justify-center overflow-hidden"
              style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "var(--v6-bg-elevated)",
                borderRight: i < services.length - 1 ? "1px solid var(--v6-border)" : "none",
                flexShrink: 0,
              }}
            >
              {/* Giant service number — top-right, partially above viewport, no right overflow */}
              <div
                className="absolute select-none pointer-events-none font-[family-name:var(--font-display)]"
                aria-hidden
                style={{
                  top: "-10%",
                  right: "0",
                  fontSize: "clamp(200px, 32vw, 480px)",
                  color: "var(--v6-accent)",
                  opacity: 0.06,
                  lineHeight: 1,
                }}
              >
                {service.number}
              </div>

              {/* Panel content */}
              <div className="relative z-10 px-16 md:px-24 lg:px-32 max-w-4xl">
                {/* Number label */}
                <p
                  className="text-[13px] tracking-[0.3em] uppercase mb-8 font-semibold"
                  style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
                >
                  {service.number} / {String(services.length).padStart(2, "0")}
                </p>

                {/* Title */}
                <h2
                  className="font-[family-name:var(--font-display)] mb-6 tracking-tight"
                  style={{
                    fontSize: "clamp(56px, 9vw, 130px)",
                    color: "var(--v6-text)",
                    lineHeight: 0.92,
                  }}
                >
                  {service.title}
                </h2>

                {/* Headline */}
                <p
                  className="mb-8 italic"
                  style={{
                    color: "var(--v6-accent)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.5vw, 32px)",
                  }}
                >
                  {service.headline}
                </p>

                {/* Description */}
                <p
                  className="leading-relaxed mb-10"
                  style={{
                    color: "var(--v6-text-muted)",
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    maxWidth: "520px",
                  }}
                >
                  {service.description}
                </p>

                {/* Thin separator */}
                <div
                  className="mb-8"
                  style={{ height: "1px", backgroundColor: "var(--v6-border)", width: "100%", maxWidth: "520px" }}
                />

                {/* Deliverables */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ maxWidth: "520px" }}>
                  {service.deliverables.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3"
                      style={{
                        color: "var(--v6-text-muted)",
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(13px, 1vw, 15px)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--v6-accent)" }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scroll hint on first panel */}
              {i === 0 && (
                <div
                  className="absolute bottom-10 right-14 flex items-center gap-2 animate-pulse"
                  style={{ color: "var(--v6-text-muted)", fontSize: "11px", letterSpacing: "0.15em", fontWeight: 600 }}
                >
                  <span>SCROLLEN ZUM ENTDECKEN</span>
                  <svg
                    width="28"
                    height="10"
                    viewBox="0 0 28 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M0 5h26M21 1l6 4-6 4" />
                  </svg>
                </div>
              )}

              {/* Panel indicator dots */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {services.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: dotIdx === i ? "24px" : "6px",
                      height: "6px",
                      backgroundColor: dotIdx === i ? "var(--v6-accent)" : "var(--v6-border)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ServicesSection
