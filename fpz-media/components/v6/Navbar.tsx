"use client"

import { useRef, useState } from "react"
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

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useV6Theme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center w-9 h-9 border transition-all duration-300 ${className ?? ""}`}
      style={{ borderColor: "var(--v6-border)", color: "var(--v6-text-muted)" }}
      aria-label={isDark ? "Helles Design aktivieren" : "Dunkles Design aktivieren"}
      title={isDark ? "Light Mode" : "Dark Mode"}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.borderColor = "var(--v6-accent)"
        el.style.color = "var(--v6-accent)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.borderColor = "var(--v6-border)"
        el.style.color = "var(--v6-text-muted)"
      }}
    >
      {isDark ? (
        /* Sun icon */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    if (!navRef.current) return

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    )

    ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          borderBottomColor: "var(--v6-border)",
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

  const toggleDrawer = () => {
    if (!drawerRef.current) return
    if (!open) {
      setOpen(true)
      gsap.fromTo(
        drawerRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
      )
      gsap.fromTo(
        drawerRef.current.querySelectorAll(".v6-drawer-link"),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: "power3.out", delay: 0.15 }
      )
    } else {
      gsap.to(drawerRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => setOpen(false),
      })
    }
  }

  const closeDrawer = () => {
    if (!drawerRef.current || !open) return
    gsap.to(drawerRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => setOpen(false),
    })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-transparent will-change-transform"
        style={{ opacity: 0 }}
      >
        <Logo color="var(--v6-accent)" size="md" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-200"
              style={{ color: "var(--v6-text-muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--v6-text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--v6-text-muted)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop: Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center h-9 px-5 text-[12px] tracking-[0.1em] uppercase font-semibold border transition-all duration-300"
            style={{ borderColor: "var(--v6-accent)", color: "var(--v6-accent)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = "var(--v6-accent)"
              el.style.color = "var(--v6-text-on-accent)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = "transparent"
              el.style.color = "var(--v6-accent)"
            }}
          >
            Projekt starten
          </a>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
            onClick={toggleDrawer}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            <span
              className="block w-6 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: "var(--v6-accent)",
                transform: open ? "translateY(7.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: "var(--v6-accent)",
                opacity: open ? 0 : 1,
                transform: open ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: "var(--v6-accent)",
                transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={closeDrawer}
          aria-hidden
        />
      )}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col px-8 pt-24 pb-12"
        style={{
          width: "min(320px, 85vw)",
          backgroundColor: "var(--v6-bg-elevated)",
          borderLeft: "1px solid var(--v6-border)",
          transform: "translateX(100%)",
          opacity: 0,
          display: open ? "flex" : "none",
        }}
      >
        {/* Drawer Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="v6-drawer-link flex items-center justify-between py-4 border-b text-[15px] tracking-[0.06em] uppercase font-medium transition-colors duration-200"
              style={{ color: "var(--v6-text-muted)", borderColor: "var(--v6-border)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--v6-text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--v6-text-muted)")}
              onClick={closeDrawer}
            >
              {link.label}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
            </a>
          ))}
        </nav>

        {/* Drawer CTA */}
        <a
          href="#contact"
          className="v6-drawer-link flex items-center justify-center h-12 text-[13px] tracking-[0.1em] uppercase font-semibold border transition-all duration-300"
          style={{ borderColor: "var(--v6-accent)", color: "var(--v6-accent)" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.backgroundColor = "var(--v6-accent)"
            el.style.color = "var(--v6-text-on-accent)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.backgroundColor = "transparent"
            el.style.color = "var(--v6-accent)"
          }}
          onClick={closeDrawer}
        >
          Projekt starten
        </a>
      </div>
    </>
  )
}

export default Navbar
