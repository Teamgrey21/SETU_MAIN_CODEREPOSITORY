"use client"
import { motion } from "framer-motion"
import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export const AuthSection = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleAuth = () => {
    router.push("/onboarding")
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/onboarding`,
          data: {
            email: email,
          },
        },
      })

      if (signUpError) throw signUpError

      setShowConfirmation(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during signup")
      console.error("[v0] Signup error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="auth-section" className="w-full px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)",
          }}
        >
          {showConfirmation ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-sm border border-[#e5e5e5]">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#202020] rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-[#202020] mb-1.5"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Check your email to confirm
                    </h3>
                    <p
                      className="text-sm text-[#404040] leading-relaxed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      You've successfully signed up. Please check your email to confirm your account before signing in
                      to the Finance Setu dashboard. The confirmation link expires in 10 minutes.
                    </p>
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-6 text-sm text-[#404040]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Have an account?{" "}
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="text-[#202020] font-medium hover:underline"
                >
                  Sign In Now
                </button>
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-3xl md:text-4xl font-medium text-[#202020] text-center mb-8"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Get Started with Finance Setu
              </h2>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
                <div className="flex-shrink-0">
                  <button
                    onClick={handleGoogleAuth}
                    className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-[#e5e5e5] hover:border-[#d0d0d0] transition-colors duration-200 shadow-sm hover:shadow-md"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-[#202020] font-medium text-sm">Continue with Google</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-[#9a9a9a] text-sm">
                  <div className="w-12 h-px bg-[#d0d0d0]" />
                  <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>OR</span>
                  <div className="w-12 h-px bg-[#d0d0d0]" />
                </div>

                <form onSubmit={handleEmailAuth} className="flex flex-col gap-3 w-full lg:w-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#e5e5e5] focus:border-[#404040] focus:outline-none transition-colors duration-200 text-[#202020] placeholder:text-[#9a9a9a] text-sm w-full sm:w-auto sm:min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#e5e5e5] focus:border-[#404040] focus:outline-none transition-colors duration-200 text-[#202020] placeholder:text-[#9a9a9a] text-sm w-full sm:w-auto sm:min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </div>
                  {error && (
                    <p
                      className="text-red-500 text-xs text-center"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-[#202020] hover:bg-[#404040] text-white rounded-xl transition-colors duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {isLoading ? "Signing up..." : "Continue"}
                  </button>
                </form>
              </div>

              <p
                className="text-center mt-6 text-sm text-[#404040]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Already have an account? <button className="text-[#202020] font-medium hover:underline">Sign In</button>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
