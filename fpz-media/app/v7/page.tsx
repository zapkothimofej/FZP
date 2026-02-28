import { Navbar } from "@/components/v6/Navbar"
import { HeroChrom } from "@/components/v6/HeroChrom"
import { ManifestoSection } from "@/components/v7/ManifestoSection"
import { ServicesSection } from "@/components/v7/ServicesSection"
import { ProcessSection } from "@/components/v7/ProcessSection"
import { StatsSection } from "@/components/v6/StatsSection"
import { PricingSection } from "@/components/v6/PricingSection"
import { PortfolioSection } from "@/components/v6/PortfolioSection"
import { ContactSection } from "@/components/v6/ContactSection"
import { Footer } from "@/components/v6/Footer"

export default function V7Page() {
  return (
    <main>
      <Navbar />
      <HeroChrom />
      <ManifestoSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <PortfolioSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
