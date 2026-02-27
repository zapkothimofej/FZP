import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import { GrainOverlay } from "@/components/v9/GrainOverlay"

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
})

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "FPZ Media — V9 Perfect",
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
}

export default function V9Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${display.variable} ${body.variable} antialiased`}
      style={{ backgroundColor: "#0a0a0a", color: "#ebebeb", minHeight: "100vh" }}
    >
      <GrainOverlay />
      {children}
    </div>
  )
}
