import type { Metadata } from "next"
import { Playfair_Display, Karla } from "next/font/google"

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

const body = Karla({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "FPZ Media — V4 Gold",
  description:
    "Full-service digital agency for local businesses in the Ruhrgebiet. Web. Film. Automation.",
}

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body
        className="antialiased"
        style={{ backgroundColor: "#090909", color: "#f5f0e0" }}
      >
        {children}
      </body>
    </html>
  )
}
