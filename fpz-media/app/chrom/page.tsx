import { Navbar } from "@/components/chrom/Navbar"
import { HeroChrom } from "@/components/chrom/HeroChrom"
import { ManifestoSection } from "@/components/chrom/ManifestoSection"
import { ServicesSection } from "@/components/chrom/ServicesSection"
import { ProcessSection } from "@/components/chrom/ProcessSection"
import { StatsSection } from "@/components/chrom/StatsSection"
import { PricingSection } from "@/components/chrom/PricingSection"
import { PortfolioSection } from "@/components/chrom/PortfolioSection"
import { ContactSection } from "@/components/chrom/ContactSection"
import { Footer } from "@/components/chrom/Footer"

export default function ChromPage() {
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
