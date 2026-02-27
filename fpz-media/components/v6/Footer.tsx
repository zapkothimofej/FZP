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
        backgroundColor: "var(--v6-bg)",
        borderTop: "1px solid var(--v6-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top row: Logo + Nav */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <Logo color="var(--v6-accent)" size="sm" />

          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] tracking-[0.08em] uppercase transition-colors duration-200"
                style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--v6-accent)")
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
        <div style={{ height: "1px", backgroundColor: "var(--v6-border)" }} />

        {/* Bottom row: Legal + Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-[12px]"
            style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
          >
            &copy; {year} FPZ Media. Alle Rechte vorbehalten. Ruhrgebiet, Deutschland.
          </p>

          <div className="flex gap-6">
            <a
              href="/impressum"
              className="text-[12px] transition-colors duration-200"
              style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--v6-accent)")
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
              style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--v6-accent)")
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
          V6 CHROM — FPZ-MEDIA.DE
        </p>
      </div>
    </footer>
  )
}

export default Footer
