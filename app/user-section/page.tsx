"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  BarChart3,
  MessageSquare,
  FileText,
  Clock,
  Settings,
  HelpCircle,
  Github,
  Mail,
  ChevronLeft,
  Upload,
  ArrowUp,
  Sparkles,
  Copy,
  Trash2,
  Plus,
} from "lucide-react"

export default function UserSectionPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("Ask Setu")
  const [messages, setMessages] = useState<Array<{ type: "user" | "bot"; text: string }>>([])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

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
    { name: "Chat History", icon: Clock },
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
      <aside className="w-80 bg-white border-r border-[#e5e5e5] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#e5e5e5] flex items-center justify-between">
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
          <button className="p-1 hover:bg-[#f3f4f6] rounded-md transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#6b7280]" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4">
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
                  }`}
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#e5e5e5]">
          {/* Social Icons */}
          <div className="flex items-center gap-3 mb-4 px-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-[#f3f4f6] rounded-md transition-colors"
            >
              <Github className="w-5 h-5 text-[#6b7280]" />
            </a>
            <a href="mailto:mail.financesetu@gmail.com" className="p-2 hover:bg-[#f3f4f6] rounded-md transition-colors">
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
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6b7280] hover:bg-[#f9fafb] transition-all"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-white flex flex-col">
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
                <Plus className="w-4 h-4 text-[#202020]" />
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
              <div className="bg-white border-2 border-dashed border-[#e5e5e5] rounded-2xl h-64"></div>
              <div className="bg-white border-2 border-dashed border-[#e5e5e5] rounded-2xl h-64"></div>
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
                      <ArrowUp className="w-5 h-5 text-white" />
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
                      <ArrowUp className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Placeholder for other sections */}
        {activeSection !== "Ask Setu" && activeSection !== "Chat History" && (
          <div className="flex-1 bg-black flex items-center justify-center">
            <p className="text-white text-xl" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              {activeSection} - Coming Soon
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
