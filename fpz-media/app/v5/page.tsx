import { Navbar } from "@/components/v5/Navbar"
import { HeroCSS } from "@/components/v5/HeroCSS"
import { ManifestoSection } from "@/components/v5/ManifestoSection"
import { ServicesSection } from "@/components/v5/ServicesSection"
import { ProcessSection } from "@/components/v5/ProcessSection"
import { StatsSection } from "@/components/v5/StatsSection"
import { PricingSection } from "@/components/v5/PricingSection"
import { PortfolioSection } from "@/components/v5/PortfolioSection"
import { ContactSection } from "@/components/v5/ContactSection"
import { Footer } from "@/components/v5/Footer"

export default function V5Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCSS />
        <ManifestoSection />
        <ServicesSection />
        <ProcessSection />
        <StatsSection />
        <PricingSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
