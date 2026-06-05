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
  packages: Array<{
    id: string
    name: string
    color: string
    duration: string
    price: string
    priceEur: string
    description: string
    tag: string
    features: string[]
    whatsapp_msg: string
  }>
  about: {
    bio1: string
    bio2: string
    bio3: string
    bio4: string
    bio5: string
    certifications: string[]
  }
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
  socialPhotos: string[]
  announcement: {
    tr: string
    en: string
    active: boolean
  }
  gaId: string
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
  packages: [
    {
      id: 'starter',
      name: 'STARTER',
      color: 'gray',
      duration: '6 Hafta',
      price: '3.000',
      priceEur: '€75',
      description: 'Spor hayatına düzenli bir başlangıç yapmak isteyenler için.',
      tag: '👉 Yeni başlayanlar için sağlam bir temel',
      features: ['Kişiye özel antrenman programı', 'Hedef analizi (kas kazanımı / yağ kaybı)', 'Temel beslenme yönlendirmesi', 'Süre boyunca program güncellemeleri', 'Online destek (WhatsApp / e-posta)'],
      whatsapp_msg: 'Merhaba, Starter Paket hakkında bilgi almak istiyorum.',
    },
    {
      id: 'pro',
      name: 'PRO',
      color: 'red',
      duration: '12 Hafta',
      price: '5.000',
      priceEur: '€125',
      description: 'En çok tercih edilen ve en iyi sonuç alınan sistem.',
      tag: '👉 Gerçek ve sürdürülebilir gelişim isteyenler için',
      features: ['Kişiye özel antrenman programı', 'Detaylı beslenme planı', 'Haftalık check-in (online takip)', 'Form ve teknik analizi', 'Süre boyunca program güncellemeleri', 'Aktif WhatsApp desteği'],
      whatsapp_msg: 'Merhaba, Pro Paket hakkında bilgi almak istiyorum.',
    },
    {
      id: 'elite',
      name: 'ELITE',
      color: 'gold',
      duration: '16 Hafta',
      price: '7.000',
      priceEur: '€175',
      description: 'Maksimum dönüşüm ve birebir takip isteyenler için.',
      tag: '👉 Ciddi fiziksel dönüşüm hedefleyenler için premium paket',
      features: ['Tam antrenman + beslenme + yaşam tarzı', 'Haftalık detaylı değerlendirme', 'Sık program güncellemeleri', 'Öncelikli iletişim ve hızlı geri dönüş', 'Maksimum sonuç odaklı sistem'],
      whatsapp_msg: 'Merhaba, Elite Paket hakkında bilgi almak istiyorum.',
    },
  ],
  about: {
    bio1: 'Merhaba, ben Cayit Yüksel, Türkiye\'de yaşayan 1. Kademe Vücut Geliştirme Antrenörüyüm ve yaklaşık 10 yıllık fitness ve vücut geliştirme deneyimine sahibim.',
    bio2: 'Uzun yıllardır edindiğim bilgi ve tecrübelerle, online koçluk hizmeti sunarak dünyanın farklı ülkelerinden danışanlara ulaşan bir sistemle çalışıyorum.',
    bio3: 'Hedefim sadece fiziksel değişim değil; disiplin, istikrar ve uzun vadeli bir yaşam tarzı dönüşümü kazandırmaktır.',
    bio4: 'Bugüne kadar 500\'den fazla danışanla çalıştım; yurt içinden ve yurt dışından birçok farklı profile sahip kişiye kişiye özel program hazırladım.',
    bio5: 'Bilimsel temelli antrenman metodolojisi ve beslenme stratejileriyle, danışanlarımın yalnızca fiziksel değil zihinsel olarak da güçlenmesine katkı sağlıyorum.',
    certifications: [
      '🏆 1. Kademe Vücut Geliştirme Antrenörü',
      '📋 Kişisel Antrenörlük Sertifikası',
      '🥗 Spor Beslenmesi Uzmanlığı',
    ],
  },
  sponsor: null,
  transformations: [],
  testimonials: [],
  social: {
    instagram: { handle: 'cayit.yuksel', followers: '', url: 'https://instagram.com/cayit.yuksel' },
    tiktok: null,
    youtube: null
  },
  socialPhotos: [],
  announcement: {
    tr: '🔥 Sınırlı kontenjan! Hemen başvur ve ilk adımı at.',
    en: '🔥 Limited spots available! Apply now and take your first step.',
    active: true
  },
  gaId: '',
}

function mergeWithDefaults(saved: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...saved,
    about: { ...defaultContent.about, ...(saved.about || {}) },
    packages: saved.packages || defaultContent.packages,
    social: { ...defaultContent.social, ...(saved.social || {}) },
    socialPhotos: saved.socialPhotos || defaultContent.socialPhotos,
    announcement: { ...defaultContent.announcement, ...(saved.announcement || {}) },
    slogan: { ...defaultContent.slogan, ...(saved.slogan || {}) },
    stats: { ...defaultContent.stats, ...(saved.stats || {}) },
    gaId: saved.gaId ?? defaultContent.gaId,
  }
}

const KV_KEY = 'site_content'

function hasKV(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export async function getContent(): Promise<SiteContent> {
  // 1. Vercel KV (production)
  if (hasKV()) {
    try {
      const { kv } = await import('@vercel/kv')
      const saved = await kv.get<SiteContent>(KV_KEY)
      if (saved) return mergeWithDefaults(saved)
    } catch {
      // KV erişim hatası — dosyaya düş
    }
  }

  // 2. Lokal dosya (development fallback)
  try {
    if (fs.existsSync(contentPath)) {
      const raw = fs.readFileSync(contentPath, 'utf-8')
      const saved = JSON.parse(raw)
      return mergeWithDefaults(saved)
    }
  } catch {
    // dosya okunamadı
  }

  return defaultContent
}

export async function saveContent(content: SiteContent): Promise<void> {
  // 1. Vercel KV (production)
  if (hasKV()) {
    const { kv } = await import('@vercel/kv')
    await kv.set(KV_KEY, content)
    return
  }

  // 2. Lokal dosya (development fallback)
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2))
}
