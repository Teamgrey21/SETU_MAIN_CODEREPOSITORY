"use client"

import PortfolioNavbar from "@/components/PortfolioNavbar"
import ProductTeaserCard from "@/components/ProductTeaserCard"
import { AuthSection } from "@/components/AuthSection"
import BankingScaleHero from "@/components/BankingScaleHero"
import CaseStudiesCarousel from "@/components/CaseStudiesCarousel"
import IntegrationCarousel from "@/components/IntegrationCarousel"
import PricingSection from "@/components/PricingSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"

export default function Page() {
  console.log("[v0] Page component rendering")

  return (
    <div className="min-h-screen w-full">
      {console.log("[v0] Rendering PortfolioNavbar")}
      <PortfolioNavbar />
      {console.log("[v0] Rendering ProductTeaserCard")}
      <ProductTeaserCard />
      {console.log("[v0] Rendering AuthSection")}
      <AuthSection />
      {console.log("[v0] Rendering BankingScaleHero")}
      <BankingScaleHero />
      {console.log("[v0] Rendering CaseStudiesCarousel")}
      <CaseStudiesCarousel />
      {console.log("[v0] Rendering IntegrationCarousel")}
      <IntegrationCarousel />
      {console.log("[v0] Rendering PricingSection")}
      <PricingSection />
      {console.log("[v0] Rendering FAQSection")}
      <FAQSection />
      {console.log("[v0] Rendering Footer")}
      <Footer />
    </div>
  )
}
