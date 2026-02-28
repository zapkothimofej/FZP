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

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Extreme reveal for heading
      gsap.fromTo(
        headingRef.current,
        { y: 100, opacity: 0, rotationX: -90, transformOrigin: "top" },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )

      gsap.fromTo(
        infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )

      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
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
      className="py-32 px-8 md:px-16 lg:px-24 overflow-hidden relative"
      style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #333", perspective: "1000px" }}
    >
      {/* Background glow */}
      <div 
        className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #c8c8c8 0%, transparent 70%)", transform: "translate(20%, -20%)" }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 relative z-10">
        {/* Left: heading + contact info */}
        <div className="flex flex-col gap-10">
          <div>
            <p
              className="text-[12px] tracking-[0.3em] uppercase mb-6 font-bold"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
            >
              Kontakt aufnehmen
            </p>
            <h2
              ref={headingRef}
              className="font-[family-name:var(--font-display)] italic"
              style={{
                fontSize: "clamp(50px, 8vw, 110px)",
                color: "#ebebeb",
                lineHeight: 1.05,
                opacity: 0,
                textShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
            >
              Lass uns
              <br />
              etwas
              <br />
              <span style={{ color: "#c8c8c8", textShadow: "0 0 20px rgba(200,200,200,0.3)" }}>Geniales bauen.</span>
            </h2>
          </div>

          <div ref={infoRef} className="flex flex-col gap-8" style={{ opacity: 0 }}>
            <p
              className="text-lg leading-relaxed max-w-sm"
              style={{ color: "#a0a0a0", fontFamily: "var(--font-body)" }}
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
                  className="text-xl transition-all duration-300 group-hover:pl-2"
                  style={{ color: "#c8c8c8", fontFamily: "var(--font-body)", display: "inline-block" }}
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
                  className="text-xl"
                  style={{ color: "#c8c8c8", fontFamily: "var(--font-body)" }}
                >
                  Ruhrgebiet, NRW, Deutschland
                </span>
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: "1px", backgroundColor: "#333", width: "100%", boxShadow: "0 0 10px rgba(200,200,200,0.1)" }} />

            {/* Social links */}
            <div className="flex gap-8">
              {["Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[13px] tracking-[0.2em] uppercase transition-all duration-300 font-bold hover:-translate-y-1 hover:text-[#ebebeb]"
                  style={{ color: "#707070", fontFamily: "var(--font-body)", display: "inline-block" }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact form */}
        <div ref={formRef} style={{ opacity: 0 }} className="bg-[#141414] p-8 md:p-12 rounded-2xl border border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <ContactForm accentColor="#c8c8c8" />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
