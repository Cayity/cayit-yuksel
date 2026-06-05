import type { Metadata } from 'next'

const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const title = isTR ? 'Başvuru Formu | Cayit Yüksel' : 'Apply | Cayit Yüksel'
  const description = isTR
    ? 'Cayit Yüksel ile online koçluk için başvur. Kişiye özel program için ilk adımı at.'
    : 'Apply for online coaching with Cayit Yüksel. Take the first step towards your personalized program.'
  const url = `${BASE_URL}/${locale}/basvuru`
  return {
    title,
    description,
    alternates: { canonical: url },
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
