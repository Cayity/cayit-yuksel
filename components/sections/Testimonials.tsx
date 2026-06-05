'use client'

import { useState, useEffect, useRef } from 'react'
import { SiteContent } from '@/lib/content'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

export default function Testimonials({ locale, messages, content }: Props) {
  const t = messages.testimonials as Record<string, string>
  const items = content.testimonials
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = items.length
  const [cardWidth, setCardWidth] = useState(360)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 540) setCardWidth(window.innerWidth - 48)
      else setCardWidth(360)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % total)
    }, 3500)
  }

  useEffect(() => {
    if (total > 1) startAuto()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [total])

  const goTo = (i: number) => {
    setCurrent((i + total) % total)
    startAuto() // manuel geçişte timer sıfırla
  }

  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)

  if (items.length === 0) {
    return (
      <section style={{ padding: '80px 0', background: '#0d0d0d' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ border: '2px dashed rgba(255,255,255,0.15)', borderRadius: '12px', padding: '80px', textAlign: 'center' }}>
            <p style={{ color: '#4b5563', fontSize: '16px' }}>Henüz yorum eklenmemiş.</p>
          </div>
        </div>
      </section>
    )
  }

  // Sonsuz loop için kartları klonla: [...items, ...items, ...items]
  const looped = [...items, ...items, ...items]
  const offset = total // ortadaki kopyanın başlangıcı

  return (
    <section style={{ padding: '80px 0', background: '#0d0d0d', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {t?.tag || 'MEMNUNİYET'}
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, color: 'white', margin: 0 }}>
              {t?.title || 'KULLANANLAR NE DİYOR?'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={prev}
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: '#fff', border: '2px solid #fff',
                color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: '#fff', border: '2px solid #fff',
                color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              transform: `translateX(-${(offset + current) * (cardWidth + 20)}px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {looped.map((item, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: `${cardWidth}px`,
                  maxWidth: `${cardWidth}px`,
                  background: '#1a1a2e',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  border: '1px solid rgba(220,38,38,0.15)',
                  flexShrink: 0,
                }}
              >
                {/* Yıldızlar */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      style={{
                        color: i < item.rating ? '#f59e0b' : '#374151',
                        fill: i < item.rating ? '#f59e0b' : 'none',
                      }}
                    />
                  ))}
                </div>

                {/* Yorum */}
                <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: 1.7, flex: 1, margin: 0 }}>
                  {item.text}
                </p>

                {/* Kullanıcı */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  {item.avatar ? (
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid rgba(220,38,38,0.4)' }}>
                      <Image src={item.avatar} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="44px" />
                    </div>
                  ) : (
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(220,38,38,0.15)', border: '2px solid rgba(220,38,38,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#dc2626', fontWeight: 800, fontSize: '16px',
                    }}>
                      {item.name[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{item.name}</div>
                    {item.package && (
                      <div style={{ color: '#dc2626', fontSize: '12px', fontWeight: 600, marginTop: '2px' }}>{item.package}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? '#dc2626' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
