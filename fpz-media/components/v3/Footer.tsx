"use client"

import { Logo } from "@/components/shared/Logo"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: "#090405",
        borderTop: "1px solid #2d0d14",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <Logo color="#f43f5e" size="md" />

        {/* Links */}
        <div style={{ display: "flex", gap: "32px" }}>
          {[
            { label: "Impressum", href: "/impressum" },
            { label: "Datenschutz", href: "/datenschutz" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "13px",
                fontFamily: "var(--font-body)",
                color: "#9c6472",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#f43f5e"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#9c6472"
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "13px",
            fontFamily: "var(--font-body)",
            color: "#9c6472",
            margin: 0,
          }}
        >
          &copy; {year} FPZ Media. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}
