import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import { GrainOverlay } from "@/components/chrom/GrainOverlay"
import { V6ThemeProvider } from "@/app/chrom/ThemeProvider"
import "@/app/chrom/v6-theme.css"

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
  title: "FPZ Media — V9",
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
}

export default function SphereLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} antialiased`}>
      <V6ThemeProvider>
        <GrainOverlay />
        {children}
      </V6ThemeProvider>
    </div>
  )
}
