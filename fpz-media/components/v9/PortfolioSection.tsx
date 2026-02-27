"use client"

import { useRef, useCallback } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { portfolioPlaceholders } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const cards = gsap.utils.toArray<HTMLElement>(".v6-portfolio-card")
      
      // Staggered 3D reveal
      gsap.fromTo(
        cards,
        { y: 150, opacity: 0, rotationX: 45, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )
    },
    { scope: sectionRef }
  )

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const inner = e.currentTarget.querySelector(".v6-portfolio-inner")
    const num = e.currentTarget.querySelector(".portfolio-num")
    const img = e.currentTarget.querySelector(".portfolio-bg")

    gsap.to(inner, {
      scale: 0.95,
      duration: 0.4,
      ease: "power2.out",
    })
    
    gsap.to(num, {
      scale: 1.5,
      x: -20,
      opacity: 0.2,
      duration: 0.4,
      ease: "power2.out",
    })

    gsap.to(img, {
      opacity: 0.5,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
    })
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const inner = e.currentTarget.querySelector(".v6-portfolio-inner")
    const num = e.currentTarget.querySelector(".portfolio-num")
    const img = e.currentTarget.querySelector(".portfolio-bg")

    gsap.to(inner, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })

    gsap.to(num, {
      scale: 1,
      x: 0,
      opacity: 0.05,
      duration: 0.4,
      ease: "power2.out",
    })

    gsap.to(img, {
      opacity: 0,
      scale: 1,
      duration: 0.5,
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
      className="py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "#141414" }}
    >
      {/* Header */}
      <div className="mb-16">
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "#707070", fontFamily: "var(--font-body)" }}
        >
          Ausgewählte Arbeiten
        </p>
        <h2
          className="font-[family-name:var(--font-display)]"
          style={{ fontSize: "clamp(40px, 8vw, 100px)", color: "#ebebeb" }}
        >
          Portfolio
        </h2>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4" style={{ perspective: "1000px" }}>
        {portfolioPlaceholders.map((item) => (
          <div
            key={item.id}
            className={`v6-portfolio-card cursor-pointer ${getSizeClasses(item.size)} ${getHeight(item.size)}`}
            style={{ opacity: 0, transformStyle: "preserve-3d" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="v6-portfolio-inner w-full h-full flex flex-col justify-end p-8 relative overflow-hidden rounded-xl border border-[#333] hover:border-[#ebebeb] transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: "#0a0a0a",
                minHeight: "inherit",
                height: "100%",
              }}
            >
              {/* Animated abstract background on hover */}
              <div 
                className="portfolio-bg absolute inset-0 opacity-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${Math.random()*100}% ${Math.random()*100}%, rgba(200,200,200,0.2) 0%, transparent 60%)`
                }}
              />

              {/* Subtle grid pattern placeholder */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, #222222 0, #222222 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #222222 0, #222222 1px, transparent 1px, transparent 40px)",
                  opacity: 0.1,
                }}
              />

              {/* Large placeholder number */}
              <div
                className="portfolio-num absolute top-6 right-8 font-[family-name:var(--font-display)] select-none pointer-events-none"
                style={{
                  fontSize: "clamp(60px, 10vw, 160px)",
                  color: "#c8c8c8",
                  opacity: 0.05,
                  lineHeight: 1,
                  transformOrigin: "top right"
                }}
                aria-hidden
              >
                {String(item.id).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.12em] uppercase px-3 py-1 rounded-full bg-[#222]"
                      style={{
                        color: "#ebebeb",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="font-[family-name:var(--font-display)] mb-2"
                  style={{
                    fontSize: "clamp(24px, 3vw, 40px)",
                    color: "#ebebeb",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[12px] tracking-[0.1em] uppercase"
                  style={{ color: "#c8c8c8", fontFamily: "var(--font-body)", fontWeight: 600 }}
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
        className="mt-16 text-[14px] text-center uppercase tracking-[0.2em] font-bold"
        style={{ color: "#707070", fontFamily: "var(--font-body)" }}
      >
        Echte Kundenprojekte in Arbeit — Launch Q1 2025
      </p>
    </section>
  )
}

export default PortfolioSection
