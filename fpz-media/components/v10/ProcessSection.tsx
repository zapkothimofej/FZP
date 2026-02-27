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

      // Extreme reveal for each step (Light Theme)
      const steps = gsap.utils.toArray<HTMLElement>(".v10-process-step")
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
            { x: i % 2 === 0 ? 150 : -150, opacity: 0, rotationY: i % 2 === 0 ? 45 : -45, transformPerspective: 1000 },
            { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
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
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p
            className="text-[12px] tracking-[0.3em] font-bold uppercase mb-4"
            style={{ color: "#707070", fontFamily: "var(--font-body)" }}
          >
            Wie wir arbeiten
          </p>
          <h2
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "clamp(40px, 8vw, 90px)", color: "#0a0a0a" }}
          >
            Der Prozess
          </h2>
        </div>

        {/* Timeline layout */}
        <div className="relative flex">
          {/* Vertical line column */}
          <div
            className="relative flex flex-col items-center mr-12 md:mr-24"
            style={{ width: "3px", minHeight: "100%" }}
          >
            {/* Static background line */}
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{ width: "3px", backgroundColor: "#f0f0f0" }}
            />
            {/* Animated bright line draws over it */}
            <div
              ref={lineRef}
              className="absolute top-0 left-0 shadow-[0_0_15px_#0a0a0a]"
              style={{
                width: "3px",
                height: "100%",
                backgroundColor: "#0a0a0a",
                transformOrigin: "top center",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-32 flex-1 pb-16">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="v10-process-step relative group"
              >
                {/* 3D-look dot on the timeline line */}
                <div
                  className="timeline-dot absolute"
                  style={{
                    left: "-54px", // Adjusted for thicker line
                    top: "12px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#0a0a0a",
                    border: "4px solid #ffffff",
                    marginLeft: "-10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                  }}
                />

                <div className="step-content bg-[#fafafa] p-10 rounded-2xl border border-[#e0e0e0] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 relative overflow-hidden">
                  
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-[#0a0a0a] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0" />

                  <div className="relative z-10">
                    {/* Step label */}
                    <p
                      className="text-[13px] tracking-[0.2em] uppercase mb-4 font-[family-name:var(--font-body)] font-extrabold transition-colors group-hover:text-[#ffffff]"
                      style={{ color: "#707070" }}
                    >
                      Schritt {item.step}
                    </p>

                    <h3
                      className="relative font-[family-name:var(--font-display)] mb-6 transition-colors duration-300 group-hover:text-[#ffffff]"
                      style={{
                        fontSize: "clamp(32px, 5vw, 56px)",
                        color: "#0a0a0a",
                        lineHeight: 1.1,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="text-lg leading-relaxed max-w-lg font-medium transition-colors duration-300 group-hover:text-[#e0e0e0]"
                      style={{ color: "#555", fontFamily: "var(--font-body)" }}
                    >
                      {item.description}
                    </p>
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

export default ProcessSection
