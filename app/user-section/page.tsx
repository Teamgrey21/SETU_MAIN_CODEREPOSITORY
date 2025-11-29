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

interface NewsItem {
  id: string
  title: string
  source: string
  url: string
  time_ago: string
  published_at: string
}

interface ChatConversation {
  id: string
  session_id: string
  title: string
  description: string | null
  original_url: string | null
  short_url: string | null
  avatar_text: string
  avatar_color: string
  message_count: number
  created_at: string
  updated_at: string
}

interface FinancialSummary {
  id: string
  report_name: string
  report_type: string | null
  description: string | null
  full_url: string | null
  avatar_text: string
  avatar_color: string
  file_path: string | null
  created_at: string
}

interface AnalysisData {
  id: string
  risk_credit: number
  risk_market: number
  risk_liquidity: number
  risk_operational: number
  monthly_income: number
  monthly_expenses: number
  monthly_savings: number
  updated_at: string
}

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
  const [userId, setUserId] = useState("")
  const [sessionId, setSessionId] = useState<string>("")

  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [chatHistory, setChatHistory] = useState<ChatConversation[]>([])
  const [financialSummaries, setFinancialSummaries] = useState<FinancialSummary[]>([])
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoadingNews, setIsLoadingNews] = useState(true)
  const [isLoadingChats, setIsLoadingChats] = useState(true)
  const [isLoadingSummaries, setIsLoadingSummaries] = useState(true)
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true)

  const [isTeachEasySidebarOpen, setIsTeachEasySidebarOpen] = useState(false)
  const [teachEasyMessages, setTeachEasyMessages] = useState<Array<{ type: "user" | "bot"; text: string }>>([])
  const [teachEasyInput, setTeachEasyInput] = useState("")
  const [isTeachEasyProcessing, setIsTeachEasyProcessing] = useState(false)

  // Educational videos data
  const educationalVideos = [
    {
      id: 1,
      title: "Understanding Personal Finance Basics",
      channel: "Finance Setu",
      duration: "12:45",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "How to Create a Budget",
      channel: "Finance Setu",
      duration: "8:30",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Investment Strategies for Beginners",
      channel: "Finance Setu",
      duration: "15:20",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Tax Planning 101",
      channel: "Finance Setu",
      duration: "11:15",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Emergency Fund Essentials",
      channel: "Finance Setu",
      duration: "9:50",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ]

  useEffect(() => {
    const fetchAllData = async () => {
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
        setUserId(user.id)

        // Fetch onboarding data
        const { data: onboardingData, error: onboardingError } = await supabase
          .from("user_onboarding_information")
          .select("*")
          .eq("email", user.email)
          .single()

        if (onboardingError) {
          console.error("[v0] Error fetching onboarding data:", onboardingError)
        } else if (onboardingData) {
          console.log("[v0] Onboarding data fetched successfully")
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

          // Initialize analysis data if it doesn't exist
          await initializeAnalysisData(supabase, user.id, onboardingData)
        }

        setIsLoadingData(false)

        // Fetch news feed
        await fetchNewsItems(supabase, user.id)

        // Fetch chat history
        await fetchChatHistory(supabase, user.id)

        // Fetch financial summaries
        await fetchFinancialSummaries(supabase, user.id)

        // Fetch analysis data
        await fetchAnalysisData(supabase, user.id)
      } catch (error) {
        console.error("[v0] Error in fetchAllData:", error)
        setIsLoadingData(false)
      }
    }

    fetchAllData()
  }, [router])

  useEffect(() => {
    // Generate a unique session ID for this chat session
    const newSessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
  }, [])

  const initializeAnalysisData = async (supabase: any, userId: string, onboardingData: any) => {
    try {
      const { data: existing, error: fetchError } = await supabase
        .from("user_analysis_data")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle()

      if (fetchError) {
        console.error("[v0] Error checking analysis data:", fetchError)
        return
      }

      if (!existing) {
        const initialData = {
          user_id: userId,
          risk_credit: 65,
          risk_market: 45,
          risk_liquidity: 80,
          risk_operational: 55,
          monthly_income: onboardingData.income_per_month || 0,
          monthly_expenses: onboardingData.expenses_per_month || 0,
          monthly_savings: onboardingData.savings_per_month || 0,
        }

        const { error: insertError } = await supabase.from("user_analysis_data").insert([initialData])

        if (insertError) {
          console.error("[v0] Error inserting analysis data:", insertError)
        } else {
          console.log("[v0] Initialized analysis data")
        }
      }
    } catch (error) {
      console.error("[v0] Error initializing analysis data:", error)
    }
  }

  const fetchNewsItems = async (supabase: any, userId: string) => {
    try {
      const { data, error } = await supabase
        .from("news_feed")
        .select("*")
        .eq("user_id", userId)
        .order("published_at", { ascending: false })
        .limit(10)

      if (error) throw error

      if (data && data.length > 0) {
        setNewsItems(data)
      } else {
        // Initialize with sample news if none exists
        const sampleNews = [
          {
            user_id: userId,
            title: "RBI announces new monetary policy decisions for Q4 2024",
            source: "Google News",
            url: "https://news.google.com",
            time_ago: "2h ago",
          },
          {
            user_id: userId,
            title: "New tax regulations for startups in India announced",
            source: "Economic Times",
            url: "https://economictimes.com",
            time_ago: "5h ago",
          },
          {
            user_id: userId,
            title: "Stock market hits all-time high amid economic recovery",
            source: "Google News",
            url: "https://news.google.com",
            time_ago: "8h ago",
          },
        ]

        const { data: inserted } = await supabase.from("news_feed").insert(sampleNews).select()
        if (inserted) setNewsItems(inserted)
      }
    } catch (error) {
      console.error("[v0] Error fetching news:", error)
    } finally {
      setIsLoadingNews(false)
    }
  }

  const fetchChatHistory = async (supabase: any, userId: string) => {
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })

      if (error) throw error

      if (data && data.length > 0) {
        setChatHistory(data)
      } else {
        // Initialize with sample chat history
        const sampleChats = [
          {
            user_id: userId,
            session_id: crypto.randomUUID(),
            title: "How to calculate EMI?",
            description: "EMI calculation query",
            original_url: "financesetu.com/chats",
            short_url: "chat.setu/hKWhPa",
            avatar_text: "FS",
            avatar_color: "bg-blue-500",
            message_count: 27,
          },
          {
            user_id: userId,
            session_id: crypto.randomUUID(),
            title: "Investment tax advice",
            description: "Tax planning discussion",
            original_url: "financesetu.com/investments",
            short_url: "chat.setu/1SnIPc",
            avatar_text: "FS",
            avatar_color: "bg-blue-500",
            message_count: 48,
          },
        ]

        const { data: inserted } = await supabase.from("chat_conversations").insert(sampleChats).select()
        if (inserted) setChatHistory(inserted)
      }
    } catch (error) {
      console.error("[v0] Error fetching chat history:", error)
    } finally {
      setIsLoadingChats(false)
    }
  }

  const fetchFinancialSummaries = async (supabase: any, userId: string) => {
    try {
      const { data, error } = await supabase
        .from("financial_summaries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error

      if (data && data.length > 0) {
        setFinancialSummaries(data)
      } else {
        // Initialize with sample summaries
        const sampleSummaries = [
          {
            user_id: userId,
            report_name: "Q4 2024 Financial Summary",
            report_type: "Quarterly Report",
            description: "Detailed breakdown of income, expenses, and savings for Q4 2024",
            full_url: "financesetu.com/reports/q4-2024",
            avatar_text: "FS",
            avatar_color: "bg-blue-500",
          },
          {
            user_id: userId,
            report_name: "Investment Portfolio Overview",
            report_type: "Investment Report",
            description: "Current holdings and performance metrics",
            full_url: "financesetu.com/portfolio",
            avatar_text: "FS",
            avatar_color: "bg-green-500",
          },
        ]

        const { data: inserted } = await supabase.from("financial_summaries").insert(sampleSummaries).select()
        if (inserted) setFinancialSummaries(inserted)
      }
    } catch (error) {
      console.error("[v0] Error fetching financial summaries:", error)
    } finally {
      setIsLoadingSummaries(false)
    }
  }

  const fetchAnalysisData = async (supabase: any, userId: string) => {
    try {
      const { data, error } = await supabase.from("user_analysis_data").select("*").eq("user_id", userId).maybeSingle()

      if (error) throw error

      if (data) {
        setAnalysisData(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching analysis data:", error)
    } finally {
      setIsLoadingAnalysis(false)
    }
  }

  const handleDeleteNews = async (newsId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("news_feed").delete().eq("id", newsId)

      if (error) throw error

      setNewsItems(newsItems.filter((item) => item.id !== newsId))
      console.log("[v0] News item deleted successfully")
    } catch (error) {
      console.error("[v0] Error deleting news item:", error)
    }
  }

  const handleDeleteChat = async (chatId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("chat_conversations").delete().eq("id", chatId)

      if (error) throw error

      setChatHistory(chatHistory.filter((chat) => chat.id !== chatId))
      console.log("[v0] Chat deleted successfully")
    } catch (error) {
      console.error("[v0] Error deleting chat:", error)
    }
  }

  const handleDeleteSummary = async (summaryId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("financial_summaries").delete().eq("id", summaryId)

      if (error) throw error

      setFinancialSummaries(financialSummaries.filter((summary) => summary.id !== summaryId))
      console.log("[v0] Financial summary deleted successfully")
    } catch (error) {
      console.error("[v0] Error deleting summary:", error)
    }
  }

  const handleConvertToSummary = async (chat: ChatConversation) => {
    try {
      const supabase = createClient()

      // Create a new financial summary from the chat
      const newSummary = {
        user_id: userId,
        report_name: `Financial Summary: ${chat.title}`,
        report_type: "Chat Conversion",
        description: `Converted from chat: ${chat.description || chat.title}`,
        full_url: chat.original_url,
        avatar_text: chat.avatar_text,
        avatar_color: chat.avatar_color,
      }

      const { data, error } = await supabase.from("financial_summaries").insert([newSummary]).select().single()

      if (error) throw error

      console.log("[v0] Chat converted to financial summary successfully")

      // Add the new summary to the state
      if (data) {
        setFinancialSummaries([data, ...financialSummaries])
        alert("Chat converted to financial summary successfully!")
      }
    } catch (error) {
      console.error("[v0] Error converting chat to summary:", error)
      alert("Error converting chat. Please try again.")
    }
  }

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

      const { error: onboardingError } = await supabase
        .from("user_onboarding_information")
        .update(updateData)
        .eq("email", userEmail)

      if (onboardingError) {
        console.error("[v0] Error updating settings:", onboardingError)
        alert("Error saving settings. Please try again.")
        return
      }

      const { error: analysisError } = await supabase
        .from("user_analysis_data")
        .update({
          monthly_income: Number.parseFloat(settingsData.totalIncome) || 0,
          monthly_expenses: Number.parseFloat(settingsData.totalExpenses) || 0,
          monthly_savings: Number.parseFloat(settingsData.savings) || 0,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)

      if (analysisError) {
        console.error("[v0] Error updating analysis data:", analysisError)
      }

      console.log("[v0] Settings updated successfully")
      alert("Settings saved successfully!")

      // Refresh data
      setUserData({ ...userData, ...updateData })
      await fetchAnalysisData(createClient(), userId)
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
    name: "",
    age: "",
    occupation: "",
    totalIncome: "",
    totalExpenses: "",
    savings: "",
    majorAsset: "",
    assetValue: "",
    investmentTypes: [] as string[],
    longTermGoal: "",
    longTermAmount: "",
    shortTermGoal: "",
    shortTermAmount: "",
    lifePlanningApproach: "",
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

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Analysis", icon: BarChart3 },
    { name: "Ask Setu", icon: MessageSquare },
    { name: "Financial Summaries", icon: FileText },
    { name: "Chat History", icon: History },
    // Teach Easy is now only accessible from the Ask Setu chat interface
  ]

  const bottomMenuItems = [
    { name: "Settings", icon: Settings },
    { name: "Help Center", icon: HelpCircle },
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setMessages([...messages, { type: "user", text: userMessage }])
    setInputValue("")
    setIsProcessing(true)

    setIsSidebarCollapsed(true)

    try {
      console.log("[v0] Sending message to n8n webhook:", userMessage)

      const response = await fetch(
        "https://finance-setu.app.n8n.cloud/webhook/fdce938b-83d1-49e0-9cc6-79b8d9c2ea4a/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            user_id: userId,
            session_id: sessionId,
            timestamp: new Date().toISOString(),
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Received response from n8n:", data)

      const botMessage = data.response || data.message || data.output || "I received your message."
      setMessages((prev) => [...prev, { type: "bot", text: botMessage }])
    } catch (error) {
      console.error("[v0] Error calling n8n webhook:", error)
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I encountered an error processing your request. Please try again.",
        },
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle Teach Easy send message
  const handleTeachEasySendMessage = async () => {
    if (!teachEasyInput.trim()) return

    const userMessage = teachEasyInput.trim()
    setTeachEasyMessages([...teachEasyMessages, { type: "user", text: userMessage }])
    setTeachEasyInput("")
    setIsTeachEasyProcessing(true)

    try {
      console.log("[v0] Sending message to Teach Easy n8n webhook:", userMessage)

      const response = await fetch(
        "https://finance-setu.app.n8n.cloud/webhook/fdce938b-83d1-49e0-9cc6-79b8d9c2ea4a/teach",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            user_id: userId,
            session_id: sessionId,
            timestamp: new Date().toISOString(),
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Received response from Teach Easy n8n:", data)

      const botMessage =
        data.response || data.message || data.output || "I'm here to help you learn about personal finance!"
      setTeachEasyMessages((prev) => [...prev, { type: "bot", text: botMessage }])
    } catch (error) {
      console.error("[v0] Error calling Teach Easy n8n webhook:", error)
      setTeachEasyMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I encountered an error processing your request. Please try again.",
        },
      ])
    } finally {
      setIsTeachEasyProcessing(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black flex">
      {/* Sidebar */}
      <aside
        className={`${isSidebarCollapsed ? "w-20" : "w-80"} h-screen bg-white border-r border-[#e5e5e5] flex flex-col sticky top-0 transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#e5e5e5] flex items-center justify-between flex-shrink-0">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
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
                  {userEmail || "mail.financesetu@gmail.com"}
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
              href="https://github.com/Teamgrey21/SETU_MAIN_CODEREPOSITORY"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors"
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
                    <div className="w-20 h-20 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto">
                      <User className="w-10 h-10 text-[#6b7280]" />
                    </div>

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
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 bg-white border-2 border-[#202020] rounded-2xl rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-6 h-6 bg-[#202020] rounded -rotate-45"></div>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-semibold text-[#202020] mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Ask Setu
                  </h3>
                  <p
                    className="text-sm text-[#6b7280] text-center"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Get personalized financial advice
                  </p>
                </div>
              </button>
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-[#6b7280]" />
                  <h2
                    className="text-lg font-semibold text-[#6b7280]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Financial News Feed
                  </h2>
                </div>
              </div>

              {isLoadingNews ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-[#6b7280]">Loading news...</p>
                </div>
              ) : newsItems.length > 0 ? (
                <div className="space-y-4">
                  {newsItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-4 bg-[#f9fafb] rounded-lg hover:bg-[#f3f4f6] transition-colors group"
                    >
                      <div className="flex-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#202020] font-medium hover:underline"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {item.title}
                        </a>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-sm text-[#6b7280]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {item.source}
                          </span>
                          <span className="text-sm text-[#9ca3af]">•</span>
                          <span
                            className="text-sm text-[#9ca3af]"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {item.time_ago}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-2 text-[#6b7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete news item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <Newspaper className="w-12 h-12 text-[#d1d5db]" />
                  <p className="text-[#6b7280]">No news items yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "Analysis" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8 gap-6 overflow-y-auto">
            <h1
              className="text-2xl font-semibold text-[#202020]"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Financial Analysis
            </h1>

            {isLoadingAnalysis ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-[#6b7280]">Loading analysis...</p>
              </div>
            ) : analysisData ? (
              <>
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <h3
                        className="text-sm font-medium text-[#6b7280]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Credit Risk
                      </h3>
                    </div>
                    <p
                      className="text-3xl font-bold text-[#202020]"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {analysisData.risk_credit}%
                    </p>
                  </div>

                  <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-red-500" />
                      <h3
                        className="text-sm font-medium text-[#6b7280]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Market Risk
                      </h3>
                    </div>
                    <p
                      className="text-3xl font-bold text-[#202020]"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {analysisData.risk_market}%
                    </p>
                  </div>

                  <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-5 h-5 text-green-500" />
                      <h3
                        className="text-sm font-medium text-[#6b7280]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Liquidity Risk
                      </h3>
                    </div>
                    <p
                      className="text-3xl font-bold text-[#202020]"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {analysisData.risk_liquidity}%
                    </p>
                  </div>

                  <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-orange-500" />
                      <h3
                        className="text-sm font-medium text-[#6b7280]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Operational Risk
                      </h3>
                    </div>
                    <p
                      className="text-3xl font-bold text-[#202020]"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {analysisData.risk_operational}%
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
                  <h2
                    className="text-lg font-semibold text-[#6b7280] mb-6"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Monthly Financial Breakdown
                  </h2>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                        Income
                      </p>
                      <p
                        className="text-2xl font-bold text-green-900"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        ₹{analysisData.monthly_income.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-6 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700 mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                        Expenses
                      </p>
                      <p
                        className="text-2xl font-bold text-red-900"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        ₹{analysisData.monthly_expenses.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                        Savings
                      </p>
                      <p
                        className="text-2xl font-bold text-blue-900"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        ₹{analysisData.monthly_savings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-2 gap-6">
                  <button
                    onClick={() => setActiveSection("Home")}
                    className="bg-white border border-[#e5e5e5] rounded-2xl p-8 hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-[#f3f4f6] group-hover:bg-[#e5e7eb] rounded-full flex items-center justify-center transition-colors">
                        <Home className="w-8 h-8 text-[#6b7280]" />
                      </div>
                      <h3
                        className="text-lg font-semibold text-[#202020]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        Go to Home
                      </h3>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection("Financial Summaries")}
                    className="bg-white border border-[#e5e5e5] rounded-2xl p-8 hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-[#f3f4f6] group-hover:bg-[#e5e7eb] rounded-full flex items-center justify-center transition-colors">
                        <FileText className="w-8 h-8 text-[#6b7280]" />
                      </div>
                      <h3
                        className="text-lg font-semibold text-[#202020]"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        View Financial Summaries
                      </h3>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 gap-4">
                <BarChart3 className="w-12 h-12 text-[#d1d5db]" />
                <p className="text-[#6b7280]">No analysis data available</p>
              </div>
            )}
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
                    {/* ADDED: Teach Easy button */}
                    <button
                      onClick={() => setIsTeachEasySidebarOpen(!isTeachEasySidebarOpen)}
                      className="p-1.5 hover:bg-[#e5e7eb] rounded-lg transition-colors text-[#6b7280] hover:text-[#202020]"
                      title="Teach Easy - Learn Finance"
                    >
                      <Sparkles className="w-5 h-5" />
                    </button>
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

        {/* Teach Easy Sidebar */}
        {/* ADDED: Teach Easy sidebar with chatbot and YouTube videos */}
        <aside
          className={`fixed right-0 top-0 h-screen bg-white border-l border-[#e5e5e5] flex flex-col transition-all duration-300 z-50 ${
            isTeachEasySidebarOpen ? "w-96" : "w-0"
          } overflow-hidden`}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#e5e5e5] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#202020]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Teach Easy
            </h2>
            <button
              onClick={() => setIsTeachEasySidebarOpen(false)}
              className="p-1.5 hover:bg-[#f0f0f0] rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#6b7280]" />
            </button>
          </div>

          {/* Content Tabs */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-[#e5e5e5] bg-[#f9fafb]">
                <p
                  className="text-sm font-medium text-[#202020]"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Learning Assistant
                </p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {teachEasyMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                    <Sparkles className="w-8 h-8 text-[#9ca3af]" />
                    <p className="text-sm text-[#6b7280]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      Ask me anything about personal finance and investing!
                    </p>
                  </div>
                ) : (
                  teachEasyMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.type === "user" ? "bg-[#202020] text-white" : "bg-[#f0f0f0] text-[#202020]"
                        }`}
                      >
                        <p className="text-sm" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-[#e5e5e5] p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask..."
                    value={teachEasyInput}
                    onChange={(e) => setTeachEasyInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTeachEasySendMessage()}
                    className="flex-1 px-3 py-2 bg-[#f0f0f0] border border-[#e5e5e5] rounded-lg outline-none focus:ring-2 focus:ring-[#202020]/20 text-sm"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  />
                  <button
                    onClick={handleTeachEasySendMessage}
                    disabled={isTeachEasyProcessing}
                    className="p-2 bg-[#202020] text-white rounded-lg hover:bg-[#404040] transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e5e5e5]" />

            {/* Videos Section */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="p-4 border-b border-[#e5e5e5] bg-[#f9fafb]">
                <p
                  className="text-sm font-medium text-[#202020]"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Educational Videos
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {educationalVideos.map((video) => (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-[#f9fafb] hover:bg-[#f0f0f0] rounded-lg transition-colors border border-[#e5e5e5] group"
                  >
                    <p
                      className="text-sm font-medium text-[#202020] group-hover:text-blue-600 line-clamp-2 mb-1"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {video.title}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-[#6b7280]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                        {video.channel}
                      </p>
                      <p className="text-xs text-[#9ca3af]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                        {video.duration}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {activeSection === "Financial Summaries" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8 gap-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h1
                className="text-2xl font-semibold text-[#202020]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Your Financial Reports
              </h1>
            </div>

            {isLoadingSummaries ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-[#6b7280]">Loading summaries...</p>
              </div>
            ) : financialSummaries.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {financialSummaries.map((summary) => (
                  <div
                    key={summary.id}
                    className="bg-white border border-[#e5e5e5] rounded-2xl p-6 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-12 h-12 ${summary.avatar_color} rounded-lg flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">{summary.avatar_text}</span>
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-base font-semibold text-[#202020] mb-1"
                            style={{ fontFamily: "var(--font-figtree), Figtree" }}
                          >
                            {summary.report_name}
                          </h3>
                          <p className="text-sm text-[#6b7280]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                            {summary.description || summary.report_type || "Financial report"}
                          </p>
                          {summary.full_url && (
                            <a
                              href={summary.full_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline"
                              style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                              {summary.full_url}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-3 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                          <Download className="w-5 h-5 text-[#6b7280]" />
                        </button>
                        <button
                          onClick={() => handleDeleteSummary(summary.id)}
                          className="p-3 text-[#6b7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete summary"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 gap-4">
                <FileText className="w-12 h-12 text-[#d1d5db]" />
                <p className="text-[#6b7280]">No financial summaries yet</p>
              </div>
            )}

            {/* Document Upload Section */}
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6">
              <h2
                className="text-lg font-semibold text-[#6b7280] mb-4"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Upload Financial Documents
              </h2>
              <div className="border-2 border-dashed border-[#e5e5e5] rounded-lg p-8 text-center hover:border-[#202020] transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-[#6b7280] mx-auto mb-4" />
                <p className="text-sm text-[#6b7280]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Drag and drop files here or click to browse
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === "Chat History" && (
          <div className="flex-1 flex flex-col bg-[#f9fafb] p-8 gap-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h1
                className="text-2xl font-semibold text-[#202020]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Chat History
              </h1>
              <button className="px-4 py-2 bg-[#202020] text-white rounded-lg hover:bg-[#404040] transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>New Chat</span>
              </button>
            </div>

            {isLoadingChats ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-[#6b7280]">Loading chats...</p>
              </div>
            ) : chatHistory.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-white border border-[#e5e5e5] rounded-2xl p-6 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 ${chat.avatar_color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{chat.avatar_text}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className="text-base font-semibold text-[#202020]"
                              style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                              {chat.title}
                            </h3>
                            <span
                              className="text-sm text-[#6b7280]"
                              style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                              • {chat.message_count} messages
                            </span>
                          </div>
                          {chat.description && (
                            <p
                              className="text-sm text-[#6b7280] mb-2"
                              style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                              {chat.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4">
                            {chat.short_url && (
                              <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-[#6b7280]" />
                                <span
                                  className="text-sm text-[#6b7280]"
                                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                                >
                                  {chat.short_url}
                                </span>
                              </div>
                            )}
                            {chat.original_url && (
                              <a
                                href={chat.original_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline"
                                style={{ fontFamily: "var(--font-figtree), Figtree" }}
                              >
                                View conversation
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleConvertToSummary(chat)}
                          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100"
                          title="Convert to financial summary"
                        >
                          <FileText className="w-4 h-4" />
                          <span className="text-sm font-medium" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                            Convert
                          </span>
                        </button>
                        <button className="p-3 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                          <Copy className="w-5 h-5 text-[#6b7280]" />
                        </button>
                        <button
                          onClick={() => handleDeleteChat(chat.id)}
                          className="p-3 text-[#6b7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete chat"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 gap-4">
                <History className="w-12 h-12 text-[#d1d5db]" />
                <p className="text-[#6b7280]">No chat history yet</p>
              </div>
            )}

            {/* Navigation Cards */}
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => setActiveSection("Home")}
                className="bg-white border border-[#e5e5e5] rounded-2xl p-8 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-[#f3f4f6] group-hover:bg-[#e5e7eb] rounded-full flex items-center justify-center transition-colors">
                    <Home className="w-8 h-8 text-[#6b7280]" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Go to Home
                  </h3>
                </div>
              </button>

              <button
                onClick={() => setActiveSection("Financial Summaries")}
                className="bg-white border border-[#e5e5e5] rounded-2xl p-8 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-[#f3f4f6] group-hover:bg-[#e5e7eb] rounded-full flex items-center justify-center transition-colors">
                    <FileText className="w-8 h-8 text-[#6b7280]" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    View Financial Summaries
                  </h3>
                </div>
              </button>
            </div>
          </div>
        )}

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
