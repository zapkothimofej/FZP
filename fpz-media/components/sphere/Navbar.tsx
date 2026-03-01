"use client"

import { useRef, useState } from "react"
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
  const [mobileOpen, setMobileOpen] = useState(false)

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
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-20 border-b border-transparent transition-all will-change-transform"
        style={{ opacity: 0 }}
      >
        <div className="hover:scale-110 transition-transform duration-300">
          <Logo color="#ebebeb" size="md" />
        </div>

        {/* Desktop nav links */}
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

        {/* Desktop CTA */}
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              backgroundColor: "#c8c8c8",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: "#c8c8c8",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              backgroundColor: "#c8c8c8",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ backgroundColor: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)" }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[22px] tracking-[0.25em] uppercase font-bold transition-all duration-300 hover:text-[#ebebeb]"
            style={{
              color: "#c8c8c8",
              transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
            }}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mt-4 inline-flex items-center h-14 px-10 text-[13px] tracking-[0.2em] uppercase font-bold border rounded-sm transition-all duration-300"
          style={{
            borderColor: "#c8c8c8",
            color: "#c8c8c8",
            transitionDelay: mobileOpen ? `${NAV_LINKS.length * 60}ms` : "0ms",
            transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileOpen ? 1 : 0,
          }}
          onClick={() => setMobileOpen(false)}
        >
          Projekt starten
        </a>
      </div>
    </>
  )
}

export default Navbar
