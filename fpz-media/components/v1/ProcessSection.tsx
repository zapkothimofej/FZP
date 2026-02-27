"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Bebas_Neue, Outfit } from "next/font/google"
import { process } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInnerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current || !lineInnerRef.current) return

      const steps = sectionRef.current.querySelectorAll(".process-step")

      // Draw the timeline line
      gsap.fromTo(
        lineInnerRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      )

      // Each step fades in as the line reaches it
      steps.forEach((step, index) => {
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
              start: "top 75%",
              once: true,
            },
          }
        )

        // Dot pulse animation
        const dot = step.querySelector(".process-dot")
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: step,
                start: "top 78%",
                once: true,
              },
            }
          )
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-32 px-6"
      style={{ background: "#0b0b1f" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <p
            className={`${body.className} text-xs tracking-[0.3em] uppercase mb-4`}
            style={{ color: "#60a5fa" }}
          >
            Wie wir arbeiten
          </p>
          <h2
            className={`${display.className} leading-tight`}
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f0f4ff" }}
          >
            Unser Prozess
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line track */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 bottom-0 w-px overflow-hidden"
            style={{ background: "#1e2a4a" }}
          >
            <div
              ref={lineInnerRef}
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, #60a5fa, #1d4ed8)",
                boxShadow: "0 0 8px rgba(96,165,250,0.6)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {process.map((item, index) => (
              <div
                key={item.step}
                className="process-step relative pl-20 pb-16 last:pb-0"
              >
                {/* Dot on timeline */}
                <div
                  className="process-dot absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "#060612",
                    border: "2px solid #60a5fa",
                    boxShadow: "0 0 20px rgba(96,165,250,0.4)",
                    transform: "translateX(0)",
                    zIndex: 2,
                  }}
                >
                  <span
                    className={`${display.className} text-sm`}
                    style={{ color: "#60a5fa" }}
                  >
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: "#060612",
                    border: "1px solid #1e2a4a",
                  }}
                >
                  <h3
                    className={`${display.className} mb-3`}
                    style={{ fontSize: "1.75rem", color: "#f0f4ff", letterSpacing: "0.05em" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`${body.className} leading-relaxed`}
                    style={{ color: "#6b7db3" }}
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
