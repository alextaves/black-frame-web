// src/app/photos/route.ts
export const dynamic = 'force-static'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the URL
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder')

    if (!folder) {
      return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 })
    }

    const imagesDirectory = path.join(process.cwd(), 'public/images', folder)
    
    try {
      const imageFiles = await fs.readdir(imagesDirectory)
      const images = imageFiles
        .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
        .map(filename => `/images/${folder}/${filename}`)

      return NextResponse.json({ images })
    } catch (error) {
      return NextResponse.json({ 
        error: `Failed to read directory: ${folder}`,
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}