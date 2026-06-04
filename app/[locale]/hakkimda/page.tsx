import { notFound } from 'next/navigation'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const locales = ['tr', 'en']

export default async function HakkimdaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = getContent()
  const t = messages.about as Record<string, unknown>
  const areas = t.areas as string[]

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', paddingTop: '120px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={content.aboutImage} alt="Cayit Yüksel" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="100vw" className="grayscale" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 30%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.3) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.8) 0%, transparent 60%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem 4rem', width: '100%' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {t.tag as string}
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.02em', color: 'white', margin: '0 0 0.5rem' }}>
            {t.title as string}
          </h1>
          <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.05em', margin: 0 }}>
            {t.subtitle as string}
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>

            {/* Sol — Biyografi */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
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
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
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
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
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
              <a
                href={`/${locale}/basvuru`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '2.5rem',
                  background: '#dc2626', color: 'white', padding: '14px 28px',
                  fontWeight: 800, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
              >
                {locale === 'tr' ? 'HEMEN BAŞVUR' : 'APPLY NOW'} <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} messages={messages} />
    </main>
  )
}
