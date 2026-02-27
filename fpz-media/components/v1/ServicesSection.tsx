"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Bebas_Neue, Outfit } from "next/font/google"
import { services } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

const serviceIcons: Record<string, React.ReactNode> = {
  Monitor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  Camera: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Zap: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!cardsRef.current) return

      const cards = cardsRef.current.querySelectorAll(".service-card")

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            once: true,
          },
        }
      )

      // Animate deliverable items per card
      cards.forEach((card) => {
        const items = card.querySelectorAll(".deliverable-item")
        gsap.fromTo(
          items,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
          }
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 px-6"
      style={{ background: "#060612" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <p
            className={`${body.className} text-xs tracking-[0.3em] uppercase mb-4`}
            style={{ color: "#60a5fa" }}
          >
            Leistungen
          </p>
          <h2
            className={`${display.className} leading-tight`}
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f0f4ff" }}
          >
            Was wir für dich bauen
          </h2>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card relative group flex flex-col p-8 rounded-xl overflow-hidden"
              style={{
                background: "#0b0b1f",
                border: "1px solid #1e2a4a",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "#60a5fa"
                el.style.boxShadow = "0 0 40px rgba(96,165,250,0.1)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "#1e2a4a"
                el.style.boxShadow = "none"
              }}
            >
              {/* Service number — large corner */}
              <span
                className={`${display.className} absolute top-6 right-8 select-none`}
                style={{
                  fontSize: "5rem",
                  lineHeight: 1,
                  color: "#1e2a4a",
                  letterSpacing: "-0.02em",
                }}
              >
                {service.number}
              </span>

              {/* Icon */}
              <div
                className="mb-6 w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(96,165,250,0.1)",
                  color: "#60a5fa",
                  border: "1px solid rgba(96,165,250,0.2)",
                }}
              >
                {serviceIcons[service.icon]}
              </div>

              {/* Title */}
              <h3
                className={`${display.className} mb-2`}
                style={{ fontSize: "1.75rem", color: "#f0f4ff", letterSpacing: "0.05em" }}
              >
                {service.title}
              </h3>

              {/* Headline */}
              <p
                className={`${body.className} text-sm mb-4`}
                style={{ color: "#60a5fa" }}
              >
                {service.headline}
              </p>

              {/* Description */}
              <p
                className={`${body.className} text-sm mb-8 leading-relaxed`}
                style={{ color: "#6b7db3" }}
              >
                {service.description}
              </p>

              {/* Deliverables */}
              <ul className="mt-auto flex flex-col gap-2.5">
                {service.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className={`${body.className} deliverable-item flex items-center gap-2.5 text-sm`}
                    style={{ color: "#f0f4ff" }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(96,165,250,0.15)" }}
                    >
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
