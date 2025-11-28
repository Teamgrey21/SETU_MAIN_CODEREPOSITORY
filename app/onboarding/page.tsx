"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, ArrowRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userId, setUserId] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    occupation: "",
    totalIncome: "",
    totalExpenses: "",
    savings: "",
    majorAsset: "",
    assetValue: "",
    selfInvestment: "",
    sendMoneyToFamily: "",
    hasInvestedBefore: "",
    investmentTypes: [] as string[],
    longTermGoal: "",
    longTermAmount: "",
    shortTermGoal: "",
    shortTermAmount: "",
    lifePlanningApproach: "",
    likedOnboarding: "",
  })

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        console.log("[v0] No authenticated user, redirecting to home")
        router.push("/")
        return
      }

      console.log("[v0] Authenticated user:", user.email)
      setUserEmail(user.email || "")
      setUserId(user.id)
    }

    checkAuth()
  }, [router])

  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Financial Info" },
    { number: 3, label: "Financial Goals/Personality" },
    { number: 4, label: "Let's Begin" },
  ]

  const occupations = ["Student", "Working Professional (salaried employee)", "Self Employed / Entrepreneur", "Retired"]

  const investmentTypes = [
    "Stocks",
    "Precious Metals (Gold or Silver)",
    "FD",
    "Crypto",
    "Digital Gold",
    "Mutual Funds",
    "Real Estate",
    "Business Investment",
  ]

  const toggleInvestmentType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      investmentTypes: prev.investmentTypes.includes(type)
        ? prev.investmentTypes.filter((t) => t !== type)
        : [...prev.investmentTypes, type],
    }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleComplete = async () => {
    setIsLoading(true)

    try {
      const supabase = createClient()

      const onboardingData = {
        user_id: userId,
        email: userEmail,
        name: formData.name,
        age: formData.age ? Number.parseInt(formData.age) : null,
        occupation: formData.occupation,
        income_per_month: formData.totalIncome ? Number.parseFloat(formData.totalIncome) : null,
        expenses_per_month: formData.totalExpenses ? Number.parseFloat(formData.totalExpenses) : null,
        savings_per_month: formData.savings ? Number.parseFloat(formData.savings) : null,
        major_assets: formData.majorAsset,
        assets_value: formData.assetValue ? Number.parseFloat(formData.assetValue) : null,
        invest_money_in_yourself: formData.selfInvestment,
        send_money_to_parents_or_education: formData.sendMoneyToFamily === "Yes",
        have_done_investing: formData.hasInvestedBefore === "Yes",
        investment_types: formData.investmentTypes.join(", "),
        long_term_goals: formData.longTermGoal,
        long_term_goals_value: formData.longTermAmount ? Number.parseFloat(formData.longTermAmount) : null,
        short_term_goals: formData.shortTermGoal,
        short_term_goals_value: formData.shortTermAmount ? Number.parseFloat(formData.shortTermAmount) : null,
        approach_to_life_planning: formData.lifePlanningApproach,
        liked_onboarding_process: formData.likedOnboarding === "Yes",
      }

      console.log("[v0] Saving onboarding data:", onboardingData)

      const { error } = await supabase.from("user_onboarding_information").insert(onboardingData)

      if (error) {
        console.error("[v0] Error saving onboarding data:", error)
        throw error
      }

      console.log("[v0] Onboarding data saved successfully")

      router.push("/user-section")
    } catch (error) {
      console.error("[v0] Error during onboarding completion:", error)
      alert("There was an error saving your information. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const profileCompletion = step === 1 ? 0 : step === 2 ? 27 : step === 3 ? 66 : 100

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#4A9FD8] via-[#5BA8DC] to-[#3D8FC9]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 min-h-screen flex">
        <div className="w-64 p-8 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-[#202020]">{profileCompletion}%</div>
              <div className="w-12 h-12 rounded-full bg-[#e5e5e5] flex items-center justify-center">
                <User className="w-6 h-6 text-[#404040]" />
              </div>
            </div>
            <p className="text-sm text-[#606060] mt-2">Profile completion</p>
          </motion.div>

          <div>
            <h3 className="text-white/80 text-sm font-medium mb-4 tracking-wide">ACCOUNT SETUP</h3>
            <div className="space-y-2">
              {steps.map((s) => (
                <motion.button
                  key={s.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: s.number * 0.1 }}
                  onClick={() => setStep(s.number)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    step === s.number ? "bg-white/25 backdrop-blur-sm text-white" : "text-white/60 hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === s.number ? "bg-white text-[#4A9FD8]" : "bg-white/20 text-white"
                    }`}
                  >
                    {s.number}
                  </div>
                  <span className="text-sm font-medium">{s.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center justify-between">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
          >
            {step === 1 && (
              <>
                <div className="text-center mb-12">
                  <h1
                    className="text-5xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Personal Information
                  </h1>
                  <p className="text-xl text-white/80" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    Let's get to know you better
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <label
                      className="block text-lg font-medium text-[#202020] mb-4"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      What we can call you?
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-xl text-[#202020] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-[#4A9FD8]/50"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#1a1a1a]/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <label
                      className="block text-lg font-medium text-white mb-4"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      What's Your age?
                    </label>
                    <input
                      type="text"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border-0 rounded-xl text-white placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-white/30"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                >
                  <label
                    className="block text-lg font-medium text-[#202020] mb-6"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Select your occupation
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {occupations.map((occupation) => (
                      <button
                        key={occupation}
                        onClick={() => setFormData({ ...formData, occupation })}
                        className={`px-6 py-4 rounded-xl text-left transition-all ${
                          formData.occupation === occupation
                            ? "bg-[#4A9FD8] text-white shadow-md"
                            : "bg-[#f0f0f0] text-[#202020] hover:bg-[#e5e5e5]"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {occupation}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-center mb-12">
                  <h1
                    className="text-5xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Financial Information
                  </h1>
                  <p className="text-xl text-white/80" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    Help us understand your financial situation
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <label
                      className="block text-lg font-medium text-[#202020] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Total Income
                    </label>
                    <p className="text-sm text-[#606060] mb-4">*per month</p>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#202020] font-medium">₹</span>
                      <input
                        type="text"
                        placeholder="Amount"
                        value={formData.totalIncome}
                        onChange={(e) => setFormData({ ...formData, totalIncome: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] border-0 rounded-xl text-[#202020] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-[#4A9FD8]/50"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#1a1a1a]/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <label
                      className="block text-lg font-medium text-white mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Total Expenses
                    </label>
                    <p className="text-sm text-white/60 mb-4">*per month (including everything)</p>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-medium">₹</span>
                      <input
                        type="text"
                        placeholder="Amount"
                        value={formData.totalExpenses}
                        onChange={(e) => setFormData({ ...formData, totalExpenses: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border-0 rounded-xl text-white placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-white/30"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <label
                      className="block text-lg font-medium text-[#202020] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Savings
                    </label>
                    <p className="text-sm text-[#606060] mb-4">*per month</p>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#202020] font-medium">₹</span>
                      <input
                        type="text"
                        placeholder="Amount"
                        value={formData.savings}
                        onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] border-0 rounded-xl text-[#202020] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-[#4A9FD8]/50"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#1a1a1a]/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <label
                      className="block text-lg font-medium text-white mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Any Major Assets
                    </label>
                    <p className="text-sm text-white/60 mb-4">Optional</p>
                    <input
                      type="text"
                      placeholder="eg, house, Land"
                      value={formData.majorAsset}
                      onChange={(e) => setFormData({ ...formData, majorAsset: e.target.value })}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border-0 rounded-xl text-white placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-white/30 mb-3"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-medium">₹</span>
                      <input
                        type="text"
                        placeholder="Approx. Value"
                        value={formData.assetValue}
                        onChange={(e) => setFormData({ ...formData, assetValue: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border-0 rounded-xl text-white placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-white/30"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-white/70 text-sm italic mb-8"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  *you could write your Saving, Emergency Funds, Stock's and Agriculture land as assets too
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                >
                  <h3
                    className="text-lg font-medium text-[#202020] mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Do you think that you invest money in your Self
                  </h3>
                  <p className="text-sm text-[#606060] mb-6 italic">
                    *like - you buy things that make you happy, invest in self skill yet learning new, thinks
                  </p>
                  <div className="flex gap-4">
                    {["Yeha I do", "I do but less", "not at all"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData({ ...formData, selfInvestment: option })}
                        className={`flex-1 px-6 py-4 rounded-xl transition-all ${
                          formData.selfInvestment === option
                            ? "bg-[#4A9FD8] text-white shadow-md"
                            : "bg-[#f0f0f0] text-[#202020] hover:bg-[#e5e5e5]"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-center mb-12">
                  <h1
                    className="text-5xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Financial Goals/Personality
                  </h1>
                  <p className="text-xl text-white/80" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    Tell us about your financial aspirations
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <h3
                      className="text-lg font-medium text-[#202020] mb-6"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Send money to parents or child's education?
                    </h3>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setFormData({ ...formData, sendMoneyToFamily: option })}
                          className={`flex-1 px-6 py-4 rounded-xl transition-all font-medium ${
                            formData.sendMoneyToFamily === option
                              ? "bg-[#1a1a1a] text-white shadow-md"
                              : "bg-[#f0f0f0] text-[#202020] hover:bg-[#e5e5e5]"
                          }`}
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#1a1a1a]/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                  >
                    <h3
                      className="text-lg font-medium text-white mb-6"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Have you done any investing yourself?
                    </h3>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setFormData({ ...formData, hasInvestedBefore: option })}
                          className={`flex-1 px-6 py-4 rounded-xl transition-all font-medium ${
                            formData.hasInvestedBefore === option
                              ? "bg-white text-[#1a1a1a] shadow-md"
                              : "bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
                          }`}
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#1a1a1a]/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-6"
                >
                  <h3
                    className="text-lg font-medium text-white mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    What types of investments have you made?
                  </h3>
                  <p className="text-sm text-white/60 mb-6">Select all that apply</p>
                  <div className="grid grid-cols-4 gap-4">
                    {investmentTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleInvestmentType(type)}
                        className={`px-4 py-4 rounded-xl transition-all text-center ${
                          formData.investmentTypes.includes(type)
                            ? "bg-white text-[#1a1a1a] shadow-md"
                            : "bg-[#3a3a3a] text-white hover:bg-[#4a4a4a]"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                >
                  <h3
                    className="text-2xl font-semibold text-[#202020] mb-8"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Your Financial Goals
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-[#606060] uppercase tracking-wide mb-3">
                        LONG-TERM GOAL
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Buy a house"
                        value={formData.longTermGoal}
                        onChange={(e) => setFormData({ ...formData, longTermGoal: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-xl text-[#202020] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-[#4A9FD8]/50 mb-3"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#202020] font-medium">₹</span>
                        <input
                          type="text"
                          placeholder="Amount"
                          value={formData.longTermAmount}
                          onChange={(e) => setFormData({ ...formData, longTermAmount: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] border-0 rounded-xl text-[#202020] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-[#4A9FD8]/50"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#606060] uppercase tracking-wide mb-3">
                        SHORT-TERM GOAL
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Save for vacation"
                        value={formData.shortTermGoal}
                        onChange={(e) => setFormData({ ...formData, shortTermGoal: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-xl text-[#202020] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-[#4A9FD8]/50 mb-3"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#202020] font-medium">₹</span>
                        <input
                          type="text"
                          placeholder="Amount"
                          value={formData.shortTermAmount}
                          onChange={(e) => setFormData({ ...formData, shortTermAmount: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] border-0 rounded-xl text-[#202020] placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-[#4A9FD8]/50"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-[#1a1a1a]/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg mt-6"
                >
                  <h3
                    className="text-lg font-medium text-white mb-6"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Your approach to life planning and money management
                  </h3>
                  <textarea
                    placeholder="Share your thoughts..."
                    value={formData.lifePlanningApproach}
                    onChange={(e) => setFormData({ ...formData, lifePlanningApproach: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-4 bg-[#2a2a2a] border-0 rounded-xl text-white placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg mt-6"
                >
                  <h3
                    className="text-lg font-medium text-[#202020] mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Like the onboarding process?
                  </h3>
                  <p className="text-sm text-[#606060] mb-6">Optional</p>
                  <div className="flex gap-4">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData({ ...formData, likedOnboarding: option })}
                        className={`flex-1 px-6 py-4 rounded-xl transition-all ${
                          formData.likedOnboarding === option
                            ? "bg-[#4A9FD8] text-white shadow-md"
                            : "bg-[#f0f0f0] text-[#202020] hover:bg-[#e5e5e5]"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {step === 4 && (
              <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-3">Get Started with Setu</h1>
                <p className="text-xl text-white/80 mb-6">Let's work together on your Finances. Let's Begin</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-4xl flex items-center justify-between mt-8"
          >
            {step > 1 && (
              <button
                onClick={handlePrevious}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-4 bg-white/95 backdrop-blur-sm rounded-2xl text-[#202020] font-medium hover:bg-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
            )}
            {step === 1 && <div />}

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-4 bg-[#334155] backdrop-blur-sm rounded-2xl text-white font-medium hover:bg-[#475569] transition-all shadow-lg ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-4 bg-[#334155] backdrop-blur-sm rounded-2xl text-white font-medium hover:bg-[#475569] transition-all shadow-lg ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {isLoading ? "Saving..." : "Complete"}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
