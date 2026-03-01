"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { process as processSteps } from "@/lib/content-de"
import { CSSphere } from "./CSSphere"

gsap.registerPlugin(ScrollTrigger)

export function ProcessSpherePlus() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return

      // Draw vertical timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1.5,
          },
        }
      )

      const steps = gsap.utils.toArray<HTMLElement>(".v6sp-process-step")
      steps.forEach((step, i) => {
        const dot = step.querySelector(".timeline-dot")
        const content = step.querySelector(".step-content")
        const orb = step.querySelector(".step-orb")

        const tl = gsap.timeline({
          scrollTrigger: { trigger: step, start: "top 75%", toggleActions: "play reverse play reverse" },
        })

        tl.fromTo(dot, { scale: 0, opacity: 0, rotation: -180 }, { scale: 1.5, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" })
          .to(dot, { scale: 1, duration: 0.3, ease: "power2.out" })
          .fromTo(
            content,
            { x: i % 2 === 0 ? 100 : -100, opacity: 0, rotationY: 45, transformPerspective: 500 },
            { x: 0, opacity: 1, rotationY: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            orb,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
            "-=0.5"
          )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Large ambient sphere — top right corner */}
      <div
        aria-hidden
        style={{ position: "absolute", top: "-10%", right: "-5%", pointerEvents: "none", zIndex: 0 }}
      >
        <CSSphere size={380} opacity={0.06} glow animate="float" style={{ "--cssphere-dur": "15s" } as React.CSSProperties} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20 flex items-center gap-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: "#707070", fontFamily: "var(--font-body)" }}>
              Wie wir arbeiten
            </p>
            <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#ebebeb" }}>
              Der Prozess
            </h2>
          </div>
          {/* Header sphere accent */}
          <div aria-hidden style={{ marginLeft: "auto", opacity: 0.35 }}>
            <CSSphere size={56} glow animate="float" style={{ "--cssphere-dur": "8s" } as React.CSSProperties} />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative flex">
          {/* Vertical line */}
          <div className="relative flex flex-col items-center mr-12 md:mr-20" style={{ width: "2px", minHeight: "100%" }}>
            <div className="absolute top-0 bottom-0 left-0" style={{ width: "2px", backgroundColor: "#222222" }} />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 shadow-[0_0_15px_#c8c8c8]"
              style={{ width: "2px", height: "100%", backgroundColor: "#c8c8c8", transformOrigin: "top center", transform: "scaleY(0)" }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-32 flex-1 pb-8">
            {processSteps.map((item, i) => (
              <div key={item.step} className="v6sp-process-step relative group">
                {/* Timeline dot — chrome sphere style */}
                <div
                  className="timeline-dot absolute"
                  style={{
                    left: "-52px",
                    top: "8px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 35% 35%, #fff 0%, #d0d0d0 25%, #888 55%, #333 85%)",
                    border: "2px solid #0a0a0a",
                    marginLeft: "-7px",
                    boxShadow: "0 0 20px rgba(235,235,235,0.8)",
                  }}
                />

                <div className="step-content flex items-start gap-8">
                  <div className="flex-1">
                    <p className="text-[12px] tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-body)] font-bold transition-colors group-hover:text-[#ebebeb]" style={{ color: "#707070" }}>
                      Schritt {item.step}
                    </p>

                    <div className="relative">
                      <span
                        className="absolute -left-8 top-[-40px] font-[family-name:var(--font-display)] select-none pointer-events-none leading-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-10 group-hover:text-white"
                        style={{ fontSize: "clamp(100px, 15vw, 200px)", color: "#c8c8c8", opacity: 0.03, lineHeight: 1 }}
                        aria-hidden
                      >
                        {item.step}
                      </span>
                      <h3
                        className="relative font-[family-name:var(--font-display)] mb-6 transition-all duration-300 group-hover:translate-x-2"
                        style={{ fontSize: "clamp(32px, 5vw, 64px)", color: "#ebebeb" }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-lg leading-relaxed max-w-lg transition-all duration-300 group-hover:text-[#c8c8c8]" style={{ color: "#707070", fontFamily: "var(--font-body)" }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Per-step sphere orb */}
                  <div
                    className="step-orb flex-shrink-0 self-center opacity-0"
                    aria-hidden
                    style={{ marginTop: "-8px" }}
                  >
                    <CSSphere
                      size={i === 0 ? 64 : i === 1 ? 48 : 56}
                      opacity={0.45}
                      glow={i === 1}
                      animate="float"
                      style={{
                        "--cssphere-dur": `${8 + i * 2}s`,
                        "--cssphere-delay": `${i * 0.5}s`,
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSpherePlus
