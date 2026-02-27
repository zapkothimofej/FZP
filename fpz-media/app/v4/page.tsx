import HeroThreeLazy from "@/components/v4/HeroThreeLazy"
import Services3DLazy from "@/components/v4/Services3DLazy"
import Navbar from "@/components/v4/Navbar"
import ManifestoSection from "@/components/v4/ManifestoSection"
import ProcessSection from "@/components/v4/ProcessSection"
import StatsSection from "@/components/v4/StatsSection"
import PricingSection from "@/components/v4/PricingSection"
import PortfolioSection from "@/components/v4/PortfolioSection"
import ContactSection from "@/components/v4/ContactSection"
import Footer from "@/components/v4/Footer"

export default function V4Page() {
  return (
    <main style={{ backgroundColor: "#080600" }}>
      <Navbar />
      <HeroThreeLazy />
      <ManifestoSection />
      <Services3DLazy />
      <StatsSection />
      <ProcessSection />
      <PricingSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
