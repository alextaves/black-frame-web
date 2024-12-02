// src/app/bw-portrait/page.tsx

import { Metadata } from 'next'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'B&W Portrait Series | BLACK-FRAME',
  description: 'Black and white portrait photography series'
}

async function getImages() {
  const imagesDirectory = path.join(process.cwd(), 'public/images/bw-portrait')
  const imageFiles = await fs.readdir(imagesDirectory)
  
  return imageFiles
    .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
    .map(filename => `/images/bw-portrait/${filename}`)
}

export default async function BWPortrait() {
  const images = await getImages()

  return (
    <main className="w-full">
      <div className="flex flex-col">
        {images.map((src, index) => (
          <div 
            key={src} 
            className="w-full relative"
          >
            <Image
              src={src}
              alt={`Portrait ${index + 1}`}
              width={1920}
              height={1920}
              className="w-full h-auto"
              priority={index < 2} // Prioritizes the first images for immediate impact
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </main>
  )
}