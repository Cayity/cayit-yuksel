import { SiteContent } from '@/lib/content'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

export default function About({ locale, messages, content }: Props) {
  const t = messages.about as Record<string, unknown>
  const areas = t.areas as string[]

  return (
    <section id="about" style={{ padding: '50px 0', background: '#111111' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Tag — ortalı, grid dışında */}
        <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>{t.tag as string}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Image
                src={content.aboutImage}
                alt="Cayit Yüksel"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* gradient overlay — tüm kenarlar silik */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(ellipse at center, transparent 40%, #111111 100%)'
              }} />
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: 'linear-gradient(to right, transparent 60%, #111111 100%)'
              }} />
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: 'linear-gradient(to bottom, transparent 70%, #111111 100%)'
              }} />
            </div>

            {/* Badge */}
            <div style={{
              position: 'absolute', bottom: '2rem', right: '-1rem',
              background: '#dc2626', color: 'white', textAlign: 'center',
              padding: '1rem 1.25rem', boxShadow: '0 8px 24px rgba(220,38,38,0.4)', zIndex: 10
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>10+</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>
                {locale === 'tr' ? 'Yıl Deneyim' : 'Years Exp.'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'white', marginBottom: '0.5rem' }}>{t.title as string}</h2>
            <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{t.subtitle as string}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#d1d5db', lineHeight: 1.7, marginBottom: '2rem' }}>
              <p>{t.bio1 as string}</p>
              <p>{t.bio2 as string}</p>
              <p>{t.bio3 as string}</p>
            </div>

            {/* Expertise */}
            <div>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {t.expertise as string}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {areas.map((area, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} style={{ color: '#ef4444', flexShrink: 0 }} />
                    <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <a href={`/${locale}/hakkimda`} className="btn-primary inline-flex" style={{ marginTop: '2.5rem' }}>
              {t.cta as string} <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
