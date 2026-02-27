"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ContactForm } from "@/components/shared/ContactForm"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Background color shift on scroll
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom bottom",
          scrub: true,
        },
        backgroundColor: "#0a0a0a", // Shifts from white to black
      })

      // Extreme reveal for heading
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      )

      gsap.fromTo(
        infoRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      )

      gsap.fromTo(
        formRef.current,
        { y: 100, opacity: 0, rotationX: -45, transformPerspective: 1000 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Dynamic Background that turns dark */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0" style={{ backgroundColor: "transparent" }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 relative z-10">
        {/* Left: heading + contact info */}
        <div className="flex flex-col gap-10">
          <div>
            <p
              className="text-[12px] tracking-[0.3em] font-bold uppercase mb-6"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
            >
              Kontakt aufnehmen
            </p>
            <h2
              ref={headingRef}
              className="font-[family-name:var(--font-display)] italic transition-colors duration-500 hover:text-[#0a0a0a]"
              style={{
                fontSize: "clamp(50px, 8vw, 110px)",
                color: "#e0e0e0",
                lineHeight: 1.05,
                opacity: 0,
                WebkitTextStroke: "2px #0a0a0a",
              }}
            >
              Lass uns
              <br />
              etwas
              <br />
              <span style={{ color: "#0a0a0a", WebkitTextStroke: "0px" }}>Geniales bauen.</span>
            </h2>
          </div>

          <div ref={infoRef} className="flex flex-col gap-8" style={{ opacity: 0 }}>
            <p
              className="text-lg leading-relaxed max-w-sm font-medium"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
            >
              Ansässig im Ruhrgebiet. Überall verfügbar. Schreib uns eine Nachricht
              und wir melden uns innerhalb von 24 Stunden zurück.
            </p>

            <div className="flex flex-col gap-6">
              <div className="group">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-2 font-bold"
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                >
                  Email
                </p>
                <a
                  href="mailto:hallo@fpz-media.de"
                  className="text-xl transition-all duration-300 group-hover:pl-4 group-hover:text-[#ffffff]"
                  style={{ color: "#0a0a0a", fontFamily: "var(--font-body)", display: "inline-block", fontWeight: "bold" }}
                >
                  hallo@fpz-media.de
                </a>
              </div>

              <div>
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-2 font-bold"
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                >
                  Standort
                </p>
                <span
                  className="text-xl font-bold"
                  style={{ color: "#0a0a0a", fontFamily: "var(--font-body)" }}
                >
                  Ruhrgebiet, NRW, Deutschland
                </span>
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: "2px", backgroundColor: "#0a0a0a", width: "100%", opacity: 0.1 }} />

            {/* Social links */}
            <div className="flex gap-8">
              {["Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[13px] tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:-translate-y-2 hover:text-[#ffffff]"
                  style={{ color: "#707070", fontFamily: "var(--font-body)", display: "inline-block" }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact form */}
        <div ref={formRef} style={{ opacity: 0 }} className="bg-white p-8 md:p-12 rounded-3xl border border-[#e0e0e0] shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
          {/* wir übergeben accentColor schwarz weil wir auf weissem grund sind */}
          <ContactForm accentColor="#0a0a0a" />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
