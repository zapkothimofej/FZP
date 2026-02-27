"use client"

import { useEffect, useState } from "react"
import { Logo } from "@/components/shared/Logo"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(9,9,9,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo color="#c9a84c" size="md" />

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-wide transition-colors duration-200"
                style={{
                  color: "#7a6a3a",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = "#c9a84c"
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = "#7a6a3a"
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center h-9 px-5 rounded-sm text-sm font-semibold tracking-wide transition-all duration-200"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #c9a84c",
            color: "#c9a84c",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = "#c9a84c"
            el.style.color = "#090909"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = "transparent"
            el.style.color = "#c9a84c"
          }}
        >
          Start Project
        </a>
      </nav>
    </header>
  )
}
