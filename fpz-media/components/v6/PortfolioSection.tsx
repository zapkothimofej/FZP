"use client"

import { useRef, useCallback } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { portfolioPlaceholders } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const cards = gsap.utils.toArray<HTMLElement>(".v6-portfolio-card")
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    },
    { scope: sectionRef }
  )

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector(".v6-portfolio-inner"), {
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    })
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector(".v6-portfolio-inner"), {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })
  }, [])

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2"
      case "medium":
        return "md:col-span-1 md:row-span-2"
      default:
        return "md:col-span-1 md:row-span-1"
    }
  }

  const getHeight = (size: string) => {
    switch (size) {
      case "large":
        return "min-h-[400px] md:min-h-0"
      case "medium":
        return "min-h-[300px] md:min-h-0"
      default:
        return "min-h-[240px] md:min-h-0"
    }
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-32 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: "#141414" }}
    >
      {/* Header */}
      <div className="mb-16">
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          Selected Work
        </p>
        <h2
          className="font-[family-name:var(--font-display)]"
          style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#ebebeb" }}
        >
          Portfolio
        </h2>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-px bg-[#222222]">
        {portfolioPlaceholders.map((item) => (
          <div
            key={item.id}
            className={`v6-portfolio-card cursor-pointer overflow-hidden ${getSizeClasses(item.size)} ${getHeight(item.size)}`}
            style={{ opacity: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="v6-portfolio-inner w-full h-full flex flex-col justify-end p-8 relative"
              style={{
                backgroundColor: "#0a0a0a",
                minHeight: "inherit",
                height: "100%",
              }}
            >
              {/* Subtle grid pattern placeholder */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, #222222 0, #222222 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #222222 0, #222222 1px, transparent 1px, transparent 40px)",
                  opacity: 0.3,
                }}
              />

              {/* Large placeholder number */}
              <div
                className="absolute top-6 right-8 font-[family-name:var(--font-display)] select-none pointer-events-none"
                style={{
                  fontSize: "clamp(48px, 8vw, 120px)",
                  color: "#c8c8c8",
                  opacity: 0.05,
                  lineHeight: 1,
                }}
                aria-hidden
              >
                {String(item.id).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.12em] uppercase px-2 py-1"
                      style={{
                        border: "1px solid #222222",
                        color: "#707070",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="font-[family-name:var(--font-display)] mb-1"
                  style={{
                    fontSize: "clamp(18px, 2.5vw, 32px)",
                    color: "#ebebeb",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[12px] tracking-[0.08em] uppercase"
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                >
                  {item.industry}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p
        className="mt-12 text-[12px] text-center"
        style={{ color: "#707070", fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}
      >
        Real client work incoming — launching Q1 2025
      </p>
    </section>
  )
}

export default PortfolioSection
