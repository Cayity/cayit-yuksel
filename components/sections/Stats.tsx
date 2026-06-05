'use client'

import { useEffect, useRef, useState } from 'react'
import { SiteContent } from '@/lib/content'

interface Props {
  locale: string
  messages: Record<string, Record<string, string>>
  content: SiteContent
}

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

function StatItem({ value, suffix, prefix, label, active }: {
  value: number
  suffix?: string
  prefix?: string
  label: string
  active: boolean
}) {
  const count = useCountUp(value, 1800, active)

  return (
    <div style={{ textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', marginTop: '8px', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

export default function Stats({ locale, messages, content }: Props) {
  const t = messages.stats
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: content.stats.clients, suffix: '+', prefix: '', label: t.clients },
    { value: content.stats.years, suffix: '', prefix: '', label: t.years },
    { value: content.stats.countries, suffix: '+', prefix: '', label: t.countries },
    { value: content.stats.successRate, suffix: '', prefix: '%', label: t.success },
  ]

  return (
    <section
      ref={ref}
      style={{ position: 'relative', background: '#dc2626', overflow: 'hidden', padding: '32px 0' }}
    >
      {/* Diagonal stripes */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,1) 10px, rgba(255,255,255,1) 20px)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        {/* Desktop */}
        <div className="stats-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          <div style={{ flexShrink: 0, paddingRight: '40px' }}>
            <h2 style={{ color: 'white', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', margin: 0, whiteSpace: 'nowrap', lineHeight: 1.05 }}>
              <span style={{ display: 'block', fontSize: '59px', letterSpacing: '2.5px' }}>
                {t.title.split(' ')[0]}
              </span>
              <span style={{ display: 'block', fontSize: '22px', letterSpacing: '0.08em' }}>
                {t.title.split(' ').slice(1).join(' ')}
              </span>
            </h2>
          </div>
          <div style={{ width: '1px', height: '56px', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.25)' : 'none' }}>
                <StatItem {...stat} active={active} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="stats-mobile" style={{ display: 'none', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ color: 'white', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', margin: 0, textAlign: 'center', lineHeight: 1.05 }}>
            <span style={{ display: 'block', fontSize: '44px', letterSpacing: '2.5px' }}>
              {t.title.split(' ')[0]}
            </span>
            <span style={{ display: 'block', fontSize: '16px', letterSpacing: '0.08em' }}>
              {t.title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                borderLeft: i % 2 === 1 ? '1px solid rgba(255,255,255,0.25)' : 'none',
                borderTop: i >= 2 ? '1px solid rgba(255,255,255,0.25)' : 'none',
                paddingTop: i >= 2 ? '16px' : '0',
              }}>
                <StatItem {...stat} active={active} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-desktop { display: none !important; }
          .stats-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
}
