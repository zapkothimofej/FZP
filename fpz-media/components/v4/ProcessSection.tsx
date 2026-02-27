"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { process } from "@/lib/content"

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      id="process"
      className="py-28 px-6"
      style={{ backgroundColor: "#111108" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#c9a84c" }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
            >
              How We Work
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
          >
            Our Process
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-3 bottom-3 w-px origin-top hidden md:block"
            style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
          />

          <div className="flex flex-col gap-0">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-start gap-8 md:pl-16 pb-16 last:pb-0"
              >
                {/* Step dot — on the vertical line */}
                <div
                  className="absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center shrink-0 hidden md:flex"
                  style={{
                    backgroundColor: "#111108",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Mobile step number */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 md:hidden"
                  style={{
                    backgroundColor: "#090909",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#c9a84c", fontFamily: "var(--font-body)" }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-display)", color: "#f5f0e0" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-lg"
                    style={{ color: "#7a6a3a", fontFamily: "var(--font-body)" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Right: decorative gold dash */}
                <div
                  className="hidden lg:block mt-4 h-px w-24 self-start"
                  style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
