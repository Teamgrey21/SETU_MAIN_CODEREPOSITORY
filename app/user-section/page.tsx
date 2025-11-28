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
} from "lucide-react"

export default function UserSectionPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("Home")

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Analysis", icon: BarChart3 },
    { name: "Ask Setu", icon: MessageSquare },
    { name: "Financial Reports", icon: FileText },
    { name: "Chat History", icon: Clock },
  ]

  const bottomMenuItems = [
    { name: "Settings", icon: Settings },
    { name: "Help Center", icon: HelpCircle },
  ]

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

      {/* Main Content Area - Black for now */}
      <main className="flex-1 bg-black">{/* Content will be added here */}</main>
    </div>
  )
}
