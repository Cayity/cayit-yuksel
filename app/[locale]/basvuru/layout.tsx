import type { Metadata } from 'next'
import { getContent } from '@/lib/content'

const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const { seo } = await getContent()
  const title = isTR ? seo.apply.titleTR : seo.apply.titleEN
  const description = isTR ? seo.apply.descTR : seo.apply.descEN
  const url = `${BASE_URL}/${locale}/basvuru`
  return {
    title,
    description,
    alternates: { canonical: url, languages: { tr: `${BASE_URL}/tr/basvuru`, en: `${BASE_URL}/en/basvuru` } },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cayit Yüksel',
      locale: isTR ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE_URL}/opengraph-image`] },
  }
}

export default function BasvuruLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
