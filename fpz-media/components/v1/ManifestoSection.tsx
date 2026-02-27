"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Bebas_Neue, Outfit } from "next/font/google"
import { manifesto } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

function splitToChars(text: string, baseClass: string) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className={`char inline-block ${baseClass}`}
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00a0" : char}
    </span>
  ))
}

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Animate line 1 chars
      if (line1Ref.current) {
        const chars1 = line1Ref.current.querySelectorAll(".char")
        gsap.fromTo(
          chars1,
          { y: 60, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.025,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        )
      }

      // Animate line 2 chars
      if (line2Ref.current) {
        const chars2 = line2Ref.current.querySelectorAll(".char")
        gsap.fromTo(
          chars2,
          { y: 60, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        )
      }

      // Sub text
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#060612" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(96,165,250,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Blue horizontal line accent */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0"
        style={{
          width: "1px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, #60a5fa, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Eyebrow */}
        <p
          className={`${body.className} text-xs tracking-[0.3em] uppercase mb-10`}
          style={{ color: "#60a5fa" }}
        >
          Unser Versprechen
        </p>

        {/* Line 1 — animated chars */}
        <div
          ref={line1Ref}
          className={`${display.className} leading-tight mb-2`}
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            color: "#f0f4ff",
            perspective: "800px",
          }}
          aria-label={manifesto.line1}
        >
          {splitToChars(manifesto.line1, "")}
        </div>

        {/* Line 2 — animated chars, accent color */}
        <div
          ref={line2Ref}
          className={`${display.className} leading-tight mb-12`}
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            color: "#60a5fa",
            textShadow: "0 0 60px rgba(96,165,250,0.4)",
            perspective: "800px",
          }}
          aria-label={manifesto.line2}
        >
          {splitToChars(manifesto.line2, "")}
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className={`${body.className} max-w-2xl mx-auto`}
          style={{ color: "#6b7db3", fontSize: "1.125rem", lineHeight: 1.8 }}
        >
          {manifesto.sub}
        </p>

        {/* Decorative line */}
        <div
          className="mt-16 mx-auto"
          style={{
            width: "60px",
            height: "2px",
            background: "#60a5fa",
            boxShadow: "0 0 20px rgba(96,165,250,0.6)",
          }}
        />
      </div>
    </section>
  )
}
