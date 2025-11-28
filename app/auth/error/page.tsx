export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-[#e5e5e5]">
        <h1 className="text-2xl font-semibold text-[#202020] mb-4">Authentication Error</h1>
        <p className="text-[#404040] mb-6">
          There was an error confirming your email. The link may have expired or already been used.
        </p>
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
