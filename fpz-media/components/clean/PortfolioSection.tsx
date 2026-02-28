"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { portfolioPlaceholders } from "@/lib/content"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const tagColors: Record<string, string> = {
  Web: "#1d4ed8",
  Media: "#7c3aed",
  Auto: "#0f766e",
}

function PortfolioCard({
  item,
  minHeight = "260px",
}: {
  item: typeof portfolioPlaceholders[0]
  minHeight?: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#253348" : "#1e293b",
        border: hovered ? "1px solid #2dd4bf" : "1px solid #334155",
        borderRadius: "12px",
        minHeight,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
        cursor: "default",
      }}
    >
      {/* Background texture placeholder */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(135deg, rgba(45,212,191,0.04) 0%, transparent 60%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 60%)",
          transition: "background 0.25s ease",
        }}
      />

      {/* Coming Soon badge */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          backgroundColor: "rgba(45,212,191,0.15)",
          border: "1px solid rgba(45,212,191,0.4)",
          color: "#2dd4bf",
          fontSize: "11px",
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: "20px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Coming Soon
      </div>

      {/* Bottom content */}
      <div style={{ position: "relative", marginTop: "auto" }}>
        {/* Industry */}
        <p
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            margin: "0 0 6px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {item.industry}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display, sans-serif)",
            fontSize: "22px",
            fontWeight: 700,
            color: "#f8fafc",
            margin: "0 0 14px",
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </h3>

        {/* Service tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "4px",
                backgroundColor: `${tagColors[tag] ?? "#334155"}30`,
                color: "#94a3b8",
                border: `1px solid ${tagColors[tag] ?? "#334155"}50`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function PortfolioSection() {
  // Row 1: item[0] (large, 2/3) + item[1] (small, 1/3)
  // Row 2: item[2] (small, 1/3) + item[3] (medium, 1/3) + item[4] (small, 1/3)
  // item[5] standalone below
  const [p0, p1, p2, p3, p4, p5] = portfolioPlaceholders

  return (
    <section
      id="portfolio"
      style={{
        backgroundColor: "#0f172a",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "48px" }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#2dd4bf",
            }}
          >
            Portfolio
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#f8fafc",
              margin: "12px 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            Our Work
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "17px", marginTop: "12px" }}>
            Projects incoming. Here&rsquo;s a preview of what&rsquo;s to come.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {/* Row 1: 2/3 + 1/3 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px",
            }}
            className="grid-cols-1 sm:grid-cols-[2fr_1fr]"
          >
            <PortfolioCard item={p0} minHeight="320px" />
            <PortfolioCard item={p1} minHeight="320px" />
          </div>

          {/* Row 2: 1/3 + 1/3 + 1/3 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            <PortfolioCard item={p2} minHeight="240px" />
            <PortfolioCard item={p3} minHeight="240px" />
            <PortfolioCard item={p4} minHeight="240px" />
          </div>

          {/* Row 3: last item full width */}
          {p5 && <PortfolioCard item={p5} minHeight="200px" />}
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioSection
