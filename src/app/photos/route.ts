// src/app/api/photos/route.ts
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category') || 'all'
    
    // Calculate pagination
    const start = (page - 1) * limit
    const end = start + limit

    // Get directory based on category
    const baseDir = path.join(process.cwd(), 'public/images')
    const directory = category === 'all' ? baseDir : path.join(baseDir, category)
    
    // Read files from directory
    const files = await fs.readdir(directory)
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif)$/i)
    )

    // Paginate results
    const paginatedFiles = imageFiles.slice(start, end)
    const images = paginatedFiles.map(filename => ({
      url: `/images/${category}/${filename}`,
      alt: filename.replace(/\.[^/.]+$/, ""),
      width: 1920,  // You can adjust these or make them dynamic
      height: 1080
    }))

    return NextResponse.json({
      images,
      hasMore: end < imageFiles.length,
      total: imageFiles.length
    })
  } catch (error) {
    console.error('Error in photos API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}

// src/components/InfiniteGallery.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Photo {
  url: string
  alt: string
  width: number
  height: number
}

interface InfiniteGalleryProps {
  category: string
  initialPhotos?: Photo[]
}

export default function InfiniteGallery({ category, initialPhotos = [] }: InfiniteGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  
  const entry = useIntersectionObserver(loadMoreRef, {
    threshold: 0,
    root: null,
    rootMargin: '100px'
  })

  const fetchPhotos = async (pageNum: number) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/photos?page=${pageNum}&category=${category}&limit=10`
      )
      const data = await response.json()
      
      if (response.ok) {
        setPhotos(prev => [...prev, ...data.images])
        setHasMore(data.hasMore)
      } else {
        console.error('Failed to fetch photos:', data.error)
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !isLoading) {
      setPage(prev => {
        const nextPage = prev + 1
        fetchPhotos(nextPage)
        return nextPage
      })
    }
  }, [entry?.isIntersecting, hasMore, isLoading])

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

// src/hooks/useIntersectionObserver.ts
import { useState, useEffect } from 'react'

interface IntersectionObserverOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverOptions = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, options])

  return entry
}