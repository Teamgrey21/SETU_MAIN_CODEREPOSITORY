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
  const [mode, setMode] = useState<"signup" | "signin">("signup")

  const handleGoogleAuth = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError("Failed to sign in with Google")
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (mode === "signup" && password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    if (mode === "signup") {
      try {
        const supabase = createClient()

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
            data: {
              email: email,
            },
          },
        })

        if (signUpError) {
          throw signUpError
        }

        if (data.user) {
          setShowConfirmation(true)
        } else {
          throw new Error("Signup failed: No user returned")
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred during signup"
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    } else {
      try {
        const supabase = createClient()

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          throw signInError
        }

        if (data.user && data.session) {
          try {
            await supabase.from("login_details").insert({
              user_id: data.user.id,
              email: data.user.email,
              login_type: "email",
              login_session_id: data.session.access_token,
              login_session_start_time: new Date().toISOString(),
            })
          } catch (loginErr) {
            console.error("[v0] Error saving login details:", loginErr)
          }

          const { data: onboardingData } = await supabase
            .from("user_onboarding_information")
            .select("id")
            .eq("user_id", data.user.id)
            .maybeSingle()

          if (onboardingData) {
            console.log("[v0] User has completed onboarding, redirecting to user-section")
            router.push("/user-section")
          } else {
            console.log("[v0] User has not completed onboarding, redirecting to onboarding")
            router.push("/onboarding")
          }
        } else {
          throw new Error("Signin failed: No user returned")
        }
      } catch (err: unknown) {
        let errorMessage = "An error occurred during signin"
        if (err instanceof Error) {
          if (err.message.includes("Invalid login credentials")) {
            errorMessage = "Invalid email or password"
          } else if (err.message.includes("Email not confirmed")) {
            errorMessage = "Please confirm your email before signing in"
          } else {
            errorMessage = err.message
          }
        }
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <section id="auth-section" className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
          viewport={{ once: true }}
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden"
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
              <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-sm border border-[#e5e5e5]">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#202020] rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-base sm:text-lg font-semibold text-[#202020] mb-1.5"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Check your email to confirm
                    </h3>
                    <p
                      className="text-xs sm:text-sm text-[#404040] leading-relaxed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      You've successfully signed up. Please check your email to confirm your account before signing in
                      to the Finance Setu dashboard. The confirmation link expires in 10 minutes.
                    </p>
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-6 text-xs sm:text-sm text-[#404040]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Have an account?{" "}
                <button
                  onClick={() => {
                    setShowConfirmation(false)
                    setMode("signin")
                  }}
                  className="text-[#202020] font-medium hover:underline"
                >
                  Sign In Now
                </button>
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#202020] text-center mb-6 sm:mb-8"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {mode === "signup" ? "Get Started with Finance Setu" : "Welcome Back to Finance Setu"}
              </h2>

              <div className="flex flex-col sm:flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={handleGoogleAuth}
                    className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 bg-white rounded-xl border border-[#e5e5e5] hover:border-[#d0d0d0] transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
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

                <div className="flex items-center gap-3 text-[#9a9a9a] text-xs sm:text-sm w-full md:w-auto">
                  <div className="flex-1 md:flex-none h-px w-full md:w-12 bg-[#d0d0d0]" />
                  <span style={{ fontFamily: "var(--font-figtree), Figtree" }} className="whitespace-nowrap">
                    OR
                  </span>
                  <div className="flex-1 md:flex-none h-px w-full md:w-12 bg-[#d0d0d0]" />
                </div>

                <form onSubmit={handleEmailAuth} className="flex flex-col gap-3 w-full md:w-auto">
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#e5e5e5] focus:border-[#404040] focus:outline-none transition-colors duration-200 text-[#202020] placeholder:text-[#9a9a9a] text-sm w-full sm:w-auto sm:min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      disabled={isLoading}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#e5e5e5] focus:border-[#404040] focus:outline-none transition-colors duration-200 text-[#202020] placeholder:text-[#9a9a9a] text-sm w-full sm:w-auto sm:min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </div>
                  {mode === "signup" && password.length > 0 && password.length < 6 && (
                    <p
                      className="text-xs text-[#9a9a9a] text-center"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Password must be at least 6 characters
                    </p>
                  )}
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
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-[#202020] hover:bg-[#404040] text-white rounded-xl transition-colors duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {isLoading ? (mode === "signup" ? "Signing up..." : "Signing in...") : "Continue"}
                  </button>
                </form>
              </div>

              <p
                className="text-center mt-6 text-xs sm:text-sm text-[#404040]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setMode("signin")
                        setError(null)
                      }}
                      className="text-[#202020] font-medium hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => {
                        setMode("signup")
                        setError(null)
                      }}
                      className="text-[#202020] font-medium hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
