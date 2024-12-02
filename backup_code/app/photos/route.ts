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
      width: 1920,
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