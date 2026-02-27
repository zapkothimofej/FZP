"use client"

import { motion, type Variants } from "framer-motion"
import { portfolioPlaceholders } from "@/lib/content"

const tagColors: Record<string, string> = {
  Web: "rgba(56,189,248,0.2)",
  Media: "rgba(56,189,248,0.2)",
  Auto: "rgba(56,189,248,0.18)",
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      style={{
        padding: "120px 24px",
        backgroundColor: "#04080f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0ea5e9",
              fontFamily: "var(--font-body, sans-serif)",
              marginBottom: "16px",
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#f0f8ff",
              letterSpacing: "0.03em",
              marginBottom: "16px",
            }}
          >
            Portfolio
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "15px",
              color: "rgba(240,248,255,0.45)",
            }}
          >
            Real projects. Real results. Coming soon.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {portfolioPlaceholders.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              style={{
                position: "relative",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(56,189,248,0.15)",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: item.size === "large" ? "16/10" : item.size === "medium" ? "4/3" : "3/2",
              }}
              whileHover={{
                borderColor: "rgba(56,189,248,0.35)",
              }}
              transition={{ duration: 0.2 }}
              initial="rest"
            >
              {/* Placeholder visual area */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(14,165,233,0.08) 100%)",
                }}
              />

              {/* Ice crystal decoration */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-20px",
                  width: "120px",
                  height: "120px",
                  backgroundColor: "rgba(56,189,248,0.07)",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Coming soon badge */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 12px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(56,189,248,0.18)",
                      borderRadius: "100px",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: "rgba(56,189,248,0.8)",
                        fontFamily: "var(--font-body, sans-serif)",
                        textTransform: "uppercase",
                      }}
                    >
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Bottom info */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "11px",
                      color: "rgba(240,248,255,0.35)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {item.industry}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display, sans-serif)",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#f0f8ff",
                      letterSpacing: "0.03em",
                      marginBottom: "12px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-flex",
                          padding: "3px 10px",
                          backgroundColor:
                            tagColors[tag] ?? "rgba(56,189,248,0.15)",
                          border: "1px solid rgba(56,189,248,0.18)",
                          borderRadius: "100px",
                          fontSize: "11px",
                          color: "#38bdf8",
                          fontFamily: "var(--font-body, sans-serif)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(56,189,248,0.05)",
                  backdropFilter: "blur(0px)",
                  opacity: 0,
                }}
                whileHover={{ opacity: 1, backdropFilter: "blur(2px)" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioSection
