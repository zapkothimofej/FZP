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

    // Extreme drop-in on load
    gsap.fromTo(
      navRef.current,
      { y: -150, opacity: 0, rotationX: -90, transformPerspective: 1000 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: "elastic.out(1, 0.4)", delay: 0.5 }
    )

    // Background appears on scroll
    ScrollTrigger.create({
      start: "top+=100 top",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(20px)",
          borderBottomColor: "#333",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          duration: 0.5,
          ease: "power2.out",
        })
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(10,10,10,0)",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          boxShadow: "none",
          duration: 0.5,
          ease: "power2.out",
        })
      },
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-20 border-b border-transparent transition-all will-change-transform"
      style={{ opacity: 0 }}
    >
      <div className="hover:scale-110 transition-transform duration-300">
        <Logo color="#ebebeb" size="md" />
      </div>

      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[13px] tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:text-[#ebebeb] hover:-translate-y-1"
            style={{ color: "#707070", display: "inline-block" }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center h-12 px-8 text-[13px] tracking-[0.2em] uppercase font-bold border transition-all duration-300 rounded-sm hover:scale-105"
        style={{
          borderColor: "#c8c8c8",
          color: "#c8c8c8",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.backgroundColor = "#c8c8c8"
          el.style.color = "#0a0a0a"
          el.style.boxShadow = "0 0 20px rgba(200,200,200,0.3)"
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.backgroundColor = "transparent"
          el.style.color = "#c8c8c8"
          el.style.boxShadow = "none"
        }}
      >
        Projekt starten
      </a>
    </nav>
  )
}

export default Navbar
