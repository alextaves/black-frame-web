// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
        <p className="mb-4">The page you are looking for doesn't exist</p>
        <Link 
          href="/"
          className="px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}