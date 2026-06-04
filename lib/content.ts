import fs from 'fs'
import path from 'path'

export interface SiteContent {
  logo: string
  logoWidth: number
  slogan: {
    tr: string
    en: string
    fontSize: number   // clamp min (rem) — örn: 3
    lineHeight: number // örn: 1.0
  }
  stats: {
    clients: number
    years: number
    countries: number
    successRate: number
  }
  heroImage: string
  aboutImage: string
  sponsor: {
    name: string
    logo: string
    url: string
  } | null
  transformations: Array<{
    id: string
    package: string
    before: string
    after: string
  }>
  testimonials: Array<{
    id: string
    name: string
    rating: number
    text: string
    avatar: string
    package: string
  }>
  social: {
    instagram: { handle: string; followers: string; url: string }
    tiktok: { handle: string; followers: string; url: string } | null
    youtube: { handle: string; followers: string; url: string } | null
  }
  announcement: {
    tr: string
    en: string
    active: boolean
  }
}

const contentPath = path.join(process.cwd(), 'data', 'content.json')

const defaultContent: SiteContent = {
  logo: '',
  logoWidth: 120,
  slogan: {
    tr: 'HEDEFLERİNE\nODAKLAN,\nGERİSİNİ\nHALLEDELİM',
    en: 'FOCUS ON\nYOUR GOALS,\nLEAVE THE\nREST TO US',
    fontSize: 5,
    lineHeight: 1.0,
  },
  stats: {
    clients: 500,
    years: 10,
    countries: 15,
    successRate: 98
  },
  heroImage: '/images/hero.jpg',
  aboutImage: '/images/about.jpg',
  sponsor: null,
  transformations: [],
  testimonials: [],
  social: {
    instagram: { handle: 'cayit.yuksel', followers: '', url: 'https://instagram.com/cayit.yuksel' },
    tiktok: null,
    youtube: null
  },
  announcement: {
    tr: '🔥 Sınırlı kontenjan! Hemen başvur ve ilk adımı at.',
    en: '🔥 Limited spots available! Apply now and take your first step.',
    active: true
  }
}

export function getContent(): SiteContent {
  try {
    if (fs.existsSync(contentPath)) {
      const raw = fs.readFileSync(contentPath, 'utf-8')
      return { ...defaultContent, ...JSON.parse(raw) }
    }
  } catch {
    // fallback to default
  }
  return defaultContent
}

export function saveContent(content: SiteContent): void {
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2))
}
