import type { Metadata } from "next"
import { Bricolage_Grotesque, Epilogue } from "next/font/google"
import "../globals.css"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-display",
})

const body = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "FPZ-Media — We Build Your Unfair Advantage",
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

export default function V7Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${display.variable} ${body.variable}`}
      style={{
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        fontFamily: "var(--font-body, system-ui, sans-serif)",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  )
}
