"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"
import dynamic from "next/dynamic"
import { services } from "@/lib/content-de"

gsap.registerPlugin(Observer)

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
      if (window.innerWidth < 768) return

      const section = containerRef.current
      const panels = gsap.utils.toArray<HTMLElement>(".v6-service-panel", section)
      if (!panels.length) return

      let currentIndex = 0
      let animating = false
      let locked = false

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

        if (number) gsap.fromTo(number, { x: 80, opacity: 0 }, { x: 0, opacity: 0.03, duration: 1, ease: "power2.out" })
        if (title)  gsap.fromTo(title,  { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.1 })
      }

      const resetPanels = (toIndex: number) => {
        gsap.killTweensOf(panels)
        panels.forEach(p => {
          gsap.killTweensOf(p.querySelector(".bg-number"))
          gsap.killTweensOf(p.querySelector("h2"))
        })
        gsap.set(panels, { xPercent: -100 * toIndex })
        currentIndex = toIndex
        animating = false
      }

      // ── Lock / Unlock ─────────────────────────────────────────────────────────
      // lock():   body.overflow = "hidden" → Seite kann nicht mehr gescrollt werden.
      //           Scrollbalken-Breite wird als padding-right kompensiert (kein Layout-Shift).
      //           Scroll-Position wird auf den Section-Anfang gesetzt.
      //
      // unlock(): stellt alles wieder her und springt per window.scrollTo an die
      //           richtige Position vor/nach der Section.
      // ─────────────────────────────────────────────────────────────────────────

      const lock = (fromBelow: boolean) => {
        if (locked) return
        locked = true
        const sbw = window.innerWidth - document.documentElement.clientWidth
        window.scrollTo(0, section.offsetTop)
        if (sbw > 0) document.body.style.paddingRight = `${sbw}px`
        document.body.style.overflow = "hidden"
        resetPanels(fromBelow ? panels.length - 1 : 0)
        obs.enable()
      }

      const unlock = (forward: boolean) => {
        if (!locked) return
        locked = false
        obs.disable()
        document.body.style.overflow = ""
        document.body.style.paddingRight = ""
        if (forward) {
          window.scrollTo(0, section.offsetTop + section.offsetHeight + 1)
        } else {
          window.scrollTo(0, Math.max(0, section.offsetTop - 1))
        }
      }

      // Observer für Panel-Navigation (läuft nur wenn locked)
      const obs = Observer.create({
        target: window,
        type: "wheel,touch",
        tolerance: 10,
        preventDefault: true,
        onDown: () => {
          if (animating) return
          if (currentIndex < panels.length - 1) goTo(currentIndex + 1)
          else unlock(true)
        },
        onUp: () => {
          if (animating) return
          if (currentIndex > 0) goTo(currentIndex - 1)
          else unlock(false)
        },
      })
      obs.disable()

      // ── Wheel-Fence ───────────────────────────────────────────────────────────
      // passive:false → darf preventDefault() aufrufen, BEVOR der Browser scrollY ändert.
      // Berechnet die geschätzte Scroll-Zielposition und fängt ab, falls sie die
      // Section überspringen würde.
      // ─────────────────────────────────────────────────────────────────────────
      const wheelFence = (e: WheelEvent) => {
        if (locked) return

        const sTop    = section.offsetTop
        const sBottom = section.offsetTop + section.offsetHeight
        const sy      = window.scrollY

        let delta = e.deltaY
        if (e.deltaMode === 1) delta *= 40
        else if (e.deltaMode === 2) delta *= window.innerHeight

        // Abwärts-Scroll würde Section-Oberkante überspringen
        if (delta > 0 && sy < sTop && sy + delta >= sTop) {
          e.preventDefault()
          lock(false)
          return
        }
        // Aufwärts-Scroll würde von unten durch die Section scrollen
        if (delta < 0 && sy >= sBottom - window.innerHeight + 1 && sy + delta < sBottom - window.innerHeight + 1) {
          e.preventDefault()
          lock(true)
        }
      }

      window.addEventListener("wheel", wheelFence, { passive: false })

      return () => {
        obs.kill()
        window.removeEventListener("wheel", wheelFence)
        if (locked) {
          document.body.style.overflow = ""
          document.body.style.paddingRight = ""
        }
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

      {/* ── DESKTOP: body.overflow=hidden statt GSAP-pin ── */}
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
