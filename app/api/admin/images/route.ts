import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const dir = path.join(process.cwd(), 'public', 'images')
  if (!fs.existsSync(dir)) return NextResponse.json({ images: [] })

  const files = fs.readdirSync(dir).filter((f) =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
  )
  return NextResponse.json({ images: files.map((f) => `/images/${f}`) })
}

export async function DELETE(req: Request) {
  const { filename } = await req.json()
  if (!filename) return NextResponse.json({ error: 'No filename' }, { status: 400 })

  const safe = path.basename(filename)
  const filePath = path.join(process.cwd(), 'public', 'images', safe)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

  return NextResponse.json({ ok: true })
}
