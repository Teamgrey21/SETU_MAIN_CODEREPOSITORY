"use client"

import ProductTeaserCard from "@/components/ProductTeaserCard"
import BankingScaleHero from "@/components/BankingScaleHero"
import IntegrationCarousel from "@/components/IntegrationCarousel"
import CaseStudiesCarousel from "@/components/CaseStudiesCarousel"
import PricingSection from "@/components/PricingSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"
import AuthSection from "@/components/AuthSection"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <ProductTeaserCard />
      <AuthSection />
      <BankingScaleHero />
      <IntegrationCarousel />
      <CaseStudiesCarousel />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
