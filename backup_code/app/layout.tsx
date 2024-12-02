// src/app/layout.tsx
import Header from '@/components/navigation/Header'
import SpotifyPlayer from '@/components/navigation/SpotifyPlayer'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] }) // Add this line

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0 p-0`}>
        <Header />
        <main className="mt-0">
          {children}
        </main>
        <SpotifyPlayer />
      </body>
    </html>
  )
}