"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { manifesto } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Label fades in first
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      // Words slide up from behind their overflow-hidden containers — staggered
      gsap.to(".manifesto-word", {
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      })

      // Line draws in from left
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Sub-text fades in last
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  // Splits text into per-word animated spans.
  // Words at translateY(105%) start invisible behind overflow:hidden, GSAP animates to y:0
  const renderWords = (text: string) =>
    text.split(" ").map((word, i, arr) => {
      const isHighlight = word === "unfairen"
      return (
        <React.Fragment key={i}>
          {/* Outer span: clips overflowing content + optional rotation for highlight */}
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              ...(isHighlight ? { transform: "rotate(-2deg)" } : {}),
            }}
          >
            {/* Inner span: GSAP animates this from y:105% to y:0 */}
            <span
              className="manifesto-word"
              style={{
                display: "inline-block",
                transform: "translateY(105%)",
                ...(isHighlight
                  ? {
                      color: "var(--v6-text-on-accent)",
                      backgroundColor: "var(--v6-accent)",
                      padding: "0 12px",
                    }
                  : {}),
              }}
            >
              {word}
            </span>
          </span>
          {/* Space between words, outside the overflow-hidden container */}
          {i < arr.length - 1 && "\u00A0"}
        </React.Fragment>
      )
    })

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "var(--v6-bg)" }}
      id="manifesto"
    >
      <div className="max-w-6xl z-10 relative">
        <p
          ref={labelRef}
          className="text-[11px] tracking-[0.2em] uppercase mb-10"
          style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)", opacity: 0 }}
        >
          Unser Manifest
        </p>

        <div
          className="font-[family-name:var(--font-display)]"
          style={{ lineHeight: 1.05, fontSize: "clamp(40px, 6vw, 96px)" }}
        >
          <div>{renderWords(manifesto.line1)}</div>
          <div className="mt-2">{renderWords(manifesto.line2)}</div>
        </div>

        <div
          ref={lineRef}
          className="mt-12"
          style={{
            height: "1px",
            backgroundColor: "var(--v6-accent)",
            width: "100%",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />

        <p
          ref={subRef}
          className="mt-8 text-base leading-relaxed max-w-lg"
          style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)", opacity: 0 }}
        >
          {manifesto.sub}
        </p>
      </div>
    </section>
  )
}

export default ManifestoSection
