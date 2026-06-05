import type { MetadataRoute } from 'next'

const BASE_URL = 'https://cayityuksel.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['tr', 'en']
  const pages = ['', '/hakkimda', '/paketler', '/basvuru', '/sss', '/iletisim']

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  )
}
