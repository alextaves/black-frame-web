// src/components/InfiniteGallery.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Photo {
  url: string
  alt: string
  width: number
  height: number
}

interface InfiniteGalleryProps {
  category: string
}

export default function InfiniteGallery({ category }: InfiniteGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasMore && !isLoading) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading])

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/photos?page=${page}&category=${category}&limit=10`
        )
        const data = await response.json()
        
        if (response.ok) {
          setPhotos(prev => [...prev, ...data.images])
          setHasMore(data.hasMore)
        }
      } catch (error) {
        console.error('Error fetching photos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPhotos()
  }, [page, category])

  return (
    <div className="flex flex-col items-center w-full">
      {photos.map((photo, index) => (
        <div 
          key={`${photo.url}-${index}`}
          className="w-full max-w-[1300px] mt-[10px] px-4 xl:px-0"
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            quality={100}
            priority={index === 0}
            className="w-full h-auto"
            sizes="(max-width: 1300px) 100vw, 1300px"
          />
        </div>
      ))}
      
      <div ref={loadMoreRef} className="h-10 w-full">
        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    </div>
  )
}