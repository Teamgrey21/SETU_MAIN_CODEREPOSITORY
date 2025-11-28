import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      console.log("[v0] User confirmed email:", data.user.email)

      // Insert into User_Signup table (this will be done by the trigger)
      // Insert into login_details table
      try {
        await supabase.from("login_details").insert({
          user_id: data.user.id,
          email: data.user.email,
          login_type: "email",
          login_session_id: data.session?.access_token,
          login_session_start_time: new Date().toISOString(),
        })
      } catch (err) {
        console.error("[v0] Error inserting login details:", err)
      }

      // Redirect to onboarding
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  // Return error if something went wrong
  return NextResponse.redirect(`${origin}/auth/error`)
}
