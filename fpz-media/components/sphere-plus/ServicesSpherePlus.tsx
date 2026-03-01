"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"
import { services } from "@/lib/content-de"
import { CSSphere } from "./CSSphere"

gsap.registerPlugin(ScrollTrigger)

const WireframeIcon = dynamic(
  () => import("@/components/chrom/WireframeIcon").then((m) => m.WireframeIcon),
  { ssr: false }
)

const PANEL_ICONS: Array<"cube" | "sphere" | "torus"> = ["cube", "sphere", "torus"]

// Sizes for the per-panel chrome orbs
const PANEL_SPHERE_SIZES = [260, 200, 240]

export function ServicesSpherePlus() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return

      const panels = gsap.utils.toArray<HTMLElement>(".v6sp-service-panel")
      if (panels.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.5,
          end: () => "+=" + (panels.length - 1) * window.innerWidth * 1.5,
          invalidateOnRefresh: true,
        },
      })

      tl.to(panels, { xPercent: -100 * (panels.length - 1), ease: "power1.inOut" })

      panels.forEach((panel) => {
        const title = panel.querySelector("h2")
        const number = panel.querySelector(".bg-number")
        const sphere = panel.querySelector(".panel-sphere")

        gsap.to(title, {
          x: 200, scale: 1.1, ease: "none",
          scrollTrigger: { trigger: panel, containerAnimation: tl, start: "left right", end: "right left", scrub: true },
        })
        gsap.to(number, {
          x: -150, rotation: 45, ease: "none",
          scrollTrigger: { trigger: panel, containerAnimation: tl, start: "left right", end: "right left", scrub: true },
        })
        // Sphere floats in from bottom-right as panel enters
        gsap.fromTo(
          sphere,
          { y: 60, scale: 0.7, opacity: 0 },
          {
            y: 0, scale: 1, opacity: 1, ease: "back.out(1.5)", duration: 0.8,
            scrollTrigger: { trigger: panel, containerAnimation: tl, start: "left 80%", toggleActions: "play reverse play reverse" },
          }
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <section id="services" className="relative" ref={containerRef} style={{ overflow: "hidden" }}>
      {/* Label */}
      <div className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 pointer-events-none" aria-hidden>
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#707070", fontFamily: "var(--font-body)" }}>
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
            className="v6sp-service-panel relative flex flex-col justify-end overflow-hidden"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: i % 2 === 0 ? "#141414" : "#0f0f0f",
              borderRight: i < services.length - 1 ? "1px solid #333" : "none",
              flexShrink: 0,
            }}
          >
            {/* Giant number */}
            <div
              className="bg-number absolute top-[-5%] right-[-5%] select-none pointer-events-none font-[family-name:var(--font-display)] leading-none z-0"
              aria-hidden
              style={{
                fontSize: "clamp(250px, 45vw, 600px)",
                color: "#c8c8c8",
                opacity: 0.03,
                lineHeight: 0.85,
                paddingRight: "2rem",
              }}
            >
              {service.number}
            </div>

            {/* Chrome sphere per panel — bottom-right focal point */}
            <div
              className="panel-sphere absolute bottom-[-4%] right-[-6%] z-0 pointer-events-none"
              aria-hidden
            >
              <CSSphere
                size={PANEL_SPHERE_SIZES[i % PANEL_SPHERE_SIZES.length]}
                opacity={0.18}
                glow
                animate="float"
                style={{
                  "--cssphere-dur": `${10 + i * 2}s`,
                  "--cssphere-delay": `${i}s`,
                } as React.CSSProperties}
              />
            </div>

            {/* Wireframe icon — top-right, smaller */}
            <div className="absolute top-12 right-12 z-0 opacity-40 mix-blend-screen scale-125" aria-hidden>
              <WireframeIcon type={PANEL_ICONS[i % PANEL_ICONS.length]} />
            </div>

            {/* Panel content */}
            <div className="relative z-10 px-12 md:px-20 pb-20 pt-32 max-w-3xl">
              <p className="text-[13px] tracking-[0.3em] uppercase mb-8 font-bold" style={{ color: "#ebebeb", fontFamily: "var(--font-body)" }}>
                {service.number} / {String(services.length).padStart(2, "0")}
              </p>
              <h2
                className="font-[family-name:var(--font-display)] mb-6 tracking-tighter"
                style={{ fontSize: "clamp(50px, 9vw, 120px)", color: "#ebebeb", lineHeight: 0.9, textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
              >
                {service.title}
              </h2>
              <p className="text-xl mb-8 italic" style={{ color: "#c8c8c8", fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 36px)" }}>
                {service.headline}
              </p>
              <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: "#a0a0a0", fontFamily: "var(--font-body)" }}>
                {service.description}
              </p>
              <div className="mb-8" style={{ height: "2px", backgroundColor: "#333", width: "100%", boxShadow: "0 0 10px rgba(200,200,200,0.2)" }} />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((d, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm font-medium hover:text-[#ebebeb] transition-colors cursor-default" style={{ color: "#707070", fontFamily: "var(--font-body)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-[0_0_8px_#c8c8c8]" style={{ backgroundColor: "#c8c8c8" }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {i === 0 && (
              <div className="absolute bottom-12 right-12 flex items-center gap-3 animate-pulse" style={{ color: "#c8c8c8", fontSize: "12px", letterSpacing: "0.2em", fontWeight: "bold" }}>
                <span>WEITER SCROLLEN</span>
                <svg width="30" height="12" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2">
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

export default ServicesSpherePlus
