"use client"

import { motion } from "framer-motion"
import { services } from "@/lib/content"

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: "#090405",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#f43f5e",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Was wir machen
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff0f2",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Unsere Services
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            perspective: "1000px",
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              style={{ perspective: "1000px" }}
              initial={{ rotateY: -90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                style={{
                  backgroundColor: "#130609",
                  border: "1px solid #2d0d14",
                  borderBottom: "4px solid #f43f5e",
                  borderRadius: "8px",
                  padding: "36px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Card number */}
                <span
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#f43f5e",
                    letterSpacing: "0.1em",
                  }}
                >
                  {service.number}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#fff0f2",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {service.title}
                </h3>

                {/* Headline */}
                <p
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--font-body)",
                    color: "#f43f5e",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {service.headline}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: "15px",
                    fontFamily: "var(--font-body)",
                    color: "#9c6472",
                    margin: 0,
                    lineHeight: 1.7,
                    flexGrow: 1,
                  }}
                >
                  {service.description}
                </p>

                {/* Deliverables */}
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                        fontFamily: "var(--font-body)",
                        color: "#fff0f2",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: "#f43f5e",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
