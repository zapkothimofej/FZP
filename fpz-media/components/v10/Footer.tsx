"use client"

import { Logo } from "@/components/shared/Logo"

const NAV_LINKS = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Preise", href: "#pricing" },
  { label: "Kontakt", href: "#contact" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="px-8 md:px-16 lg:px-24 py-12"
      style={{
        backgroundColor: "#0a0a0a", // At the end it turns black from contact section!
        borderTop: "1px solid #333",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top row: Logo + Nav */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="hover:scale-110 transition-transform duration-300">
            <Logo color="#ffffff" size="sm" />
          </div>

          <nav className="flex flex-wrap gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-[0.2em] uppercase font-extrabold transition-all duration-300 hover:text-[#ffffff] hover:-translate-y-1"
                style={{ color: "#707070", fontFamily: "var(--font-body)", display: "inline-block" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#333", width: "100%" }} />

        {/* Bottom row: Legal + Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-[12px] uppercase tracking-[0.1em] font-bold"
            style={{ color: "#707070", fontFamily: "var(--font-body)" }}
          >
            &copy; {year} FPZ Media. Alle Rechte vorbehalten. Ruhrgebiet, Deutschland.
          </p>

          <div className="flex gap-8">
            <a
              href="/impressum"
              className="text-[12px] uppercase tracking-[0.1em] font-bold transition-colors duration-200 hover:text-[#ffffff]"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="text-[12px] uppercase tracking-[0.1em] font-bold transition-colors duration-200 hover:text-[#ffffff]"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
            >
              Datenschutz
            </a>
          </div>
        </div>

        {/* Version tag */}
        <p
          className="text-[12px] text-center font-bold"
          style={{ color: "#333333", fontFamily: "var(--font-body)", letterSpacing: "0.4em" }}
        >
          V10 CRAZY LIGHT — FPZ-MEDIA.DE
        </p>
      </div>
    </footer>
  )
}

export default Footer
