"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Logo } from "@/components/shared/Logo"
import { useV6Theme } from "@/app/v6/ThemeProvider"

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Preise", href: "#pricing" },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const { theme, toggleTheme } = useV6Theme()

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
          backgroundColor: "var(--v6-nav-scrolled-bg)",
          backdropFilter: "blur(12px)",
          borderBottomColor: "var(--v6-nav-scrolled-border)",
          duration: 0.4,
          ease: "power2.out",
        })
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "transparent",
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
      <Logo color="var(--v6-accent)" size="md" />

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-200 hover:text-[var(--v6-text)]"
            style={{ color: "var(--v6-text-muted)" }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-6">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-md transition-colors hover:bg-[var(--v6-border)]"
          style={{ color: "var(--v6-accent)" }}
          aria-label={theme === "dark" ? "Zu Hellmodus wechseln" : "Zu Dunkelmodus wechseln"}
        >
          {theme === "dark" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
        <a
          href="#contact"
          className="inline-flex items-center h-9 px-5 text-[12px] tracking-[0.1em] uppercase font-semibold border transition-all duration-300 hover:bg-[var(--v6-accent)] hover:text-[var(--v6-text-on-accent)]"
          style={{
            borderColor: "var(--v6-accent)",
            color: "var(--v6-accent)",
            letterSpacing: "0.1em",
          }}
        >
          Projekt starten
        </a>
      </div>
    </nav>
  )
}

export default Navbar
