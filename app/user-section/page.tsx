"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function UserSectionPage() {
  const router = useRouter()

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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-2xl w-full text-center"
        >
          <h1 className="text-5xl font-bold text-[#202020] mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            Welcome to Finance Setu!
          </h1>
          <p className="text-xl text-[#404040] mb-8" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            Your financial journey starts here
          </p>

          {/* Placeholder for future content */}
          <div className="py-12 text-[#606060]">
            <p style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              This is your user section. More features coming soon...
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="px-8 py-4 bg-[#4A9FD8] text-white rounded-2xl font-medium hover:bg-[#3D8FC9] transition-all shadow-lg"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  )
}
