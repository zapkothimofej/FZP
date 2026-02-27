"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/shared/ContactForm"

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#090405",
        padding: "120px 24px",
        borderTop: "1px solid #2d0d14",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "flex-start",
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* Left: copy */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#f43f5e",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Kontakt
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff0f2",
              margin: "0 0 24px 0",
              lineHeight: 1.05,
            }}
          >
            Bereit durchzustarten?
          </h2>
          <p
            style={{
              fontSize: "17px",
              fontFamily: "var(--font-body)",
              color: "#9c6472",
              lineHeight: 1.7,
              maxWidth: "420px",
              marginBottom: "40px",
            }}
          >
            Schreib uns — wir melden uns innerhalb von 24 Stunden und besprechen
            dein Projekt kostenlos und unverbindlich.
          </p>

          {/* Quick facts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: "⚡", text: "Antwort innerhalb 24h" },
              { icon: "📍", text: "Ruhrgebiet — lokal & persönlich" },
              { icon: "🤝", text: "Kostenloses Erstgespräch" },
            ].map((fact) => (
              <div
                key={fact.text}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    width: "32px",
                    textAlign: "center",
                  }}
                >
                  {fact.icon}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "var(--font-body)",
                    color: "#fff0f2",
                  }}
                >
                  {fact.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backgroundColor: "#130609",
            border: "1px solid #2d0d14",
            borderRadius: "12px",
            padding: "40px",
          }}
        >
          <ContactForm accentColor="#f43f5e" />
        </motion.div>
      </div>
    </section>
  )
}
