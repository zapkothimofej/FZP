import { Navbar } from "@/components/chrom/Navbar"
import { HeroChrom } from "@/components/chrom/HeroChrom"
import { ManifestoSection } from "@/components/clean/ManifestoSection"
import { ServicesSection } from "@/components/clean/ServicesSection"
import { ProcessSection } from "@/components/clean/ProcessSection"
import { StatsSection } from "@/components/chrom/StatsSection"
import { PricingSection } from "@/components/chrom/PricingSection"
import { PortfolioSection } from "@/components/chrom/PortfolioSection"
import { ContactSection } from "@/components/chrom/ContactSection"
import { Footer } from "@/components/chrom/Footer"

export default function CleanPage() {
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
