"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bebas_Neue, Outfit } from "next/font/google"
import { portfolioPlaceholders } from "@/lib/content"

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

const tagColors: Record<string, string> = {
  Web: "#60a5fa",
  Media: "#818cf8",
  Auto: "#34d399",
}

export default function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section
      id="portfolio"
      className="py-32 px-6"
      style={{ background: "#060612" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p
              className={`${body.className} text-xs tracking-[0.3em] uppercase mb-4`}
              style={{ color: "#60a5fa" }}
            >
              Portfolio
            </p>
            <h2
              className={`${display.className} leading-tight`}
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f0f4ff" }}
            >
              Unsere Projekte
            </h2>
          </div>
          <p
            className={`${body.className} max-w-xs`}
            style={{ color: "#6b7db3", fontSize: "0.9rem" }}
          >
            Echte Ergebnisse für lokale Unternehmen aus dem Ruhrgebiet.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioPlaceholders.map((project) => {
            const isHovered = hoveredId === project.id
            const isDimmed = hoveredId !== null && !isHovered

            return (
              <motion.div
                key={project.id}
                className="relative rounded-xl overflow-hidden cursor-pointer"
                style={{
                  aspectRatio: project.size === "large" ? "4/3" : project.size === "medium" ? "3/2" : "16/10",
                  gridColumn: project.size === "large" ? "span 1" : "span 1",
                  border: "1px solid #1e2a4a",
                  background: "#0b0b1f",
                }}
                animate={{
                  scale: isHovered ? 1.03 : 1,
                  opacity: isDimmed ? 0.6 : 1,
                  borderColor: isHovered ? "#60a5fa" : "#1e2a4a",
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                {/* Placeholder background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at ${
                      project.id % 2 === 0 ? "70% 30%" : "30% 70%"
                    }, rgba(96,165,250,0.06) 0%, transparent 60%)`,
                  }}
                />

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(96,165,250,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(96,165,250,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Blue glow on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(96,165,250,0.08) 0%, transparent 70%)",
                    boxShadow: "inset 0 0 40px rgba(96,165,250,0.1)",
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Tags */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`${body.className} text-xs px-2.5 py-0.5 rounded-full font-medium`}
                        style={{
                          background: `${tagColors[tag] ?? "#60a5fa"}18`,
                          color: tagColors[tag] ?? "#60a5fa",
                          border: `1px solid ${tagColors[tag] ?? "#60a5fa"}40`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className={`${display.className} mb-1`}
                    style={{ fontSize: "1.5rem", color: "#f0f4ff", letterSpacing: "0.05em" }}
                  >
                    {project.title}
                  </h3>

                  {/* Industry */}
                  <p
                    className={`${body.className} text-xs`}
                    style={{ color: "#6b7db3" }}
                  >
                    {project.industry}
                  </p>
                </div>

                {/* Corner arrow on hover */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "#60a5fa", color: "#060612" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className={`${body.className} inline-flex items-center gap-2 text-sm`}
            style={{ color: "#60a5fa" }}
          >
            Dein Projekt könnte hier stehen
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
