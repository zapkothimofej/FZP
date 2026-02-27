"use client"

import { Logo } from "@/components/shared/Logo"
import { Outfit } from "next/font/google"

const body = Outfit({ subsets: ["latin"] })

const footerLinks = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Preise", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Kontakt", href: "#contact" },
]

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
]

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "#060612",
        borderColor: "#1e2a4a",
      }}
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand col */}
          <div className="md:col-span-1">
            <Logo size="md" className="mb-5" />
            <p
              className={`${body.className} text-sm leading-relaxed max-w-xs`}
              style={{ color: "#6b7db3" }}
            >
              Full-service digital agency für lokale Unternehmen im Ruhrgebiet.
              Web. Film. Automation.
            </p>

            {/* Social links placeholder */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: "Instagram",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{
                    background: "#0b0b1f",
                    color: "#6b7db3",
                    border: "1px solid #1e2a4a",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = "#60a5fa"
                    el.style.borderColor = "#60a5fa40"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = "#6b7db3"
                    el.style.borderColor = "#1e2a4a"
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4
              className={`${body.className} text-xs tracking-[0.2em] uppercase mb-5`}
              style={{ color: "#60a5fa" }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
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
          </div>

          {/* Contact info */}
          <div>
            <h4
              className={`${body.className} text-xs tracking-[0.2em] uppercase mb-5`}
              style={{ color: "#60a5fa" }}
            >
              Kontakt
            </h4>
            <div className="flex flex-col gap-3">
              <p className={`${body.className} text-sm`} style={{ color: "#6b7db3" }}>
                hello@fpz-media.de
              </p>
              <p className={`${body.className} text-sm`} style={{ color: "#6b7db3" }}>
                Ruhrgebiet, NRW
              </p>
              <a
                href="#contact"
                className={`${body.className} mt-2 inline-flex items-center gap-1.5 text-sm font-medium`}
                style={{ color: "#60a5fa" }}
              >
                Jetzt Kontakt aufnehmen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "#1e2a4a" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className={`${body.className} text-xs`}
            style={{ color: "#6b7db3" }}
          >
            &copy; {new Date().getFullYear()} FPZ-Media. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${body.className} text-xs transition-colors duration-200`}
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
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
