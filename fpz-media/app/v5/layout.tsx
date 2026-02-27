import type { Metadata } from "next"
import { Syne, Mulish } from "next/font/google"
import "../globals.css"

const display = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
})

const body = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "FPZ-Media V5 — Eis",
  description:
    "Full-service digital agency for local businesses in the Ruhrgebiet. Web development, media production, and business automation.",
  keywords: ["Web Design", "Ruhrgebiet", "Digital Agency", "Media Production", "Automation", "Next.js"],
  openGraph: {
    title: "FPZ-Media — We Build Your Unfair Advantage",
    description:
      "Full-service digital agency for local businesses in the Ruhrgebiet.",
    type: "website",
  },
}

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body
        style={{
          backgroundColor: "#04080f",
          color: "#f0f8ff",
          fontFamily: "var(--font-body, system-ui, sans-serif)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  )
}
