"use client"

import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export function HeroClean() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f172a 0%, #0f1f35 50%, #0f172a 100%)",
        backgroundSize: "200% 200%",
        animation: "klar-hero-bg 8s ease infinite",
      }}
    >
      {/* Radial glow bottom-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,212,191,0.2) 0%, rgba(45,212,191,0.05) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Radial glow top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          width: "100%",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Line 1 */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 400,
              color: "#94a3b8",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            We Build Your
          </motion.p>

          {/* Line 2 */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            Unfair Advantage.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              marginTop: "28px",
              maxWidth: "520px",
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            Full-service digital agency for local businesses in the Ruhrgebiet.
            Web. Film. Automation.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            style={{ display: "flex", gap: "16px", marginTop: "40px", flexWrap: "wrap" }}
          >
            <a
              href="#portfolio"
              style={{
                backgroundColor: "#2dd4bf",
                color: "#0f172a",
                fontSize: "15px",
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-block",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.backgroundColor = "#5eead4")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.backgroundColor = "#2dd4bf")}
            >
              See Our Work
            </a>
            <a
              href="#pricing"
              style={{
                backgroundColor: "transparent",
                color: "#f8fafc",
                fontSize: "15px",
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-block",
                border: "1.5px solid #334155",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.target as HTMLAnchorElement
                el.style.borderColor = "#2dd4bf"
                el.style.color = "#2dd4bf"
              }}
              onMouseLeave={(e) => {
                const el = e.target as HTMLAnchorElement
                el.style.borderColor = "#334155"
                el.style.color = "#f8fafc"
              }}
            >
              View Pricing
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Horizontal rule below hero */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#334155",
        }}
      />
    </section>
  )
}

export default HeroClean
