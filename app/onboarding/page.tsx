"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, ArrowRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
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

  const handleComplete = () => {
    console.log("Onboarding completed with data:", formData)
    router.push("/user-section")
  }

  const profileCompletion = step === 1 ? 0 : step === 2 ? 27 : step === 3 ? 66 : 100

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#4A9FD8] via-[#5BA8DC] to-[#3D8FC9]">
      {/* Grid Pattern Background */}
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
        {/* Left Sidebar */}
        <div className="w-64 p-8 flex flex-col gap-8">
          {/* Profile Completion Card */}
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

          {/* Steps Navigation */}
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

        {/* Main Content */}
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
                {/* Header */}
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

                {/* Form Cards */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Name Input - White Card */}
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

                  {/* Age Input - Black Card */}
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

                {/* Occupation Selection - White Card */}
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
                {/* Header */}
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

                {/* Form Cards */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Total Income - White Card */}
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

                  {/* Total Expenses - Black Card */}
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

                  {/* Savings - White Card */}
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

                  {/* Any Major Assets - Black Card */}
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

                {/* Info Note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-white/70 text-sm italic mb-8"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  *you could write your Saving, Emergency Funds, Stock's and Agriculture land as assets too
                </motion.p>

                {/* Self Investment Question Card */}
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
                {/* Header */}
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

                {/* Question Cards Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Send Money Question - White Card */}
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

                  {/* Investing Question - Black Card */}
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

                {/* Investment Types - Black Card */}
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

                {/* Your Financial Goals - White Card */}
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
                    {/* Long-term Goal */}
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

                    {/* Short-term Goal */}
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

                {/* Life Planning Approach Question - Black Card */}
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

                {/* Onboarding Feedback Question - White Card */}
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
                {/* Additional content or actions can be added here */}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-4xl flex items-center justify-between mt-8"
          >
            {/* Previous Button */}
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-8 py-4 bg-white/95 backdrop-blur-sm rounded-2xl text-[#202020] font-medium hover:bg-white transition-all shadow-lg"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
            )}
            {step === 1 && <div />}

            {/* Next/Complete Button */}
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-[#334155] backdrop-blur-sm rounded-2xl text-white font-medium hover:bg-[#475569] transition-all shadow-lg ml-auto"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-8 py-4 bg-[#334155] backdrop-blur-sm rounded-2xl text-white font-medium hover:bg-[#475569] transition-all shadow-lg ml-auto"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Complete
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
