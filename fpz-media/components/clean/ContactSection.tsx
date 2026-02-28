"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/shared/ContactForm"

export function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#1e293b",
        padding: "96px 24px",
        borderTop: "1px solid #334155",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "64px",
          alignItems: "start",
        }}
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#2dd4bf",
            }}
          >
            Contact
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#f8fafc",
              margin: "12px 0 24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Let&rsquo;s build something<br />together.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#94a3b8",
              lineHeight: 1.65,
              margin: "0 0 32px",
              maxWidth: "400px",
            }}
          >
            Ready to build your unfair advantage? Reach out and we&rsquo;ll get
            back to you within one business day — no sales pitch, just an honest
            conversation about your project.
          </p>

          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "rgba(45,212,191,0.1)",
                border: "1px solid rgba(45,212,191,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </div>
            <a
              href="mailto:hello@fpz-media.de"
              style={{
                color: "#f8fafc",
                fontSize: "16px",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#2dd4bf")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#f8fafc")}
            >
              hello@fpz-media.de
            </a>
          </div>

          {/* Made in Ruhrgebiet */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
            }}
          >
            <span style={{ fontSize: "16px" }} aria-hidden>📍</span>
            <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>
              Made in Ruhrgebiet
            </span>
          </div>
        </motion.div>

        {/* Right column: Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <ContactForm accentColor="#2dd4bf" />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
