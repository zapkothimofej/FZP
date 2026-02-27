"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/shared/ContactForm"

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-28 px-6"
      style={{ backgroundColor: "#111108" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-10 rounded-full" style={{ backgroundColor: "#c9a84c" }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
              >
                Get In Touch
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
            >
              Ready to Build Your
              <span style={{ color: "#c9a84c", display: "block", fontStyle: "italic" }}>
                Unfair Advantage?
              </span>
            </h2>

            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
            >
              Tell us about your project and we&apos;ll get back to you within 24 hours.
              Free consultation, no commitment.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  text: "Ruhrgebiet, Germany",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  text: "hallo@fpz-media.de",
                },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-sm p-8"
            style={{
              backgroundColor: "#090909",
              border: "1px solid #1a1a10",
            }}
          >
            <ContactForm accentColor="#c9a84c" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
