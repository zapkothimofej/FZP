"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { process as processSteps } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return

      // Draw vertical line as user scrolls through the section with a glowing effect
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

      // Extreme reveal for each step
      const steps = gsap.utils.toArray<HTMLElement>(".v6-process-step")
      steps.forEach((step, i) => {
        const dot = step.querySelector(".timeline-dot")
        const content = step.querySelector(".step-content")

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        })

        tl.fromTo(
          dot,
          { scale: 0, opacity: 0, rotation: -180 },
          { scale: 1.5, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" }
        )
          .to(dot, { scale: 1, duration: 0.3, ease: "power2.out" })
          .fromTo(
            content,
            { x: i % 2 === 0 ? 100 : -100, opacity: 0, rotationY: 45, transformPerspective: 500 },
            { x: 0, opacity: 1, rotationY: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-4"
            style={{ color: "#707070", fontFamily: "var(--font-body)" }}
          >
            Wie wir arbeiten
          </p>
          <h2
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#ebebeb" }}
          >
            Der Prozess
          </h2>
        </div>

        {/* Timeline layout */}
        <div className="relative flex">
          {/* Vertical line column */}
          <div
            className="relative flex flex-col items-center mr-12 md:mr-20"
            style={{ width: "2px", minHeight: "100%" }}
          >
            {/* Static background line */}
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{ width: "2px", backgroundColor: "#222222" }}
            />
            {/* Animated glowing line draws over it */}
            <div
              ref={lineRef}
              className="absolute top-0 left-0 shadow-[0_0_15px_#c8c8c8]"
              style={{
                width: "2px",
                height: "100%",
                backgroundColor: "#c8c8c8",
                transformOrigin: "top center",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-32 flex-1 pb-8">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="v6-process-step relative group"
              >
                {/* 3D-look dot on the timeline line */}
                <div
                  className="timeline-dot absolute"
                  style={{
                    left: "-52px",
                    top: "8px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: "#ebebeb",
                    border: "2px solid #0a0a0a",
                    marginLeft: "-7px",
                    boxShadow: "0 0 20px rgba(235, 235, 235, 0.8)",
                  }}
                />

                <div className="step-content">
                  {/* Step label */}
                  <p
                    className="text-[12px] tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-body)] font-bold transition-colors group-hover:text-[#ebebeb]"
                    style={{ color: "#707070" }}
                  >
                    Schritt {item.step}
                  </p>

                  {/* Large ghost number behind title */}
                  <div className="relative">
                    <span
                      className="absolute -left-8 top-[-40px] font-[family-name:var(--font-display)] select-none pointer-events-none leading-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-10 group-hover:text-white"
                      style={{
                        fontSize: "clamp(100px, 15vw, 200px)",
                        color: "#c8c8c8",
                        opacity: 0.03,
                        lineHeight: 1,
                      }}
                      aria-hidden
                    >
                      {item.step}
                    </span>

                    <h3
                      className="relative font-[family-name:var(--font-display)] mb-6 transition-all duration-300 group-hover:translate-x-2"
                      style={{
                        fontSize: "clamp(32px, 5vw, 64px)",
                        color: "#ebebeb",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className="text-lg leading-relaxed max-w-lg transition-all duration-300 group-hover:text-[#c8c8c8]"
                    style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
