'use client'

import { Check } from 'lucide-react'

interface Props {
  locale: string
  messages: Record<string, unknown>
}

const WHATSAPP_NUMBER = '905445715543'

function getWhatsappUrl(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function Packages({ locale, messages }: Props) {
  const t = messages.packages as Record<string, unknown>
  const features = t.features as Record<string, string>
  const items = t.items as Array<{
    id: string
    name: string
    color: string
    duration: string
    price: string
    description: string
    tag: string
    features: string[]
    whatsapp_msg: string
  }>
  const currency = t.currency as string

  const colorMap: Record<string, string> = {
    gray: 'border-gray-600',
    red: 'border-red-600',
    gold: 'border-yellow-500',
  }

  const badgeMap: Record<string, string> = {
    gray: 'bg-gray-700 text-gray-200',
    red: 'bg-red-600 text-white',
    gold: 'bg-yellow-500 text-black',
  }

  return (
    <section id="packages" style={{ padding: '1rem 0', background: '#0a0a0a' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '50px' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t.tag as string}</p>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 900, lineHeight: 1.25, textTransform: 'uppercase', color: 'white', margin: 0 }}>
            {(t.title as string).split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h2>
          <p style={{ color: '#9ca3af', marginTop: '1rem', fontSize: '1.1rem', maxWidth: 'none', margin: '1rem auto 0' }}>{t.subtitle as string}</p>
        </div>

        {/* Cards */}
        <div className="packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {items.map((pkg) => {
            const borderColor = pkg.color === 'red' ? '#dc2626' : pkg.color === 'gold' ? '#eab308' : '#4b5563'
            const glowColor = pkg.color === 'red' ? 'rgba(220,38,38,0.15)' : pkg.color === 'gold' ? 'rgba(234,179,8,0.12)' : 'transparent'
            const badgeColor = pkg.color === 'red' ? { background: '#dc2626', color: 'white' } : pkg.color === 'gold' ? { background: '#eab308', color: 'black' } : { background: '#374151', color: '#e5e7eb' }
            return (
              <div
                key={pkg.id}
                style={{
                  position: 'relative',
                  background: `linear-gradient(160deg, #161616 0%, #111 100%)`,
                  border: `2px solid ${borderColor}`,
                  boxShadow: `0 0 30px ${glowColor}, 0 4px 24px rgba(0,0,0,0.5)`,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${glowColor}, 0 12px 40px rgba(0,0,0,0.6)` }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${glowColor}, 0 4px 24px rgba(0,0,0,0.5)` }}
              >
                {/* Popular badge */}
                {pkg.color === 'red' && (
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                    <span style={{ background: '#dc2626', color: 'white', fontSize: '0.7rem', fontWeight: 900, padding: '3px 14px', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>
                      {t.popular as string}
                    </span>
                  </div>
                )}

                {/* Card header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ ...badgeColor, fontSize: '0.7rem', fontWeight: 900, padding: '3px 10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {pkg.name}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600 }}>{pkg.duration}</span>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ fontSize: '3.2rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>{pkg.price}</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#d1d5db', marginLeft: '4px' }}>{currency}</span>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.75rem', lineHeight: 1.5 }}>{pkg.description}</p>
                </div>

                {/* Features */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {pkg.features.map((key) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <Check size={15} style={{ color: '#ef4444', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{features[key]}</span>
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
                    className="btn-primary w-full justify-center whitespace-nowrap"
                    style={{ fontSize: '11px', padding: '0.75rem 1rem' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15, flexShrink: 0 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t.whatsapp as string}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .packages-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .packages-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
