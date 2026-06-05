import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function hasBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

export async function GET() {
  // Vercel Blob (production)
  if (hasBlob()) {
    const { list } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: 'images/' })
    return NextResponse.json({ images: blobs.map((b) => b.url) })
  }

  // Lokal dosya sistemi (development)
  const dir = path.join(process.cwd(), 'public', 'images')
  if (!fs.existsSync(dir)) return NextResponse.json({ images: [] })
  const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
  return NextResponse.json({ images: files.map((f) => `/images/${f}`) })
}

export async function DELETE(req: Request) {
  const { filename } = await req.json()
  if (!filename) return NextResponse.json({ error: 'No filename' }, { status: 400 })

  // Vercel Blob (production) — filename alanı tam blob URL'si
  if (hasBlob()) {
    const { del } = await import('@vercel/blob')
    await del(filename)
    return NextResponse.json({ ok: true })
  }

  // Lokal dosya sistemi (development)
  const safe = path.basename(filename)
  const filePath = path.join(process.cwd(), 'public', 'images', safe)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  return NextResponse.json({ ok: true })
}
