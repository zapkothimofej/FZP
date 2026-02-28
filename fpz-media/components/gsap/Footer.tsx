"use client"

import { Logo } from "@/components/shared/Logo"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="px-8 md:px-16 lg:px-24 py-12"
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid #222222",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top row: Logo + Nav */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <Logo color="#c8c8c8" size="sm" />

          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] tracking-[0.08em] uppercase transition-colors duration-200"
                style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#c8c8c8")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#707070")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#222222" }} />

        {/* Bottom row: Legal + Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-[12px]"
            style={{ color: "#707070", fontFamily: "var(--font-body)" }}
          >
            &copy; {year} FPZ Media. All rights reserved. Ruhrgebiet, Germany.
          </p>

          <div className="flex gap-6">
            <a
              href="/impressum"
              className="text-[12px] transition-colors duration-200"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#c8c8c8")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#707070")
              }
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="text-[12px] transition-colors duration-200"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#c8c8c8")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#707070")
              }
            >
              Datenschutz
            </a>
          </div>
        </div>

        {/* Version tag */}
        <p
          className="text-[11px] text-center"
          style={{ color: "#333333", fontFamily: "var(--font-body)", letterSpacing: "0.15em" }}
        >
          V2 STAHL — FPZ-MEDIA.DE
        </p>
      </div>
    </footer>
  )
}
