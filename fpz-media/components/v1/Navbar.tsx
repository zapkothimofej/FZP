"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Logo } from "@/components/shared/Logo"
import { Outfit } from "next/font/google"

gsap.registerPlugin(ScrollTrigger)

const body = Outfit({ subsets: ["latin"] })

const navLinks = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Preise", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Slide in from top on load
  useGSAP(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    )
  }, [])

  // Transparent → dark bg on scroll
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const trigger = ScrollTrigger.create({
      start: "top+=80",
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: "rgba(6,6,18,0.92)",
          backdropFilter: "blur(16px)",
          borderBottomColor: "#1e2a4a",
          duration: 0.4,
          ease: "power2.out",
        })
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          duration: 0.4,
          ease: "power2.out",
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "transparent",
        borderBottom: "1px solid transparent",
        opacity: 0,
      }}
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16"
      >
        {/* Logo */}
        <a href="#" aria-label="FPZ-Media Home">
          <Logo size="sm" />
        </a>

        {/* Nav links — desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${body.className} text-sm transition-colors duration-200`}
                style={{ color: "#6b7db3" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = "#f0f4ff"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = "#6b7db3"
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={`${body.className} hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200`}
          style={{
            background: "#1d4ed8",
            color: "#f0f4ff",
            border: "1px solid #60a5fa30",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = "#60a5fa"
            ;(e.currentTarget as HTMLAnchorElement).style.color = "#060612"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = "#1d4ed8"
            ;(e.currentTarget as HTMLAnchorElement).style.color = "#f0f4ff"
          }}
        >
          Kontakt
        </a>

        {/* Mobile hamburger placeholder */}
        <button
          className="md:hidden p-2 rounded"
          style={{ color: "#6b7db3" }}
          aria-label="Menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
