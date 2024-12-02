import { Metadata } from 'next'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Rome Series | BLACK-FRAME',
  description: 'Rome photography series'
}

async function getImages() {
  const imagesDirectory = path.join(process.cwd(), 'public/images/rome')
  const imageFiles = await fs.readdir(imagesDirectory)
  
  return imageFiles
    .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
    .map(filename => `/images/rome/${filename}`)
}

export default async function Rome() {
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
              alt={`Rome ${index + 1}`}
              width={1920}
              height={1080}
              quality={100}
              priority={index === 0}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </main>
  )
}