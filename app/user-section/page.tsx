"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  BarChart3,
  MessageSquare,
  FileText,
  History,
  Settings,
  HelpCircle,
  Github,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  Upload,
  Download,
  Copy,
  Link2,
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  User,
  Newspaper,
  Trash2,
} from "lucide-react"

import { createClient } from "@/lib/supabase/client"

export default function UserSectionPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("Home")
  const [messages, setMessages] = useState<Array<{ type: "user" | "bot"; text: string }>>([])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const [userData, setUserData] = useState<any>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient()

        // Get current user
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          console.log("[v0] No authenticated user, redirecting to landing page")
          router.push("/")
          return
        }

        setUserEmail(user.email || "")

        // Fetch onboarding data
        const { data: onboardingData, error: onboardingError } = await supabase
          .from("user_onboarding_information")
          .select("*")
          .eq("email", user.email)
          .single()

        if (onboardingError) {
          console.error("[v0] Error fetching onboarding data:", onboardingError)
          setIsLoadingData(false)
          return
        }

        if (onboardingData) {
          console.log("[v0] Onboarding data fetched successfully:", onboardingData)
          setUserData(onboardingData)

          setSettingsData({
            name: onboardingData.name || "",
            age: onboardingData.age?.toString() || "",
            occupation: onboardingData.occupation || "",
            totalIncome: onboardingData.income_per_month?.toString() || "",
            totalExpenses: onboardingData.expenses_per_month?.toString() || "",
            savings: onboardingData.savings_per_month?.toString() || "",
            majorAsset: onboardingData.major_assets || "",
            assetValue: onboardingData.assets_value?.toString() || "",
            investmentTypes: onboardingData.investment_types
              ? onboardingData.investment_types.split(",").map((t: string) => t.trim())
              : [],
            longTermGoal: onboardingData.long_term_goals || "",
            longTermAmount: onboardingData.long_term_goals_value?.toString() || "",
            shortTermGoal: onboardingData.short_term_goals || "",
            shortTermAmount: onboardingData.short_term_goals_value?.toString() || "",
            lifePlanningApproach: onboardingData.approach_to_life_planning || "",
          })
        }

        setIsLoadingData(false)
      } catch (error) {
        console.error("[v0] Error in fetchUserData:", error)
        setIsLoadingData(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleSaveSettings = async () => {
    try {
      const supabase = createClient()

      const updateData = {
        name: settingsData.name,
        age: Number.parseInt(settingsData.age) || null,
        occupation: settingsData.occupation,
        income_per_month: Number.parseFloat(settingsData.totalIncome) || null,
        expenses_per_month: Number.parseFloat(settingsData.totalExpenses) || null,
        savings_per_month: Number.parseFloat(settingsData.savings) || null,
        major_assets: settingsData.majorAsset,
        assets_value: Number.parseFloat(settingsData.assetValue) || null,
        investment_types: settingsData.investmentTypes.join(", "),
        long_term_goals: settingsData.longTermGoal,
        long_term_goals_value: Number.parseFloat(settingsData.longTermAmount) || null,
        short_term_goals: settingsData.shortTermGoal,
        short_term_goals_value: Number.parseFloat(settingsData.shortTermAmount) || null,
        approach_to_life_planning: settingsData.lifePlanningApproach,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("user_onboarding_information").update(updateData).eq("email", userEmail)

      if (error) {
        console.error("[v0] Error updating settings:", error)
        alert("Error saving settings. Please try again.")
        return
      }

      console.log("[v0] Settings updated successfully")
      alert("Settings saved successfully!")

      // Refresh user data
      setUserData({ ...userData, ...updateData })
    } catch (error) {
      console.error("[v0] Error in handleSaveSettings:", error)
      alert("Error saving settings. Please try again.")
    }
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("[v0] Error during logout:", error)
    }
  }

  const [settingsData, setSettingsData] = useState({
    name: "Abby Cooper",
    age: "28",
    occupation: "Working Professional (salaried employee)",
    totalIncome: "75000",
    totalExpenses: "45000",
    savings: "30000",
    majorAsset: "House",
    assetValue: "5000000",
    selfInvestment: "Yeha I do",
    sendMoneyToFamily: "Yes",
    hasInvestedBefore: "Yes",
    investmentTypes: ["Stocks", "Mutual Funds", "FD"],
    longTermGoal: "Buy a house",
    longTermAmount: "2000000",
    shortTermGoal: "Save for vacation",
    shortTermAmount: "50000",
    lifePlanningApproach: "I believe in systematic planning and regular investments",
    likedOnboarding: "Yes",
  })

  const occupations = ["Student", "Working Professional (salaried employee)", "Self Employed / Entrepreneur", "Retired"]
  const investmentOptions = [
    "Stocks",
    "Precious Metals (Gold or Silver)",
    "FD",
    "Crypto",
    "Digital Gold",
    "Mutual Funds",
    "Real Estate",
    "Business Investment",
  ]

  const newsItems = [
    {
      id: 1,
      title: "RBI announces new monetary policy decisions for Q4 2024",
      source: "Google News",
      time: "2h ago",
      url: "#",
    },
    {
      id: 2,
      title: "New tax regulations for startups in India announced",
      source: "Instagram",
      time: "5h ago",
      url: "#",
    },
    {
      id: 3,
      title: "Stock market hits all-time high amid economic recovery",
      source: "Google News",
      time: "8h ago",
      url: "#",
    },
  ]

  const chatHistory = [
    {
      id: 1,
      title: "How to calculate EMI?",
      url: "chat.setu/hKWhPa",
      originalUrl: "financesetu.com/chats",
      time: "7m",
      description: "EMI calculation query",
      messageCount: 27,
      avatar: "FS",
      avatarColor: "#3b82f6",
    },
    {
      id: 2,
      title: "Investment tax advice",
      url: "chat.setu/1SnIPc",
      originalUrl: "financesetu.com/investments",
      time: "10d",
      description: "Tax planning discussion",
      messageCount: 48,
      avatar: "FS",
      avatarColor: "#3b82f6",
    },
    {
      id: 3,
      title: "Startup registration help",
      url: "chat.setu/1SnIPc",
      originalUrl: "financesetu.com/startup",
      time: "10d",
      description: "Business setup guidance",
      messageCount: 48,
      avatar: "FS",
      avatarColor: "#f97316",
    },
    {
      id: 4,
      title: "Home loan options",
      url: "chat.setu/1SnIPc",
      originalUrl: "financesetu.com/loans",
      time: "10d",
      description: "Loan comparison queries",
      messageCount: 48,
      avatar: "FS",
      avatarColor: "#eab308",
    },
    {
      id: 5,
      title: "Savings account query",
      url: "chat.setu/1SnIPc",
      originalUrl: "financesetu.com/savings",
      time: "10d",
      description: "Bank account questions",
      messageCount: 48,
      avatar: "QS",
      avatarColor: "#ef4444",
    },
  ]

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Analysis", icon: BarChart3 },
    { name: "Ask Setu", icon: MessageSquare },
    { name: "Financial Summaries", icon: FileText },
    { name: "Chat History", icon: History },
  ]

  const bottomMenuItems = [
    { name: "Settings", icon: Settings },
    { name: "Help Center", icon: HelpCircle },
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { type: "user", text: inputValue }])
    setInputValue("")
    setIsProcessing(true)

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: "I received your message and I'm processing it." }])
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full bg-black flex">
      {/* Sidebar */}
      <aside
        className={`${isSidebarCollapsed ? "w-20" : "w-80"} h-screen bg-white border-r border-[#e5e5e5] flex flex-col sticky top-0 transition-all duration-300`}
      >
        {/* Header */}
        {/* Added flex-shrink-0 to prevent header from shrinking */}
        <div className="p-6 border-b border-[#e5e5e5] flex items-center justify-between flex-shrink-0">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-10 h-10 bg-[#202020] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FS</span>
              </div>
              <div className="flex flex-col">
                <h2
                  className="text-[#202020] font-semibold text-lg"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Finance Setu
                </h2>
                <p className="text-[#6b7280] text-xs" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  mail.financesetu@gmail.com
                </p>
              </div>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="w-10 h-10 bg-[#202020] rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
          )}
          {!isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 hover:bg-[#f3f4f6] rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#6b7280]" />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive ? "bg-[#f3f4f6] text-[#202020]" : "text-[#6b7280] hover:bg-[#f9fafb]"
                  } ${isSidebarCollapsed ? "justify-center" : ""}`}
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  title={isSidebarCollapsed ? item.name : ""}
                >
                  <Icon className="w-5 h-5" />
                  {!isSidebarCollapsed && <span className="font-medium">{item.name}</span>}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#e5e5e5] flex-shrink-0">
          {/* Social Icons */}
          <div className={`flex items-center gap-3 mb-4 ${isSidebarCollapsed ? "flex-col px-0" : "px-4"}`}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-[#f3f4f6] rounded-md transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5 text-[#6b7280]" />
            </a>
            <a
              href="mailto:mail.financesetu@gmail.com"
              className="p-2 hover:bg-[#f3f4f6] rounded-md transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5 text-[#6b7280]" />
            </a>
          </div>

          {/* Bottom Menu Items */}
          <div className="space-y-1">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6b7280] hover:bg-[#f9fafb] transition-all ${isSidebarCollapsed ? "justify-center" : ""}`}
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  title={isSidebarCollapsed ? item.name : ""}
                >
                  <Icon className="w-5 h-5" />
                  {!isSidebarCollapsed && <span className="font-medium">{item.name}</span>}
                </button>
              )
            })}
          </div>

          {isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="w-full flex items-center justify-center px-4 py-3 mt-2 rounded-lg text-[#6b7280] hover:bg-[#f9fafb] transition-all"
              title="Expand sidebar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      <main className="flex-1 bg-white flex flex-col">
        {activeSection === "Home" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8 gap-6 overflow-y-auto">
            {/* User Profile and Ask Setu cards side by side */}
            <div className="grid grid-cols-2 gap-6">
              {/* User Profile Card */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-lg font-semibold text-[#6b7280] mb-6"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  User Profile
                </h2>
                {isLoadingData ? (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-[#6b7280]">Loading profile...</p>
                  </div>
                ) : userData ? (
                  <div className="flex flex-col gap-6">
                    {/* Avatar */}
                    <div className="w-20 h-20 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto">
                      <User className="w-10 h-10 text-[#6b7280]" />
                    </div>

                    {/* User Details */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p
                            className="text-sm text-[#6b7280] mb-1"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            Name
                          </p>
                          <p
                            className="text-base font-medium text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {userData.name || "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-sm text-[#6b7280] mb-1"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            Age
                          </p>
                          <p
                            className="text-base font-medium text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {userData.age || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p
                          className="text-sm text-[#6b7280] mb-1"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Occupation
                        </p>
                        <p
                          className="text-base font-medium text-[#202020]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {userData.occupation || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm text-[#6b7280] mb-1"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Email
                        </p>
                        <p
                          className="text-base font-medium text-[#202020]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {userData.email || userEmail}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm text-[#6b7280] mb-1"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Monthly Income
                        </p>
                        <p
                          className="text-base font-medium text-[#202020]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          ₹{userData.income_per_month?.toLocaleString() || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 gap-4">
                    <p className="text-[#6b7280]">No profile data found</p>
                    <button
                      onClick={() => router.push("/onboarding")}
                      className="px-4 py-2 bg-[#202020] text-white rounded-lg hover:bg-[#404040] transition-colors"
                    >
                      Complete Onboarding
                    </button>
                  </div>
                )}
              </div>

              {/* Ask Setu Interface Card */}
              <button
                onClick={() => setActiveSection("Ask Setu")}
                className="bg-white border border-[#e5e5e5] rounded-2xl p-6 hover:shadow-md transition-all group h-full"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {/* Logo Icon */}
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 bg-white border-2 border-[#202020] rounded-2xl rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-6 h-6 bg-[#202020] rounded -rotate-45"></div>
                    </div>
                  </div>

                  {/* Heading */}
                  <h2
                    className="text-2xl font-semibold text-[#202020] mb-3"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    How can I help today?
                  </h2>

                  {/* Subtitle */}
                  <p className="text-[#6b7280] mb-6" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    Click here to start chatting with Setu
                  </p>

                  {/* Input Field Preview */}
                  <div className="w-full max-w-sm">
                    <div className="flex items-center gap-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-2xl px-4 py-3 pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-[#9ca3af]" />
                      <span
                        className="flex-1 text-[#9ca3af] text-left"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Ask anything...
                      </span>
                      <Send className="w-5 h-5 text-[#9ca3af]" />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* News Feed Card */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-[#202020]" />
                  <h2
                    className="text-lg font-semibold text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Financial News Feed
                  </h2>
                </div>
              </div>

              {/* News Items */}
              <div className="space-y-3 mb-6">
                {newsItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    className="block p-4 bg-[#f9fafb] hover:bg-[#f3f4f6] rounded-xl transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3
                          className="text-[#202020] font-medium mb-2 line-clamp-2"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                          <span>{item.source}</span>
                          <span>•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <Link2 className="w-4 h-4 text-[#6b7280] flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-[#202020] hover:bg-[#404040] text-white rounded-xl transition-colors font-medium"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Summaries
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-white border-2 border-[#202020] hover:bg-[#f9fafb] text-[#202020] rounded-xl transition-colors font-medium"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  The Whole Thing
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "Chat History" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <h1
                  className="text-2xl font-semibold text-[#202020]"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Chat History
                </h1>
                <ChevronLeft className="w-5 h-5 text-[#6b7280] rotate-90" />
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2.5 bg-[#f3f4f6] hover:bg-[#e5e7eb] rounded-lg transition-colors"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium text-[#202020]">New Chat</span>
              </button>
            </div>

            {/* Chat History List */}
            <div className="space-y-3 mb-8">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="bg-white border border-[#e5e5e5] rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: chat.avatarColor }}
                  >
                    <span className="text-white font-semibold text-sm">{chat.avatar}</span>
                  </div>

                  {/* Link Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-semibold text-[#202020]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {chat.url}
                      </span>
                      <button className="p-1 hover:bg-[#f3f4f6] rounded transition-colors">
                        <Copy className="w-4 h-4 text-[#6b7280]" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                      <span className="flex items-center gap-1">
                        <ChevronLeft className="w-3 h-3 rotate-180" />
                        {chat.originalUrl}
                      </span>
                      <span>•</span>
                      <span>{chat.time}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#6b7280]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      {chat.description}
                    </p>
                  </div>

                  {/* Convert Button */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      className="px-4 py-2 bg-[#202020] hover:bg-[#404040] text-white rounded-lg transition-colors font-medium text-sm"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Convert
                    </button>
                    <button className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-[#6b7280]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty Bottom Sections */}
            <div className="grid grid-cols-2 gap-6">
              {/* Home Navigation Card */}
              <button
                onClick={() => setActiveSection("Home")}
                className="bg-white border border-[#e5e5e5] rounded-2xl p-8 hover:shadow-lg transition-all group h-64 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-[#f3f4f6] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#202020] transition-colors">
                  <Home className="w-8 h-8 text-[#202020] group-hover:text-white transition-colors" />
                </div>
                <h3
                  className="text-xl font-semibold text-[#202020] mb-2"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Go to Home
                </h3>
                <p className="text-[#6b7280] text-center" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  View your dashboard and profile
                </p>
              </button>

              {/* Financial Summaries Navigation Card */}
              <button
                onClick={() => setActiveSection("Financial Summaries")}
                className="bg-white border border-[#e5e5e5] rounded-2xl p-8 hover:shadow-lg transition-all group h-64 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-[#f3f4f6] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#202020] transition-colors">
                  <FileText className="w-8 h-8 text-[#202020] group-hover:text-white transition-colors" />
                </div>
                <h3
                  className="text-xl font-semibold text-[#202020] mb-2"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Financial Summaries
                </h3>
                <p className="text-[#6b7280] text-center" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Access your financial reports
                </p>
              </button>
            </div>
          </div>
        )}

        {activeSection === "Ask Setu" && (
          <>
            {messages.length === 0 ? (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center px-8">
                {/* Logo Icon */}
                <div className="mb-8 relative">
                  <div className="w-16 h-16 bg-white border-2 border-[#202020] rounded-2xl rotate-45 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#202020] rounded -rotate-45"></div>
                  </div>
                </div>

                {/* Heading */}
                <h1
                  className="text-3xl font-semibold text-[#202020] mb-3"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  How can I help today?
                </h1>

                {/* Subtitle */}
                <p className="text-[#6b7280] mb-12" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Try out new features: <span className="font-medium">Deep Search, Think, Edit Image</span>
                </p>

                {/* Input Field */}
                <div className="w-full max-w-2xl">
                  <div className="relative flex items-center gap-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-2xl px-4 py-3">
                    <Upload className="w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="text"
                      placeholder="Ask anything..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-transparent outline-none text-[#202020] placeholder:text-[#9ca3af]"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                    <button className="p-1.5 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                      <Settings className="w-5 h-5 text-[#6b7280]" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="p-1.5 bg-[#9ca3af] hover:bg-[#6b7280] rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Chat State
              <>
                {/* User Avatars in top right */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#202020] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">hi</span>
                  </div>
                  <div className="w-10 h-10 bg-[#f3f4f6] border border-[#e5e5e5] rounded-full flex items-center justify-center">
                    <span className="text-[#202020] text-sm font-medium">U</span>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-8 py-12 space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "bot" && (
                        <div className="w-10 h-10 bg-[#202020] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-2xl px-6 py-4 rounded-2xl ${
                          message.type === "bot" ? "bg-[#f9fafb] text-[#202020]" : "bg-[#202020] text-white"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Field at bottom */}
                <div className="border-t border-[#e5e5e5] px-8 py-6">
                  <div className="relative flex items-center gap-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-2xl px-4 py-3 max-w-4xl mx-auto">
                    <Upload className="w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="text"
                      placeholder="Ask anything..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-transparent outline-none text-[#202020] placeholder:text-[#9ca3af]"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                    <button className="p-1.5 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                      <Settings className="w-5 h-5 text-[#6b7280]" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="p-1.5 bg-[#9ca3af] hover:bg-[#6b7280] rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Analysis Section */}
        {activeSection === "Analysis" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8 gap-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chat History with Setu Table */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-semibold text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Chat History with Setu
                  </h2>
                  <button
                    className="text-sm text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    See All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#e5e5e5]">
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          #
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Dates
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Employee
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Employeer
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 1,
                          date: "Aug 28, 2013",
                          employee: "Theresa Steward",
                          employeer: "Pat Robertson",
                          amount: "5000",
                        },
                        {
                          id: 2,
                          date: "July 7, 2014",
                          employee: "Adrian Shavkat",
                          employeer: "Norman Cooper",
                          amount: "5850",
                        },
                        {
                          id: 3,
                          date: "May 2, 2015",
                          employee: "Ralph Black",
                          employeer: "Audrey Jones",
                          amount: "5450",
                        },
                        {
                          id: 4,
                          date: "Feb 6, 2016",
                          employee: "Eduardo Webb",
                          employeer: "Audrey Jones",
                          amount: "5700",
                        },
                      ].map((row) => (
                        <tr key={row.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors">
                          <td
                            className="py-3 px-2 text-sm text-[#6b7280]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.id}
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.date}
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.employee}
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.employeer}
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Documents Table */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-semibold text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Financial Documents
                  </h2>
                  <button
                    className="flex items-center gap-2 text-sm text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#e5e5e5]">
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          #
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Title
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Date
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Type
                        </th>
                        <th
                          className="text-left py-3 px-2 text-sm font-medium text-[#6b7280]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, title: "Passport Scan", date: "2023-01-01" },
                        { id: 2, title: "Income Statement", date: "2023-02-01" },
                        { id: 3, title: "Bank Statement", date: "2023-03-01" },
                      ].map((row) => (
                        <tr key={row.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors">
                          <td
                            className="py-3 px-2 text-sm text-[#6b7280]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.id}
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.title}
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {row.date}
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            Document
                          </td>
                          <td
                            className="py-3 px-2 text-sm text-[#202020]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            <button className="p-1 hover:bg-[#f3f4f6] rounded transition-colors">
                              <Download className="w-4 h-4 text-[#6b7280]" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Risk Indicators Widget */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-xl font-semibold text-[#202020] mb-6"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Risk Indicators
                </h2>

                <div className="space-y-4">
                  {[
                    { label: "Credit Risk", value: 35, color: "bg-green-500" },
                    { label: "Market Risk", value: 68, color: "bg-yellow-500" },
                    { label: "Liquidity Risk", value: 82, color: "bg-red-500" },
                    { label: "Operational Risk", value: 45, color: "bg-blue-500" },
                  ].map((risk, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="text-sm font-medium text-[#202020]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {risk.label}
                        </span>
                        <span
                          className="text-sm font-semibold text-[#202020]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {risk.value}%
                        </span>
                      </div>
                      <div className="w-full bg-[#f3f4f6] rounded-full h-2.5">
                        <div
                          className={`${risk.color} h-2.5 rounded-full transition-all duration-300`}
                          style={{ width: `${risk.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar Widget */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-xl font-semibold text-[#202020] mb-6"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Calendar
                </h2>

                <div className="space-y-4">
                  {/* Month & Year Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                      <ChevronLeft className="w-5 h-5 text-[#6b7280]" />
                    </button>
                    <span
                      className="text-lg font-semibold text-[#202020]"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      November 2025
                    </span>
                    <button className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5 text-[#6b7280]" />
                    </button>
                  </div>

                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-[#6b7280] py-2"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 2
                      const isToday = day === 28
                      const isInMonth = day > 0 && day <= 30
                      return (
                        <button
                          key={i}
                          className={`py-2 text-sm rounded-lg transition-colors ${
                            isToday
                              ? "bg-[#202020] text-white font-semibold"
                              : isInMonth
                                ? "hover:bg-[#f3f4f6] text-[#202020]"
                                : "text-[#d1d5db]"
                          }`}
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {isInMonth ? day : ""}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Financial Overview Widget */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-xl font-semibold text-[#202020] mb-6"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Financial Overview
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      label: "Income",
                      amount: "₹85,000",
                      icon: TrendingUp,
                      color: "text-green-500",
                      bgColor: "bg-green-50",
                    },
                    {
                      label: "Expenses",
                      amount: "₹52,000",
                      icon: TrendingDown,
                      color: "text-red-500",
                      bgColor: "bg-red-50",
                    },
                    {
                      label: "Savings",
                      amount: "₹33,000",
                      icon: Wallet,
                      color: "text-blue-500",
                      bgColor: "bg-blue-50",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-xl hover:bg-[#f3f4f6] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`${item.bgColor} p-3 rounded-xl`}>
                            <Icon className={`w-5 h-5 ${item.color}`} />
                          </div>
                          <span
                            className="text-sm font-medium text-[#6b7280]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span
                          className="text-lg font-semibold text-[#202020]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {item.amount}
                        </span>
                      </div>
                    )
                  })}

                  <div className="pt-4 border-t border-[#e5e5e5]">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-sm font-medium text-[#6b7280]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Net Balance
                      </span>
                      <span
                        className="text-xl font-bold text-green-500"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        ₹33,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Summaries Section */}
        {activeSection === "Financial Summaries" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8 gap-6 overflow-y-auto">
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2
                    className="text-xl font-semibold text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Financial Summaries
                  </h2>
                </div>
              </div>

              {/* Chat History Items */}
              <div className="space-y-4">
                {[
                  {
                    avatar: "FS",
                    color: "bg-blue-500",
                    reportName: "EMI Calculation Report",
                    fullUrl: "financesetu.com/chats",
                    time: "7m",
                    description: "EMI calculation query",
                  },
                  {
                    avatar: "FS",
                    color: "bg-blue-500",
                    reportName: "Tax Planning Report",
                    fullUrl: "financesetu.com/investments",
                    time: "10d",
                    description: "Tax planning discussion",
                  },
                  {
                    avatar: "FS",
                    color: "bg-orange-500",
                    reportName: "Business Setup Report",
                    fullUrl: "financesetu.com/startup",
                    time: "10d",
                    description: "Business setup guidance",
                  },
                  {
                    avatar: "FS",
                    color: "bg-yellow-500",
                    reportName: "Loan Comparison Report",
                    fullUrl: "financesetu.com/loans",
                    time: "10d",
                    description: "Loan comparison queries",
                  },
                  {
                    avatar: "QS",
                    color: "bg-red-500",
                    reportName: "Bank Account Report",
                    fullUrl: "financesetu.com/savings",
                    time: "10d",
                    description: "Bank account questions",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-[#e5e5e5] rounded-xl hover:shadow-sm transition-shadow"
                  >
                    {/* Avatar */}
                    <div
                      className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white font-semibold text-sm">{item.avatar}</span>
                    </div>

                    {/* URL and Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-semibold text-[#202020]"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {item.reportName}
                        </span>
                        <button className="text-[#6b7280] hover:text-[#202020] transition-colors"></button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 min-w-0"></div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        className="flex items-center gap-2 px-6 py-2 bg-[#202020] text-white rounded-lg hover:bg-[#404040] transition-colors font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="text-[#6b7280] hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === "Settings" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8 gap-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              {/* Header */}
              <div className="mb-6">
                <h1
                  className="text-3xl font-semibold text-[#202020] mb-2"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Settings
                </h1>
                <p className="text-[#606060]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Manage your account and preferences
                </p>
              </div>

              {/* Personal Information */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-xl font-semibold text-[#202020] mb-4"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={settingsData.name}
                      onChange={(e) => setSettingsData({ ...settingsData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Age
                    </label>
                    <input
                      type="text"
                      value={settingsData.age}
                      onChange={(e) => setSettingsData({ ...settingsData, age: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-sm font-medium text-[#404040] mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Occupation
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {occupations.map((occupation) => (
                      <button
                        key={occupation}
                        onClick={() => setSettingsData({ ...settingsData, occupation })}
                        className={`px-4 py-3 rounded-xl text-left text-sm transition-all ${
                          settingsData.occupation === occupation
                            ? "bg-[#202020] text-white"
                            : "bg-[#f9fafb] text-[#404040] hover:bg-[#f0f0f0] border border-[#e5e5e5]"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {occupation}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-xl font-semibold text-[#202020] mb-4"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Financial Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Total Income (per month)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]">₹</span>
                      <input
                        type="text"
                        value={settingsData.totalIncome}
                        onChange={(e) => setSettingsData({ ...settingsData, totalIncome: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Total Expenses (per month)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]">₹</span>
                      <input
                        type="text"
                        value={settingsData.totalExpenses}
                        onChange={(e) => setSettingsData({ ...settingsData, totalExpenses: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Savings (per month)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]">₹</span>
                      <input
                        type="text"
                        value={settingsData.savings}
                        onChange={(e) => setSettingsData({ ...settingsData, savings: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Major Asset
                    </label>
                    <input
                      type="text"
                      value={settingsData.majorAsset}
                      onChange={(e) => setSettingsData({ ...settingsData, majorAsset: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Asset Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]">₹</span>
                      <input
                        type="text"
                        value={settingsData.assetValue}
                        onChange={(e) => setSettingsData({ ...settingsData, assetValue: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Preferences */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-xl font-semibold text-[#202020] mb-4"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Investment Preferences
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {investmentOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          const types = settingsData.investmentTypes.includes(option)
                            ? settingsData.investmentTypes.filter((t) => t !== option)
                            : [...settingsData.investmentTypes, option]
                          setSettingsData({ ...settingsData, investmentTypes: types })
                        }}
                        className={`px-4 py-3 rounded-xl text-sm transition-all ${
                          settingsData.investmentTypes.includes(option)
                            ? "bg-[#202020] text-white"
                            : "bg-[#f9fafb] text-[#404040] hover:bg-[#f0f0f0] border border-[#e5e5e5]"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Goals */}
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                <h2
                  className="text-xl font-semibold text-[#202020] mb-4"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Financial Goals
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Long-term Goal
                    </label>
                    <input
                      type="text"
                      value={settingsData.longTermGoal}
                      onChange={(e) => setSettingsData({ ...settingsData, longTermGoal: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20 mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]">₹</span>
                      <input
                        type="text"
                        placeholder="Amount"
                        value={settingsData.longTermAmount}
                        onChange={(e) => setSettingsData({ ...settingsData, longTermAmount: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Short-term Goal
                    </label>
                    <input
                      type="text"
                      value={settingsData.shortTermGoal}
                      onChange={(e) => setSettingsData({ ...settingsData, shortTermGoal: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20 mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]">₹</span>
                      <input
                        type="text"
                        placeholder="Amount"
                        value={settingsData.shortTermAmount}
                        onChange={(e) => setSettingsData({ ...settingsData, shortTermAmount: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-[#404040] mb-2"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Life Planning Approach
                    </label>
                    <textarea
                      value={settingsData.lifePlanningApproach}
                      onChange={(e) => setSettingsData({ ...settingsData, lifePlanningApproach: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e5e5] rounded-xl text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#202020]/20 resize-none"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-6 py-3 bg-[#202020] text-white rounded-xl hover:bg-[#404040] transition-colors font-medium"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Center Section */}
        {activeSection === "Help Center" && (
          <div className="flex-1 flex items-center justify-center bg-[#f9fafb]">
            <div className="text-center">
              <HelpCircle className="w-16 h-16 text-[#9ca3af] mx-auto mb-4" />
              <h2
                className="text-2xl font-semibold text-[#202020] mb-2"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Help Center
              </h2>
              <p className="text-[#606060]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Coming soon
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
