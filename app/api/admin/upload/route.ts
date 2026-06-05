import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function hasBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
    const filename = `${Date.now()}_${safeName}`

    // Vercel Blob (production)
    if (hasBlob()) {
      const { put } = await import('@vercel/blob')
      const blob = await put(`images/${filename}`, file, { access: 'public' })
      return NextResponse.json({ path: blob.url })
    }

    // Lokal dosya sistemi (development)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadDir = path.join(process.cwd(), 'public', 'images')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
    fs.writeFileSync(path.join(uploadDir, filename), buffer)
    return NextResponse.json({ path: `/images/${filename}` })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[upload] error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
