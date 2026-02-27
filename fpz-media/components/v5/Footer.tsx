"use client"

import { Logo } from "@/components/shared/Logo"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
]

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#04080f",
        borderTop: "1px solid rgba(56,189,248,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Frosted glass band */}
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "56px 24px 40px",
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "40px",
              marginBottom: "48px",
            }}
          >
            {/* Logo + tagline */}
            <div>
              <Logo color="#38bdf8" size="md" />
              <p
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "13px",
                  color: "rgba(240,248,255,0.35)",
                  marginTop: "12px",
                  maxWidth: "220px",
                  lineHeight: 1.6,
                }}
              >
                Lokal. Digital. Komplett.
              </p>
            </div>

            {/* Nav links */}
            <nav style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "13px",
                    color: "rgba(240,248,255,0.45)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = "#38bdf8"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(240,248,255,0.45)"
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(56,189,248,0.15), transparent)",
              marginBottom: "32px",
            }}
          />

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {/* Made in Ruhrgebiet with shimmer */}
            <p
              style={{
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "12px",
                color: "rgba(240,248,255,0.25)",
                letterSpacing: "0.1em",
              }}
            >
              &copy; {new Date().getFullYear()} FPZ-Media.{" "}
              <span
                style={{
                  color: "#0ea5e9",
                  animation: "eis-shimmer 3s ease-in-out infinite",
                  display: "inline-block",
                }}
              >
                Made in Ruhrgebiet
              </span>
            </p>

            {/* Legal links */}
            <div style={{ display: "flex", gap: "24px" }}>
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "12px",
                    color: "rgba(240,248,255,0.3)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(56,189,248,0.8)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(240,248,255,0.3)"
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
