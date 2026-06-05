import Image from 'next/image'
import { Phone } from 'lucide-react'
import { SiteContent } from '@/lib/content'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

export default function Footer({ locale, content }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {/* Logo */}
        <a href={`/${locale}`} style={{ display: 'inline-block', lineHeight: 0 }}>
          {content.logo ? (
            <Image
              src={content.logo}
              alt="Cayit Yüksel"
              width={content.logoWidth || 120}
              height={48}
              style={{ objectFit: 'contain', maxHeight: '48px', width: 'auto' }}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #dc2626 0%, #ff4444 60%, #ff6b35 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '18px', borderRadius: '2px', flexShrink: 0 }}>CY</div>
              <span style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', color: 'white', fontSize: '36px', letterSpacing: '0.08em', lineHeight: 1, fontWeight: 900 }}>CAYİT YÜKSEL</span>
            </div>
          )}
        </a>

        {/* Phone */}
        <a
          href="https://wa.me/905445715543"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Phone size={14} />
          +90 544 571 55 43
        </a>

        {/* Legal links */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={`/${locale}/kvkk`} className="footer-legal-link">
            {locale === 'tr' ? 'KVKK' : 'Privacy Notice'}
          </a>
          <a href={`/${locale}/gizlilik`} className="footer-legal-link">
            {locale === 'tr' ? 'Gizlilik & Çerez' : 'Privacy & Cookies'}
          </a>
        </div>

        {/* Copyright */}
        <p style={{ color: '#4b5563', fontSize: '12px', margin: 0 }}>
          © {year} Cayit Yüksel. {locale === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}
