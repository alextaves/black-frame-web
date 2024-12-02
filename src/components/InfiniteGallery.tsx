// src/components/InfiniteGallery.tsx
'use client'

export default function InfiniteGallery({ category }: { category: string }) {
  return (
    <div className="w-full">
      <h1>{category}</h1>
    </div>
  )
}