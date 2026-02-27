"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { services } from "@/lib/content"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={rowVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid #334155",
        padding: "48px 0",
        display: "grid",
        gridTemplateColumns: "120px 1fr 1fr",
        gap: "40px",
        alignItems: "start",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Teal grow line on hover */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          backgroundColor: "#2dd4bf",
          width: hovered ? "100%" : "0%",
          transition: "width 0.4s ease",
        }}
      />

      {/* Number */}
      <div
        style={{
          fontFamily: "var(--font-display, sans-serif)",
          fontSize: "80px",
          fontWeight: 800,
          color: hovered ? "#2dd4bf" : "#334155",
          lineHeight: 1,
          transition: "color 0.3s ease, text-shadow 0.3s ease",
          userSelect: "none",
          textShadow: hovered ? "0 0 30px rgba(45,212,191,0.6)" : "none",
        }}
      >
        {service.number}
      </div>

      {/* Heading + description */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display, sans-serif)",
            fontSize: "32px",
            fontWeight: 700,
            color: "#f8fafc",
            margin: "0 0 12px",
            letterSpacing: "-0.01em",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontSize: "17px",
            color: "#94a3b8",
            lineHeight: 1.65,
            maxWidth: "420px",
            margin: 0,
          }}
        >
          {service.description}
        </p>
      </div>

      {/* Deliverables */}
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
        {service.deliverables.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              color: "#94a3b8",
            }}
          >
            <span
              aria-hidden
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#2dd4bf",
                flexShrink: 0,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: "#0f172a",
        padding: "0 24px 96px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "16px" }}
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
            Services
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
            What We Do
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid #334155" }} />
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
