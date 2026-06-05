'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface Props {
  locale: string
  messages: Record<string, unknown>
  hideHeader?: boolean
}

export default function FAQ({ locale, messages, hideHeader }: Props) {
  const t = messages.faq as Record<string, unknown>
  const items = t.items as Array<{ q: string; a: string }>
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: '50px 0', background: '#0f0f0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        {!hideHeader && (
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {t.tag as string}
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'white' }}>
              {(t.title as string).split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>
          </div>
        )}

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${open === i ? '#dc2626' : 'rgba(255,255,255,0.1)'}`,
                background: open === i ? 'rgba(220,38,38,0.06)' : '#161616',
                transition: 'all 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: '1rem',
                }}
              >
                <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <span style={{ color: '#dc2626', flexShrink: 0 }}>
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 1.5rem 1.25rem', color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ paddingTop: '1rem' }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
