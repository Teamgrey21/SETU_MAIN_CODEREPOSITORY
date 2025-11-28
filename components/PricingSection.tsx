"use client"

import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

type PlanLevel = "starter" | "pro" | "enterprise"

interface PricingFeature {
  name: string
  included: PlanLevel | "all"
}

interface PricingPlan {
  name: string
  level: PlanLevel
  price: {
    monthly: number
    yearly: number
  }
  popular?: boolean
}

const features: PricingFeature[] = [
  { name: "Real-time conversation analysis", included: "starter" },
  { name: "Up to 10,000 messages/month", included: "starter" },
  { name: "Basic sentiment detection", included: "starter" },
  { name: "Email support", included: "starter" },
  { name: "Advanced emotional intelligence", included: "pro" },
  { name: "Up to 100,000 messages/month", included: "pro" },
  { name: "Multi-language support (50+ languages)", included: "pro" },
  { name: "Priority support", included: "pro" },
  { name: "Custom AI model training", included: "enterprise" },
  { name: "Unlimited messages", included: "enterprise" },
  { name: "Dedicated account manager", included: "enterprise" },
  { name: "24/7 phone support", included: "enterprise" },
  { name: "API access", included: "all" },
  { name: "Team collaboration tools", included: "all" },
]

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: { monthly: 29, yearly: 290 },
    level: "starter",
  },
  {
    name: "Pro",
    price: { monthly: 99, yearly: 990 },
    level: "pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 299, yearly: 2990 },
    level: "enterprise",
  },
]

function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel): boolean {
  if (included === "all") return true
  if (included === "enterprise" && level === "enterprise") return true
  if (included === "pro" && (level === "pro" || level === "enterprise")) return true
  if (included === "starter") return true
  return false
}

export function PricingSection() {
  const [isYearly, setIsYearly] = React.useState(false)
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>("pro")

  return (
    null
  )
}
