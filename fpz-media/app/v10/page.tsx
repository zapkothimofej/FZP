import { Navbar } from "@/components/v10/Navbar"
import { HeroChrom } from "@/components/v10/HeroChrom"
import { ManifestoSection } from "@/components/v10/ManifestoSection"
import { ServicesSection } from "@/components/v10/ServicesSection"
import { ProcessSection } from "@/components/v10/ProcessSection"
import { StatsSection } from "@/components/v10/StatsSection"
import { PricingSection } from "@/components/v10/PricingSection"
import { PortfolioSection } from "@/components/v10/PortfolioSection"
import { ContactSection } from "@/components/v10/ContactSection"
import { Footer } from "@/components/v10/Footer"

export default function V10Page() {
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
