import { notFound } from 'next/navigation'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'
import { Check, MessageCircle } from 'lucide-react'
import Image from 'next/image'

const locales = ['tr', 'en']
const WHATSAPP_NUMBER = '905445715543'

function getWhatsappUrl(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default async function PaketlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = getContent()
  const t = messages.packages as Record<string, unknown>

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '120px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={content.aboutImage} alt="Paketler" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="100vw" className="grayscale" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 60%, #0a0a0a 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '60px 2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {t.tag as string}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'white', marginBottom: '1rem' }}>
            {locale === 'tr' ? 'SANA ÖZEL KOÇLUK SİSTEMİ' : 'PERSONALIZED COACHING SYSTEM'}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {t.subtitle as string}
          </p>
        </div>
      </section>

      {/* Paket kartları */}
      <section style={{ padding: '0 0 100px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
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
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        background: '#dc2626', color: 'white', padding: '14px',
                        fontWeight: 800, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                        textDecoration: 'none', width: '100%', boxSizing: 'border-box',
                      }}
                    >
                      <MessageCircle size={16} />
                      {t.whatsapp as string}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer locale={locale} messages={messages} />
    </main>
  )
}
