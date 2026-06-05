'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <button
        onClick={scrollUp}
        aria-label="Yukarı çık"
        className="scroll-to-top"
        style={{
          position: 'fixed',
          right: '24px',
          zIndex: 9998,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'opacity 0.3s, transform 0.2s, box-shadow 0.2s, bottom 0.3s',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#dc2626'
          e.currentTarget.style.borderColor = '#dc2626'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = '#1a1a1a'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <style>{`
        /* Masaüstü: bottom 24px */
        .scroll-to-top { bottom: 24px; }
        /* Mobil: WhatsApp butonunun üstünde — bottom 78px (44px buton + 24px gap + 10px) */
        @media (max-width: 1023px) {
          .scroll-to-top { bottom: 78px; }
        }
      `}</style>
    </>
  )
}
