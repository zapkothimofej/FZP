"use client"

import { Bebas_Neue, Outfit } from "next/font/google"
import { ContactForm } from "@/components/shared/ContactForm"

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-32 px-6"
      style={{ background: "#0b0b1f" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left col — heading + text */}
          <div>
            <p
              className={`${body.className} text-xs tracking-[0.3em] uppercase mb-4`}
              style={{ color: "#60a5fa" }}
            >
              Kontakt
            </p>
            <h2
              className={`${display.className} leading-tight mb-6`}
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f0f4ff" }}
            >
              Lass uns reden.
            </h2>
            <p
              className={`${body.className} leading-relaxed mb-10`}
              style={{ color: "#6b7db3", fontSize: "1rem" }}
            >
              Du hast ein Projekt, eine Idee, oder einfach Fragen — wir sind dabei.
              Kostenlose Erstberatung, kein Druck, kein Bullshit.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: "E-Mail",
                  value: "hello@fpz-media.de",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: "Region",
                  value: "Ruhrgebiet, NRW",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(96,165,250,0.1)",
                      color: "#60a5fa",
                      border: "1px solid rgba(96,165,250,0.2)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className={`${body.className} text-xs`}
                      style={{ color: "#6b7db3" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`${body.className} text-sm`}
                      style={{ color: "#f0f4ff" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div
              className="mt-16 p-6 rounded-xl"
              style={{
                background: "rgba(96,165,250,0.05)",
                border: "1px solid rgba(96,165,250,0.15)",
              }}
            >
              <p
                className={`${body.className} text-sm leading-relaxed`}
                style={{ color: "#6b7db3" }}
              >
                &ldquo;Wir antworten innerhalb von 24 Stunden. Versprochen.&rdquo;
              </p>
              <p
                className={`${body.className} text-xs mt-2`}
                style={{ color: "#60a5fa" }}
              >
                — FPZ-Media Team
              </p>
            </div>
          </div>

          {/* Right col — contact form */}
          <div
            className="p-8 rounded-xl"
            style={{
              background: "#060612",
              border: "1px solid #1e2a4a",
            }}
          >
            <ContactForm accentColor="#60a5fa" />
          </div>
        </div>
      </div>
    </section>
  )
}
