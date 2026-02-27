"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/shared/ContactForm"

export function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 24px",
        backgroundColor: "#070d17",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(56,189,248,0.18), transparent)",
        }}
      />

      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "-5%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Large frosted glass container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(56,189,248,0.15)",
            borderRadius: "20px",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              minHeight: "600px",
            }}
            className="flex flex-col lg:grid"
          >
            {/* Left: heading + text */}
            <div
              style={{
                padding: "clamp(48px, 5vw, 72px)",
                borderRight: "1px solid rgba(56,189,248,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative crystal */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "-40px",
                  width: "200px",
                  height: "200px",
                  backgroundColor: "rgba(56,189,248,0.07)",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  pointerEvents: "none",
                }}
              />

              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#0ea5e9",
                  fontFamily: "var(--font-body, sans-serif)",
                  marginBottom: "24px",
                }}
              >
                Get In Touch
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 3.5vw, 52px)",
                  color: "#f0f8ff",
                  letterSpacing: "0.03em",
                  lineHeight: 1.15,
                  marginBottom: "24px",
                }}
              >
                Bereit für dein
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  nächstes Projekt?
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: "15px",
                  color: "rgba(240,248,255,0.5)",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                  maxWidth: "380px",
                }}
              >
                Wir antworten innerhalb von 24 Stunden. Kein
                Verkaufsdruck — nur ein ehrliches Gespräch über dein
                Business.
              </p>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { label: "Email", value: "hallo@fpz-media.de" },
                  { label: "Standort", value: "Ruhrgebiet, NRW" },
                  { label: "Response", value: "< 24 Stunden" },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        color: "rgba(240,248,255,0.3)",
                        fontFamily: "var(--font-body, sans-serif)",
                        textTransform: "uppercase",
                        minWidth: "80px",
                      }}
                    >
                      {detail.label}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#38bdf8",
                        fontFamily: "var(--font-body, sans-serif)",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: contact form */}
            <div
              style={{
                padding: "clamp(48px, 5vw, 72px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ContactForm accentColor="#38bdf8" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
