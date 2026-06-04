'use client'

import { Check, MessageCircle } from 'lucide-react'

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
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 900, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'white', margin: 0 }}>
            {(t.title as string).split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h2>
          <p style={{ color: '#9ca3af', marginTop: '1rem', fontSize: '1.1rem', maxWidth: 'none', margin: '1rem auto 0', whiteSpace: 'nowrap' }}>{t.subtitle as string}</p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
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
                    className="btn-primary w-full justify-center text-sm"
                    style={{ clipPath: 'none' }}
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
  )
}
