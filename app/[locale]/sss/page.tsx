import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import FAQ from '@/components/sections/FAQ'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'

const locales = ['tr', 'en']

const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const title = isTR ? 'Sıkça Sorulan Sorular | Cayit Yüksel' : 'FAQ | Cayit Yüksel'
  const description = isTR
    ? 'Online koçluk hakkında merak ettiğiniz her şey. Sıkça sorulan sorular ve cevapları.'
    : 'Everything you want to know about online coaching. Frequently asked questions and answers.'
  const url = `${BASE_URL}/${locale}/sss`
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

export default async function SSSPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = getContent()

  const faqMessages = messages.faq as Record<string, string>

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />

      {/* Hero header */}
      <section className="page-hero" style={{ position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '120px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={content.aboutImage} alt="SSS" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="100vw" className="grayscale" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 60%, #0a0a0a 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
        </div>
        <div className="page-hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '60px 2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {faqMessages.tag || (locale === 'tr' ? '/// MERAK EDİLENLER' : '/// FAQ')}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, color: 'white', marginBottom: '0.5rem' }}>
            {(faqMessages.title || (locale === 'tr' ? 'SIKÇA SORULAN SORULAR' : 'FREQUENTLY ASKED QUESTIONS')).split('\n').map((line: string, i: number) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>
        </div>
      </section>

      <FAQ locale={locale} messages={messages} hideHeader />
      <Footer locale={locale} messages={messages} content={content} />
    </main>
  )
}
