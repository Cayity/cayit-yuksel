'use client'

interface Props {
  locale: string
  messages: Record<string, unknown>
}

export default function ApplyCTA({ locale, messages }: Props) {
  const t = messages.apply as Record<string, string>

  return (
    <section style={{ padding: '50px 0', marginTop: '50px', background: '#dc2626', position: 'relative', overflow: 'hidden' }}>
      {/* Desen */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
          {t.tag}
        </p>
        <h2 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '16px' }}>
          {t.title}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '16px' }}>
          {t.subtitle}
        </p>

        <a
          href={`/${locale}/basvuru`}
          className="apply-cta-btn"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: 'white', color: '#dc2626',
            padding: '16px 36px',
            fontWeight: 900, fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.25s',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {t.cta}
          <span className="apply-arrow" style={{ display: 'inline-flex', transition: 'transform 0.25s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </a>
      </div>

      <style>{`
        .apply-cta-btn:hover { background: #fff7f7; box-shadow: 0 12px 40px rgba(0,0,0,0.3); transform: translateY(-2px); }
        .apply-cta-btn:hover .apply-arrow { transform: translateX(6px); }
      `}</style>
    </section>
  )
}
