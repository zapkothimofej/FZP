"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { process as processSteps } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return

      // Draw vertical line as user scrolls through the section
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
            scrub: 1,
          },
        }
      )

      // Each step slides in from right
      const steps = gsap.utils.toArray<HTMLElement>(".v6-process-step")
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--v6-bg)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
          >
            How We Work
          </p>
          <h2
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "var(--v6-text)" }}
          >
            The Process
          </h2>
        </div>

        {/* Timeline layout */}
        <div className="relative flex">
          {/* Vertical line column */}
          <div
            className="relative flex flex-col items-center mr-12 md:mr-20"
            style={{ width: "1px", minHeight: "100%" }}
          >
            {/* Static background line */}
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{ width: "1px", backgroundColor: "var(--v6-border)" }}
            />
            {/* Animated platinum line draws over it */}
            <div
              ref={lineRef}
              className="absolute top-0 left-0"
              style={{
                width: "1px",
                height: "100%",
                backgroundColor: "var(--v6-accent)",
                transformOrigin: "top center",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-24 flex-1 pb-8">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="v6-process-step relative"
                style={{ opacity: 0 }}
              >
                {/* 3D-look dot on the timeline line — CSS radial shadow depth effect */}
                <div
                  className="absolute"
                  style={{
                    left: "-52px",
                    top: "8px",
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    backgroundColor: "var(--v6-accent)",
                    border: "2px solid var(--v6-bg)",
                    outline: "1px solid var(--v6-accent)",
                    marginLeft: "-6px",
                    boxShadow: "var(--v6-shadow-step)",
                  }}
                />

                {/* Step label */}
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-3 font-[family-name:var(--font-body)]"
                  style={{ color: "var(--v6-text-muted)" }}
                >
                  Step {item.step}
                </p>

                {/* Large ghost number behind title */}
                <div className="relative">
                  <span
                    className="absolute -left-4 top-0 font-[family-name:var(--font-display)] select-none pointer-events-none leading-none"
                    style={{
                      fontSize: "clamp(80px, 12vw, 160px)",
                      color: "var(--v6-accent)",
                      opacity: 0.05,
                      lineHeight: 1,
                    }}
                    aria-hidden
                  >
                    {item.step}
                  </span>

                  <h3
                    className="relative font-[family-name:var(--font-display)] mb-4"
                    style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      color: "var(--v6-text)",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className="text-base leading-relaxed max-w-lg"
                  style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
