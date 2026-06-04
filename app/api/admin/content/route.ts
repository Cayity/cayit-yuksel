import { NextRequest, NextResponse } from 'next/server'
import { saveContent, SiteContent } from '@/lib/content'

export async function POST(req: NextRequest) {
  try {
    const body: SiteContent = await req.json()
    saveContent(body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
