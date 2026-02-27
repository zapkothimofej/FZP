import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import { GrainOverlay } from "@/components/v10/GrainOverlay"

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
  title: "FPZ Media — V10 CRAZY LIGHT",
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
}

export default function V10Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${display.variable} ${body.variable} antialiased`}
      style={{ backgroundColor: "#fafafa", color: "#0a0a0a", minHeight: "100vh" }}
    >
      <GrainOverlay />
      {children}
    </div>
  )
}
