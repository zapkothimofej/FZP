"use client"

import { motion, useAnimate } from "framer-motion"
import { useState } from "react"
import { portfolioPlaceholders } from "@/lib/content"

const sizeToSpan: Record<string, string> = {
  large: "md:col-span-2",
  medium: "md:col-span-1",
  small: "md:col-span-1",
}

const sizeToHeight: Record<string, string> = {
  large: "280px",
  medium: "220px",
  small: "180px",
}

export default function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section
      id="portfolio"
      style={{
        backgroundColor: "#130609",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#f43f5e",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Projekte
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff0f2",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Unsere Arbeit
          </h2>
        </motion.div>

        {/* Portfolio grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        >
          {portfolioPlaceholders.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              animate={{
                opacity:
                  hoveredId === null || hoveredId === item.id ? 1 : 0.3,
              }}
              className={sizeToSpan[item.size] ?? ""}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                minHeight: sizeToHeight[item.size] ?? "200px",
                backgroundColor: "#090405",
                border: "1px solid #2d0d14",
                transition: "opacity 0.3s",
              }}
            >
              {/* Placeholder gradient background */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, #130609 0%, #1a0509 50%, #0d0305 100%)`,
                }}
              />

              {/* Grid pattern overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(244,63,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Crimson corner accent on hover */}
              {hoveredId === item.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "48px",
                    height: "48px",
                    borderTop: "3px solid #f43f5e",
                    borderRight: "3px solid #f43f5e",
                    borderTopRightRadius: "10px",
                  }}
                />
              )}
              {hoveredId === item.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "48px",
                    height: "48px",
                    borderBottom: "3px solid #f43f5e",
                    borderLeft: "3px solid #f43f5e",
                    borderBottomLeftRadius: "10px",
                  }}
                />
              )}

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                {/* Tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "10px",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        color: "#f43f5e",
                        backgroundColor: "rgba(244,63,94,0.12)",
                        border: "1px solid rgba(244,63,94,0.25)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#fff0f2",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>

                {/* Industry */}
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-body)",
                    color: "#9c6472",
                    margin: 0,
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.industry}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
