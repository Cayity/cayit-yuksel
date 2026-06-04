'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import InstagramIcon from '@/components/ui/InstagramIcon'
import { SiteContent } from '@/lib/content'

interface Props {
  locale: string
  messages: Record<string, Record<string, string>>
  content?: SiteContent
}

/* Harf harf kırmızıya dönen animasyonlu link */
function StaggerLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'inline-flex', letterSpacing: '0.08em' }}
    >
      {label.split('').map((char, i) => (
        <span
          key={i}
          style={{
            color: hovered ? '#dc2626' : '#d1d5db',
            transition: `color 0.03s ease ${i * 30}ms`,
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            whiteSpace: 'pre',
          }}
        >
          {char}
        </span>
      ))}
    </a>
  )
}

export default function Navbar({ locale, messages, content }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = messages.nav
  const otherLocale = locale === 'tr' ? 'en' : 'tr'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: t.home, href: `/${locale}` },
    { label: t.about, href: `/${locale}/hakkimda` },
    { label: t.packages, href: `/${locale}/paketler` },
    { label: t.apply, href: `/${locale}/basvuru` },
    { label: t.faq, href: `/${locale}/sss` },
    { label: t.contact, href: `#contact` },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: scrolled ? '0' : '30px', left: 0, right: 0,
        zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>

        {/* Logo */}
        <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          {content?.logo ? (
            <Image src={content.logo} alt="Logo" width={content.logoWidth || 120} height={44} style={{ objectFit: 'contain', maxHeight: '44px', width: 'auto' }} priority />
          ) : (
            <>
              <div style={{ width: '36px', height: '36px', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '13px', borderRadius: '2px' }}>CY</div>
              <span style={{ fontWeight: 900, color: 'white', fontSize: '16px', letterSpacing: '0.04em', display: 'none' }} className="sm:block">CAYIT YÜKSEL</span>
            </>
          )}
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden lg:flex">
          {links.map((link) => (
            <StaggerLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Lang toggle */}
          <Link href={`/${otherLocale}`} style={{ fontSize: '11px', fontWeight: 800, color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '4px 8px', textDecoration: 'none', letterSpacing: '0.06em', transition: 'border-color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'white' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)' }}
          >
            {otherLocale.toUpperCase()}
          </Link>

          {/* Instagram */}
          <a href="https://instagram.com/cayit.yuksel" target="_blank" rel="noopener noreferrer" style={{ color: 'white', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            className="hidden sm:block"
          >
            <InstagramIcon size={18} />
          </a>

          {/* CTA */}
          <a href={`/${locale}/basvuru`} className="btn-primary hidden lg:inline-flex" style={{ fontSize: '12px', padding: '10px 18px', clipPath: 'none' }}>
            {t.cta} ▶
          </a>

          {/* Mobile menu btn */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} className="lg:hidden" aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: 'rgba(0,0,0,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '12px 0', color: '#d1d5db', textDecoration: 'none', fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              {link.label}
            </a>
          ))}
          <a href={`/${locale}/basvuru`} className="btn-primary mt-4 justify-center" style={{ clipPath: 'none' }}>
            {t.cta} ▶
          </a>
        </div>
      )}
    </header>
  )
}
