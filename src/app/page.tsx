// src/app/page.tsx

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BLACK FRAME | Alex Taves',
  description: 'Exploration and remixing of personal work using MIDJOURNEY AI'
}

export default function Home() {
  return (
    <main className="w-full mt-60 bg-white"> {/* Added bg-white here */}
      <div className="pl-8">
        <div className="mb-3">
          <h1 className="text-xl tracking-wider text-black">BLACK FRAME</h1> {/* Added text-black */}
          <h2 className="text-lg tracking-wide mt-2 text-black">ALEX TAVES</h2> {/* Added text-black */}
        </div>
        <p className="text-sm tracking-wide text-gray-500 max-w-[600px]">
          Experimental playground
          <br />of personal work, some using
          <br />MIDJOURNEY AI to create
          <br />new narratives
        </p>
      </div>
    </main>
  )
}