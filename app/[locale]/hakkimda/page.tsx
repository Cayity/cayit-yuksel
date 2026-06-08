import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const locales = ['tr', 'en']

const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const title = isTR ? 'Hakkımda | Cayit Yüksel' : 'About | Cayit Yüksel'
  const description = isTR
    ? 'Cayit Yüksel\'in hikayesi, sertifikaları ve uzmanlık alanları. Level 1 Bodybuilding Coach olarak 10 yıllık deneyim.'
    : 'Cayit Yüksel\'s story, certifications and areas of expertise. 10 years of experience as a Level 1 Bodybuilding Coach.'
  const url = `${BASE_URL}/${locale}/hakkimda`
  return {
    title,
    description,
    alternates: { canonical: url, languages: { tr: `${BASE_URL}/tr/hakkimda`, en: `${BASE_URL}/en/hakkimda` } },
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

export default async function HakkimdaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = await getContent()
  const t = messages.about as Record<string, unknown>
  const areas = t.areas as string[]

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />

      {/* Hero */}
      <section className="page-hero" style={{ position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '120px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={content.aboutImage} alt="Cayit Yüksel" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="100vw" className="grayscale" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 60%, #0a0a0a 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
        </div>
        <div className="page-hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '60px 2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {t.tag as string}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, color: 'white', marginBottom: '0.5rem' }}>
            {t.title as string}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.subtitle as string}
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section className="hakkimda-content" style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="hakkimda-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>

            {/* Sol — Biyografi */}
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '0.5rem' }}>
                {locale === 'tr' ? 'Benim Hikayem' : 'My Story'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#d1d5db', lineHeight: 1.8, fontSize: '1rem' }}>
                {[content.about.bio1, content.about.bio2, content.about.bio3, content.about.bio4, content.about.bio5].filter(Boolean).map((bio, i) => (
                  <p key={i}>{bio}</p>
                ))}
              </div>

              {/* İstatistikler */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.08)', marginTop: '3rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { value: `${content.stats.clients}+`, label: locale === 'tr' ? 'Mutlu Danışan' : 'Happy Clients' },
                  { value: `${content.stats.years}+`, label: locale === 'tr' ? 'Yıl Deneyim' : 'Years Exp.' },
                  { value: `${content.stats.countries}+`, label: locale === 'tr' ? 'Farklı Ülke' : 'Countries' },
                  { value: `%${content.stats.successRate}`, label: locale === 'tr' ? 'Başarı Oranı' : 'Success Rate' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '1.5rem', background: '#111', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ — Uzmanlık + Sertifikalar */}
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '0.5rem' }}>
                {t.expertise as string}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '3rem' }}>
                {areas.map((area, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.25rem', background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '3px solid #dc2626' }}>
                    <CheckCircle2 size={18} style={{ color: '#dc2626', flexShrink: 0 }} />
                    <span style={{ color: '#d1d5db', fontSize: '0.95rem', fontWeight: 500 }}>{area}</span>
                  </div>
                ))}
              </div>

              {/* Sertifikalar */}
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '0.5rem' }}>
                {locale === 'tr' ? 'Sertifikalar' : 'Certifications'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {content.about.certifications.map((cert, i) => (
                  <div key={i} style={{ padding: '0.875rem 1.25rem', background: '#111', border: '1px solid rgba(255,255,255,0.06)', color: '#d1d5db', fontSize: '0.9rem', borderRadius: '4px' }}>
                    {cert}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href={`/${locale}/basvuru`} className="btn-primary" style={{ marginTop: '2.5rem' }}>
                {locale === 'tr' ? 'HEMEN BAŞVUR' : 'APPLY NOW'} <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} messages={messages} content={content} />

      <style>{`
        @media (max-width: 768px) {
          .hakkimda-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hakkimda-content {
            padding-top: 8px !important;
          }
        }
      `}</style>
    </main>
  )
}
