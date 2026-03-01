"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import dynamic from "next/dynamic"
import { services } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

const WireframeIcon = dynamic(
  () => import("@/components/chrom/WireframeIcon").then((m) => m.WireframeIcon),
  { ssr: false }
)

const PANEL_ICONS: Array<"cube" | "sphere" | "torus"> = ["cube", "sphere", "torus"]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return
      // Kein GSAP auf Mobile — CSS zeigt dort die vertikalen Karten
      if (window.innerWidth < 768) return

      ScrollTrigger.normalizeScroll(true)

      const panels = gsap.utils.toArray<HTMLElement>(".v6-service-panel")
      if (panels.length === 0) return

      let currentIndex = 0
      let animating = false
      let isActive   = false
      let exiting    = false

      const goTo = (index: number) => {
        if (animating) return
        animating = true
        currentIndex = index

        gsap.killTweensOf(panels)
        gsap.to(panels, {
          xPercent: -100 * index,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => { animating = false },
        })

        const panel  = panels[index]
        const number = panel?.querySelector<HTMLElement>(".bg-number")
        const title  = panel?.querySelector<HTMLElement>("h2")

        if (number) {
          gsap.fromTo(number,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 0.03, duration: 1, ease: "power2.out" }
          )
        }
        if (title) {
          gsap.fromTo(title,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.1 }
          )
        }
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        anticipatePin: 1,
        start: "top top",
        end: () => "+=" + (panels.length - 1) * window.innerHeight * 15,
        onEnter: () => {
          gsap.killTweensOf(panels)
          panels.forEach(p => {
            gsap.killTweensOf(p.querySelector(".bg-number"))
            gsap.killTweensOf(p.querySelector("h2"))
          })
          gsap.set(panels, { xPercent: 0 })
          currentIndex = 0
          isActive = true
          exiting  = false
          animating = false
        },
        onEnterBack: () => {
          gsap.killTweensOf(panels)
          panels.forEach(p => {
            gsap.killTweensOf(p.querySelector(".bg-number"))
            gsap.killTweensOf(p.querySelector("h2"))
          })
          gsap.set(panels, { xPercent: -100 * (panels.length - 1) })
          currentIndex = panels.length - 1
          isActive = true
          exiting  = false
          animating = false
        },
        onLeave:     () => { isActive = false },
        onLeaveBack: () => { isActive = false },
        invalidateOnRefresh: true,
      })

      const onWheel = (e: WheelEvent) => {
        if (!isActive) return
        e.preventDefault()

        if (exiting || animating && (
          (e.deltaY > 0 && currentIndex === panels.length - 1) ||
          (e.deltaY < 0 && currentIndex === 0)
        )) return

        const forward = e.deltaY > 0

        if (forward) {
          if (currentIndex < panels.length - 1) {
            goTo(currentIndex + 1)
          } else {
            exiting = true
            window.scrollTo(0, st.end + 10)
          }
        } else {
          if (currentIndex > 0) {
            goTo(currentIndex - 1)
          } else {
            exiting = true
            window.scrollTo(0, Math.max(0, st.start - 10))
          }
        }
      }

      window.addEventListener("wheel", onWheel, { passive: false })

      return () => {
        window.removeEventListener("wheel", onWheel)
        st.kill()
      }
    },
    { scope: containerRef }
  )

  return (
    <section id="services" ref={containerRef} style={{ overflow: "hidden" }}>

      {/* ── MOBILE: vertikale Karten — nur auf < 768px sichtbar via CSS ── */}
      <div className="block md:hidden" style={{ backgroundColor: "#141414" }}>
        <div style={{ padding: "64px 24px 32px" }}>
          <p style={{
            color: "#707070", fontSize: "11px", letterSpacing: "0.2em",
            textTransform: "uppercase", fontFamily: "var(--font-body)",
          }}>
            Unsere Leistungen
          </p>
        </div>

        {services.map((service, i) => (
          <div
            key={service.id}
            style={{
              backgroundColor: i % 2 === 0 ? "#141414" : "#0f0f0f",
              borderTop: "1px solid #333",
              padding: "40px 24px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ghost-Nummer im Hintergrund */}
            <div aria-hidden style={{
              position: "absolute", top: "-10%", right: "-5%",
              fontSize: "clamp(120px, 40vw, 240px)",
              color: "#c8c8c8", opacity: 0.04, lineHeight: 0.85,
              fontFamily: "var(--font-display)", pointerEvents: "none", userSelect: "none",
            }}>
              {service.number}
            </div>

            <p style={{ fontSize: "13px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: "bold", color: "#ebebeb", fontFamily: "var(--font-body)", marginBottom: "20px" }}>
              {service.number} / {String(services.length).padStart(2, "0")}
            </p>

            <h2 style={{ fontSize: "clamp(42px, 11vw, 80px)", color: "#ebebeb", lineHeight: 0.9, fontFamily: "var(--font-display)", letterSpacing: "-0.02em", marginBottom: "20px" }}>
              {service.title}
            </h2>

            <p style={{ fontSize: "clamp(18px, 5vw, 22px)", color: "#c8c8c8", fontFamily: "var(--font-display)", fontStyle: "italic", marginBottom: "16px" }}>
              {service.headline}
            </p>

            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#a0a0a0", fontFamily: "var(--font-body)", marginBottom: "28px" }}>
              {service.description}
            </p>

            <div style={{ height: "1px", backgroundColor: "#333", marginBottom: "20px" }} />

            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {service.deliverables.map((d, j) => (
                <li key={j} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#707070", fontFamily: "var(--font-body)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#c8c8c8", flexShrink: 0, boxShadow: "0 0 8px #c8c8c8" }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: originaler GSAP Horizontal-Scroll — nur auf >= 768px sichtbar ── */}
      <div className="hidden md:block relative">
        <div className="absolute top-8 left-16 lg:left-24 z-10 pointer-events-none" aria-hidden>
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#707070", fontFamily: "var(--font-body)" }}>
            Unsere Leistungen — Scroll
          </p>
        </div>

        <div ref={trackRef} className="flex h-screen" style={{ width: `${services.length * 100}vw` }}>
          {services.map((service, i) => (
            <div
              key={service.id}
              className="v6-service-panel relative flex flex-col justify-end overflow-hidden"
              style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: i % 2 === 0 ? "#141414" : "#0f0f0f",
                borderRight: i < services.length - 1 ? "1px solid #333" : "none",
                flexShrink: 0,
              }}
            >
              <div
                className="bg-number absolute top-[-5%] right-[-5%] select-none pointer-events-none font-[family-name:var(--font-display)] leading-none z-0"
                aria-hidden
                style={{ fontSize: "clamp(250px, 45vw, 600px)", color: "#c8c8c8", opacity: 0.03, lineHeight: 0.85, paddingRight: "2rem", textShadow: "0 0 50px rgba(200,200,200,0.1)" }}
              >
                {service.number}
              </div>

              <div className="absolute top-12 right-12 z-0 opacity-50 mix-blend-screen scale-150" aria-hidden>
                <WireframeIcon type={PANEL_ICONS[i % PANEL_ICONS.length]} />
              </div>

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
                <ul className="grid grid-cols-2 gap-4">
                  {service.deliverables.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-4 text-sm font-medium hover:text-[#ebebeb] transition-colors cursor-default"
                      style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                    >
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
      </div>

    </section>
  )
}

export default ServicesSection
