'use client'

import { SiteContent } from '@/lib/content'
import InstagramIcon from '@/components/ui/InstagramIcon'
import Image from 'next/image'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

function formatFollowers(val: string): string {
  if (!val) return ''
  const num = parseInt(val.replace(/[^0-9]/g, ''), 10)
  if (isNaN(num)) return val // zaten formatlanmış (35K gibi)
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M+`
  if (num >= 1_000) return `${Math.floor(num / 1_000)}K+`
  return `${num}+`
}

export default function Social({ locale, messages, content }: Props) {
  const t = messages.social as Record<string, string>
  const { instagram, tiktok, youtube } = content.social
  const photos = content.socialPhotos || []

  const platforms = [
    instagram && {
      name: 'INSTAGRAM',
      handle: '@' + instagram.handle,
      followers: instagram.followers,
      url: instagram.url,
      icon: <InstagramIcon size={28} />,
      color: 'from-purple-600 to-pink-600',
    },
    youtube && {
      name: 'YOUTUBE',
      handle: '@' + youtube.handle,
      followers: youtube.followers,
      url: youtube.url,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
        </svg>
      ),
      color: 'from-red-700 to-red-500',
    },
    tiktok && {
      name: 'TIKTOK',
      handle: '@' + tiktok.handle,
      followers: tiktok.followers,
      url: tiktok.url,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
          <path d="M19.6 3.4A4.5 4.5 0 0 1 15.1 0h-3.4v16.4a2.7 2.7 0 0 1-2.7 2.3 2.7 2.7 0 0 1-2.7-2.7 2.7 2.7 0 0 1 2.7-2.7c.27 0 .52.04.77.1V10a6.1 6.1 0 0 0-.77-.05A6.1 6.1 0 0 0 3 16.1 6.1 6.1 0 0 0 9.1 22.2a6.1 6.1 0 0 0 6.1-6.1V8.1a7.8 7.8 0 0 0 4.4 1.3V6a4.5 4.5 0 0 1-4.4-2.6H19.6z" />
        </svg>
      ),
      color: 'from-gray-800 to-gray-600',
    },
  ].filter(Boolean)

  return (
    <section id="contact" style={{ padding: '80px 0', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: photos.length > 0 ? '1fr 1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Sol — başlık + platform kartları */}
          <div>
            <p className="section-tag">{t.tag}</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.25, color: 'white', marginBottom: '1rem' }}>
              {t.title.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '12px' }}>{t.subtitle}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {platforms.map((p) => p && (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '20px', padding: '16px 20px',
                    background: '#111', border: '1px solid rgba(255,255,255,0.25)',
                    textDecoration: 'none', transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${p.color.includes('purple') ? '#7c3aed, #db2777' : p.color.includes('red-7') ? '#b91c1c, #ef4444' : '#374151, #111827'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                  }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em' }}>{p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <div style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>{p.handle}</div>
                      {p.followers && (
                        <div style={{
                          background: '#dc2626', color: 'white',
                          fontWeight: 900, fontSize: '13px', letterSpacing: '0.08em',
                          padding: '2px 8px', borderRadius: '3px',
                          fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                        }}>
                          {formatFollowers(p.followers)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ color: '#dc2626', fontWeight: 800, fontSize: '12px', letterSpacing: '0.1em' }}>
                    {t.follow} ▶
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Sağ — Fotoğraf grid */}
          {photos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              {photos.slice(0, 6).map((photo, i) => (
                <a
                  key={i}
                  href={instagram?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', background: '#111' }}
                >
                  <Image
                    src={photo}
                    alt={`Sosyal medya fotoğrafı ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
                    sizes="200px"
                  />
                  {/* Overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0)',
                    transition: 'background 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                    className="social-photo-overlay"
                  >
                    <InstagramIcon size={28} />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .social-photo-overlay { opacity: 0; color: white; }
        a:hover .social-photo-overlay { opacity: 1; background: rgba(0,0,0,0.5) !important; }
        @media (max-width: 768px) {
          .social-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}
