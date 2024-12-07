import Header from '@/components/navigation/Header'
import SpotifyPlayer from '@/components/navigation/SpotifyPlayer'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${inter.className} bg-white text-[#171717] min-h-screen m-0 p-0`}>
        <Header />
        <main className="mt-0 bg-white">
          {children}
        </main>
        <SpotifyPlayer />
      </body>
    </html>
  )
}