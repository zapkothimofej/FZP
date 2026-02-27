import type { Metadata } from "next"
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google"

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
})

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "FPZ Media — V3 Glut",
  description:
    "Full-service digital agency for local businesses in the Ruhrgebiet. Web. Film. Automation.",
}

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body
        className="antialiased"
        style={{ backgroundColor: "#090405", color: "#fff0f2" }}
      >
        {children}
      </body>
    </html>
  )
}
