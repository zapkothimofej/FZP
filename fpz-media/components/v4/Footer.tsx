"use client"

import { Logo } from "@/components/shared/Logo"

const footerLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-12 px-6"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid #1a1a10",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <Logo color="#c9a84c" size="md" />

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            {["Services", "Process", "Pricing", "Portfolio", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-sm transition-colors duration-200"
                style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = "#c9a84c"
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = "#7a6a3a"
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background: "linear-gradient(to right, rgba(201,168,76,0.2), rgba(201,168,76,0.05), transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
          >
            &copy; {year} FPZ Media. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs transition-colors duration-200"
                style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = "#c9a84c"
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = "#7a6a3a"
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Gold tagline */}
          <p
            className="text-xs italic"
            style={{ color: "rgba(201,168,76,0.35)", fontFamily: "var(--font-display)" }}
          >
            Built for the Ruhrgebiet. Built to last.
          </p>
        </div>
      </div>
    </footer>
  )
}
