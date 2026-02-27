"use client"

import { motion } from "framer-motion"

export default function HeroContent() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        padding: "0 24px",
        maxWidth: "900px",
      }}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: "12px",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "#f43f5e",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        FPZ Media — Ruhrgebiet
      </motion.p>

      {/* Main headline */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "clamp(52px, 10vw, 120px)",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "#fff0f2",
          lineHeight: 1.0,
          margin: "0 0 24px 0",
          letterSpacing: "-0.02em",
        }}
      >
        Lokal.{" "}
        <span style={{ color: "#f43f5e" }}>Digital.</span>
        <br />
        Komplett.
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          fontFamily: "var(--font-body)",
          color: "#9c6472",
          maxWidth: "560px",
          margin: "0 auto 48px",
          lineHeight: 1.65,
        }}
      >
        Web. Film. Automation. — alles aus einer Hand für lokale Unternehmen im
        Ruhrgebiet.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#contact"
          style={{
            display: "inline-block",
            backgroundColor: "#f43f5e",
            color: "#fff0f2",
            padding: "14px 32px",
            borderRadius: "6px",
            fontSize: "15px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.03em",
            transition: "background-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.backgroundColor = "#e11d48"
            el.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.backgroundColor = "#f43f5e"
            el.style.transform = "translateY(0)"
          }}
        >
          Projekt starten
        </a>
        <a
          href="#services"
          style={{
            display: "inline-block",
            backgroundColor: "transparent",
            color: "#fff0f2",
            padding: "14px 32px",
            borderRadius: "6px",
            fontSize: "15px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.03em",
            border: "1px solid #2d0d14",
            transition: "border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.borderColor = "#f43f5e"
            el.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.borderColor = "#2d0d14"
            el.style.transform = "translateY(0)"
          }}
        >
          Leistungen
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{
            width: "24px",
            height: "38px",
            border: "2px solid #2d0d14",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "8px",
              backgroundColor: "#f43f5e",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
