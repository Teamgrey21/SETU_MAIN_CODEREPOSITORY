"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-[#e5e5e5]">
        <h1 className="text-2xl font-semibold text-[#202020] mb-4">Authentication Error</h1>
        <p className="text-[#404040] mb-4">
          {error
            ? `Error: ${error}`
            : "There was an error confirming your email. The link may have expired or already been used."}
        </p>
        {error?.includes("no_code") && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Possible causes:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Google OAuth is not configured in Supabase</li>
                <li>Redirect URL is not allowed in Supabase settings</li>
                <li>Browser blocked the popup or redirect</li>
              </ul>
            </p>
          </div>
        )}
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#202020] text-white rounded-lg hover:bg-[#404040] transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-[#202020]">Loading...</div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  )
}
