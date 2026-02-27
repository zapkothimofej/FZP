"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/shared/Logo"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(56,189,248,0.15)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/v5" aria-label="FPZ Media home">
          <Logo color="#38bdf8" size="md" />
        </a>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "rgba(240,248,255,0.6)",
                fontSize: "14px",
                letterSpacing: "0.05em",
                textDecoration: "none",
                fontFamily: "var(--font-body, sans-serif)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#38bdf8"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(240,248,255,0.6)"
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 20px",
              border: "1px solid rgba(56,189,248,0.5)",
              borderRadius: "6px",
              backgroundColor: "rgba(56,189,248,0.1)",
              color: "#38bdf8",
              fontSize: "14px",
              letterSpacing: "0.05em",
              textDecoration: "none",
              fontFamily: "var(--font-body, sans-serif)",
              backdropFilter: "blur(8px)",
              transition: "background-color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(56,189,248,0.2)"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(56,189,248,0.75)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(56,189,248,0.1)"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(56,189,248,0.5)"
            }}
          >
            Start a Project
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
