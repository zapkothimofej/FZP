"use client"

import { motion } from "framer-motion"
import { portfolioPlaceholders } from "@/lib/content"

const tagColors: Record<string, string> = {
  Web: "#c9a84c",
  Media: "#b8943a",
  Auto: "#e8d5a3",
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-28 px-6" style={{ backgroundColor: "#090909" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#c9a84c" }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
            >
              Our Work
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
          >
            Portfolio
          </h2>
        </motion.div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioPlaceholders.map((item, i) => {
            const isLarge = item.size === "large"
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.02 }}
                className={`group relative rounded-sm overflow-hidden cursor-pointer ${isLarge ? "sm:col-span-2 lg:col-span-1" : ""}`}
                style={{
                  border: "1px solid #1a1a10",
                  backgroundColor: "#111108",
                  minHeight: isLarge ? 320 : 220,
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a10"
                }}
              >
                {/* Placeholder background pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at ${30 + i * 10}% ${40 + i * 8}%, rgba(201,168,76,0.06) 0%, transparent 60%)`,
                  }}
                />

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Hover gold border glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 40px rgba(201,168,76,0.06)",
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div
                    className="h-px w-full mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: "linear-gradient(to right, #c9a84c, transparent)",
                    }}
                  />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          color: tagColors[tag] ?? "#c9a84c",
                          border: `1px solid ${tagColors[tag] ?? "#c9a84c"}40`,
                          backgroundColor: `${tagColors[tag] ?? "#c9a84c"}10`,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                  >
                    {item.industry}
                  </p>
                </div>

                {/* Industry number */}
                <div
                  className="absolute top-4 right-4 text-6xl font-black opacity-5 select-none"
                  style={{ fontFamily: "var(--font-display)", color: "#c9a84c" }}
                >
                  {String(item.id).padStart(2, "0")}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
