'use client'

import { useEffect } from 'react'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Something went terribly wrong!
            </h2>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}