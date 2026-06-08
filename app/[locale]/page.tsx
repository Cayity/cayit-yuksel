import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Packages from '@/components/sections/Packages'
import About from '@/components/sections/About'
import Transformations from '@/components/sections/Transformations'
import Testimonials from '@/components/sections/Testimonials'
import Social from '@/components/sections/Social'
import ApplyCTA from '@/components/sections/ApplyCTA'
import Footer from '@/components/sections/Footer'
import FAQ from '@/components/sections/FAQ'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'

const locales = ['tr', 'en']

const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const title = isTR
    ? 'Cayit Yüksel | Online Bodybuilding Coach'
    : 'Cayit Yüksel | Online Bodybuilding Coach'
  const description = isTR
    ? '10 yıllık deneyimle kişiye özel antrenman ve beslenme programları. Dünyanın her yerinden online koçluk hizmeti.'
    : 'Personalized training and nutrition programs with 10 years of experience. Online coaching from anywhere in the world.'
  const url = `${BASE_URL}/${locale}`
  return {
    title,
    description,
    alternates: { canonical: url, languages: { tr: `${BASE_URL}/tr`, en: `${BASE_URL}/en` } },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cayit Yüksel',
      locale: isTR ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Cayit Yüksel | Online Bodybuilding Coach' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE_URL}/opengraph-image`] },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = await getContent()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cayit Yüksel',
    url: BASE_URL,
    image: `${BASE_URL}/opengraph-image`,
    jobTitle: 'Online Bodybuilding Coach',
    description: locale === 'tr'
      ? '10 yıllık deneyimle kişiye özel antrenman ve beslenme programları sunan Level 1 Vücut Geliştirme Antrenörü.'
      : 'Level 1 Bodybuilding Coach offering personalized training and nutrition programs with 10 years of experience.',
    sameAs: [
      content.social.instagram.url,
      content.social.tiktok?.url,
      content.social.youtube?.url,
    ].filter(Boolean),
    knowsAbout: ['Bodybuilding', 'Personal Training', 'Nutrition', 'Online Coaching', 'Fitness'],
    offers: content.packages.map((pkg) => ({
      '@type': 'Offer',
      name: locale === 'tr' ? `${pkg.name} Paketi` : `${pkg.name} Package`,
      description: pkg.description,
      price: pkg.price,
      priceCurrency: 'TRY',
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />
      <Hero locale={locale} messages={messages} content={content} />
      <Stats locale={locale} messages={messages} content={content} />
      <Packages locale={locale} messages={messages} />
      <About locale={locale} messages={messages} content={content} />
      <Transformations locale={locale} messages={messages} content={content} />
      <Testimonials locale={locale} messages={messages} content={content} />
      <Social locale={locale} messages={messages} content={content} />
      <ApplyCTA locale={locale} messages={messages} />
      <Footer locale={locale} messages={messages} content={content} />
    </main>
  )
}
