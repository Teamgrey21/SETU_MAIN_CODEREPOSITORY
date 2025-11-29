import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("[v0] Error exchanging code for session:", error)
      return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(error.message)}`)
    }

    if (data.user) {
      console.log("[v0] User authenticated:", data.user.email, "Provider:", data.user.app_metadata.provider)

      try {
        await supabase.from("login_details").insert({
          user_id: data.user.id,
          email: data.user.email,
          login_type: data.user.app_metadata.provider || "email",
          login_session_id: data.session?.access_token,
          login_session_start_time: new Date().toISOString(),
        })
      } catch (err) {
        console.error("[v0] Error inserting login details:", err)
      }

      const { data: onboardingData, error: onboardingError } = await supabase
        .from("user_onboarding_information")
        .select("id")
        .eq("user_id", data.user.id)
        .maybeSingle()

      if (onboardingError) {
        console.error("[v0] Error checking onboarding status:", onboardingError)
      }

      if (onboardingData) {
        console.log("[v0] User has completed onboarding, redirecting to user-section")
        return NextResponse.redirect(`${origin}/user-section`)
      } else {
        console.log("[v0] User has not completed onboarding, redirecting to onboarding")
        return NextResponse.redirect(`${origin}/onboarding`)
      }
    }
  }

  console.error("[v0] No authorization code found in callback")
  return NextResponse.redirect(`${origin}/auth/error?error=no_code`)
}
