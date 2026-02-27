"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/shared/Logo"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(9,4,5,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #2d0d14",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo color="#f43f5e" size="md" />

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "#9c6472",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#fff0f2"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#9c6472"
              }}
              className="hidden md:block"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            style={{
              backgroundColor: "#f43f5e",
              color: "#fff0f2",
              padding: "8px 20px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              textDecoration: "none",
              transition: "background-color 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#e11d48"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#f43f5e"
            }}
          >
            Kontakt
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
