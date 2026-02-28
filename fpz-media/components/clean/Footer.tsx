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
        backgroundColor: "#0f172a",
        borderTop: "1px solid #334155",
        padding: "48px 24px 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Main footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {/* Logo */}
          <Logo color="#2dd4bf" size="sm" />

          {/* Nav links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#f8fafc")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#94a3b8")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Legal links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#f8fafc")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#94a3b8")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #334155",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            &copy; 2025 FPZ-Media &middot; Made in Ruhrgebiet
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#475569",
              margin: 0,
            }}
          >
            V7 Klar
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
