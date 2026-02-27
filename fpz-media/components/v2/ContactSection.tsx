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

      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        infoRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.25,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
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
      className="py-32 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #222222" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
        {/* Left: heading + contact info */}
        <div className="flex flex-col gap-10">
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-6"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
            >
              Get in Touch
            </p>
            <h2
              ref={headingRef}
              className="font-[family-name:var(--font-display)] italic"
              style={{
                fontSize: "clamp(40px, 7vw, 96px)",
                color: "#ebebeb",
                lineHeight: 1.05,
                opacity: 0,
              }}
            >
              Let&apos;s build
              <br />
              something
              <br />
              <span style={{ color: "#c8c8c8" }}>exceptional.</span>
            </h2>
          </div>

          <div ref={infoRef} className="flex flex-col gap-6" style={{ opacity: 0 }}>
            <p
              className="text-base leading-relaxed max-w-sm"
              style={{ color: "#707070", fontFamily: "var(--font-body)" }}
            >
              Based in the Ruhrgebiet. Available everywhere. Drop us a message
              and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase mb-1"
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                >
                  Email
                </p>
                <a
                  href="mailto:hallo@fpz-media.de"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#c8c8c8", fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#ebebeb")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#c8c8c8")
                  }
                >
                  hallo@fpz-media.de
                </a>
              </div>

              <div>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase mb-1"
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                >
                  Location
                </p>
                <span
                  className="text-sm"
                  style={{ color: "#c8c8c8", fontFamily: "var(--font-body)" }}
                >
                  Ruhrgebiet, NRW, Germany
                </span>
              </div>
            </div>

            {/* Thin separator */}
            <div style={{ height: "1px", backgroundColor: "#222222", width: "100%" }} />

            {/* Social links placeholder */}
            <div className="flex gap-6">
              {["Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200"
                  style={{ color: "#707070", fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#c8c8c8")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#707070")
                  }
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact form */}
        <div ref={formRef} style={{ opacity: 0 }}>
          <ContactForm accentColor="#c8c8c8" />
        </div>
      </div>
    </section>
  )
}
