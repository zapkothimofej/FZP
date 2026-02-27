"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Logo } from "@/components/shared/Logo"

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Preise", href: "#pricing" },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!navRef.current) return

    // Slide down on load
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    )

    // Background appears on scroll
    ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          borderBottomColor: "#222222",
          duration: 0.4,
          ease: "power2.out",
        })
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(10,10,10,0)",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          duration: 0.4,
          ease: "power2.out",
        })
      },
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-16 border-b border-transparent transition-colors will-change-transform"
      style={{ opacity: 0 }}
    >
      <Logo color="#c8c8c8" size="md" />

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-200"
            style={{ color: "#707070" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#ebebeb")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#707070")
            }
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center h-9 px-5 text-[12px] tracking-[0.1em] uppercase font-semibold border transition-all duration-300"
        style={{
          borderColor: "#c8c8c8",
          color: "#c8c8c8",
          letterSpacing: "0.1em",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.backgroundColor = "#c8c8c8"
          el.style.color = "#0a0a0a"
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.backgroundColor = "transparent"
          el.style.color = "#c8c8c8"
        }}
      >
        Projekt starten
      </a>
    </nav>
  )
}

export default Navbar
