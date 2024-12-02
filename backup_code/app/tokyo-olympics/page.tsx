import { Metadata } from 'next'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Tokyo Olympics | BLACK-FRAME',
  description: 'Tokyo Olympics video series'
}

async function getImages() {
  const imagesDirectory = path.join(process.cwd(), 'public/images/tokyo')
  const imageFiles = await fs.readdir(imagesDirectory)
  
  return imageFiles
    .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
    .map(filename => `/images/tokyo/${filename}`)
}

export default async function TokyoOlympics() {
  const images = await getImages()

  return (
    <main className="w-full">
      <div className="flex flex-col">
        {/* Video Sections */}
        <div className="relative w-full h-screen">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/Tokyo_head.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative w-full h-screen">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/Tokyo_midhead.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative w-full h-screen">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/Tokyo_lowerhead.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative w-full h-screen">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/TokyoMarathon.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Image Sections */}
        <div className="flex flex-col items-center w-full">
          {images.map((src, index) => (
            <div 
              key={src} 
              className="w-full max-w-[1300px] mt-[10px] px-4 xl:px-0"
            >
              <Image
                src={src}
                alt={`Tokyo Olympics ${index + 1}`}
                width={1920}
                height={1080}
                quality={100}
                priority={index === 0}
                className="w-full h-auto"
                sizes="(max-width: 1300px) 100vw, 1300px"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}