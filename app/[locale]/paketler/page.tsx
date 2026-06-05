import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'
import { Check } from 'lucide-react'
import Image from 'next/image'

const locales = ['tr', 'en']
const WHATSAPP_NUMBER = '905445715543'
const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const title = isTR ? 'Koçluk Paketleri | Cayit Yüksel' : 'Coaching Packages | Cayit Yüksel'
  const description = isTR
    ? 'Starter, Pro ve Elite koçluk paketleri. Kişiye özel antrenman ve beslenme programı ile hedeflerine ulaş.'
    : 'Starter, Pro and Elite coaching packages. Reach your goals with a personalized training and nutrition program.'
  const url = `${BASE_URL}/${locale}/paketler`
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

function getWhatsappUrl(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default async function PaketlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = await getContent()
  const t = messages.packages as Record<string, unknown>

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />

      {/* Hero */}
      <section className="page-hero" style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '120px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={content.aboutImage} alt="Paketler" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="100vw" className="grayscale" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 60%, #0a0a0a 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
        </div>
        <div className="page-hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '60px 2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {t.tag as string}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, color: 'white', marginBottom: '0.5rem' }}>
            {locale === 'tr' ? 'SANA ÖZEL KOÇLUK SİSTEMİ' : 'PERSONALIZED COACHING SYSTEM'}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.subtitle as string}
          </p>
        </div>
      </section>

      {/* Paket kartları */}
      <section className="paketler-content" style={{ padding: '0 0 100px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="paketler-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {content.packages.map((pkg) => {
              const borderColor = pkg.color === 'red' ? '#dc2626' : pkg.color === 'gold' ? '#eab308' : '#4b5563'
              const glowColor = pkg.color === 'red' ? 'rgba(220,38,38,0.15)' : pkg.color === 'gold' ? 'rgba(234,179,8,0.12)' : 'transparent'
              const badgeColor = pkg.color === 'red' ? { background: '#dc2626', color: 'white' } : pkg.color === 'gold' ? { background: '#eab308', color: 'black' } : { background: '#374151', color: '#e5e7eb' }

              return (
                <div
                  key={pkg.id}
                  style={{
                    position: 'relative',
                    background: 'linear-gradient(160deg, #161616 0%, #111 100%)',
                    border: `2px solid ${borderColor}`,
                    boxShadow: `0 0 30px ${glowColor}, 0 4px 24px rgba(0,0,0,0.5)`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {pkg.color === 'red' && (
                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                      <span style={{ background: '#dc2626', color: 'white', fontSize: '0.7rem', fontWeight: 900, padding: '3px 14px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {t.popular as string}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ ...badgeColor, fontSize: '0.7rem', fontWeight: 900, padding: '3px 10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {pkg.name}
                      </span>
                      <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600 }}>{pkg.duration}</span>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '3.2rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>{pkg.price}</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#d1d5db', marginLeft: '4px' }}>₺</span>
                      </div>
                      {pkg.priceEur && (
                        <span style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 600 }}>{pkg.priceEur}</span>
                      )}
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.75rem', lineHeight: 1.5 }}>{pkg.description}</p>
                  </div>

                  {/* Features */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {pkg.features.map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <Check size={15} style={{ color: '#ef4444', marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{feature}</span>
                      </div>
                    ))}
                    <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem', fontStyle: 'italic' }}>{pkg.tag}</p>
                  </div>

                  {/* CTA */}
                  <div style={{ padding: '0 1.5rem 1.5rem' }}>
                    <a
                      href={getWhatsappUrl(pkg.whatsapp_msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ justifyContent: 'center', width: '100%', boxSizing: 'border-box', fontSize: '12px', whiteSpace: 'nowrap' }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      {t.whatsapp as string}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer locale={locale} messages={messages} content={content} />

      <style>{`
        @media (max-width: 1023px) {
          .paketler-content { padding-top: 0 !important; }
          .paketler-content > div { padding-top: 16px !important; }
        }
        @media (max-width: 900px) {
          .paketler-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .paketler-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </main>
  )
}
